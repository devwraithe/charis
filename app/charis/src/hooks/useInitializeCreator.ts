import { useCallback, useState } from "react";
import { SystemProgram, Transaction } from "@solana/web3.js";
import { useProgram } from "./useProgram";
import { toast } from "sonner";
import { COMMITMENT_LEVEL } from "@/config/constants";
import {
  getCreatorProfilePda,
  getVaultPda,
  getVaultStatePda,
} from "@/lib/utils";

export function useInitializeCreator() {
  const { program, wallet, provider } = useProgram();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);

  const initializeCreator = useCallback(
    async (name: string, bio: string) => {
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

      const creator = wallet.publicKey;

      try {
        setLoading(true);
        setStatus("Initializing creator...");

        // Derive PDAs
        const [creatorProfile] = getCreatorProfilePda(
          creator,
          program.programId
        );
        const [vaultState] = getVaultStatePda(creator, program.programId);
        const [vault] = getVaultPda(creator, program.programId);

        const ixn = await program.methods
          .initializeCreator(name, bio)
          .accountsStrict({
            creator,
            vaultState,
            creatorProfile,
            vault,
            systemProgram: SystemProgram.programId,
          })
          .instruction();

        const txn = new Transaction().add(ixn);
        txn.feePayer = creator;

        const signature = await provider.sendAndConfirm(txn, [], {
          commitment: COMMITMENT_LEVEL,
        });

        setSignature(signature);
        toast.success("Creator initialized successfully!");
        setStatus("✅ Creator initialized!");
      } catch (err: any) {
        console.error("Initialize creator error:", err);
        toast.error(`Error: ${err.message}`);
        setStatus("❌ Initialization failed");
      } finally {
        setLoading(false);
      }
    },
    [wallet?.publicKey, program, provider]
  );

  return { initializeCreator, status, loading, signature };
}
