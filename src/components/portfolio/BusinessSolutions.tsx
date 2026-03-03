import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { 
  Bot, Headphones, Settings, Cloud, LineChart, Database,
  ArrowRight
} from 'lucide-react';

const solutions = [
  {
    icon: Bot,
    title: 'AI Copilots & Knowledge Assistants',
    desc: 'Build intelligent assistants that understand your business context and help teams work smarter.',
    gradient: 'from-blue-600/20 to-blue-600/5',
    iconColor: 'text-blue-400',
  },
  {
    icon: Headphones,
    title: 'Automated Support & Operations',
    desc: 'Replace repetitive manual work with AI-powered automation that scales with your business.',
    gradient: 'from-purple-600/20 to-purple-600/5',
    iconColor: 'text-purple-400',
  },
  {
    icon: Cloud,
    title: 'Secure AI Infrastructure',
    desc: 'Deploy AI systems on cloud with enterprise-grade security, monitoring, and scalability.',
    gradient: 'from-emerald-600/20 to-emerald-600/5',
    iconColor: 'text-emerald-400',
  },
  {
    icon: LineChart,
    title: 'AI-Powered SaaS Products',
    desc: 'Launch AI-first products with intelligent features that differentiate you from competitors.',
    gradient: 'from-orange-600/20 to-orange-600/5',
    iconColor: 'text-orange-400',
  },
  {
    icon: Settings,
    title: 'Trading Bots & Real-Time Systems',
    desc: 'Build automated trading systems and real-time data processing pipelines.',
    gradient: 'from-rose-600/20 to-rose-600/5',
    iconColor: 'text-rose-400',
  },
  {
    icon: Database,
    title: 'Data Pipelines & Scraping',
    desc: 'Large-scale data collection, processing, and analysis pipelines for business intelligence.',
    gradient: 'from-cyan-600/20 to-cyan-600/5',
    iconColor: 'text-cyan-400',
  },
];

const BusinessSolutions: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-teal-400 text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Business <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            I help companies leverage AI to solve real business problems and create competitive advantages.
          </p>
        </div>

        {/* Solutions grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div
                key={solution.title}
                className={`group transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="glass rounded-2xl p-6 h-full card-glow relative overflow-hidden">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <Icon className={`w-8 h-8 ${solution.iconColor} mb-4 group-hover:scale-110 transition-transform duration-300`} />
                    <h3 className="text-lg font-bold text-white mb-2">{solution.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{solution.desc}</p>
                    <button
                      onClick={() => scrollTo('contact')}
                      className="flex items-center gap-1 text-blue-400 text-sm font-medium group-hover:gap-2 transition-all"
                    >
                      Discuss Project
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BusinessSolutions;
