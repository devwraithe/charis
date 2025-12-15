import { useCallback } from "react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { toast } from "sonner";
import { useProgram } from "./useProgram";
import { connection } from "@/config/connection";
import { getVaultStatePda } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export interface CreatorStats {
  creator: PublicKey;
  totalEarnings: number;
  totalSupporters: number;
  totalAmountOfTipsReceived: number;
  totalNoTipsReceived: number;
  tipsThisMonth: number;
  averageTip: number;
  lastTipAt: Date | null;
  monthStartTimestamp: Date | null;
  vaultAddress: PublicKey;
  vaultBalance: number;
  walletBalance: number;
  vaultStateBump: number;
  vaultBump: number;
}

export function useCreatorStats(creatorAddress?: string | PublicKey) {
  const { program } = useProgram();

  const creatorPubkey = creatorAddress
    ? typeof creatorAddress === "string"
      ? new PublicKey(creatorAddress)
      : creatorAddress
    : null;

  const query = useQuery({
    queryKey: ["creator-stats", creatorPubkey?.toBase58()],
    queryFn: async (): Promise<CreatorStats | null> => {
      if (!program || !creatorPubkey) return null;

      const [vaultState] = getVaultStatePda(creatorPubkey, program.programId);

      let vaultAccount: any = null;
      try {
        vaultAccount = await program.account.vaultState.fetchNullable(
          vaultState
        );
      } catch {
        vaultAccount = null;
      }

      let walletBalance = 0;
      let vaultBalance = 0;

      if (vaultAccount) {
        [walletBalance, vaultBalance] = await Promise.all([
          connection.getBalance(creatorPubkey),
          connection.getBalance(vaultAccount.vault),
        ]);
      }

      if (!vaultAccount) {
        return {
          creator: creatorPubkey,
          totalEarnings: 0,
          totalSupporters: 0,
          totalAmountOfTipsReceived: 0,
          totalNoTipsReceived: 0,
          tipsThisMonth: 0,
          averageTip: 0,
          lastTipAt: null,
          monthStartTimestamp: null,
          vaultAddress: new PublicKey("11111111111111111111111111111111"),
          vaultBalance: 0,
          walletBalance: 0,
          vaultStateBump: 0,
          vaultBump: 0,
        };
      }

      return {
        creator: creatorPubkey,
        totalEarnings: Number(vaultAccount.totalEarnings) / LAMPORTS_PER_SOL,
        totalSupporters: Number(vaultAccount.totalSupporters),
        totalAmountOfTipsReceived:
          Number(vaultAccount.totalAmountOfTipsReceived) / LAMPORTS_PER_SOL,
        totalNoTipsReceived: Number(vaultAccount.totalNoTipsReceived),
        tipsThisMonth: Number(vaultAccount.tipsThisMonth) / LAMPORTS_PER_SOL,
        averageTip: Number(vaultAccount.averageTip) / LAMPORTS_PER_SOL,
        lastTipAt:
          Number(vaultAccount.lastTipAt) > 0
            ? new Date(Number(vaultAccount.lastTipAt) * 1000)
            : null,
        monthStartTimestamp:
          Number(vaultAccount.monthStartTimestamp) > 0
            ? new Date(Number(vaultAccount.monthStartTimestamp) * 1000)
            : null,
        vaultAddress: vaultAccount.vault,
        vaultBalance: vaultBalance / LAMPORTS_PER_SOL,
        walletBalance: walletBalance / LAMPORTS_PER_SOL,
        vaultStateBump: vaultAccount.vaultStateBump,
        vaultBump: vaultAccount.vaultBump,
      };
    },
    enabled: !!program && !!creatorPubkey,
    staleTime: 60_000,
    retry: (failureCount, error: any) => {
      if (error?.status === 429) return failureCount < 6;
      return false;
    },
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
    // onError: (err: any) => {
    //   console.error("Failed to fetch creator stats:", err);
    //   toast.error("Failed to load creator stats");
    // },
  });

  const refetch = query.refetch;

  return {
    statistics: query.data,
    loading: query.isLoading || query.isFetching,
    error: query.error ? (query.error as Error).message : null,
    refetch,
  };
}
