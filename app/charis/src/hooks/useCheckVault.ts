import { PublicKey } from "@solana/web3.js";
import { useProgram } from "./useProgram";
import { getVaultStatePda } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export function useCheckVault() {
  const { program, wallet } = useProgram();

  const publicKey = wallet?.publicKey ?? null;

  const query = useQuery({
    queryKey: ["has-vault", publicKey?.toBase58()],
    queryFn: async (): Promise<boolean> => {
      if (!program || !publicKey) return false;

      const [vaultState] = getVaultStatePda(publicKey, program.programId);

      const account = await program.account.vaultState.fetchNullable(
        vaultState
      );

      return Boolean(account);
    },
    enabled: !!program && !!publicKey,
    staleTime: 120_000, // 2 minutes
    retry: (failureCount, error: any) => {
      if (error?.status === 429) return failureCount < 6;
      return false;
    },
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
    // onError: (err: any) => {
    //   console.error("Vault check failed:", err);
    // },
  });

  return {
    checkingVault: query.isLoading || query.isFetching,
    hasVault: publicKey ? query.data ?? null : null,
  };
}
