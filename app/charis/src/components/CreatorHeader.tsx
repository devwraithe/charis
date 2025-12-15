import { PiggyBank, Shield, User, Wallet } from "lucide-react";
import HeaderSubCard from "./HeaderSubCard";
import { useCreatorStats } from "@/hooks/useCreatorStats";
import { useProfileState } from "@/hooks/useProfileState";
import { useWallet } from "@solana/wallet-adapter-react";
import Button from "./ui/Button";

function CreatorHeader() {
    const { publicKey } = useWallet();
    const creatorAddress = publicKey?.toBase58();

    const { statistics } = useCreatorStats(creatorAddress);
    const { profile } = useProfileState(creatorAddress);

    return (
        <div className="flex flex-col bg-card border rounded-2xl p-6 w-full md:w-auto">
            {/* Top section: Profile + Buttons */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full">
                <div className="flex items-start md:items-center gap-4 w-full md:w-auto">
                    {/* User Avatar */}
                    <div className="bg-card border rounded-full p-4 flex items-center justify-center">
                        <User size={36} className="text-white" />
                    </div>
                    {/* Name and Bio */}
                    <div className="text-left flex-1">
                        <h1 className="text-2xl md:text-3xl font-light text-white mb-1 truncate">
                            {profile?.name || "Unknown"}
                        </h1>
                        <p className="text-gray-400 text-sm md:text-base truncate">{profile?.bio || "No bio available"}</p>
                    </div>
                </div>
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-3 md:mt-0">
                    <Button title="Withdraw Earnings" className="w-full sm:w-auto" />
                </div>
            </div>

            {/* Stats Section */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 w-full">
                <HeaderSubCard
                    icon={<Wallet size={20} />}
                    title="WALLET BALANCE"
                    value={`${statistics?.walletBalance.toFixed(2) || 0} SOL`}
                    className="flex-1"
                />
                <HeaderSubCard
                    icon={<PiggyBank size={20} />}
                    title="VAULT BALANCE"
                    value={`${statistics?.vaultBalance.toFixed(2) || 0} SOL`}
                    className="flex-1"
                />
                <HeaderSubCard
                    icon={<Shield size={20} />}
                    title="VAULT ADDRESS"
                    value={statistics?.vaultAddress || "Not Available"}
                    showCopy={true}
                    className="flex-1"
                />
            </div>
        </div>
    );

}

export default CreatorHeader;