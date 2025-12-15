use anchor_lang::prelude::*;

#[error_code]
pub enum CharisError {
    // Profile validation errors
    #[msg("Name cannot be empty")]
    NameEmpty,
    #[msg("Name exceeds maximum length of 50 characters")]
    NameTooLong,
    #[msg("Bio exceeds maximum length of 200 characters")]
    BioTooLong,
    #[msg("Message exceeds maximum length of 100 characters")]
    MessageTooLong,

    // Tip validation errors
    #[msg("Tip amount must be greater than zero")]
    InvalidAmount,
    #[msg("Tip amount below minimum of 0.1 USDC")]
    BelowMinimumTip,
    #[msg("Tip amount exceeds maximum of 1,000 USDC")]
    ExceedsMaximumTip,
    #[msg("Cannot tip yourself")]
    SelfTip,

    // Balance and fund errors
    #[msg("Insufficient funds to complete this transaction")]
    InsufficientFunds,
    #[msg("Vault balance insufficient for withdrawal")]
    InsufficientVaultBalance,
    #[msg("Unauthorized withdrawal attempt")]
    UnauthorizedWithdrawal,

    // Withdrawal errors
    #[msg("Withdrawal must be at least 5 USDC")]
    BelowMinimumWithdrawal,

    // System errors
    #[msg("Arithmetic overflow occurred")]
    MathOverflow,
}
