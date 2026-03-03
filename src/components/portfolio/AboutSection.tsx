import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Shield, Zap, Target, MessageCircle, Code2, Layers } from 'lucide-react';

const approach = [
  { icon: Shield, title: 'Production-Ready', desc: 'Clean, secure, and battle-tested code for real-world deployment.' },
  { icon: Layers, title: 'Architecture-First', desc: 'Scalable infrastructure design before writing a single line of code.' },
  { icon: Target, title: 'Business-Oriented', desc: 'Every solution is built to drive measurable business impact.' },
  { icon: Zap, title: 'Performance-Driven', desc: 'Optimized for speed, efficiency, and cost-effective operation.' },
  { icon: MessageCircle, title: 'Clear Communication', desc: 'Transparent updates, reliable delivery, and proactive collaboration.' },
  { icon: Code2, title: 'Clean Code', desc: 'Well-documented, maintainable code that your team can build upon.' },
];

const AboutSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-orange-400 text-sm font-medium mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              About Me
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Why Work <span className="gradient-text">With Me</span>
            </h2>
          </div>

          {/* Content grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            {/* Left - Story */}
            <div>
              <div className="relative">
                {/* Photo with decoration */}
                <div className="relative w-full max-w-md mx-auto">
                  <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl" />
                  <div className="relative glass rounded-2xl p-6 overflow-hidden">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500/30">
                        <img
                          src="https://d64gsuwffb70l.cloudfront.net/69a50ecaca953b214202bfc3_1772430970084_09837733.png"
                          alt="Jeffrey"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Jeffrey</h3>
                        <p className="text-blue-400 text-sm font-medium">AI Engineer & Full-Stack Developer</p>
                      </div>
                    </div>
                    
                    {/* Code-style bio */}
                    <div className="font-mono text-sm space-y-1 text-gray-300">
                      <div><span className="text-purple-400">const</span> <span className="text-blue-400">jeffrey</span> = {'{'}</div>
                      <div className="pl-4"><span className="text-emerald-400">role</span>: <span className="text-orange-300">"AI Engineer"</span>,</div>
                      <div className="pl-4"><span className="text-emerald-400">experience</span>: <span className="text-orange-300">"8+ years"</span>,</div>
                      <div className="pl-4"><span className="text-emerald-400">projects</span>: <span className="text-cyan-400">60</span>,</div>
                      <div className="pl-4"><span className="text-emerald-400">rate</span>: <span className="text-orange-300">"$25/hr"</span>,</div>
                      <div className="pl-4"><span className="text-emerald-400">passion</span>: <span className="text-orange-300">"Building AI that works"</span>,</div>
                      <div className="pl-4"><span className="text-emerald-400">status</span>: <span className="text-green-400">"Available"</span>,</div>
                      <div>{'}'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Text */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                I don't just integrate AI — I engineer intelligent systems that create{' '}
                <span className="gradient-text-blue">measurable value</span>.
              </h3>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  AI is not just hype — it is infrastructure. With 8+ years of experience spanning AI engineering,
                  full-stack development, and cloud architecture, I've helped businesses across industries transform
                  their operations with production-grade AI systems.
                </p>
                <p>
                  From autonomous multi-agent systems to RAG-powered knowledge assistants, from custom chatbots
                  to generative AI platforms — I build solutions that are reliable, secure, and built for real-world scale.
                </p>
                <p>
                  My approach is simple: understand the business problem first, architect the right solution,
                  then build it with clean code and scalable infrastructure. Every project I deliver is production-ready
                  and designed to grow with your business.
                </p>
              </div>

              {/* Quick highlights */}
              <div className="mt-8 flex flex-wrap gap-3">
                {['AI Agents', 'LLM Systems', 'RAG Pipelines', 'Chatbots', 'Full-Stack', 'Cloud Deploy'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm text-blue-400 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Approach grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {approach.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`glass rounded-2xl p-6 card-glow transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Icon className="w-8 h-8 text-blue-400 mb-4" />
                  <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
