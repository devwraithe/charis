"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import CreatorCard from "./CreatorCard";
import { useCreators } from "@/hooks/useCreators";

interface Props {
    setSelectedCreatorVault?: (vaultAddress: string) => void;
    setSelectedCreator?: (creatorAddress: string) => void;
}

function FanBrowse({ setSelectedCreatorVault, setSelectedCreator }: Props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory] = useState("All");
    const { creators } = useCreators();

    const filteredCreators = creators.filter((creator) => {
        const matchesSearch =
            creator.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            creator.bio?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === "All" || creator.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="flex flex-col flex-2 bg-card border rounded-2xl p-6">
            <div className="mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search creators..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCreators.length === 0 ? (
                    <p className="text-gray-400 col-span-full text-center">
                        No creators found.
                    </p>
                ) : (
                    filteredCreators.map((creator) => (
                        <CreatorCard key={creator.vaultAddress.toBase58()} creator={creator} onSelectCreatorVault={setSelectedCreatorVault} onSelectCreator={setSelectedCreator} />
                    ))
                )}
            </div>
        </div>
    );
}

export default FanBrowse;
