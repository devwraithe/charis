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

  // Prevent duplicate fetches for the same creator
  const lastFetchedRef = useRef<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!program || !creatorAddress) return;

    const creator =
      typeof creatorAddress === "string"
        ? new PublicKey(creatorAddress)
        : creatorAddress;

    const creatorKey = creator.toBase58();

    // Avoid refetching same profile repeatedly
    if (lastFetchedRef.current === creatorKey) return;
    lastFetchedRef.current = creatorKey;

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

      setProfile({
        creator: account.creator,
        name: account.name,
        bio: account.bio,
        createdAt: new Date(Number(account.createdAt) * 1000),
        updatedAt: new Date(Number(account.updatedAt) * 1000),
        isActive: account.isActive,
        bump: account.bump,
      });
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
