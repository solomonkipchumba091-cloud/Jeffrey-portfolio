import React from 'react';
import { Terminal, Mail, Github, Linkedin, Twitter, ArrowUp, Heart } from 'lucide-react';

const FooterSection: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-20 pb-8 overflow-hidden">
      {/* Top gradient line */}
      <div className="line-glow w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Banner */}
        <div className="relative glass rounded-2xl p-8 sm:p-12 mb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Ready to build something <span className="gradient-text">amazing</span>?
              </h3>
              <p className="text-gray-400">Let's turn your AI vision into production reality.</p>
            </div>
            <button
              onClick={() => scrollTo('contact')}
              className="flex-shrink-0 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 magnetic-btn"
            >
              Start a Project
            </button>
          </div>
        </div>

        {/* Footer grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Jeffrey<span className="text-blue-400">.dev</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              AI Engineer building production-grade intelligent systems that drive measurable business impact.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Mail, href: 'mailto:jeffgoyala2828@gmail.com', label: 'Email' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2.5 glass rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2.5">
              {[
                'AI Agents & Automation',
                'LLM Engineering',
                'AI Chatbot Development',
                'RAG Systems',
                'Full-Stack Development',
                'Generative AI',
              ].map((service) => (
                <li key={service}>
                  <button
                    onClick={() => scrollTo('services')}
                    className="text-gray-400 text-sm hover:text-blue-400 transition-colors"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Services', id: 'services' },
                { label: 'Tech Stack', id: 'tech' },
                { label: 'Projects', id: 'projects' },
                { label: 'About', id: 'about' },
                { label: 'Contact', id: 'contact' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-gray-400 text-sm hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:jeffgoyala2828@gmail.com"
                  className="text-gray-400 text-sm hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  jeffgoyala2828@gmail.com
                </a>
              </li>
              <li className="text-gray-400 text-sm">
                <span className="text-white font-medium">Rate:</span> $25/hr
              </li>
              <li className="text-gray-400 text-sm">
                <span className="text-white font-medium">Availability:</span> Remote, Worldwide
              </li>
              <li className="text-gray-400 text-sm">
                <span className="text-white font-medium">Response:</span> Within 24 hours
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm flex items-center gap-1">
            &copy; {new Date().getFullYear()} Jeffrey. Built with
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400 inline" />
            and AI.
          </p>
          <button
            onClick={scrollToTop}
            className="p-2.5 glass rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
