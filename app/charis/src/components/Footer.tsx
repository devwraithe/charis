import { Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="m-6 bg-card border rounded-xl p-6">
            <div className="max-w-7xl mx-auto flex flex-row items-center justify-between">
                <div className="text-left">
                    <h3 className="text-3xl font-light text-white tracking-tight">
                        Charis
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                        Instant micro-tipping for creators
                    </p>
                </div>
                <a
                    href="https://github.com/devwraithe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-card border rounded-xl hover:bg-gray-800 transition-colors"
                    aria-label="Visit our GitHub"
                >
                    <Github className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
                </a>
            </div>
        </footer>
    );
}