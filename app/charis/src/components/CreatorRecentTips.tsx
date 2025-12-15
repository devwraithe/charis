import { useTipRecords } from "@/hooks/useTipRecord";
import CreatorTxnCard from "./CreatorTxnCard";

function CreatorRecentTips() {
    const { records, error } = useTipRecords();

    if (error)
        return (
            <div className="flex items-center justify-center p-6 bg-card border rounded-2xl text-red-500">
                Error: {error}
            </div>
        );

    return (
        <div className="flex flex-col bg-card border rounded-2xl px-6 py-3 flex-2">
            {records.length === 0 ? (
                <p className="text-gray-400 text-center">No tips yet</p>
            ) : (
                <div className="gap-4">
                    {records.map((record) => (
                        <CreatorTxnCard
                            key={record.address.toBase58()}
                            tip={{
                                ...record,
                                creator: record.creator.toBase58(),
                                creatorVault: record.creatorVault.toBase58(),
                                fan: record.fan.toBase58(),
                                address: record.address.toBase58(),
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CreatorRecentTips;
