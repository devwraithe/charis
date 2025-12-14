import { useEffect, useState } from 'react';
import { TrendingUp, Coins } from 'lucide-react';

interface Tip {
    id: number;
    sender: string;
    recipient: string;
    amount: string;
    timestamp: string;
    avatar: string;
}

function LiveTippingFeed() {
    const [tips, setTips] = useState<Tip[]>([
        {
            id: 1,
            sender: 'CryptoFan92',
            recipient: 'MusicArtist_Sol',
            amount: '0.5 SOL',
            timestamp: 'Just now',
            avatar: '🎵'
        },
        {
            id: 2,
            sender: 'Web3Believer',
            recipient: 'PodcastHost',
            amount: '0.25 SOL',
            timestamp: '2m ago',
            avatar: '🎙️'
        },
        {
            id: 3,
            sender: 'SolanaSupporter',
            recipient: 'DigitalArtist',
            amount: '1.0 SOL',
            timestamp: '5m ago',
            avatar: '🎨'
        },
        {
            id: 4,
            sender: 'TipMaster',
            recipient: 'GameStreamer',
            amount: '0.15 SOL',
            timestamp: '8m ago',
            avatar: '🎮'
        },
        {
            id: 5,
            sender: 'GenerousFan',
            recipient: 'ContentCreator',
            amount: '0.75 SOL',
            timestamp: '12m ago',
            avatar: '📹'
        }
    ]);

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % tips.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [tips.length]);

    return (
        <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-300 text-sm font-semibold">Live Activity</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Tipping{' '}
                        <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                            Happening Now
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Join thousands of fans supporting their favorite creators in real-time
                    </p>
                </div>

                {/* Live Feed Container */}
                <div className="max-w-4xl mx-auto">
                    {/* Featured Tip (Large) */}
                    <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-6 hover:border-gray-600/50 transition-all duration-300">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                                    {tips[currentIndex].avatar}
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">
                                        <span className="text-white font-semibold">{tips[currentIndex].sender}</span> tipped
                                    </p>
                                    <p className="text-xl text-white font-bold">{tips[currentIndex].recipient}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-2 justify-end mb-1">
                                    <Coins className="w-5 h-5 text-green-400" />
                                    <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                        {tips[currentIndex].amount}
                                    </span>
                                </div>
                                <p className="text-gray-500 text-sm">{tips[currentIndex].timestamp}</p>
                            </div>
                        </div>
                    </div>

                    {/* Recent Tips List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tips.slice(0, 4).map((tip, index) => (
                            <div
                                key={tip.id}
                                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-xl p-4 hover:border-gray-600/50 hover:bg-gray-800/50 transition-all duration-300"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-lg">
                                            {tip.avatar}
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold text-sm">{tip.sender}</p>
                                            <p className="text-gray-500 text-xs">→ {tip.recipient}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-green-400 font-bold text-sm">{tip.amount}</p>
                                        <p className="text-gray-600 text-xs">{tip.timestamp}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stats Bar */}
                    <div className="mt-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
                        <div className="flex items-center justify-center gap-8 flex-wrap">
                            <div className="text-center">
                                <div className="flex items-center gap-2 justify-center mb-1">
                                    <TrendingUp className="w-5 h-5 text-purple-400" />
                                    <span className="text-2xl font-bold text-white">247</span>
                                </div>
                                <p className="text-gray-400 text-sm">Tips Today</p>
                            </div>
                            <div className="w-px h-12 bg-gray-700"></div>
                            <div className="text-center">
                                <div className="flex items-center gap-2 justify-center mb-1">
                                    <Coins className="w-5 h-5 text-green-400" />
                                    <span className="text-2xl font-bold text-white">156.8 SOL</span>
                                </div>
                                <p className="text-gray-400 text-sm">Volume Today</p>
                            </div>
                            <div className="w-px h-12 bg-gray-700"></div>
                            <div className="text-center">
                                <span className="text-2xl font-bold text-white block mb-1">0.63s</span>
                                <p className="text-gray-400 text-sm">Avg. Speed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LiveTippingFeed;