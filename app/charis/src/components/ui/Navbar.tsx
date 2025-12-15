import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Disconnect from "./Disconnect";
import WalletConnected from "./WalletConnected";

function Navbar() {
    const { connected, publicKey, disconnect } = useWallet();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 mx-12 mt-12">
            <div className="bg-card/50 border rounded-xl backdrop-blur-md shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <h1 className="text-xl lg:text-2xl font-light tracking-tight text-white">Charis</h1>
                    {!connected ? (
                        <WalletMultiButton />) : (
                        <div className="flex flex-row gap-4">
                            {publicKey && (<WalletConnected address={publicKey.toBase58()} />)}
                            <Disconnect onClick={disconnect} />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;