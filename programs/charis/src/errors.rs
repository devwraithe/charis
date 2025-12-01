use anchor_lang::prelude::*;

#[error_code]
pub enum CharisError {
    #[msg("Name is too long, 50 characters or less")]
    NameTooLong,
    #[msg("Bio is too long, 200 characters or less")]
    BioTooLong,
    #[msg("Name is empty")]
    NameEmpty,
}
