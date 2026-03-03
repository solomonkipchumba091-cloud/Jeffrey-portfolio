import React, { useMemo, useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ExternalLink, X, ArrowRight, Layers } from 'lucide-react';

type PortfolioProject = {
  id: string;
  title: string;
  role: string;
  description: string;
  details: string;
  tech: string[];
  category: string;
  image: string;
  gallery: string[];
  link: string | null;
  color: string;
};

type ProjectBucket = {
  texts: Array<{ path: string; content: string }>;
  images: Array<{ path: string; url: string }>;
};

const textFiles = import.meta.glob('../../portfolio_content/**/*.txt', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>;

const imageFiles = import.meta.glob('../../portfolio_content/**/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const cardColors = [
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-amber-500',
  'from-rose-500 to-red-500',
  'from-indigo-500 to-violet-500',
  'from-cyan-500 to-blue-500',
  'from-green-500 to-emerald-500',
  'from-yellow-500 to-orange-500',
];

const categoryRules = [
  { label: 'Automation', patterns: ['automation', 'n8n', 'workflow', 'make.com'] },
  { label: 'Chatbots', patterns: ['chatbot', 'assistant', 'support'] },
  { label: 'LLM/RAG', patterns: ['rag', 'llm', 'langchain', 'openai', 'gpt'] },
  { label: 'Image AI', patterns: ['image', 'diffusion', 'lora', 'photo', 'vision'] },
  { label: 'Real Estate', patterns: ['real estate', 'property', 'idx'] },
  { label: 'SaaS', patterns: ['saas', 'platform'] },
  { label: 'Data/Analytics', patterns: ['analytics', 'data', 'd3.js', 'machine learning'] },
  { label: 'Full-Stack', patterns: ['full stack', 'next.js', 'node.js', 'react', 'mern'] },
];

const normalizePath = (value: string) => value.replace(/\\/g, '/');

const getFolderName = (path: string) => {
  const normalized = normalizePath(path);
  const parts = normalized.split('/');
  const index = parts.indexOf('portfolio_content');
  return index >= 0 ? (parts[index + 1] || '') : '';
};

const cleanLeadingMarker = (line: string) =>
  line
    .replace(/^[\d]+\.\s*/, '')
    .replace(/^[\u2022\u25CF\u25AA\u25AB\u25E6\u2043\u2219\u2023\u00B7\-\*]+\s*/, '')
    .trim();

const compact = (value: string) => value.replace(/\s+/g, ' ').trim();

const toPreview = (value: string, max = 200) => {
  const text = compact(value);
  if (text.length <= max) return text;
  return `${text.slice(0, max - 3).trimEnd()}...`;
};

const parseContent = (raw: string) => {
  const lines = raw
    .replace(/\r/g, '')
    .split('\n')
    .map((line) => line.trim());

  const nonEmpty = lines.filter(Boolean);
  const title = nonEmpty[0] || 'Project';

  const roleLine = nonEmpty.find((line) => line.toLowerCase().startsWith('my role'));
  const role = roleLine ? compact(roleLine.replace(/^my role\.?/i, '')) : 'Project Delivery';

  const skillsIndex = lines.findIndex((line) => line.toLowerCase().includes('skills and deliverables'));
  const descriptionIndex = lines.findIndex((line) => line.toLowerCase().includes('project description'));

  const bodyStart = descriptionIndex >= 0 ? descriptionIndex + 1 : (roleLine ? lines.indexOf(roleLine) + 1 : 1);
  const bodyEnd = skillsIndex >= 0 ? skillsIndex : lines.length;

  const body = lines
    .slice(bodyStart, bodyEnd)
    .map(cleanLeadingMarker)
    .filter(Boolean)
    .join(' ');

  const skills = (skillsIndex >= 0 ? lines.slice(skillsIndex + 1) : [])
    .map(cleanLeadingMarker)
    .filter((line) => line.length > 0 && !line.includes(':'))
    .slice(0, 6);

  return {
    title: compact(title.replace(/^[^A-Za-z0-9]+/, '')),
    role,
    description: toPreview(body || nonEmpty.slice(1).join(' ')),
    details: compact(body || nonEmpty.slice(1).join(' ')),
    skills,
  };
};

const extractFirstUrl = (raw: string) => {
  const match = raw.match(/https?:\/\/[^\s)]+/i);
  return match ? match[0] : null;
};

const pickMainText = (texts: Array<{ path: string; content: string }>) => {
  const sorted = [...texts].sort((a, b) => a.path.localeCompare(b.path));
  return (
    sorted.find((entry) => {
      const fileName = normalizePath(entry.path).split('/').pop()?.toLowerCase() || '';
      return !fileName.includes('detail') && !fileName.includes('url');
    }) || sorted[0]
  );
};

const pickImages = (images: Array<{ path: string; url: string }>) => {
  const sorted = [...images].sort((a, b) => {
    const aName = normalizePath(a.path).split('/').pop()?.toLowerCase() || '';
    const bName = normalizePath(b.path).split('/').pop()?.toLowerCase() || '';
    const aRank = aName.startsWith('1.') ? 0 : aName.includes('image_original') ? 1 : 2;
    const bRank = bName.startsWith('1.') ? 0 : bName.includes('image_original') ? 1 : 2;
    return aRank - bRank || aName.localeCompare(bName);
  });

  return {
    primary: sorted[0]?.url || '',
    gallery: sorted.map((img) => img.url).slice(0, 9),
  };
};

const inferCategory = (project: { title: string; role: string; description: string; skills: string[] }) => {
  const searchText = `${project.title} ${project.role} ${project.description} ${project.skills.join(' ')}`.toLowerCase();
  const match = categoryRules.find((rule) => rule.patterns.some((pattern) => searchText.includes(pattern)));
  return match ? match.label : 'AI Solutions';
};

const buildPortfolioProjects = (): PortfolioProject[] => {
  const buckets = new Map<string, ProjectBucket>();

  Object.entries(textFiles).forEach(([path, content]) => {
    const folder = getFolderName(path);
    if (!folder) return;
    if (!buckets.has(folder)) buckets.set(folder, { texts: [], images: [] });
    buckets.get(folder)!.texts.push({ path, content });
  });

  Object.entries(imageFiles).forEach(([path, url]) => {
    const folder = getFolderName(path);
    if (!folder) return;
    if (!buckets.has(folder)) buckets.set(folder, { texts: [], images: [] });
    buckets.get(folder)!.images.push({ path, url });
  });

  return Array.from(buckets.entries())
    .map(([folder, bucket], index) => {
      if (!bucket.texts.length || !bucket.images.length) return null;

      const mainText = pickMainText(bucket.texts);
      const parsedMain = parseContent(mainText.content);

      const detailsText = bucket.texts.find((entry) => normalizePath(entry.path).toLowerCase().includes('detail'));
      const parsedDetails = detailsText ? parseContent(detailsText.content) : null;

      const link = bucket.texts
        .map((entry) => extractFirstUrl(entry.content))
        .find((value): value is string => Boolean(value)) || null;

      const { primary, gallery } = pickImages(bucket.images);
      if (!primary) return null;

      const category = inferCategory({
        title: parsedMain.title,
        role: parsedMain.role,
        description: parsedMain.description,
        skills: parsedMain.skills,
      });

      return {
        id: folder,
        title: parsedMain.title || folder,
        role: parsedMain.role,
        description: parsedMain.description,
        details: parsedDetails?.details || parsedMain.details,
        tech: parsedMain.skills.length ? parsedMain.skills : ['AI', 'Automation'],
        category,
        image: primary,
        gallery,
        link,
        color: cardColors[index % cardColors.length],
      } as PortfolioProject;
    })
    .filter((project): project is PortfolioProject => project !== null)
    .sort((a, b) => a.title.localeCompare(b.title));
};

const projects = buildPortfolioProjects();

const ProjectsSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  const projectCategories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((p) => p.category))).sort((a, b) => a.localeCompare(b))],
    []
  );
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const displayed = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-purple-400 text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            Completed Work
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Completed <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real projects I have completed and delivered.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveFilter(cat); setShowAll(false); }}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                  : 'glass text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((project, index) => (
            <div
              key={project.title}
              className={`group transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className="glass rounded-2xl overflow-hidden card-glow cursor-pointer h-full flex flex-col"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${project.color}`}>
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((t: string) => (
                      <span key={t} className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-gray-300 font-medium">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-gray-500">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  {/* View details */}
                  <div className="flex items-center gap-1 text-blue-400 text-sm font-medium group-hover:gap-2 transition-all">
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show more */}
        {filtered.length > 6 && !showAll && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 glass text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10"
            >
              <Layers className="w-4 h-4" />
              Show All Projects ({filtered.length})
            </button>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glass-strong rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal image */}
            <div className="relative h-56 sm:h-64">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 glass rounded-full text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${selectedProject.color} mb-2`}>
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
              </div>
            </div>

            {/* Modal content */}
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Role</div>
                <div className="text-sm text-gray-300">{selectedProject.role}</div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">{selectedProject.details}</p>

              {/* Tech stack */}
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Technologies Used</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm text-blue-400 font-medium">
                    {t}
                  </span>
                ))}
              </div>

              {selectedProject.gallery.length > 1 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">More Screenshots</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedProject.gallery.slice(1, 7).map((image, idx) => (
                      <img
                        key={`${selectedProject.id}-gallery-${idx}`}
                        src={image}
                        alt={`${selectedProject.title} screenshot ${idx + 2}`}
                        className="w-full h-20 object-cover rounded-lg border border-white/10"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                {selectedProject.link ? (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open Project Link
                  </a>
                ) : (
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
