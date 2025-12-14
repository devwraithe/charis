import { useCallback, useEffect, useState } from "react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { toast } from "sonner";
import { useProgram } from "./useProgram";

export interface TipRecord {
  creatorVault: PublicKey;
  creator: PublicKey;
  fan: PublicKey;
  amount: number; // in SOL
  timestamp: Date;
  message: string;
  isAnonymous: boolean;
  bump: number;
  address: PublicKey;
}

interface UseTipRecordsOptions {
  filterByCreator?: string | PublicKey;
  filterByFan?: string | PublicKey;
  limit?: number;
}

export function useTipRecords(options?: UseTipRecordsOptions) {
  const { program } = useProgram();

  const [records, setRecords] = useState<TipRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = useCallback(async () => {
    if (!program) {
      setError("Program not initialized");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch all tip records
      let allTipRecords = await program.account.tipRecord.all();

      // Apply filters
      if (options?.filterByCreator) {
        const creatorPk =
          typeof options.filterByCreator === "string"
            ? new PublicKey(options.filterByCreator)
            : options.filterByCreator;
        allTipRecords = allTipRecords.filter((r) =>
          r.account.creator.equals(creatorPk)
        );
      }

      if (options?.filterByFan) {
        const fanPk =
          typeof options.filterByFan === "string"
            ? new PublicKey(options.filterByFan)
            : options.filterByFan;
        allTipRecords = allTipRecords.filter((r) =>
          r.account.fan.equals(fanPk)
        );
      }

      // Map to interface and sort newest first
      let mappedRecords = allTipRecords
        .map((record) => ({
          creatorVault: record.account.creatorVault,
          creator: record.account.creator,
          fan: record.account.fan,
          amount: Number(record.account.amount) / LAMPORTS_PER_SOL,
          timestamp: new Date(Number(record.account.timestamp) * 1000),
          message: record.account.message,
          isAnonymous: record.account.isAnonymous,
          bump: record.account.bump,
          address: record.publicKey,
        }))
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

      // Apply limit
      if (options?.limit) {
        mappedRecords = mappedRecords.slice(0, options.limit);
      }

      setRecords(mappedRecords);
    } catch (err: any) {
      console.error("Error fetching tip records:", err);
      setError(err.message || "Failed to fetch tip records");
      toast.error(`Failed to fetch tip records: ${err.message}`);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  }, [program, options?.filterByCreator, options?.filterByFan, options?.limit]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  return { records, loading, error, refetch: fetchRecords };
}
