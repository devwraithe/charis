import { AnchorProvider, Program, setProvider } from "@coral-xyz/anchor";
import type { AnchorWallet } from "@solana/wallet-adapter-react";
import type { Connection } from "@solana/web3.js";
import idl from "./idl.json";
import type { Charis } from "./types";

export function getProgram(wallet: AnchorWallet, connection: Connection) {
  const provider = new AnchorProvider(
    connection,
    wallet,
    AnchorProvider.defaultOptions()
  );
  setProvider(provider);

  const program = new Program(idl as Charis, {
    connection,
  }) as Program<Charis>;

  return { program, provider };
}
