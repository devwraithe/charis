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
pub struct TipRecord {
    pub vault: Pubkey,  // Links to the creator's vault
    pub donor: Pubkey,  // Fan's wallet
    pub amount: u64,    // Tip amount
    pub timestamp: i64, // When the tip occurred
    #[max_len(100)]
    pub message: String, // Optional message with tip
    pub bump: u8,
}
