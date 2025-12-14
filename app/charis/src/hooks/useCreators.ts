import { useCallback, useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useProgram } from "./useProgram";
import { getCreatorProfilePda, getVaultPda } from "@/lib/utils";

export interface CreatorProfile {
  creator: PublicKey;
  vaultAddress: PublicKey;
  totalEarnings: number; // in SOL
  totalSupporters: number;
  tipsThisMonth: number;
  lastTipAt: number;
  name?: string;
  bio?: string;
  category?: string;
}

export function useCreators() {
  const { program } = useProgram();
  const [creators, setCreators] = useState<CreatorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCreators = useCallback(async () => {
    if (!program) {
      setLoading(false);
      setError("Program not initialized");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const vaultAccounts = await program.account.vaultState.all();

      if (!vaultAccounts.length) {
        setCreators([]);
        return;
      }

      const mapped = await Promise.all(
        vaultAccounts.map(async ({ account: vaultData }) => {
          const creator = vaultData.creator;

          // Derive the vault PDA for this creator
          const [vaultAddress] = getVaultPda(creator, program.programId);

          const vaultStats = {
            totalEarnings: vaultData.totalEarnings?.toNumber() || 0,
            totalSupporters: vaultData.totalSupporters?.toNumber() || 0,
            tipsThisMonth: vaultData.tipsThisMonth?.toNumber() || 0,
            lastTipAt: vaultData.lastTipAt?.toNumber() || 0,
          };

          let profile: Partial<CreatorProfile> = {};
          try {
            const [profilePDA] = getCreatorProfilePda(
              creator,
              program.programId
            );
            const fetchedProfile = await program.account.creatorProfile.fetch(
              profilePDA
            );
            profile = {
              name: fetchedProfile.name,
              bio: fetchedProfile.bio,
            };
          } catch {
            // Profile may not exist yet; ignore
          }

          return {
            creator,
            vaultAddress,
            ...vaultStats,
            ...profile,
          } as CreatorProfile;
        })
      );

      setCreators(mapped);
    } catch (err: any) {
      console.error("Failed to fetch creators:", err);
      setCreators([]);
      setError(err.message ?? "Failed to fetch creators");
    } finally {
      setLoading(false);
    }
  }, [program]);

  useEffect(() => {
    fetchCreators();
  }, [fetchCreators]);

  return { creators, loading, error, refetch: fetchCreators };
}
