use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct VaultState {
    pub creator: Pubkey,
    pub number_of_tips: u64,
    pub total_tips_received: u64,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct ProfileState {
    pub creator: Pubkey,
    #[max_len(50)]
    pub name: String,
    #[max_len(200)]
    pub bio: String,
    pub created_at: i64,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct FanStats {
    pub tipper: Pubkey,
    pub total_tips: u64,
    pub total_amount: u64,
    pub biggest_tip: u64,
    pub last_tip: i64,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct TipRecord {
    pub creator_vault: Pubkey,
    pub fan: Pubkey,
    pub amount: u64, 
    pub timestamp: i64,
    #[max_len(100)]
    pub message: String,
    pub bump: u8,
}
