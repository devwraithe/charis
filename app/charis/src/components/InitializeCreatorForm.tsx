import { useState } from "react";
import { toast } from "sonner";

interface InitializeCreatorFormProps {
    onInitialize: (name: string, bio: string) => Promise<void>;
    loading: boolean;
    status: string | null;
}

function InitializeCreatorForm({
    onInitialize,
    loading,
    status,
}: InitializeCreatorFormProps) {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");

    const isDisabled = loading || !name.trim() || !bio.trim();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isDisabled) {
            toast.error("Please fill in all fields");
            return;
        }

        await onInitialize(name.trim(), bio.trim());
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div className="space-y-2">
                <label className="text-sm font-light text-gray-400">
                    Creator name
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name or brand"
                    disabled={loading}
                    maxLength={50}
                    className="mt-2 w-full rounded-md border border-gray-700/50 bg-gray-900/50 px-4 py-3 text-sm font-light text-white placeholder-gray-500 focus:border-gray-600 focus:outline-none transition-colors"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-light text-gray-400">
                    Bio
                </label>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell your supporters about yourself..."
                    rows={4}
                    disabled={loading}
                    maxLength={200}
                    className="mt-2 w-full resize-none rounded-lg border border-gray-700/50 bg-gray-900/50 px-4 py-3 text-sm font-light text-white placeholder-gray-500 focus:border-gray-600 focus:outline-none transition-colors"
                />
                <p className="text-xs font-light text-gray-500">
                    {bio.length}/200 characters
                </p>
            </div>

            {status && (
                <p className="text-sm font-light text-gray-400">{status}</p>
            )}

            <button
                type="submit"
                disabled={isDisabled}
                className={`w-full rounded-xl px-6 py-3 text-sm font-light transition-colors
                ${isDisabled
                        ? "cursor-not-allowed bg-gray-800/50 text-gray-600"
                        : "border border-gray-700/50 bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-900"
                    }
        `}>
                {loading ? "Initializing..." : "Create creator profile"}
            </button>
        </form>
    );
}

export default InitializeCreatorForm;
