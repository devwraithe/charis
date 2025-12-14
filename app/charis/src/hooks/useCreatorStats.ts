import { useCallback, useEffect, useState } from "react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { toast } from "sonner";
import { useProgram } from "./useProgram";
import { connection } from "@/config/connection";
import { getVaultStatePda } from "@/lib/utils";

export interface CreatorStats {
  creator: PublicKey;
  totalEarnings: number; // in SOL
  totalSupporters: number;
  totalAmountOfTipsReceived: number;
  totalNoTipsReceived: number;
  tipsThisMonth: number;
  averageTip: number;
  lastTipAt: Date | null;
  monthStartTimestamp: Date | null;
  vaultAddress: PublicKey;
  vaultBalance: number; // in SOL
  walletBalance: number; // in SOL
  vaultStateBump: number;
  vaultBump: number;
}

export function useCreatorStats(creatorAddress?: string | PublicKey) {
  const { program } = useProgram();

  const [statistics, setStatistics] = useState<CreatorStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCreatorStats = useCallback(async () => {
    if (!program) {
      toast.warning("Program must be initialized.");
      setStatistics(null);
      return;
    }

    if (!creatorAddress) {
      toast.warning("No creator address provided.");
      setStatistics(null);
      return;
    }

    const creator =
      typeof creatorAddress === "string"
        ? new PublicKey(creatorAddress)
        : creatorAddress;

    setLoading(true);
    setError(null);

    try {
      const [vaultState] = getVaultStatePda(creator, program.programId);

      let vaultAccount: any = null;
      try {
        vaultAccount = await program.account.vaultState.fetch(vaultState);
      } catch {
        // Vault account may not exist yet
        vaultAccount = null;
      }

      const walletBalance = await connection.getBalance(creator);
      const vaultBalance = vaultAccount
        ? await connection.getBalance(vaultAccount.vault)
        : 0;

      setStatistics({
        creator,
        totalEarnings: vaultAccount
          ? Number(vaultAccount.totalEarnings) / LAMPORTS_PER_SOL
          : 0,
        totalSupporters: vaultAccount
          ? Number(vaultAccount.totalSupporters)
          : 0,
        totalAmountOfTipsReceived: vaultAccount
          ? Number(vaultAccount.totalAmountOfTipsReceived) / LAMPORTS_PER_SOL
          : 0,
        totalNoTipsReceived: vaultAccount
          ? Number(vaultAccount.totalNoTipsReceived)
          : 0,
        tipsThisMonth: vaultAccount
          ? Number(vaultAccount.tipsThisMonth) / LAMPORTS_PER_SOL
          : 0,
        averageTip: vaultAccount
          ? Number(vaultAccount.averageTip) / LAMPORTS_PER_SOL
          : 0,
        lastTipAt:
          vaultAccount && Number(vaultAccount.lastTipAt) > 0
            ? new Date(Number(vaultAccount.lastTipAt) * 1000)
            : null,
        monthStartTimestamp:
          vaultAccount && Number(vaultAccount.monthStartTimestamp) > 0
            ? new Date(Number(vaultAccount.monthStartTimestamp) * 1000)
            : null,
        vaultAddress: vaultAccount
          ? vaultAccount.vault
          : new PublicKey("11111111111111111111111111111111"),
        vaultBalance: vaultBalance / LAMPORTS_PER_SOL,
        walletBalance: walletBalance / LAMPORTS_PER_SOL,
        vaultStateBump: vaultAccount ? vaultAccount.vaultStateBump : 0,
        vaultBump: vaultAccount ? vaultAccount.vaultBump : 0,
      });
    } catch (err: any) {
      console.error("Failed to fetch creator stats:", err);
      setError(err.message ?? "Failed to fetch creator stats");
      toast.error("Failed to fetch creator stats");
      setStatistics(null);
    } finally {
      setLoading(false);
    }
  }, [program, creatorAddress]);

  useEffect(() => {
    fetchCreatorStats();
  }, [fetchCreatorStats]);

  return { statistics, loading, error, refetch: fetchCreatorStats };
}
