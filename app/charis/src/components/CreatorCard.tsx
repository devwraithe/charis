import type { CreatorProfile } from "@/hooks/useCreators";
import { useTipCreator } from "@/hooks/useTipCreator";
import { ArrowUpRight, User } from "lucide-react";
import { useState } from "react";
import Spinner from "@/components/ui/Spinner"; // Make sure you have a Spinner component

interface CreatorCardProps {
    creator: CreatorProfile;
    onSelectCreator?: (creatorAddress: string) => void;
    onSelectCreatorVault?: (vaultAddress: string) => void;
}

function CreatorCard({ creator, onSelectCreator, onSelectCreatorVault }: CreatorCardProps) {
    const { tipCreator } = useTipCreator();
    const [loadingButton, setLoadingButton] = useState<number | null>(null); // track which tip button is loading

    const handleTip = async (amount: number, buttonIndex: number) => {
        setLoadingButton(buttonIndex);
        try {
            await tipCreator(
                creator.creator.toBase58(),
                creator.vaultAddress.toBase58(),
                amount,
                "Quick tip from a fan"
            );
        } finally {
            setLoadingButton(null);
        }
    };

    return (
        <div className="border rounded-xl p-4 bg-card hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                    <div className="rounded-full border p-3 flex items-center justify-center">
                        <User size={22} className="text-white" />
                    </div>
                    <div className="flex flex-col items-start">
                        <h3 className="text-md text-white font-medium">{creator.name}</h3>
                        <p className="text-gray-400 text-sm">{creator.totalSupporters} Supporters</p>
                    </div>
                </div>

                <button
                    className="bg-white p-2 rounded-full hover:bg-gray-200 transition-colors"
                    onClick={() => {
                        onSelectCreatorVault?.(creator.vaultAddress.toBase58());
                        onSelectCreator?.(creator.creator.toBase58());
                    }}
                >
                    <ArrowUpRight size={20} className="text-black" />
                </button>
            </div>

            {/* Tip buttons */}
            <div className="flex gap-3 mt-5 flex-wrap">
                {[0.001, 1].map((amount, idx) => (
                    <button
                        key={amount}
                        className="flex-1 px-3 py-2 text-xs sm:text-sm bg-zinc-800 hover:bg-gray-700/50 text-neutral-300 rounded-md transition-colors flex items-center justify-center"
                        onClick={() => handleTip(amount, idx)}
                        disabled={loadingButton !== null}
                    >
                        {loadingButton === idx ? <Spinner /> : `Send ${amount} SOL`}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default CreatorCard;
