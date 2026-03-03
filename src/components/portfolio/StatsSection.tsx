import React from 'react';
import { useAnimatedCounter } from '@/hooks/useScrollReveal';
import { Briefcase, Code2, Clock, Award } from 'lucide-react';

const stats = [
  { icon: Clock, value: 8, suffix: '+', label: 'Years of Experience', color: 'from-blue-500 to-cyan-500' },
  { icon: Briefcase, value: 60, suffix: '+', label: 'Projects Delivered', color: 'from-purple-500 to-pink-500' },
  { icon: Code2, value: 24, suffix: '+', label: 'Technologies', color: 'from-emerald-500 to-teal-500' },
  { icon: Award, value: 100, suffix: '%', label: 'Client Satisfaction', color: 'from-orange-500 to-amber-500' },
];

const StatsSection: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Decorative line */}
      <div className="line-glow w-full mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard: React.FC<{ stat: typeof stats[0]; index: number }> = ({ stat, index }) => {
  const { count, ref } = useAnimatedCounter(stat.value);
  const Icon = stat.icon;

  return (
    <div
      ref={ref}
      className="relative group"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="glass rounded-2xl p-6 lg:p-8 text-center card-glow transition-all duration-500">
        {/* Icon */}
        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        {/* Counter */}
        <div className="text-3xl lg:text-4xl font-black text-white mb-1">
          {count}{stat.suffix}
        </div>
        
        {/* Label */}
        <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
      </div>
    </div>
  );
};

export default StatsSection;
