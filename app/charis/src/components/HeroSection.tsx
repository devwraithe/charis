import { useNavigate } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { Sparkles, Palette, Heart } from "lucide-react";

import { useCheckVault } from "@/hooks/useCheckVault";

function HeroSection() {
    const navigate = useNavigate();
    const { connected } = useWallet();
    const { checkingVault, hasVault } = useCheckVault();

    /**
     * Navigation handlers
     */
    const goToFan = () => navigate("/fan");
    const goToCreatorDashboard = () => navigate("/creator");
    const goToCreatorSetup = () => navigate("/setup");

    /**
     * Creator CTA logic
     */
    const handleCreatorClick = () => {
        if (!connected) return;

        if (hasVault) {
            goToCreatorDashboard();
        } else {
            goToCreatorSetup();
        }
    };

    const creatorDisabled = !connected || checkingVault;

    return (
        <div className="h-screen p-4 md:p-6 text-left">
            <div className="relative h-full overflow-hidden rounded-xl border bg-card shadow-2xl">
                {/* Content */}
                <div className="absolute bottom-16 left-6 right-6 md:bottom-24 md:left-10 lg:left-16 max-w-4xl">
                    {/* Badge */}
                    <div className="mb-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-gray-700/40 bg-gray-900/40 px-6 py-3 backdrop-blur-md">
                            <Sparkles size={18} className="text-gray-400" />
                            <span className="text-sm font-light tracking-wide text-gray-400">
                                Powered by Solana
                            </span>
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="mb-4 text-4xl font-light leading-[1.1] tracking-tight text-white md:text-5xl lg:text-7xl">
                        Support favourite creators.
                    </h1>

                    {/* Tagline */}
                    <p className="mb-4 text-xl font-light tracking-tight text-gray-300 md:text-2xl lg:text-3xl">
                        Decentralized SOL Tips on Solana
                    </p>

                    {/* Description */}
                    <p className="mb-10 max-w-2xl text-sm font-light leading-relaxed text-gray-400/90 md:text-base lg:text-lg">
                        Join a community of fans supporting creators with instant micro-tips
                        on Solana.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col gap-3 sm:flex-row">
                        {/* Creator */}
                        <button
                            disabled={creatorDisabled}
                            onClick={handleCreatorClick}
                            className={`group flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-light backdrop-blur-sm transition-all md:px-7 md:py-3.5 md:text-base ${creatorDisabled
                                ? "cursor-not-allowed border border-gray-800/30 bg-gray-900/30 text-gray-600 opacity-50"
                                : "border border-gray-700/50 bg-gray-800/80 text-white shadow-lg hover:border-gray-600 hover:bg-gray-700/90 hover:shadow-xl active:bg-gray-900"
                                }`}
                        >
                            <Palette
                                className={`h-4 w-4 transition-transform duration-300 ${!creatorDisabled ? "group-hover:rotate-12" : ""
                                    }`}
                            />
                            {checkingVault ? "Checking creator status..." : "I'm a creator"}
                        </button>

                        {/* Fan */}
                        <button
                            disabled={!connected}
                            onClick={connected ? goToFan : undefined}
                            className={`group flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-light backdrop-blur-sm transition-all md:px-7 md:py-3.5 md:text-base ${connected
                                ? "border border-gray-700/50 bg-card text-white hover:border-gray-600/70 hover:bg-gray-800/40 active:bg-gray-800/60"
                                : "cursor-not-allowed border border-gray-800/30 bg-gray-900/30 text-gray-600 opacity-50"
                                }`}
                        >
                            <Heart
                                className={`h-4 w-4 transition-transform duration-300 ${connected ? "group-hover:scale-110" : ""
                                    }`}
                            />
                            I'm a fan
                        </button>
                    </div>
                </div>

                {/* Gradient overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-black/10 via-transparent to-transparent" />
            </div>
        </div>
    );
}

export default HeroSection;
