import { useCallback, useEffect, useState } from "react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useProgram } from "./useProgram";
import { getFanStats } from "@/lib/utils";
import { connection } from "@/config/connection";

export interface FanStats {
  fan: PublicKey;
  walletBalance: number; // SOL
  totalTipsSent: number;
  totalAmountSent: number; // SOL
  biggestTip: number; // SOL
  smallestTip: number; // SOL
  firstTipAt: Date | null;
  lastTipAt: Date | null;
  creatorsSupported: number;
  bump: number;
}

export function useFanStats(fanAddress?: string | PublicKey) {
  const { program, wallet } = useProgram();

  const [stats, setStats] = useState<FanStats | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchFanStats = useCallback(async () => {
    if (!program) {
      setStats(null);
      return;
    }

    const targetAddress = fanAddress || wallet?.publicKey;
    if (!targetAddress) {
      setStats(null);
      return;
    }

    const fan =
      typeof targetAddress === "string"
        ? new PublicKey(targetAddress)
        : targetAddress;

    setLoading(true);

    try {
      // ---- Wallet balance (system account) ----
      let walletBalance = 0;
      try {
        const lamports = await connection.getBalance(fan);
        walletBalance = lamports / LAMPORTS_PER_SOL;
      } catch {
        walletBalance = 0;
      }

      // ---- FanStats PDA ----
      const [fanStatsPda] = getFanStats(fan, program.programId);
      const account = await program.account.fanStats.fetchNullable(fanStatsPda);

      if (!account) {
        setStats({
          fan,
          walletBalance,
          totalTipsSent: 0,
          totalAmountSent: 0,
          biggestTip: 0,
          smallestTip: 0,
          firstTipAt: null,
          lastTipAt: null,
          creatorsSupported: 0,
          bump: 0,
        });
        return;
      }

      setStats({
        fan: account.fan,
        walletBalance,
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
      });
    } catch (err) {
      console.error("Failed to fetch fan stats:", err);
      setStats({
        fan,
        walletBalance: 0,
        totalTipsSent: 0,
        totalAmountSent: 0,
        biggestTip: 0,
        smallestTip: 0,
        firstTipAt: null,
        lastTipAt: null,
        creatorsSupported: 0,
        bump: 0,
      });
    } finally {
      setLoading(false);
    }
  }, [program, fanAddress, wallet?.publicKey]);

  useEffect(() => {
    fetchFanStats();
  }, [fetchFanStats]);

  return {
    stats,
    loading,
    refetch: fetchFanStats,
  };
}
