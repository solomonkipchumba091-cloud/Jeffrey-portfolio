import React, { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const categories = [
  {
    name: 'AI & LLMs',
    color: 'from-blue-500 to-cyan-500',
    textColor: 'text-blue-400',
    bgColor: 'bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/20',
    techs: ['OpenAI API', 'Azure OpenAI', 'AWS Bedrock', 'LangChain', 'CrewAI', 'AutoGen', 'Vector DBs', 'Pinecone', 'RAG'],
  },
  {
    name: 'ML & Data',
    color: 'from-purple-500 to-pink-500',
    textColor: 'text-purple-400',
    bgColor: 'bg-purple-500/10 border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/20',
    techs: ['Pandas', 'NumPy', 'Scikit-learn', 'LoRA', 'QLoRA', 'PEFT', 'vLLM', 'TGI', 'ComfyUI'],
  },
  {
    name: 'Backend',
    color: 'from-emerald-500 to-teal-500',
    textColor: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/20',
    techs: ['Python', 'FastAPI', 'Flask', 'Django', 'Node.js', 'REST APIs', 'GraphQL'],
  },
  {
    name: 'Frontend',
    color: 'from-orange-500 to-amber-500',
    textColor: 'text-orange-400',
    bgColor: 'bg-orange-500/10 border-orange-500/20 hover:border-orange-500/40 hover:bg-orange-500/20',
    techs: ['React', 'TypeScript', 'JavaScript', 'Next.js', 'Tailwind CSS'],
  },
  {
    name: 'DevOps & Cloud',
    color: 'from-rose-500 to-red-500',
    textColor: 'text-rose-400',
    bgColor: 'bg-rose-500/10 border-rose-500/20 hover:border-rose-500/40 hover:bg-rose-500/20',
    techs: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'RunPod'],
  },
  {
    name: 'Databases & Tools',
    color: 'from-indigo-500 to-violet-500',
    textColor: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10 border-indigo-500/20 hover:border-indigo-500/40 hover:bg-indigo-500/20',
    techs: ['PostgreSQL', 'MongoDB', 'Firebase', 'n8n', 'Selenium', 'Playwright', 'Scrapy'],
  },
];

const TechStackSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = activeCategory
    ? categories.filter((c) => c.name === activeCategory)
    : categories;

  return (
    <section id="tech" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-emerald-400 text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Technologies
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit spanning AI, cloud, and full-stack development.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              !activeCategory
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'glass text-gray-400 hover:text-white border border-transparent'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.name
                  ? `bg-gradient-to-r ${cat.color} text-white`
                  : 'glass text-gray-400 hover:text-white border border-transparent'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Tech grid */}
        <div className="space-y-8">
          {filteredCategories.map((category, catIndex) => (
            <div
              key={category.name}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${catIndex * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`} />
                <h3 className={`text-lg font-bold ${category.textColor}`}>{category.name}</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-white/5 to-transparent" />
              </div>
              <div className="flex flex-wrap gap-3">
                {category.techs.map((tech, techIndex) => (
                  <span
                    key={tech}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-300 tech-badge cursor-default ${category.bgColor}`}
                    style={{ animationDelay: `${techIndex * 50}ms` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Total count */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Proficient in <span className="text-white font-semibold">{categories.reduce((acc, c) => acc + c.techs.length, 0)}+</span> technologies and growing
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
