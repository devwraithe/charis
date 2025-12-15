import { Calendar, Heart, TrendingUp, Users, Zap } from "lucide-react";
import StatCard from "./StatCard";
import { useFanStats } from "@/hooks/useFanStats";
import { formatDateWithOrdinal } from "@/lib/utils";

function FanStats() {
    const iconSize = 20;
    const { stats } = useFanStats();

    return (
        <section className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-between mb-6">
            <StatCard
                title="Total Tipped"
                value={`${stats?.totalAmountSent.toFixed(2) || 0} SOL`}
                icon={<Zap size={iconSize} />}
                className="flex-1 min-w-[160px] sm:min-w-[180px]"
            />
            <StatCard
                title="Tips Sent"
                value={(stats?.totalTipsSent || 0).toLocaleString()}
                icon={<TrendingUp size={iconSize} />}
                className="flex-1 min-w-[160px] sm:min-w-[180px]"
            />
            <StatCard
                title="Last Tip"
                value={stats?.lastTipAt
                    ? formatDateWithOrdinal(stats.lastTipAt)
                    : "—"}
                icon={<Calendar size={iconSize} />}
                className="flex-1 min-w-[160px] sm:min-w-[180px]"
            />
            <StatCard
                title="Biggest Tip"
                value={`${stats?.biggestTip.toFixed(2) || 0} SOL`}
                icon={<Heart size={iconSize} />}
                className="flex-1 min-w-[160px] sm:min-w-[180px]"
            />
        </section>
    );
}

export default FanStats;