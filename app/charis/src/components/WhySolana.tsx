import { Check, X, Zap, DollarSign, Globe, Lock } from 'lucide-react';
import SectionCard from './SectionCard';
import FeatureCard from './FeatureCard';
import ComparisonTable from './ComparisonTable';


function WhySolana() {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: '400ms block times',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Ultra Low Fees',
      description: '$0.00025 per transaction',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Global Access',
      description: 'No borders or restrictions',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Secure',
      description: 'Decentralized & trustless',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <SectionCard title="Why Solana?" children={
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {features.map((feature, index) => (
            <FeatureCard title={feature.title} description={feature.description} icon={feature.icon} key={index} />
          ))}
        </div>
        <ComparisonTable />
      </div>
    } />
  );
}

export default WhySolana;