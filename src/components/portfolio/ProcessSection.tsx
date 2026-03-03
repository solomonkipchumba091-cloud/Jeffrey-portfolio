import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Search, PenTool, Code2, Rocket, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Discovery',
    description: 'Deep dive into your business needs, technical requirements, and project goals.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: PenTool,
    number: '02',
    title: 'Architecture',
    description: 'Design scalable system architecture, select optimal tech stack, and plan milestones.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: Code2,
    number: '03',
    title: 'Development',
    description: 'Build with clean, production-ready code. Regular updates and iterative feedback loops.',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Deployment',
    description: 'Launch to production with CI/CD, monitoring, documentation, and ongoing support.',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-500/10',
  },
];

const ProcessSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-indigo-400 text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            How I Work
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            My <span className="gradient-text">Process</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A structured approach to delivering production-grade AI systems.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px">
            <div className="h-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-orange-500/20" />
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className={`relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="glass rounded-2xl p-6 h-full card-glow text-center">
                  {/* Step number */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${step.color} text-white font-bold text-sm mb-4 relative z-10`}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl ${step.bgColor} mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>

                  {/* Arrow (not on last) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                      <ArrowRight className="w-5 h-5 text-gray-600" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
