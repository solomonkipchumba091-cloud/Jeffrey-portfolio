import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ChevronDown, Bot, Brain, Cpu } from 'lucide-react';

const roles = [
  'AI Engineer',
  'LLM Specialist',
  'AI Agent Builder',
  'Full-Stack Developer',
  'RAG Architect',
];

const HeroSection: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-50" />
        
        {/* Large gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-particle-1" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-particle-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[150px]" />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              top: `${15 + i * 15}%`,
              left: `${10 + i * 16}%`,
              animation: `particle-float-${(i % 2) + 1} ${10 + i * 3}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 lg:pt-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="order-2 lg:order-1">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-green-500/20 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-sm text-green-400 font-medium">Available for new projects</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <span className="text-white">Hi, I'm</span>
              <br />
              <span className="gradient-text">Jeffrey</span>
            </h1>

            {/* Typing role */}
            <div className="flex items-center gap-3 mb-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
              <span className="text-xl sm:text-2xl font-mono text-blue-400">
                {displayText}
                <span className="animate-pulse text-blue-400">|</span>
              </span>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-xl animate-slide-up" style={{ animationDelay: '0.4s' }}>
              I help businesses design, build, and deploy{' '}
              <span className="text-white font-semibold">production-grade AI systems</span>{' '}
              that drive measurable impact. With{' '}
              <span className="text-blue-400 font-semibold">8+ years</span> of experience and{' '}
              <span className="text-purple-400 font-semibold">60+ successful projects</span>,
              I transform AI concepts into scalable applications.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10 animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <button
                onClick={() => scrollTo('contact')}
                className="group flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 magnetic-btn"
              >
                Let's Build Together
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollTo('projects')}
                className="flex items-center gap-2 px-7 py-3.5 glass text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10"
              >
                View My Work
              </button>
            </div>

            {/* Quick stats */}
            <div className="flex gap-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              {[
                { value: '8+', label: 'Years Exp.' },
                { value: '60+', label: 'Projects' },
                { value: '$25', label: 'Per Hour' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Photo + decorations */}
          <div className="order-1 lg:order-2 flex justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Animated ring */}
              <div className="absolute inset-0 rounded-full animate-spin-slow">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <defs>
                    <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                      <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="200"
                    cy="200"
                    r="190"
                    fill="none"
                    stroke="url(#ring-gradient)"
                    strokeWidth="1"
                    strokeDasharray="20 10"
                  />
                </svg>
              </div>

              {/* Photo container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                {/* Glow behind photo */}
                <div className="absolute inset-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl" />
                
                {/* Photo */}
                <div className="absolute inset-6 rounded-full overflow-hidden border-2 border-white/10 animate-morph" style={{ animationDuration: '12s' }}>
                  <img
                    src="https://d64gsuwffb70l.cloudfront.net/69a50ecaca953b214202bfc3_1772430970084_09837733.png"
                    alt="Jeffrey - AI Engineer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating tech badges */}
                <div className="absolute -top-2 right-4 glass rounded-xl px-3 py-2 flex items-center gap-2 animate-float" style={{ animationDelay: '0s' }}>
                  <Bot className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-semibold text-white">AI Agents</span>
                </div>
                <div className="absolute top-1/3 -right-4 glass rounded-xl px-3 py-2 flex items-center gap-2 animate-float" style={{ animationDelay: '2s' }}>
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-semibold text-white">LLM</span>
                </div>
                <div className="absolute bottom-8 -left-4 glass rounded-xl px-3 py-2 flex items-center gap-2 animate-float" style={{ animationDelay: '4s' }}>
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-white">RAG</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button onClick={() => scrollTo('services')} className="text-gray-500 hover:text-blue-400 transition-colors">
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
