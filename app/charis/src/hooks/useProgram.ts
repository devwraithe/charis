import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { getProgram } from "../lib/program";
import { connection } from "../config/connection";

export function useProgram() {
  const wallet = useAnchorWallet();

  if (!wallet) {
    console.log("No wallet. Return 'null'.");
    return { program: null, provider: null, wallet: null };
  }

  const { program, provider } = getProgram(wallet, connection);

  return { program, provider, wallet };
}
