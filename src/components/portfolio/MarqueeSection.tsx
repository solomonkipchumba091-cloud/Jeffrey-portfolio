import React from 'react';

const techItems = [
  'OpenAI', 'LangChain', 'CrewAI', 'AutoGen', 'FastAPI', 'React', 'Python',
  'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'ComfyUI', 'Stable Diffusion',
  'GPT-4', 'RAG', 'Vector DB', 'n8n', 'Flask', 'Django', 'TypeScript', 'Node.js',
];

const MarqueeSection: React.FC = () => {
  return (
    <div className="relative py-8 overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[hsl(220,20%,4%)] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[hsl(220,20%,4%)] to-transparent z-10" />

      {/* Marquee row 1 */}
      <div className="flex gap-6 mb-4 animate-marquee-left">
        {[...techItems, ...techItems].map((tech, i) => (
          <div
            key={`${tech}-${i}`}
            className="flex-shrink-0 px-5 py-2.5 glass rounded-lg text-sm font-medium text-gray-400 whitespace-nowrap border border-white/5 hover:border-blue-500/30 hover:text-blue-400 transition-all duration-300"
          >
            {tech}
          </div>
        ))}
      </div>

      {/* Marquee row 2 (reverse) */}
      <div className="flex gap-6 animate-marquee-right">
        {[...techItems.reverse(), ...techItems].map((tech, i) => (
          <div
            key={`${tech}-rev-${i}`}
            className="flex-shrink-0 px-5 py-2.5 glass rounded-lg text-sm font-medium text-gray-400 whitespace-nowrap border border-white/5 hover:border-purple-500/30 hover:text-purple-400 transition-all duration-300"
          >
            {tech}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MarqueeSection;
