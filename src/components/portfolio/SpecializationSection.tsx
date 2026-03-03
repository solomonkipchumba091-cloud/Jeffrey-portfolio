import React, { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { MessageSquare, Palette, ChevronRight, Check } from 'lucide-react';

const specializations = [
  {
    id: 'chatbot',
    icon: MessageSquare,
    title: 'AI Chatbot Development',
    subtitle: 'Intelligent conversational AI systems',
    color: 'from-blue-500 to-cyan-500',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/5',
    features: [
      { category: 'Custom AI Chatbots', items: ['GPT-powered chatbots', 'Context-aware assistants', 'Multi-turn conversation', 'Function calling & tools', 'Persona-based design'] },
      { category: 'RAG Knowledge Bots', items: ['Vector DB integration', 'Document assistants', 'PDF/website ingestion', 'Hallucination reduction', 'Retrieval tuning'] },
      { category: 'Multi-Agent Systems', items: ['CrewAI & AutoGen agents', 'Task automation', 'Workflow orchestration', 'AI copilots for SaaS', 'Productivity assistants'] },
      { category: 'Omnichannel Bots', items: ['Voice bots (Polly, Deepgram)', 'WhatsApp & Telegram', 'Web chat integration', 'API-connected assistants', 'CRM integration'] },
    ],
  },
  {
    id: 'genai',
    icon: Palette,
    title: 'Generative AI & ComfyUI',
    subtitle: 'Advanced image generation & LoRA training',
    color: 'from-purple-500 to-pink-500',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-500/5',
    features: [
      { category: 'ComfyUI Workflows', items: ['Custom workflow design', 'Node graph optimization', 'SDXL pipeline engineering', 'ControlNet & IPAdapter', 'Batch generation'] },
      { category: 'LoRA Fine-Tuning', items: ['LoRA/QLoRA training', 'DreamBooth personalization', 'Dataset curation', 'Model merging', 'Quantization (AWQ, GPTQ)'] },
      { category: 'GenAI Applications', items: ['AI Avatar generators', 'AI Photo editors', 'Content creation tools', 'AI Influencer systems', 'Text-to-Image platforms'] },
      { category: 'Deployment', items: ['GPU-optimized inference', 'RunPod deployment', 'vLLM & TGI servers', 'Cost optimization', 'Real-time inference'] },
    ],
  },
];

const SpecializationSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  const [activeSpec, setActiveSpec] = useState('chatbot');

  const current = specializations.find((s) => s.id === activeSpec)!;

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-yellow-400 text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            Deep Dive
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Core <span className="gradient-text">Specializations</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My two deepest areas of expertise — where I deliver the most impact.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center gap-4 mb-12">
          {specializations.map((spec) => {
            const Icon = spec.icon;
            return (
              <button
                key={spec.id}
                onClick={() => setActiveSpec(spec.id)}
                className={`flex items-center gap-3 px-6 py-3.5 rounded-xl font-medium transition-all duration-300 ${
                  activeSpec === spec.id
                    ? `bg-gradient-to-r ${spec.color} text-white shadow-lg`
                    : 'glass text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{spec.title}</span>
                <span className="sm:hidden">{spec.id === 'chatbot' ? 'Chatbots' : 'GenAI'}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className={`glass rounded-2xl p-6 sm:p-8 lg:p-10 border ${current.borderColor}`}>
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${current.color}`}>
                <current.icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{current.title}</h3>
                <p className="text-gray-400">{current.subtitle}</p>
              </div>
            </div>

            {/* Features grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {current.features.map((feature, index) => (
                <div
                  key={feature.category}
                  className={`glass rounded-xl p-5 transition-all duration-500`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                    {feature.category}
                  </h4>
                  <ul className="space-y-2">
                    {feature.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-400">
                        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecializationSection;
