import React, { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Send, Mail, MapPin, Clock, CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const projectTypes = [
  'AI Chatbot',
  'AI Agent System',
  'RAG Pipeline',
  'LLM Integration',
  'Full-Stack App',
  'Generative AI',
  'Automation',
  'Consulting',
  'Other',
];

const budgetRanges = [
  '$1K - $5K',
  '$5K - $15K',
  '$15K - $30K',
  '$30K+',
  'Discuss',
];

const ContactSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.projectType) newErrors.projectType = 'Please select a project type';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Save to Supabase database
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          project_type: formData.projectType,
          budget: formData.budget || null,
          message: formData.message,
          status: 'new',
        });

      if (dbError) throw dbError;

      // Trigger email notification via edge function
      await supabase.functions.invoke('notify-contact', {
        body: {
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          budget: formData.budget,
          message: formData.message,
        },
      });

      setIsSubmitted(true);
      toast.success('Message sent successfully! I\'ll get back to you within 24 hours.');
      
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', projectType: '', budget: '', message: '' });
      }, 5000);
    } catch (err: any) {
      console.error('Submission error:', err);
      toast.error('Something went wrong. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-cyan-400 text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Let's <span className="gradient-text">Build Together</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ready to build an AI system that drives real business impact? Let's discuss your project.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className={`lg:col-span-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-6">
              <a
                href="mailto:jeffgoyala2828@gmail.com"
                className="flex items-start gap-4 glass rounded-xl p-5 card-glow group"
              >
                <div className="p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Email</h4>
                  <p className="text-gray-400 text-sm">jeffgoyala2828@gmail.com</p>
                </div>
              </a>

              <div className="flex items-start gap-4 glass rounded-xl p-5">
                <div className="p-3 rounded-lg bg-emerald-500/10">
                  <Clock className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Response Time</h4>
                  <p className="text-gray-400 text-sm">Within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 glass rounded-xl p-5">
                <div className="p-3 rounded-lg bg-purple-500/10">
                  <MapPin className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Available</h4>
                  <p className="text-gray-400 text-sm">Remote, Worldwide</p>
                </div>
              </div>

              <div className="glass rounded-xl p-6 border border-blue-500/10">
                <div className="text-sm text-gray-400 mb-2">Starting Rate</div>
                <div className="text-3xl font-black text-white mb-1">
                  $25<span className="text-lg text-gray-400 font-normal">/hr</span>
                </div>
                <p className="text-gray-500 text-sm">Flexible pricing based on project scope</p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {isSubmitted ? (
              <div className="glass rounded-2xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                <p className="text-gray-400">Thank you for reaching out. I'll review your project details and get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                        errors.name ? 'border-red-500/50' : 'border-white/10 focus:border-blue-500/50'
                      } text-white placeholder-gray-500 outline-none transition-colors`}
                    />
                    {errors.name && (
                      <div className="flex items-center gap-1 mt-1.5 text-red-400 text-xs">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                        errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-blue-500/50'
                      } text-white placeholder-gray-500 outline-none transition-colors`}
                    />
                    {errors.email && (
                      <div className="flex items-center gap-1 mt-1.5 text-red-400 text-xs">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Type</label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => updateField('projectType', type)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          formData.projectType === type
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  {errors.projectType && (
                    <div className="flex items-center gap-1 mt-1.5 text-red-400 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      {errors.projectType}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Budget Range (Optional)</label>
                  <div className="flex flex-wrap gap-2">
                    {budgetRanges.map((range) => (
                      <button
                        key={range}
                        type="button"
                        onClick={() => updateField('budget', formData.budget === range ? '' : range)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          formData.budget === range
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                            : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Details</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder="Tell me about your project, goals, and timeline..."
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                      errors.message ? 'border-red-500/50' : 'border-white/10 focus:border-blue-500/50'
                    } text-white placeholder-gray-500 outline-none transition-colors resize-none`}
                  />
                  {errors.message && (
                    <div className="flex items-center gap-1 mt-1.5 text-red-400 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed magnetic-btn"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
