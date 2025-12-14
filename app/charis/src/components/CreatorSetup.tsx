import InitializeCreatorForm from "@/components/InitializeCreatorForm";
import NavbarWide from "./ui/NavbarWide";
import { NETWORK } from "@/config/connection";

interface CreatorSetupProps {
    onInitialize: (name: string, bio: string) => Promise<void>;
    loading: boolean;
    status: string | null;
    signature: string | null;
}

function CreatorSetup({
    onInitialize,
    loading,
    status,
    signature,
}: CreatorSetupProps) {
    const explorerUrl = signature
        ? `https://explorer.solana.com/tx/${signature}${NETWORK === "localnet" ? `?cluster=${NETWORK}` : ""
        }`
        : null;

    return (
        <div className="space-y-6 p-6">
            <NavbarWide title="Creator setup" />

            <div className="mx-auto max-w-2xl">
                <div className="space-y-6 rounded-xl border border-gray-700/50 bg-card p-8">
                    <div className="space-y-1 text-left">
                        <h2 className="text-2xl font-light text-white">
                            Welcome, creator
                        </h2>
                        <p className="text-sm font-light text-gray-400">
                            Set up your creator profile to start receiving SOL tips.
                        </p>
                    </div>

                    <InitializeCreatorForm
                        onInitialize={onInitialize}
                        loading={loading}
                        status={status}
                    />

                    {explorerUrl && (
                        <div className="pt-2 text-left">
                            <a
                                href={explorerUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-light text-blue-400 transition-colors hover:text-blue-300"
                            >
                                View transaction ↗
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreatorSetup;
