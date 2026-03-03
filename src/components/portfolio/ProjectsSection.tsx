import React, { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ExternalLink, Github, X, ArrowRight, Layers } from 'lucide-react';

const projectCategories = ['All', 'AI Agents', 'Chatbots', 'LLM/RAG', 'Full-Stack', 'GenAI'];

const projects = [
  {
    title: 'AI Customer Support Agent',
    category: 'Chatbots',
    image: 'https://images.unsplash.com/photo-1531746790095-e5995f614585?w=600&h=400&fit=crop',
    description: 'Built an intelligent customer support chatbot handling 10K+ daily conversations with 95% resolution rate.',
    tech: ['OpenAI', 'LangChain', 'FastAPI', 'React', 'PostgreSQL'],
    metrics: { conversations: '10K+/day', resolution: '95%', responseTime: '<2s' },
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Multi-Agent Workflow System',
    category: 'AI Agents',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    description: 'Autonomous multi-agent system orchestrating complex business workflows with CrewAI and AutoGen.',
    tech: ['CrewAI', 'AutoGen', 'Python', 'n8n', 'Docker'],
    metrics: { agents: '12', tasksPerDay: '5K+', efficiency: '+340%' },
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'RAG Knowledge Assistant',
    category: 'LLM/RAG',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
    description: 'Enterprise knowledge base with semantic search across 50K+ documents using RAG pipelines.',
    tech: ['Pinecone', 'OpenAI', 'FastAPI', 'React', 'AWS'],
    metrics: { documents: '50K+', accuracy: '97%', latency: '<1.5s' },
    color: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'AI Trading Bot Platform',
    category: 'Full-Stack',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
    description: 'Real-time AI-powered trading bot with market analysis, automated execution, and risk management.',
    tech: ['Python', 'React', 'Node.js', 'MongoDB', 'AWS'],
    metrics: { trades: '1K+/day', uptime: '99.9%', users: '500+' },
    color: 'from-orange-500 to-amber-500',
  },
  {
    title: 'Voice AI Assistant',
    category: 'AI Agents',
    image: 'https://images.unsplash.com/photo-1589254065878-42c014d2df73?w=600&h=400&fit=crop',
    description: 'Voice-enabled AI assistant with natural conversation flow using Amazon Polly and Deepgram.',
    tech: ['Amazon Polly', 'Deepgram', 'FastAPI', 'React', 'WebSocket'],
    metrics: { languages: '8', latency: '<500ms', satisfaction: '4.8/5' },
    color: 'from-rose-500 to-red-500',
  },
  {
    title: 'AI Image Generation Platform',
    category: 'GenAI',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=400&fit=crop',
    description: 'Custom ComfyUI workflows for brand-specific image generation with LoRA fine-tuned models.',
    tech: ['ComfyUI', 'Stable Diffusion', 'LoRA', 'Python', 'RunPod'],
    metrics: { images: '100K+', models: '15', speed: '3s/image' },
    color: 'from-indigo-500 to-violet-500',
  },
  {
    title: 'SaaS AI Copilot',
    category: 'LLM/RAG',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    description: 'AI copilot integrated into a SaaS platform, providing context-aware suggestions and automation.',
    tech: ['GPT-4', 'LangChain', 'React', 'Node.js', 'Stripe'],
    metrics: { users: '2K+', productivity: '+60%', retention: '92%' },
    color: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'WhatsApp AI Bot',
    category: 'Chatbots',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop',
    description: 'Omnichannel AI chatbot deployed on WhatsApp, Telegram, and web with unified conversation management.',
    tech: ['OpenAI', 'Twilio', 'Flask', 'MongoDB', 'Redis'],
    metrics: { channels: '3', messages: '50K+/mo', conversion: '+45%' },
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Data Pipeline Automation',
    category: 'Full-Stack',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    description: 'Large-scale data scraping and processing pipeline with automated ETL and AI-powered analysis.',
    tech: ['Scrapy', 'Playwright', 'n8n', 'PostgreSQL', 'Docker'],
    metrics: { records: '10M+', pipelines: '25', uptime: '99.8%' },
    color: 'from-yellow-500 to-orange-500',
  },
];

const ProjectsSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
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
            Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A selection of production-grade AI systems I've built for businesses worldwide.
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
                    {project.tech.slice(0, 3).map((t) => (
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
              <p className="text-gray-300 leading-relaxed mb-6">{selectedProject.description}</p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {Object.entries(selectedProject.metrics).map(([key, value]) => (
                  <div key={key} className="glass rounded-xl p-4 text-center">
                    <div className="text-lg font-bold text-white">{value}</div>
                    <div className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                  </div>
                ))}
              </div>

              {/* Tech stack */}
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Technologies Used</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm text-blue-400 font-medium">
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Discuss Similar Project
                </button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex items-center justify-center gap-2 px-5 py-3 glass text-white font-medium rounded-xl hover:bg-white/10 transition-all border border-white/10"
                >
                  <Github className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
