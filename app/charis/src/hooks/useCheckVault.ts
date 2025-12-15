import { useCallback, useEffect, useState } from "react";
import { useProgram } from "./useProgram";
import { getVaultStatePda } from "@/lib/utils";

export function useCheckVault() {
  const { program, wallet } = useProgram();

  const [checkingVault, setCheckingVault] = useState(false);
  const [hasVault, setHasVault] = useState<boolean | null>(null);

  const checkVault = useCallback(async () => {
    if (!wallet?.publicKey || !program) return;

    setCheckingVault(true);

    try {
      const [vaultState] = getVaultStatePda(
        wallet.publicKey,
        program.programId
      );

      const account = await program.account.vaultState.fetchNullable(
        vaultState
      );

      setHasVault(Boolean(account));
    } catch (err) {
      console.error("Vault check failed:", err);
      setHasVault(false);
    } finally {
      setCheckingVault(false);
    }
  }, [wallet?.publicKey, program]);

  useEffect(() => {
    if (!wallet?.publicKey) {
      setHasVault(null);
      return;
    }

    checkVault();
  }, [wallet?.publicKey, checkVault]);

  return { checkingVault, hasVault };
}
