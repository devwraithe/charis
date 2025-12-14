import FanTxnCard from "./FanTxnCard";

function FanRecents() {
    const recentActivity = [
        { id: 1, creator: 'Music Artist', amount: '0.5 SOL', time: '2024-10-02', avatar: '🎵' },
        { id: 2, creator: 'Digital Artist', amount: '0.25 SOL', time: '2024-10-02', avatar: '🎨' },
        { id: 3, creator: 'Game Streamer', amount: '1.0 SOL', time: '2024-10-02', avatar: '🎮' },
        { id: 4, creator: 'Tech Podcast', amount: '0.15 SOL', time: '2024-10-02', avatar: '🎙️' }, { id: 3, creator: 'Game Streamer', amount: '1.0 SOL', time: '2024-10-02', avatar: '🎮' },
    ];


    return (
        <div className="bg-card border rounded-xl py-4 px-5 flex-1">
            <div className="space-y-3">
                {recentActivity.map((activity) => (
                    <FanTxnCard activity={activity} />
                ))}
            </div>
        </div>
    );
}

export default FanRecents;