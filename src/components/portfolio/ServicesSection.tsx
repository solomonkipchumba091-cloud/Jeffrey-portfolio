import React, { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Bot, Brain, Server, Globe, MessageSquare, Palette, ArrowRight, X } from 'lucide-react';

const services = [
  {
    icon: Bot,
    title: 'AI Agents & Automation',
    shortDesc: 'Autonomous multi-agent systems that orchestrate complex workflows.',
    color: 'from-blue-500 to-cyan-500',
    shadowColor: 'shadow-blue-500/20',
    details: [
      'Multi-agent systems using CrewAI, AutoGen',
      'Voice AI with Amazon Polly & Deepgram',
      'Autonomous workflows & task orchestration',
      'Business process automation (n8n, APIs)',
      'Event-driven automation systems',
    ],
  },
  {
    icon: Brain,
    title: 'LLM & GenAI Engineering',
    shortDesc: 'Production-grade LLM integrations with RAG and fine-tuning.',
    color: 'from-purple-500 to-pink-500',
    shadowColor: 'shadow-purple-500/20',
    details: [
      'GPT, OpenAI, AWS Bedrock integrations',
      'RAG pipelines with vector databases',
      'Prompt engineering & evaluation frameworks',
      'Fine-tuning (LoRA, QLoRA, PEFT)',
      'Open-source LLM deployment (LLaMA 3, Mistral)',
    ],
  },
  {
    icon: MessageSquare,
    title: 'AI Chatbot Development',
    shortDesc: 'Intelligent conversational AI systems for real business impact.',
    color: 'from-emerald-500 to-teal-500',
    shadowColor: 'shadow-emerald-500/20',
    details: [
      'GPT-powered context-aware chatbots',
      'RAG-based knowledge assistants',
      'Multi-turn conversation design',
      'WhatsApp, Telegram, Web integration',
      'CRM & backend integration',
    ],
  },
  {
    icon: Server,
    title: 'AI Architecture & Backend',
    shortDesc: 'Scalable cloud-native infrastructure for AI workloads.',
    color: 'from-orange-500 to-amber-500',
    shadowColor: 'shadow-orange-500/20',
    details: [
      'Scalable RESTful & microservices architecture',
      'FastAPI, Flask, Django production backends',
      'Secure API design with OAuth & gateway',
      'Cloud-native deployment (AWS, GCP)',
      'Docker, Kubernetes, CI/CD pipelines',
    ],
  },
  {
    icon: Globe,
    title: 'Full-Stack Development',
    shortDesc: 'Modern web applications with seamless AI integration.',
    color: 'from-rose-500 to-red-500',
    shadowColor: 'shadow-rose-500/20',
    details: [
      'MERN Stack (MongoDB, Express, React, Node.js)',
      'AI-powered dashboards & admin systems',
      'Performance-driven, SEO-optimized apps',
      'Real-time streaming responses',
      'SaaS AI product development',
    ],
  },
  {
    icon: Palette,
    title: 'Generative AI & ComfyUI',
    shortDesc: 'Advanced image generation, LoRA training, and multimodal AI.',
    color: 'from-indigo-500 to-violet-500',
    shadowColor: 'shadow-indigo-500/20',
    details: [
      'Custom ComfyUI workflow design',
      'LoRA, QLoRA training (character, style)',
      'Stable Diffusion pipeline engineering',
      'AI Avatar & Content Creation tools',
      'Image-to-Image & Text-to-Image platforms',
    ],
  },
];

const ServicesSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-blue-400 text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            What I Do
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Services & <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From AI strategy to production deployment, I deliver end-to-end solutions that transform how businesses operate.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={service.title}
                className={`relative group transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`glass rounded-2xl p-6 lg:p-8 h-full card-glow cursor-pointer transition-all duration-500 ${
                    isExpanded ? 'ring-1 ring-blue-500/30' : ''
                  }`}
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                >
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.shortDesc}</p>

                  {/* Expanded details */}
                  <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="pt-4 border-t border-white/5 space-y-2">
                      {service.details.map((detail) => (
                        <div key={detail} className="flex items-start gap-2 text-sm text-gray-300">
                          <ArrowRight className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Toggle indicator */}
                  <div className="flex items-center gap-1 mt-4 text-blue-400 text-sm font-medium">
                    {isExpanded ? (
                      <>
                        <X className="w-4 h-4" />
                        <span>Show less</span>
                      </>
                    ) : (
                      <>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        <span>Learn more</span>
                      </>
                    )}
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

export default ServicesSection;
