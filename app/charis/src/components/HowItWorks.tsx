import { Wallet, Search, Zap } from 'lucide-react';
import SectionCard from './SectionCard';
import FeatureCard from './FeatureCard';

interface Step {
    number: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    gradient: string;
}

function HowItWorks() {
    const iconSize = 20;

    const steps: Step[] = [
        {
            number: '01',
            icon: <Wallet size={iconSize} />,
            title: 'Connect Your Wallet',
            description: 'Link your Solana wallet in seconds using Phantom, Solflare, or any supported wallet.',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            number: '02',
            icon: <Search size={iconSize} />,
            title: 'Find Your Creator',
            description: 'Browse through thousands of talented creators or search for your favorites directly.',
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            number: '03',
            icon: <Zap size={iconSize} />,
            title: 'Send a Tip',
            description: 'Tap once to send instant support. Fast, secure, and frictionless—just the way it should be.',
            gradient: 'from-green-500 to-emerald-500'
        }
    ];

    return (
        <SectionCard title="How Charis works" children={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {steps.map((step, index) => (
                    <FeatureCard title={step.title} description={step.description} icon={step.icon} key={index} />
                ))}
            </div>
        } />
    );

    // return (
    //     <section className="mx-6 mt-6 py-12 px-4 bg-card border rounded-xl">

    //         <div className="max-w-7xl mx-auto relative z-10">
    //             {/* Section Header */}
    //             <div className="text-center mb-16">
    //                 <div className="inline-block mb-4">
    //                     <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-sm font-semibold">
    //                         Simple Process
    //                     </span>
    //                 </div>
    //                 <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
    //                     How It{' '}
    //                     <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
    //                         Works
    //                     </span>
    //                 </h2>
    //                 <p className="text-xl text-gray-400 max-w-2xl mx-auto">
    //                     Start tipping your favorite creators in three simple steps
    //                 </p>
    //             </div>

    //             {/* Steps Grid */}
    //             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
    //                 {steps.map((step, index) => (
    //                     <div key={index} className="relative">
    //                         {/* Connecting Arrow (Desktop only) */}
    //                         {index < steps.length - 1 && (
    //                             <div className="hidden md:block absolute top-20 -right-4 z-0">
    //                                 <ArrowRight className="w-8 h-8 text-gray-700" />
    //                             </div>
    //                         )}

    //                         {/* Step Card */}
    //                         <div className="relative bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-gray-600/50 hover:bg-gray-800/60 transition-all duration-300 hover:scale-105 group">
    //                             {/* Step Number */}
    //                             <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 rounded-xl flex items-center justify-center">
    //                                 <span className="text-gray-400 font-bold text-sm">{step.number}</span>
    //                             </div>

    //                             {/* Icon */}
    //                             <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg mx-auto`}>
    //                                 {step.icon}
    //                             </div>

    //                             {/* Title */}
    //                             <h3 className="text-2xl font-bold text-white mb-3 text-center">
    //                                 {step.title}
    //                             </h3>

    //                             {/* Description */}
    //                             <p className="text-gray-400 leading-relaxed text-center">
    //                                 {step.description}
    //                             </p>
    //                         </div>
    //                     </div>
    //                 ))}
    //             </div>

    //             {/* Bottom CTA */}
    //             <div className="mt-16 text-center">
    //                 <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 inline-flex items-center gap-2">
    //                     Start Tipping Now
    //                     <ArrowRight className="w-5 h-5" />
    //                 </button>
    //             </div>
    //         </div>
    //     </section>
    // );
}

export default HowItWorks;