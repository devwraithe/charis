
interface TopSupporterCardProps {
    supporter: any;
}

function TopSupporterCard({
    supporter,
}: TopSupporterCardProps) {
    return (
        <div>
            <div key={supporter.id} className="flex items-center justify-between pb-3 pt-3 rounded-lg">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border rounded-full flex items-center justify-center text-lg">
                        <p className="text-sm font-semibold">{supporter.rank}</p>
                    </div>
                    <div className="flex flex-col items-start">
                        <p className="text-white text-sm mb-1">{supporter.name}</p>
                        <p className="flex items-center gap-1 text-gray-400 text-xs">2n6Gb...2blU9a</p>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <p className="text-green-400 text-sm mb-1">{supporter.amount}</p>
                    <p className="flex items-center gap-1 text-gray-400 text-xs">Total Tips: {supporter.totalTips}</p>
                </div>
            </div>
        </div>
    );
}

export default TopSupporterCard;