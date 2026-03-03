import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, ArrowRight } from 'lucide-react';

const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setMessage('');
      setIsOpen(false);
    }, 3000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Chat popup */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-black/40 mb-2 animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
                  <img
                    src="https://d64gsuwffb70l.cloudfront.net/69a50ecaca953b214202bfc3_1772430970084_09837733.png"
                    alt="Jeffrey"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Jeffrey</div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="text-white/70 text-xs">Online now</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-4">
            {sent ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                  <Send className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-white font-semibold mb-1">Message Sent!</p>
                <p className="text-gray-400 text-sm">I'll respond within 24 hours.</p>
              </div>
            ) : (
              <>
                {/* Quick message */}
                <div className="glass rounded-xl p-3 mb-3">
                  <p className="text-gray-300 text-sm">
                    Hi! I'm Jeffrey. Have a project in mind? Drop me a quick message or{' '}
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-blue-400 hover:underline"
                    >
                      fill out the full form
                    </button>.
                  </p>
                </div>

                {/* Quick replies */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {['AI Chatbot', 'AI Agent', 'RAG System', 'Consulting'].map((q) => (
                    <button
                      key={q}
                      onClick={() => setMessage(`I'm interested in ${q} development.`)}
                      className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 hover:bg-blue-500/20 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 outline-none focus:border-blue-500/50 transition-colors"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-50"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-110 ${
          isOpen ? 'rotate-0' : ''
        }`}
      >
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-[hsl(220,20%,4%)]" />
        )}
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default FloatingCTA;
