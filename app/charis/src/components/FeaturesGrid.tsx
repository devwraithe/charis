import { Zap, DollarSign, Lock, Globe, Smartphone, Coins, Users, TrendingUp, Shield } from 'lucide-react';
import FeatureCard from './FeatureCard';
import SectionCard from './SectionCard';

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
    gradient: string;
}

function FeaturesGrid() {

    const iconSize = 20;

    const features: Feature[] = [
        {
            icon: <Zap size={iconSize} />,
            title: 'Lightning Fast',
            description: 'Send tips in under a second with Solana\'s ultra-fast blockchain technology.',
            gradient: 'from-yellow-500 to-orange-500'
        },
        {
            icon: <DollarSign size={iconSize} />,
            title: 'Minimal Fees',
            description: 'Pay less than a cent per transaction. More value goes directly to creators.',
            gradient: 'from-green-500 to-emerald-500'
        },
        {
            icon: <Lock size={iconSize} />,
            title: 'Secure & Private',
            description: 'Your keys, your control. We never hold your funds or personal information.',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            icon: <Globe size={iconSize} />,
            title: 'Global Reach',
            description: 'Support creators anywhere in the world without borders or restrictions.',
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            icon: <Smartphone size={iconSize} />,
            title: 'Mobile Friendly',
            description: 'Optimized for mobile devices. Tip on the go with one tap from anywhere.',
            gradient: 'from-pink-500 to-rose-500'
        },
        {
            icon: <Coins size={iconSize} />,
            title: 'Any Amount',
            description: 'Send tips as small as a fraction of a cent or as large as you want.',
            gradient: 'from-indigo-500 to-purple-500'
        },
        {
            icon: <Users size={iconSize} />,
            title: 'Community Driven',
            description: 'Join thousands of fans and creators building the future of micro-tipping.',
            gradient: 'from-red-500 to-orange-500'
        },
        {
            icon: <TrendingUp size={iconSize} />,
            title: 'Creator Analytics',
            description: 'Track your earnings and supporter growth with detailed insights.',
            gradient: 'from-teal-500 to-green-500'
        },
        {
            icon: <Shield size={iconSize} />,
            title: 'Non-Custodial',
            description: 'Complete ownership and control of your digital assets at all times.',
            gradient: 'from-violet-500 to-purple-500'
        }
    ];

    return (
        <SectionCard title="Why choose Charis?" children={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <FeatureCard title={feature.title} description={feature.description} icon={feature.icon} key={index} />
                ))}
            </div>
        } />
    );
}

export default FeaturesGrid;