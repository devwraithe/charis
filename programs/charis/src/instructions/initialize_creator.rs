use anchor_lang::prelude::*;

use crate::{
    constants::{
        CREATOR_PROFILE_SEED, MAX_BIO_LENGTH, MAX_NAME_LENGTH, VAULT_SEED, VAULT_STATE_SEED,
    },
    errors::CharisError,
    states::{CreatorProfile, VaultState},
};

#[derive(Accounts)]
pub struct InitializeCreator<'info> {
    #[account(mut)]
    pub creator: Signer<'info>,

    #[account(
        init,
        payer = creator,
        space = 8 + VaultState::INIT_SPACE,
        seeds = [VAULT_STATE_SEED.as_bytes(), creator.key().as_ref()],
        bump,
    )]
    pub vault_state: Account<'info, VaultState>,

    #[account(
        init,
        payer = creator,
        space = 8 + CreatorProfile::INIT_SPACE,
        seeds = [CREATOR_PROFILE_SEED.as_bytes(), creator.key().as_ref()],
        bump,
    )]
    pub creator_profile: Account<'info, CreatorProfile>,

    /// CHECK: SOL vault PDA to hold tipped SOL
    #[account(
        mut,
        seeds = [VAULT_SEED.as_bytes(), creator.key().as_ref()],
        bump,
    )]
    pub vault: SystemAccount<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<InitializeCreator>, name: String, bio: String) -> Result<()> {
    let creator = ctx.accounts.creator.key();
    let vault_state = &mut ctx.accounts.vault_state;
    let creator_profile = &mut ctx.accounts.creator_profile;
    let clock = Clock::get()?;

    // Validations
    require!(!name.is_empty(), CharisError::NameEmpty);
    require!(name.len() <= MAX_NAME_LENGTH, CharisError::NameTooLong);
    require!(bio.len() <= MAX_BIO_LENGTH, CharisError::BioTooLong);

    // Initialize vault state
    vault_state.creator = creator;
    vault_state.vault = ctx.accounts.vault.key();
    vault_state.total_earnings = 0;
    vault_state.total_supporters = 0;
    vault_state.total_amount_of_tips_received = 0;
    vault_state.total_no_tips_received = 0;
    vault_state.tips_this_month = 0;
    vault_state.average_tip = 0;
    vault_state.last_tip_at = 0;
    vault_state.month_start_timestamp = clock.unix_timestamp;
    vault_state.vault_state_bump = ctx.bumps.vault_state;
    vault_state.vault_bump = ctx.bumps.vault;

    // Initialize creator profile
    creator_profile.creator = creator;
    creator_profile.name = name;
    creator_profile.bio = bio;
    creator_profile.created_at = clock.unix_timestamp;
    creator_profile.updated_at = clock.unix_timestamp;
    creator_profile.is_active = true;
    creator_profile.bump = ctx.bumps.creator_profile;

    msg!("Creator initialized: {}", creator);
    msg!("Vault: {}", ctx.accounts.vault.key());

    Ok(())
}
