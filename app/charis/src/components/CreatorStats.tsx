import { DollarSign, TrendingUp, Users, Wallet } from "lucide-react";
import StatCard from "./StatCard";
import { useCreatorStats } from "@/hooks/useCreatorStats";
import { useWallet } from "@solana/wallet-adapter-react";

function CreatorStats() {
    const iconSize = 20;
    const { publicKey } = useWallet();
    const creatorAddress = publicKey?.toBase58();

    const { statistics } = useCreatorStats(creatorAddress);

    return (
        <section className="flex flex-col sm:flex-row sm:flex-wrap gap-4 md:gap-6 justify-between mb-6 w-full">
            <StatCard
                title="Total Earnings"
                value={`${statistics?.totalEarnings.toFixed(2) || 0} SOL`}
                icon={<DollarSign size={iconSize} />}
                className="flex-1 min-w-[180px]"
            />
            <StatCard
                title="Total Supporters"
                value={`${statistics?.totalSupporters || 0}`}
                icon={<Users size={iconSize} />}
                className="flex-1 min-w-[180px]"
            />
            <StatCard
                title="This Month"
                value={`${statistics?.tipsThisMonth.toFixed(2) || 0} SOL`}
                icon={<TrendingUp size={iconSize} />}
                className="flex-1 min-w-[180px]"
            />
            <StatCard
                title="Average Tip"
                value={`${statistics?.averageTip.toFixed(2) || 0} SOL`}
                icon={<Wallet size={iconSize} />}
                className="flex-1 min-w-[180px]"
            />
        </section>
    );

}

export default CreatorStats;