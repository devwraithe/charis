import { useNavigate } from "react-router-dom";
import CreatorSetup from "@/components/CreatorSetup";
import { useInitializeCreator } from "@/hooks/useInitializeCreator";

function SetupCreator() {
    const navigate = useNavigate();
    const { initializeCreator, loading, status, signature } =
        useInitializeCreator();

    const goToDashboard = () => navigate("/creator");

    // Creator initialized successfully
    if (signature) {
        const explorerUrl = `https://explorer.solana.com/tx/${signature}`;

        return (
            <div className="p-6 flex justify-center items-center h-screen">
                <div className="bg-card border rounded-xl p-8 max-w-lg w-full space-y-6 text-center">
                    <h2 className="text-2xl font-light text-white">
                        Creator Profile Initialized!
                    </h2>
                    <p className="text-gray-400 font-light">
                        Your creator dashboard is ready. You can view the initialization
                        transaction or continue to your dashboard.
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row justify-center">
                        <a
                            href={explorerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-4 py-3 rounded-xl border border-gray-700/50 bg-gray-800 text-white text-sm font-light hover:bg-gray-700 active:bg-gray-900 transition-colors"
                        >
                            View Transaction
                        </a>

                        <button
                            onClick={goToDashboard}
                            className="flex-1 px-4 py-3 rounded-xl border border-gray-700/50 bg-white text-black text-sm font-light hover:bg-gray-100 active:bg-gray-200 transition-colors"
                        >
                            Continue to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Show the initialization form
    return (
        <CreatorSetup
            onInitialize={initializeCreator}
            loading={loading}
            status={status}
            signature={signature}
        />
    );
}

export default SetupCreator;
