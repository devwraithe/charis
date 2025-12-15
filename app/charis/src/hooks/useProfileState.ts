import { useCallback, useEffect, useRef, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useProgram } from "./useProgram";
import { getCreatorProfilePda } from "@/lib/utils";

export interface ProfileState {
  creator: PublicKey;
  name: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  bump: number;
}

export function useProfileState(creatorAddress?: string | PublicKey) {
  const { program } = useProgram();

  const [profile, setProfile] = useState<ProfileState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cache and debouncing
  const cacheRef = useRef<Map<string, ProfileState>>(new Map());
  const lastFetchTimeRef = useRef<Map<string, number>>(new Map());
  const CACHE_DURATION = 30000; // 30 seconds

  const fetchProfile = useCallback(async () => {
    if (!program || !creatorAddress) return;

    const creator =
      typeof creatorAddress === "string"
        ? new PublicKey(creatorAddress)
        : creatorAddress;

    const creatorKey = creator.toBase58();
    const now = Date.now();
    const lastFetch = lastFetchTimeRef.current.get(creatorKey) || 0;

    // Return cached if still fresh
    if (cacheRef.current.has(creatorKey) && now - lastFetch < CACHE_DURATION) {
      setProfile(cacheRef.current.get(creatorKey)!);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const [profilePda] = getCreatorProfilePda(creator, program.programId);

      const account = await program.account.creatorProfile.fetchNullable(
        profilePda
      );

      if (!account) {
        setProfile(null);
        return;
      }

      const profileData: ProfileState = {
        creator: account.creator,
        name: account.name,
        bio: account.bio,
        createdAt: new Date(Number(account.createdAt) * 1000),
        updatedAt: new Date(Number(account.updatedAt) * 1000),
        isActive: account.isActive,
        bump: account.bump,
      };

      // Update cache
      cacheRef.current.set(creatorKey, profileData);
      lastFetchTimeRef.current.set(creatorKey, now);

      setProfile(profileData);
    } catch (err: any) {
      console.error("Failed to fetch profile:", err);
      setError(err.message ?? "Failed to fetch profile");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, [program, creatorAddress]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
  };
}
