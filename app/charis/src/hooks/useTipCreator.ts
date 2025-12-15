import { useCallback, useState } from "react";
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

export function useTipCreator() {
  const { program, wallet, provider } = useProgram();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);

  const tipCreator = useCallback(
    async (
      creatorAddress: string,
      vaultAddress: string,
      amount: number,
      message: string
    ) => {
      if (!wallet?.publicKey)
        return toast.warning("Connect your wallet first.");
      if (!program || !provider)
        return toast.warning("Program must be initialized.");

      setStatus(null);
      setSignature(null);

      let creator: PublicKey, creatorVault: PublicKey;
      try {
        creator = new PublicKey(creatorAddress);
        creatorVault = new PublicKey(vaultAddress);
      } catch {
        return toast.error("Invalid creator or vault address");
      }

      try {
        performTipAmountChecks(amount);
      } catch (err: any) {
        return toast.error(err.message);
      }

      const tipAmountLamports = Math.floor(amount * LAMPORTS_PER_SOL);
      const fan = wallet.publicKey;

      try {
        setLoading(true);
        setStatus(`🔄 Sending ${amount} SOL tip...`);

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

        setSignature(sig);
        setStatus(`✅ ${amount} SOL tip sent!`);
        toast.success(
          `Tip sent! ${amount} SOL to ${creatorAddress.slice(
            0,
            4
          )}...${creatorAddress.slice(-4)}`
        );
      } catch (err: any) {
        console.error("Send tip error:", err);
        toast.error(`Error: ${err.message}`);
        setStatus("❌ Tip failed");
      } finally {
        setLoading(false);
      }
    },
    [wallet?.publicKey, program, provider]
  );

  return { tipCreator, status, loading, signature };
}
