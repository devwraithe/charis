import { useState } from "react";
import { BN } from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js";
import { toast } from "sonner";

import { useProgram } from "./useProgram";
import { connection } from "@/config/connection";
import { COMMITMENT_LEVEL } from "@/config/constants";
import { getVaultPda, getVaultStatePda } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useWithdrawTips() {
  const { program, wallet, provider } = useProgram();
  const queryClient = useQueryClient();

  const [signature, setSignature] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (amountSol: number) => {
      if (!wallet?.publicKey) throw new Error("Connect your wallet first.");
      if (!program || !provider)
        throw new Error("Program must be initialized.");
      if (amountSol <= 0) throw new Error("Amount must be greater than 0.");

      const creator = wallet.publicKey;
      const amountLamports = Math.floor(amountSol * LAMPORTS_PER_SOL);

      const [vaultState] = getVaultStatePda(creator, program.programId);
      const [vault] = getVaultPda(creator, program.programId);

      const vaultBalance = await connection.getBalance(vault);

      if (vaultBalance < amountLamports) {
        throw new Error(
          `Insufficient vault balance. Available: ${
            vaultBalance / LAMPORTS_PER_SOL
          } SOL`
        );
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

      return sig;
    },
    onMutate: (amountSol) => {
      toast.loading(`Withdrawing ${amountSol} SOL...`, {
        id: "withdraw-toast",
      });
    },
    onSuccess: (sig, amountSol) => {
      setSignature(sig);
      toast.success(`Successfully withdrew ${amountSol} SOL`, {
        id: "withdraw-toast",
      });

      // Invalidate relevant queries to refresh balances and stats
      queryClient.invalidateQueries({
        queryKey: ["creator-stats", wallet?.publicKey?.toBase58()],
      });
      queryClient.invalidateQueries({ queryKey: ["all-creators"] });
    },
    onError: (error: any) => {
      console.error("Withdraw tips error:", error);
      toast.error(error.message ?? "Withdrawal failed", {
        id: "withdraw-toast",
      });
    },
  });

  const withdrawTips = mutation.mutateAsync;

  return {
    withdrawTips,
    loading: mutation.isPending,
    status: mutation.isPending
      ? `🔄 Withdrawing...`
      : mutation.isSuccess
      ? `✅ Withdrawal successful`
      : mutation.isError
      ? `❌ Withdrawal failed`
      : null,
    signature,
  };
}
