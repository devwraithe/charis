import FanStats from '@/components/FanStats';
import FanBrowse from '@/components/FanBrowse';
import TipCreator from '@/components/TipCreator';
import NavbarWide from '@/components/ui/NavbarWide';
import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import NoWalletConnected from '@/components/NoWalletConnected';

function FanPage() {
    const { connected } = useWallet();
    const [selectedCreatorVault, setSelectedCreatorVault] = useState("");
    const [selectedCreator, setSelectedCreator] = useState("");

    if (!connected) return <NoWalletConnected />;

    return (
        <div className="p-4 sm:p-6 space-y-6 min-h-screen">
            <NavbarWide title="Fan Dashboard" />

            <FanStats />

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* Browse creators */}
                <div className="flex flex-row items-start space-x-6 flex-2">
                    <FanBrowse
                        setSelectedCreatorVault={setSelectedCreatorVault}
                        setSelectedCreator={setSelectedCreator}
                    />
                </div>

                {/* Tip creator */}
                <div className="flex-1 space-y-6">
                    <TipCreator
                        creatorAddress={selectedCreator}
                        vaultAddress={selectedCreatorVault}
                    />
                </div>
            </div>
        </div>
    );
}

export default FanPage;
