use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{Mint, TokenAccount, TokenInterface},
};

use crate::{
    constants::{CREATOR_PROFILE_SEED, VAULT_STATE_SEED},
    errors::CharisError,
    states::{ProfileState, VaultState},
};

#[derive(Accounts)]
// #[instruction(name: String, bio: String)]
pub struct InitializeCreator<'info> {
    #[account(mut)]
    pub creator: Signer<'info>,
    #[account(mint::token_program = token_program)]
    pub mint: InterfaceAccount<'info, Mint>,
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
        space = 8 + ProfileState::INIT_SPACE,
        seeds = [CREATOR_PROFILE_SEED.as_bytes(), creator.key().as_ref()],
        bump,
    )]
    pub profile_state: Account<'info, ProfileState>,
    #[account(
        init,
        payer = creator,
        associated_token::mint = mint,
        associated_token::authority = creator,
        associated_token::token_program = token_program,
    )]
    pub vault: InterfaceAccount<'info, TokenAccount>,
    pub token_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<InitializeCreator>, name: String, bio: String) -> Result<()> {
    let creator = ctx.accounts.creator.key();
    let vault_state = &mut ctx.accounts.vault_state;
    let profile_state = &mut ctx.accounts.profile_state;
    let clock = Clock::get()?;

    require!(name.len() <= 50, CharisError::NameTooLong);
    require!(bio.len() <= 200, CharisError::BioTooLong);
    require!(!name.is_empty(), CharisError::NameEmpty);

    // Initialize vault state
    vault_state.creator = creator;
    vault_state.number_of_tips = 0;
    vault_state.total_tips_received = 0;
    vault_state.bump = ctx.bumps.vault_state;

    // Initialize profile state
    profile_state.creator = creator;
    profile_state.name = name;
    profile_state.bio = bio;
    profile_state.created_at = clock.unix_timestamp;
    profile_state.bump = ctx.bumps.profile_state;

    Ok(())
}
