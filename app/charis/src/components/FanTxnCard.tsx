import { User } from "lucide-react";

interface FanTxnCardProps {
    activity: any;
}

function FanTxnCard({
    activity,
}: FanTxnCardProps) {
    return (
        <div>
            <div key={activity.id} className="flex items-center justify-between pb-3 pt-3 rounded-lg">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border rounded-full flex items-center justify-center text-lg">
                        <User size={20} />
                    </div>
                    <div>
                        <p className="text-white text-sm mb-1">{activity.creator}</p>
                        <p className="flex items-center gap-1 text-gray-400 text-xs">{activity.time}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <p className="text-green-400 text-sm mb-1">{activity.amount}</p>
                    <p className="flex items-center gap-1 text-gray-400 text-xs">2n6Gb...lU9a</p>
                </div>
            </div>
        </div>
    );
}

export default FanTxnCard;