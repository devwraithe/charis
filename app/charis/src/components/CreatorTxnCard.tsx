import { User } from "lucide-react";
import { PublicKey } from "@solana/web3.js";

export interface TipRecord {
    fan: PublicKey | string;
    creator: string,
    creatorVault: string,
    amount: number; // in SOL
    message: string;
    timestamp: Date;
    address: PublicKey | string;
}

interface CreatorTxnCardProps {
    tip: TipRecord;
}

function CreatorTxnCard({ tip }: CreatorTxnCardProps) {
    const fanAddress =
        typeof tip.fan === "string" ? tip.fan : tip.fan.toBase58();

    return (
        <div className="w-full py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                {/* Fan Info */}
                <div className="flex items-center gap-4">
                    <div className="p-3 border rounded-full flex items-center justify-center text-lg text-white">
                        <User size={22} />
                    </div>
                    <div className="flex flex-col items-start">
                        <p className="text-white text-md font-medium mb-1.5">
                            {fanAddress.slice(0, 6)}...{fanAddress.slice(-6)}
                        </p>
                        <p className="flex items-center gap-1 text-gray-400 text-xs">
                            Message: {tip.message || "No message available"}
                        </p>
                    </div>
                </div>

                {/* Tip Info */}
                <div className="text-right sm:text-left flex flex-col items-end sm:items-end gap-1">
                    <p className="text-green-400 text-md font-medium">{tip.amount} SOL</p>
                    <p className="flex items-center gap-1 text-gray-400 text-xs">
                        {tip.timestamp.toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                        ,{" "}
                        {tip.timestamp.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CreatorTxnCard;
