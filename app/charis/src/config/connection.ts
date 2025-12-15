import { Connection } from "@solana/web3.js";
import { COMMITMENT_LEVEL, DEV_RPC_URL } from "./constants";

export const NETWORK = "devnet";

export const connection = new Connection(DEV_RPC_URL, COMMITMENT_LEVEL);
