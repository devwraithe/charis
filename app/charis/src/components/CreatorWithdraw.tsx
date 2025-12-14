"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Spinner from "./ui/Spinner";
import { useWithdrawTips } from "@/hooks/useWithdrawTips";

function CreatorWithdraw() {
    const [amount, setAmount] = useState("");
    const { withdrawTips, loading } = useWithdrawTips();

    const handleWithdraw = async () => {
        const withdrawAmount = parseFloat(amount);
        if (!withdrawAmount || withdrawAmount <= 0) return;

        await withdrawTips(withdrawAmount);
        setAmount("");
    };

    const isButtonDisabled = loading || !amount || Number(amount) <= 0;

    return (
        <div className="bg-card border rounded-xl p-6 text-left flex-1">
            <div className="space-y-4">
                <div className="flex flex-col">
                    <label className="text-sm text-gray-400 mb-2">
                        Amount to Withdraw (SOL)
                    </label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        min="0"
                        className="text-sm w-full px-4 py-3 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
                    />
                </div>

                <button
                    onClick={handleWithdraw}
                    disabled={isButtonDisabled}
                    className={`w-full px-4 py-3 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors
            ${!isButtonDisabled
                            ? "bg-white text-black hover:bg-gray-100"
                            : "bg-zinc-800 text-neutral-300 hover:bg-gray-700/50"
                        }
          `}
                >
                    {loading ? (
                        <>
                            <Spinner />
                            Withdrawing SOL...
                        </>
                    ) : (
                        <>
                            Withdraw {amount || "0"} SOL
                            <ArrowRight size={16} />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default CreatorWithdraw;
