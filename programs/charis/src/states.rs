use anchor_lang::prelude::*;

/// Tracks creator's vault statistics and earnings
#[account]
#[derive(InitSpace)]
pub struct VaultState {
    pub creator: Pubkey,
    pub vault: Pubkey,
    pub total_earnings: u64,
    pub total_supporters: u64,
    pub total_amount_of_tips_received: u64,
    pub total_no_tips_received: u64,
    pub tips_this_month: u64,
    pub average_tip: u64,
    pub last_tip_at: i64,
    pub month_start_timestamp: i64,
    pub vault_state_bump: u8,
    pub vault_bump: u8,
}

/// Creator's public profile information
#[account]
#[derive(InitSpace)]
pub struct CreatorProfile {
    pub creator: Pubkey,
    #[max_len(50)]
    pub name: String,
    #[max_len(200)]
    pub bio: String,
    pub created_at: i64,
    pub updated_at: i64,
    pub is_active: bool,
    pub bump: u8,
}

/// Statistics for individual fans
#[account]
#[derive(InitSpace)]
pub struct FanStats {
    pub fan: Pubkey,
    pub total_tips_sent: u64,
    pub total_amount_sent: u64,
    pub biggest_tip: u64,
    pub smallest_tip: u64,
    pub first_tip_at: i64,
    pub last_tip_at: i64,
    pub creators_supported: u64,
    pub bump: u8,
}

/// Individual tip transaction record
#[account]
#[derive(InitSpace)]
pub struct TipRecord {
    pub creator_vault: Pubkey,
    pub creator: Pubkey,
    pub fan: Pubkey,
    pub amount: u64,
    pub timestamp: i64,
    #[max_len(100)]
    pub message: String,
    pub is_anonymous: bool,
    pub bump: u8,
}
