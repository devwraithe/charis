import { Connection, clusterApiUrl } from "@solana/web3.js";

export type Network = "localnet" | "devnet";

export const NETWORK: Network =
  (import.meta.env.VITE_PUBLIC_NETWORK as Network) ?? "devnet";

const getRpcUrl = (network: Network): string => {
  const heliusDevnetUrl = import.meta.env.VITE_PUBLIC_HELIUS_RPC_DEVNET;

  if (network === "localnet") return "http://127.0.0.1:8899";

  if (heliusDevnetUrl) return heliusDevnetUrl;

  return clusterApiUrl("devnet");
};

const rpcUrl = getRpcUrl(NETWORK);

export const connection = new Connection(rpcUrl, {
  commitment: "confirmed",
  confirmTransactionInitialTimeout: 60_000,
});

console.log(`🌐 Connected to ${NETWORK} via ${rpcUrl.split("?")[0]}`);
