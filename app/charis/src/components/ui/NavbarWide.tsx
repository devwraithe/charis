import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import WalletConnected from "./WalletConnected";
import GoHome from "./GoHome";
import { useFanStats } from "@/hooks/useFanStats";

interface Props {
    title: string;
}

function NavbarWide({ title }: Props) {
    const { connected, publicKey } = useWallet();
    const { stats } = useFanStats();


    return (
        <nav className="bg-card border rounded-xl mb-6 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-0 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                <h1 className="text-xl sm:text-2xl font-light tracking-tight text-white truncate w-full sm:w-auto">
                    {title}
                </h1>

                {!connected ? (
                    <div className="w-full sm:w-auto">
                        <WalletMultiButton className="w-full sm:w-auto" />
                    </div>
                ) : (
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto items-start sm:items-center">
                        <p className='text-sm font-light text-gray-400 mr-4'>Wallet Balance: {stats?.walletBalance.toFixed(2)} SOL</p>
                        {publicKey && <WalletConnected address={publicKey.toBase58()} />}
                        <GoHome />
                    </div>
                )}
            </div>
        </nav>
    );
}

export default NavbarWide;