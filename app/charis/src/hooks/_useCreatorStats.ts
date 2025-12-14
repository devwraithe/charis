// "use client";

// import { useCallback, useEffect, useState } from "react";
// import { PublicKey } from "@solana/web3.js";
// import { getAssociatedTokenAddressSync } from "@solana/spl-token";
// import { toast } from "sonner";
// import { useProgram } from "./useProgram";
// import { VAULT_STATE_SEED } from "@/config/constants";
// import { connection, NETWORK } from "@/config/connection";
// import { getUSDCMint } from "@/lib/utils";

// export interface CreatorStats {
//   creator: PublicKey;
//   vaultAddress: PublicKey;
//   vaultBalance: number;
//   creatorSolBalance: number;
// }

// export function useCreatorStats() {
//   const { program, wallet } = useProgram();

//   const [stats, setStats] = useState<CreatorStats | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchStats = useCallback(async () => {
//     if (!program || !wallet?.publicKey) {
//       setStats(null);
//       setError(
//         !wallet?.publicKey ? "Wallet not connected" : "Program not initialized"
//       );
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     const creator = wallet.publicKey;

//     try {
//       // Derive vault state PDA
//       const [vaultState] = PublicKey.findProgramAddressSync(
//         [Buffer.from(VAULT_STATE_SEED), creator.toBuffer()],
//         program.programId
//       );

//       // Get creator's USDC vault (ATA)
//       const vault = getAssociatedTokenAddressSync(
//         getUSDCMint(NETWORK),
//         creator,
//         false
//       );

//       // Fetch vault USDC balance
//       let vaultBalance = 0;
//       try {
//         const vaultTokenAccount = await connection.getTokenAccountBalance(
//           vault
//         );
//         vaultBalance = vaultTokenAccount.value.uiAmount || 0;
//       } catch (e) {
//         console.log("Vault token account not found or empty:", e);
//       }

//       // Fetch creator's SOL balance
//       const creatorSolBalance = await connection.getBalance(creator);

//       setStats({
//         creator,
//         vaultAddress: vault,
//         vaultBalance,
//         creatorSolBalance: creatorSolBalance / 1e9, // Convert lamports to SOL
//       });
//     } catch (err: any) {
//       console.error("Error fetching creator stats:", err);
//       setError(err.message || "Failed to fetch creator stats");
//       toast.error(`Failed to fetch creator stats: ${err.message}`);

//       // Set default stats on error
//       setStats({
//         creator,
//         vaultAddress: PublicKey.default,
//         vaultBalance: 0,
//         creatorSolBalance: 0,
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, [program, wallet?.publicKey]);

//   // Fetch stats when wallet or program changes
//   useEffect(() => {
//     fetchStats();
//   }, [fetchStats]);

//   return { stats, loading, error, refetch: fetchStats };
// }
