import { MAX_TIP_AMOUNT, MIN_TIP_AMOUNT } from '@/config/constants';
import { useTipCreator } from '@/hooks/useTipCreator';
import { PublicKey } from '@solana/web3.js';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Spinner from './ui/Spinner';

interface TipCreatorProps {
    creatorAddress?: string;
    vaultAddress?: string;
}

function TipCreator({ creatorAddress, vaultAddress }: TipCreatorProps) {
    const [creator, setCreator] = useState(creatorAddress || "");
    const [vault, setVault] = useState(vaultAddress || "");
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const { tipCreator, loading } = useTipCreator();
    const [isValidAddress, setIsValidAddress] = useState(false);

    useEffect(() => {
        if (creatorAddress) setCreator(creatorAddress);
        if (vaultAddress) setVault(vaultAddress);
    }, [creatorAddress, vaultAddress]);

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setVault(value);
        try {
            new PublicKey(value);
            setIsValidAddress(true);
        } catch {
            setIsValidAddress(false);
        }
    };

    const handleTip = async () => {
        if (!isValidAddress) return;
        const tipAmount = parseFloat(amount);
        if (tipAmount < MIN_TIP_AMOUNT || tipAmount > MAX_TIP_AMOUNT) return;
        await tipCreator(creator, vault, tipAmount, message);
    };

    const isButtonDisabled = loading || !isValidAddress || !amount;

    return (
        <div className="bg-card border rounded-xl p-6 text-left">
            <div className="space-y-4">
                <div className="flex flex-col">
                    <label className="text-sm text-gray-400 mb-2">Vault Address</label>
                    <input
                        type="text"
                        value={vault}
                        onChange={handleAddressChange}
                        placeholder="Enter creator's public key"
                        className="text-sm w-full px-4 py-3 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm text-gray-400 mb-2">Amount (SOL)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="text-sm w-full px-4 py-3 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm text-gray-400 mb-2">Message (Optional)</label>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Add a message..."
                        className="text-sm w-full px-4 py-3 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
                    />
                </div>

                <button
                    onClick={handleTip}
                    disabled={isButtonDisabled}
                    className={`w-full px-4 py-3 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors
            ${isValidAddress && amount && !loading ? 'bg-white text-black hover:bg-gray-100' : 'bg-zinc-800 text-neutral-300 hover:bg-gray-700/50'}
          `}
                >
                    {loading ? (
                        <>
                            <Spinner />
                            Sending SOL...
                        </>
                    ) : (
                        <>
                            Tip {amount} SOL
                            <ArrowRight size={16} />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default TipCreator;
