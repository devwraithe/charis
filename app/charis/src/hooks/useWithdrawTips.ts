import { useCallback, useState } from "react";
import { BN } from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js";
import { toast } from "sonner";

import { useProgram } from "./useProgram";
import { connection } from "@/config/connection";
import { COMMITMENT_LEVEL } from "@/config/constants";
import { getVaultPda, getVaultStatePda } from "@/lib/utils";

export function useWithdrawTips() {
  const { program, wallet, provider } = useProgram();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);

  const withdrawTips = useCallback(
    async (amountSol: number) => {
      setStatus(null);
      setSignature(null);

      if (!wallet?.publicKey) {
        toast.warning("Connect your wallet first.");
        return;
      }

      if (!program || !provider) {
        toast.warning("Program must be initialized.");
        return;
      }

      if (amountSol <= 0) {
        toast.error("Amount must be greater than 0.");
        return;
      }

      const creator = wallet.publicKey;
      const amountLamports = Math.floor(amountSol * LAMPORTS_PER_SOL);

      try {
        setLoading(true);
        setStatus(`🔄 Withdrawing ${amountSol} SOL...`);

        const [vaultState] = getVaultStatePda(creator, program.programId);
        const [vault] = getVaultPda(creator, program.programId);

        const vaultBalance = await connection.getBalance(vault);

        if (vaultBalance < amountLamports) {
          toast.error(
            `Insufficient vault balance. Available: ${
              vaultBalance / LAMPORTS_PER_SOL
            } SOL`
          );
          return;
        }

        const instruction = await program.methods
          .withdrawTips(new BN(amountLamports))
          .accountsStrict({
            creator,
            vaultState,
            vault,
            systemProgram: SystemProgram.programId,
          })
          .instruction();

        const transaction = new Transaction().add(instruction);
        transaction.feePayer = creator;

        const sig = await provider.sendAndConfirm(transaction, [], {
          commitment: COMMITMENT_LEVEL,
        });

        setSignature(sig);
        setStatus("✅ Withdrawal successful");
        toast.success(`Successfully withdrew ${amountSol} SOL`);
      } catch (err: any) {
        console.error("Withdraw tips error:", err);
        setStatus("❌ Withdrawal failed");
        toast.error(err?.message ?? "Withdrawal failed");
      } finally {
        setLoading(false);
      }
    },
    [wallet?.publicKey, program, provider]
  );

  return {
    withdrawTips,
    loading,
    status,
    signature,
  };
}
