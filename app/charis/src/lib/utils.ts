import {
  CREATOR_PROFILE_SEED,
  FAN_STATS_SEED,
  MAX_TIP_AMOUNT,
  MIN_TIP_AMOUNT,
  TIP_RECORD_SEED,
  VAULT_SEED,
  VAULT_STATE_SEED,
} from "@/config/constants";
import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import { toast } from "sonner";

// PDAs
export function getCreatorProfilePda(creator: PublicKey, programId: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(CREATOR_PROFILE_SEED), creator.toBuffer()],
    programId
  );
}

export function getVaultStatePda(creator: PublicKey, programId: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(VAULT_STATE_SEED), creator.toBuffer()],
    programId
  );
}

export function getVaultPda(creator: PublicKey, programId: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(VAULT_SEED), creator.toBuffer()],
    programId
  );
}

export function getFanStats(fan: PublicKey, programId: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(FAN_STATS_SEED), fan.toBuffer()],
    programId
  );
}

export function getTipRecordPda(
  fan: PublicKey,
  programId: PublicKey,
  tipCount: BN
) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(TIP_RECORD_SEED),
      fan.toBuffer(),
      Buffer.from(new BN(tipCount).toArrayLike(Buffer, "le", 8)),
    ],
    programId
  );
}

export function performTipAmountChecks(amount: number) {
  if (amount <= 0) {
    toast.error("Tip amount must be greater than 0.");
    return;
  }
  if (amount < MIN_TIP_AMOUNT) {
    toast.error(`Minimum tip amount is ${MIN_TIP_AMOUNT} SOL.`);
    return;
  }
  if (amount > MAX_TIP_AMOUNT) {
    toast.error(`Maximum tip amount is ${MAX_TIP_AMOUNT} SOL.`);
    return;
  }
}

export function formatReadableDate(isoString?: string) {
  if (!isoString) return "Not Available";

  const date = new Date(isoString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const hour = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${day}${suffix} ${month} ${year} at ${hour}`;
}

export function formatDateWithOrdinal(date: Date) {
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  const ordinal =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${day}${ordinal} ${month} ${year}`;
}
