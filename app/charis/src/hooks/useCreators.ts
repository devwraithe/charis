import { PublicKey } from "@solana/web3.js";
import { useProgram } from "./useProgram";
import { getCreatorProfilePda, getVaultPda } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

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

  const query = useQuery({
    queryKey: ["all-creators"],
    queryFn: async (): Promise<CreatorProfile[]> => {
      if (!program) throw new Error("Program not initialized");

      const vaultAccounts = await program.account.vaultState.all();

      if (vaultAccounts.length === 0) return [];

      const creators = await Promise.all(
        vaultAccounts.map(
          async ({ account: vaultData, publicKey: vaultStatePda }) => {
            const creator = vaultData.creator;

            const [vaultAddress] = getVaultPda(creator, program.programId);

            let name: string | undefined;
            let bio: string | undefined;

            try {
              const [profilePDA] = getCreatorProfilePda(
                creator,
                program.programId
              );
              const fetchedProfile = await program.account.creatorProfile.fetch(
                profilePDA
              );
              name = fetchedProfile.name;
              bio = fetchedProfile.bio;
            } catch {
              // Profile doesn't exist yet — ignore
            }

            return {
              creator,
              vaultAddress,
              totalEarnings:
                (vaultData.totalEarnings?.toNumber() || 0) / 1_000_000_000,
              totalSupporters: vaultData.totalSupporters?.toNumber() || 0,
              tipsThisMonth:
                (vaultData.tipsThisMonth?.toNumber() || 0) / 1_000_000_000,
              lastTipAt: vaultData.lastTipAt?.toNumber() || 0,
              name,
              bio,
            } as CreatorProfile;
          }
        )
      );

      return creators;
    },
    enabled: !!program,
    staleTime: 120_000, // 2 minutes
    retry: (failureCount, error: any) => {
      if (error?.status === 429) return failureCount < 6;
      return false;
    },
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
    // onError: (err: any) => {
    //   console.error("Failed to fetch creators:", err);
    // },
  });

  return {
    creators: query.data ?? [],
    loading: query.isLoading || query.isFetching,
    error: query.error ? (query.error as Error).message : null,
    refetch: query.refetch,
  };
}
