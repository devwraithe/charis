import { Connection } from "@solana/web3.js";
import { COMMITMENT_LEVEL, DEV_RPC_URL, LOCAL_RPC_URL } from "./constants";

export const NETWORK = "localnet";

export const connection = new Connection(
  NETWORK === "localnet" ? LOCAL_RPC_URL : DEV_RPC_URL,
  COMMITMENT_LEVEL
);
