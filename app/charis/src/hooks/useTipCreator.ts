import { useState } from "react";
import { BN } from "@coral-xyz/anchor";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { toast } from "sonner";
import { useProgram } from "./useProgram";
import { connection } from "@/config/connection";
import {
  getFanStats,
  getTipRecordPda,
  getVaultStatePda,
  performTipAmountChecks,
} from "@/lib/utils";
import { COMMITMENT_LEVEL } from "@/config/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useTipCreator() {
  const { program, wallet, provider } = useProgram();
  const queryClient = useQueryClient();

  const [signature, setSignature] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async ({
      creatorAddress,
      vaultAddress,
      amount,
      message,
    }: {
      creatorAddress: string;
      vaultAddress: string;
      amount: number;
      message: string;
    }) => {
      if (!wallet?.publicKey) throw new Error("Connect your wallet first.");
      if (!program || !provider) throw new Error("Program not initialized.");

      let creator: PublicKey;
      let creatorVault: PublicKey;
      creator = new PublicKey(creatorAddress);
      creatorVault = new PublicKey(vaultAddress);

      try {
        performTipAmountChecks(amount);
      } catch (err: any) {
        throw new Error(err.message);
      }

      const tipAmountLamports = Math.floor(amount * LAMPORTS_PER_SOL);
      const fan = wallet.publicKey;

      const [vaultState] = getVaultStatePda(creator, program.programId);
      const [fanStats] = getFanStats(fan, program.programId);

      const vaultStateAccount = await program.account.vaultState.fetch(
        vaultState
      );
      const tipCount = vaultStateAccount.totalNoTipsReceived;
      const [tipRecord] = getTipRecordPda(fan, program.programId, tipCount);

      const ixn = await program.methods
        .sendTip(new BN(tipAmountLamports), message)
        .accountsStrict({
          fan,
          creator,
          vaultState,
          vault: creatorVault,
          fanStats,
          tipRecord,
          systemProgram: SystemProgram.programId,
        })
        .instruction();

      const txn = new Transaction().add(ixn);
      txn.feePayer = fan;

      const sig = await provider.sendAndConfirm(txn, [], {
        commitment: COMMITMENT_LEVEL,
      });

      await connection.confirmTransaction(sig, COMMITMENT_LEVEL);

      return sig;
    },
    onMutate: (amountSol) => {
      toast.loading(`Sending ${amountSol} SOL tip...`, { id: "tip-toast" });
    },
    onSuccess: (sig, variables) => {
      const { amount, creatorAddress } = variables;
      setSignature(sig);
      toast.success(
        `Tip sent! ${amount} SOL to ${creatorAddress.slice(
          0,
          4
        )}...${creatorAddress.slice(-4)}`,
        { id: "tip-toast" }
      );

      // Invalidate relevant queries to refresh data after successful tip
      queryClient.invalidateQueries({
        queryKey: ["creator-stats", creatorAddress],
      });
      queryClient.invalidateQueries({
        queryKey: ["fan-stats", wallet?.publicKey?.toBase58()],
      });
      queryClient.invalidateQueries({ queryKey: ["all-creators"] });
    },
    onError: (error: any) => {
      console.error("Send tip error:", error);
      toast.error(`Error: ${error.message}`, { id: "tip-toast" });
    },
  });

  const tipCreator = mutation.mutateAsync;

  return {
    tipCreator,
    status: mutation.isPending
      ? `🔄 Sending tip...`
      : mutation.isSuccess
      ? `✅ Tip sent!`
      : mutation.isError
      ? `❌ Tip failed`
      : null,
    loading: mutation.isPending,
    signature,
  };
}
