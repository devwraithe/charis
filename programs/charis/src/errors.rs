use anchor_lang::prelude::*;

#[error_code]
pub enum CharisError {
    #[msg("Name is too long, 50 characters or less")]
    NameTooLong,
    #[msg("Bio is too long, 200 characters or less")]
    BioTooLong,
    #[msg("Name is empty")]
    NameEmpty,
    #[msg("Math overflow")]
    MathOverflow,
    #[msg("Tip amount must be greater than zero")]
    InvalidAmount,
    #[msg("Tip amount is below the allowed minimum")]
    BelowMinimumTip,
    #[msg("Tip amount exceeds the allowed maximum")]
    ExceedsMaximumTip,
    #[msg("Insufficient funds to process this tip")]
    InsufficientFunds,
}
