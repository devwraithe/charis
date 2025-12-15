import { useState } from 'react';
import { Wallet, TrendingUp, Users, DollarSign, Clock } from 'lucide-react';

function CreatorArchivePage() {
    const [walletAddress] = useState('7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU');
    const [copied, setCopied] = useState(false);

    const handleCopyWallet = () => {
        navigator.clipboard.writeText(walletAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Mock data
    const stats = [
        {
            icon: <DollarSign className="w-6 h-6" />,
            label: 'Total Earnings',
            value: '47.8 SOL',
            subValue: '$8,604',
            gradient: 'from-green-500 to-emerald-500'
        },
        {
            icon: <Users className="w-6 h-6" />,
            label: 'Total Supporters',
            value: '1,247',
            subValue: '+89 this month',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            label: 'Tips This Month',
            value: '8.4 SOL',
            subValue: '+24% vs last month',
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            icon: <Wallet className="w-6 h-6" />,
            label: 'Average Tip',
            value: '0.038 SOL',
            subValue: '$6.84',
            gradient: 'from-orange-500 to-red-500'
        }
    ];

    const recentTips = [
        { id: 1, supporter: 'CryptoFan92', amount: '0.5 SOL', time: '2 minutes ago', avatar: '🎵' },
        { id: 2, supporter: 'Web3Believer', amount: '0.25 SOL', time: '15 minutes ago', avatar: '🚀' },
        { id: 3, supporter: 'SolanaLover', amount: '1.0 SOL', time: '1 hour ago', avatar: '⭐' },
        { id: 4, supporter: 'TipMaster', amount: '0.15 SOL', time: '2 hours ago', avatar: '💎' },
        { id: 5, supporter: 'GenerousFan', amount: '0.75 SOL', time: '3 hours ago', avatar: '🎨' },
        { id: 6, supporter: 'MusicLover', amount: '0.3 SOL', time: '5 hours ago', avatar: '🎧' }
    ];

    const monthlyData = [
        { month: 'Jan', amount: 5.2 },
        { month: 'Feb', amount: 6.8 },
        { month: 'Mar', amount: 4.5 },
        { month: 'Apr', amount: 7.1 },
        { month: 'May', amount: 8.4 }
    ];

    const maxAmount = Math.max(...monthlyData.map(d => d.amount));

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
            {/* Header Section */}
            <div className="bg-gray-900 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                                🎵
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">Music Artist</h1>
                                <p className="text-gray-400">@musicartist_sol</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button>
                                View Public Profile
                            </button>
                            <button>
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Wallet Address */}
                    <div className="mt-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 flex items-center justify-between gap-4 flex-wrap">
                        <div>
                            <p className="text-gray-400 text-sm mb-1">Your Tipping Address</p>
                            <p className="text-white font-mono text-sm">{walletAddress.slice(0, 20)}...{walletAddress.slice(-10)}</p>
                        </div>
                        <button
                            onClick={handleCopyWallet}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-300"
                        >
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 shadow-lg`}>
                                {stat.icon}
                            </div>
                            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                            <p className="text-gray-500 text-xs">{stat.subValue}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Tips */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">Recent Tips</h2>
                                <button className="text-purple-400 hover:text-purple-300 text-sm font-semibold">
                                    View All
                                </button>
                            </div>
                            <div className="space-y-4">
                                {recentTips.map((tip) => (
                                    <div
                                        key={tip.id}
                                        className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-200"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-xl">
                                                {tip.avatar}
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold">{tip.supporter}</p>
                                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{tip.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-green-400 font-bold">{tip.amount}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Monthly Earnings Chart */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Monthly Earnings</h2>
                            <div className="space-y-4">
                                {monthlyData.map((data, index) => (
                                    <div key={index}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-gray-400 text-sm">{data.month}</span>
                                            <span className="text-white font-semibold">{data.amount} SOL</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${(data.amount / maxAmount) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-6 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                            <div className="space-y-3">
                                <button className="w-full px-4 py-3 bg-gray-700/50 hover:bg-gray-700 text-white rounded-lg text-left transition-all duration-200">
                                    💳 Withdraw Funds
                                </button>
                                <button className="w-full px-4 py-3 bg-gray-700/50 hover:bg-gray-700 text-white rounded-lg text-left transition-all duration-200">
                                    📊 View Analytics
                                </button>
                                <button className="w-full px-4 py-3 bg-gray-700/50 hover:bg-gray-700 text-white rounded-lg text-left transition-all duration-200">
                                    ⚙️ Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Supporters Section */}
                <div className="mt-8 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Top Supporters This Month</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { rank: 1, name: 'CryptoWhale', amount: '5.2 SOL', avatar: '🐋', badge: '🥇' },
                            { rank: 2, name: 'GenerousFan', amount: '3.8 SOL', avatar: '💎', badge: '🥈' },
                            { rank: 3, name: 'MusicLover', amount: '2.4 SOL', avatar: '🎧', badge: '🥉' }
                        ].map((supporter) => (
                            <div
                                key={supporter.rank}
                                className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-200"
                            >
                                <div className="relative">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl">
                                        {supporter.avatar}
                                    </div>
                                    <span className="absolute -top-1 -right-1 text-2xl">{supporter.badge}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-white font-semibold">{supporter.name}</p>
                                    <p className="text-green-400 font-bold text-sm">{supporter.amount}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatorArchivePage;