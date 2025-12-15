interface WalletConnectedProps {
    address: string;
}

function WalletConnected({ address }: WalletConnectedProps) {
    // Format address to show first 4 and last 4 characters
    const formatAddress = (addr: string): string => {
        if (!addr || addr.length < 8) return addr;
        return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
    };

    return (
        <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-md">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-light text-gray-300 tracking-wide">
                {formatAddress(address)}
            </span>
        </div>
    );
}

export default WalletConnected;