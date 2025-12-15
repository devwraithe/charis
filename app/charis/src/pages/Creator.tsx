import { useWallet } from "@solana/wallet-adapter-react";

import NavbarWide from "@/components/ui/NavbarWide";
import CreatorHeader from "@/components/CreatorHeader";
import CreatorStats from "@/components/CreatorStats";
import CreatorRecentTips from "@/components/CreatorRecentTips";
import CreatorWithdraw from "@/components/CreatorWithdraw";
import LoadingState from "@/components/LoadingState";
import NoWalletConnected from "@/components/NoWalletConnected";

function CreatorPage() {
    const { connected, connecting } = useWallet();

    // Show loading while wallet is connecting
    if (connecting) return <LoadingState message="Connecting wallet..." />;

    // Show wallet prompt if not connected
    if (!connected) return <NoWalletConnected />;

    // Main Creator Dashboard
    return (
        <div className="min-h-screen p-4 lg:p-6 space-y-6 bg-background">
            <NavbarWide title="Creator Dashboard" />

            {/* Header & Stats */}
            <div className="space-y-6">
                <CreatorHeader />
                <CreatorStats />
            </div>

            {/* Tips & Withdraw Section */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:space-x-6">
                <div className="flex-1">
                    <CreatorRecentTips />
                </div>
                <div className="w-full lg:w-80 flex-shrink-0">
                    <CreatorWithdraw />
                </div>
            </div>
        </div>
    );
}

export default CreatorPage;
