import { useCallback, useEffect, useState } from "react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
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
    if (!program) return;

    setLoading(true);
    setError(null);

    try {
      const filters = [];

      if (options?.filterByCreator) {
        const creatorPk =
          typeof options.filterByCreator === "string"
            ? new PublicKey(options.filterByCreator)
            : options.filterByCreator;

        filters.push({
          memcmp: {
            offset: 8 + 32,
            bytes: creatorPk.toBase58(),
          },
        });
      }

      if (options?.filterByFan) {
        const fanPk =
          typeof options.filterByFan === "string"
            ? new PublicKey(options.filterByFan)
            : options.filterByFan;

        filters.push({
          memcmp: {
            offset: 8 + 32 + 32,
            bytes: fanPk.toBase58(),
          },
        });
      }

      const accounts = await program.account.tipRecord.all(filters);

      let mapped = accounts
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

      if (options?.limit) {
        mapped = mapped.slice(0, options.limit);
      }

      setRecords(mapped);
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Failed to fetch records");
      setRecords([]);
    } finally {
      setLoading(false);
    }
  }, [program, options?.filterByCreator, options?.filterByFan, options?.limit]);

  useEffect(() => {
    if (!program) return;
    fetchRecords();
  }, [program, fetchRecords]);

  return { records, loading, error, refetch: fetchRecords };
}
