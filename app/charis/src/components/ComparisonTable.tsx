import { Check, X } from 'lucide-react';

interface ComparisonItem {
    feature: string;
    solana: string | boolean;
    creditCard: string | boolean;
    ethereum: string | boolean;
}

function ComparisonTable() {

    const comparison: ComparisonItem[] = [
        {
            feature: 'Transaction Speed',
            solana: '< 1 second',
            creditCard: '2-3 days settlement',
            ethereum: '15+ seconds'
        },
        {
            feature: 'Transaction Fee',
            solana: '$0.00025',
            creditCard: '2.9% + $0.30',
            ethereum: '$2-50+'
        },
        {
            feature: 'Micro-payments',
            solana: true,
            creditCard: false,
            ethereum: false
        },
        {
            feature: 'Global Access',
            solana: true,
            creditCard: false,
            ethereum: true
        },
        {
            feature: 'Instant Settlement',
            solana: true,
            creditCard: false,
            ethereum: false
        }
    ];

    return (
        <div className="bg-card border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-center p-6 text-gray-400 font-light">Feature</th>
                            <th className="text-center p-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-lg">
                                    <span className="text-neutral-300 font-light">Solana</span>
                                </div>
                            </th>
                            <th className="text-center p-6 text-gray-400 font-light">Credit Cards</th>
                            <th className="text-center p-6 text-gray-400 font-light">Ethereum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comparison.map((item, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-700/30 hover:bg-gray-800/30 transition-colors"
                            >
                                <td className="p-6 text-white font-light">{item.feature}</td>
                                <td className="p-6 text-center">
                                    {typeof item.solana === 'boolean' ? (
                                        item.solana ? (
                                            <div className="inline-flex items-center justify-center w-8 h-8 bg-green-500/20 rounded-full">
                                                <Check size={18} className="text-green-400" />
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center justify-center w-8 h-8 bg-red-500/20 rounded-full">
                                                <X size={18} className="text-red-400" />
                                            </div>
                                        )
                                    ) : (
                                        <span className="text-green-400 font-light">{item.solana}</span>
                                    )}
                                </td>
                                <td className="p-6 text-center">
                                    {typeof item.creditCard === 'boolean' ? (
                                        item.creditCard ? (
                                            <div className="inline-flex items-center justify-center w-8 h-8 bg-green-500/20 rounded-full">
                                                <Check size={18} className="text-green-400" />
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center justify-center w-8 h-8 bg-red-500/20 rounded-full">
                                                <X size={18} className="text-red-400" />
                                            </div>
                                        )
                                    ) : (
                                        <span className="text-gray-400">{item.creditCard}</span>
                                    )}
                                </td>
                                <td className="p-6 text-center">
                                    {typeof item.ethereum === 'boolean' ? (
                                        item.ethereum ? (
                                            <div className="inline-flex items-center justify-center w-8 h-8 bg-green-500/20 rounded-full">
                                                <Check size={18} className="text-green-400" />
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center justify-center w-8 h-8 bg-red-500/20 rounded-full">
                                                <X size={18} className="text-red-400" />
                                            </div>
                                        )
                                    ) : (
                                        <span className="text-gray-400">{item.ethereum}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ComparisonTable;