import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useProgram } from "./useProgram";
import { getFanStats } from "@/lib/utils";
import { connection } from "@/config/connection";
import { useQuery } from "@tanstack/react-query";

export interface FanStats {
  fan: PublicKey;
  walletBalance: number;
  totalTipsSent: number;
  totalAmountSent: number;
  biggestTip: number;
  smallestTip: number;
  firstTipAt: Date | null;
  lastTipAt: Date | null;
  creatorsSupported: number;
  bump: number;
}

export function useFanStats(fanAddress?: string | PublicKey) {
  const { program, wallet } = useProgram();

  const targetPubkey = fanAddress
    ? typeof fanAddress === "string"
      ? new PublicKey(fanAddress)
      : fanAddress
    : wallet?.publicKey ?? null;

  const query = useQuery({
    queryKey: ["fan-stats", targetPubkey?.toBase58()],
    queryFn: async (): Promise<FanStats | null> => {
      if (!program || !targetPubkey) return null;

      const [fanStatsPda] = getFanStats(targetPubkey, program.programId);

      let walletBalance = 0;
      try {
        walletBalance = await connection.getBalance(targetPubkey);
      } catch {
        walletBalance = 0;
      }

      const account = await program.account.fanStats.fetchNullable(fanStatsPda);

      if (!account) {
        return {
          fan: targetPubkey,
          walletBalance: walletBalance / LAMPORTS_PER_SOL,
          totalTipsSent: 0,
          totalAmountSent: 0,
          biggestTip: 0,
          smallestTip: 0,
          firstTipAt: null,
          lastTipAt: null,
          creatorsSupported: 0,
          bump: 0,
        };
      }

      return {
        fan: account.fan,
        walletBalance: walletBalance / LAMPORTS_PER_SOL,
        totalTipsSent: Number(account.totalTipsSent),
        totalAmountSent: Number(account.totalAmountSent) / LAMPORTS_PER_SOL,
        biggestTip: Number(account.biggestTip) / LAMPORTS_PER_SOL,
        smallestTip: Number(account.smallestTip) / LAMPORTS_PER_SOL,
        firstTipAt:
          Number(account.firstTipAt) > 0
            ? new Date(Number(account.firstTipAt) * 1000)
            : null,
        lastTipAt:
          Number(account.lastTipAt) > 0
            ? new Date(Number(account.lastTipAt) * 1000)
            : null,
        creatorsSupported: Number(account.creatorsSupported),
        bump: account.bump,
      };
    },
    enabled: !!program && !!targetPubkey,
    staleTime: 60_000,
    retry: (failureCount, error: any) => {
      if (error?.status === 429) return failureCount < 6;
      return false;
    },
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
    // onError: (err: any) => {
    //   console.error("Failed to fetch fan stats:", err);
    // },
  });

  const refetch = query.refetch;

  return {
    stats: query.data,
    loading: query.isLoading || query.isFetching,
    refetch,
  };
}
