import { useEffect, useState } from 'react';
import { TrendingUp, Users, Coins, Zap } from 'lucide-react';

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  suffix: string;
  gradient: string;
}

function StatsSection() {
  const [counters, setCounters] = useState({
    tips: 0,
    creators: 0,
    volume: 0,
    speed: 0
  });

  const stats: Stat[] = [
    {
      icon: <Zap className="w-8 h-8" />,
      value: counters.tips.toLocaleString(),
      label: 'Tips Sent',
      suffix: '+',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: counters.creators.toLocaleString(),
      label: 'Active Creators',
      suffix: '+',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Coins className="w-8 h-8" />,
      value: counters.volume.toLocaleString(),
      label: 'SOL in Volume',
      suffix: 'K+',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: counters.speed.toFixed(2),
      label: 'Avg Transaction Speed',
      suffix: 's',
      gradient: 'from-blue-500 to-cyan-500'
    }
  ];

  // Animate counters on mount
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = duration / steps;

    const targets = {
      tips: 15420,
      creators: 3840,
      volume: 847,
      speed: 0.63
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        tips: Math.floor(targets.tips * progress),
        creators: Math.floor(targets.creators * progress),
        volume: Math.floor(targets.volume * progress),
        speed: targets.speed * progress
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, increment);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-300 text-sm font-semibold">
              Platform Impact
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            The Numbers{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Speak
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join thousands of creators and fans building the future of micro-tipping
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-gray-600/50 hover:bg-gray-800/60 transition-all duration-300 hover:scale-105 text-center"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {stat.icon}
              </div>

              {/* Value */}
              <div className="mb-2">
                <span className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </span>
                <span className={`text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <p className="text-gray-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-2">$2.4M+</h3>
            <p className="text-gray-300">Total Value Tipped</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-2">150+</h3>
            <p className="text-gray-300">Countries Reached</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-2">99.9%</h3>
            <p className="text-gray-300">Success Rate</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6 text-lg">
            Ready to become part of the movement?
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50">
            Join Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default StatsSection;