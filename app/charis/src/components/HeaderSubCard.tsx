import { useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { Clipboard, Check } from "lucide-react";

interface HeaderSubCardProps {
    title: string;
    value: string | number | PublicKey;
    icon?: React.ReactNode;
    showCopy?: boolean;
    className?: string;

}

function HeaderSubCard({ title, value, icon, showCopy = false, className }: HeaderSubCardProps) {
    const [copied, setCopied] = useState(false);

    const displayValue = (() => {
        if (value instanceof PublicKey) {
            const address = value.toBase58();
            return `${address.slice(0, 6)}...${address.slice(-6)}`;
        }
        if (typeof value === "number") {
            return value.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            });
        }
        return value;
    })();

    const handleCopy = () => {
        const textToCopy = value instanceof PublicKey ? value.toBase58() : value.toString();
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    };

    return (
        <div className={`flex flex-1 items-center justify-between bg-card border rounded-xl px-4 py-3 sm:px-5 sm:py-4 ${className || ""}`}>
            <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 border rounded-full flex-shrink-0">
                    {icon}
                </div>
                <div className="flex flex-col text-left">
                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-400">{title}</p>
                    <p className="text-sm sm:text-base md:text-lg text-white font-light truncate">
                        {displayValue}
                    </p>
                </div>
            </div>

            {showCopy && (
                <button
                    onClick={handleCopy}
                    className="p-2 sm:p-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-center flex-shrink-0"
                >
                    {copied ? (
                        <Check className="w-4 h-4 text-green-400" />
                    ) : (
                        <Clipboard className="w-4 h-4 text-white" />
                    )}
                </button>
            )}
        </div>
    );
}

export default HeaderSubCard;
