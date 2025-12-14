import { useCallback, useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { toast } from "sonner";
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

  const fetchProfile = useCallback(async () => {
    if (!program) {
      toast.warning("Program must be initialized.");
      setProfile(null);
      return;
    }

    if (!creatorAddress) {
      setProfile(null);
      setError("No creator address provided");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const creator =
        typeof creatorAddress === "string"
          ? new PublicKey(creatorAddress)
          : creatorAddress;

      const [profilePda] = getCreatorProfilePda(creator, program.programId);
      const account = await program.account.creatorProfile.fetch(profilePda);

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
      setProfile(null);
      setError(err.message ?? "Failed to fetch profile");
      toast.error("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  }, [program, creatorAddress]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error, refetch: fetchProfile };
}
