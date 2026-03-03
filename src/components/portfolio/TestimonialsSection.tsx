import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO, TechVenture Inc.',
    avatar: 'SC',
    content: 'Jeffrey built our entire AI chatbot infrastructure from scratch. The system handles 10K+ conversations daily with a 95% resolution rate. His deep understanding of LLMs and RAG pipelines is exceptional.',
    rating: 5,
    project: 'AI Customer Support System',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Michael Torres',
    role: 'Founder, DataFlow AI',
    avatar: 'MT',
    content: 'Working with Jeffrey was a game-changer. He delivered a multi-agent automation system that reduced our manual processes by 80%. His architecture-first approach ensured the system scaled perfectly.',
    rating: 5,
    project: 'Multi-Agent Workflow Platform',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Emily Watson',
    role: 'VP Engineering, CloudScale',
    avatar: 'EW',
    content: 'Jeffrey\'s expertise in deploying LLMs at scale is unmatched. He optimized our inference pipeline, cutting costs by 60% while improving response times. Highly recommend for any AI infrastructure project.',
    rating: 5,
    project: 'LLM Deployment Optimization',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'David Park',
    role: 'CEO, CreativeAI Studio',
    avatar: 'DP',
    content: 'The generative AI platform Jeffrey built for us is incredible. Custom ComfyUI workflows, LoRA-trained models — everything works flawlessly. Our content creation speed increased 10x.',
    rating: 5,
    project: 'AI Image Generation Platform',
    color: 'from-orange-500 to-amber-500',
  },
  {
    name: 'Lisa Johnson',
    role: 'Head of Product, FinBot',
    avatar: 'LJ',
    content: 'Jeffrey delivered a production-ready RAG system that transformed how our team accesses internal knowledge. The accuracy is remarkable, and the system handles complex queries effortlessly.',
    rating: 5,
    project: 'Enterprise Knowledge Assistant',
    color: 'from-rose-500 to-red-500',
  },
];

const TestimonialsSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prev = () => goTo((currentIndex - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((currentIndex + 1) % testimonials.length);

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-rose-400 text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Client <span className="gradient-text">Reviews</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            What my clients say about working with me.
          </p>
        </div>

        {/* Main testimonial */}
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative glass rounded-3xl p-8 sm:p-12">
            {/* Quote icon */}
            <div className="absolute top-6 right-8 opacity-10">
              <Quote className="w-20 h-20 text-blue-400" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            {/* Content */}
            <blockquote className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-8 relative z-10 transition-all duration-500">
              "{current.content}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${current.color} flex items-center justify-center text-white font-bold text-sm`}>
                  {current.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold">{current.name}</div>
                  <div className="text-gray-400 text-sm">{current.role}</div>
                </div>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-gray-400 font-medium">
                Project: {current.project}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 glass rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'w-8 h-2 bg-blue-500'
                      : 'w-2 h-2 bg-gray-600 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 glass rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mini testimonial cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
          {testimonials.filter((_, i) => i !== currentIndex).slice(0, 3).map((t, index) => (
            <button
              key={t.name}
              onClick={() => goTo(testimonials.indexOf(t))}
              className={`glass rounded-xl p-5 text-left card-glow transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-1 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-400 text-sm line-clamp-2 mb-3">"{t.content}"</p>
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-[10px]`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white text-xs font-semibold">{t.name}</div>
                  <div className="text-gray-500 text-[10px]">{t.role}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
