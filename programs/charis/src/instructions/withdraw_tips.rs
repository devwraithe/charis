use anchor_lang::prelude::*;
use anchor_lang::system_program;

use crate::{
    constants::{MIN_WITHDRAWAL_AMOUNT, VAULT_SEED, VAULT_STATE_SEED},
    errors::CharisError,
    states::VaultState,
};

#[derive(Accounts)]
pub struct WithdrawTips<'info> {
    #[account(mut)]
    pub creator: Signer<'info>,

    #[account(
        mut,
        seeds = [VAULT_STATE_SEED.as_bytes(), creator.key().as_ref()],
        bump = vault_state.vault_state_bump,
        has_one = creator @ CharisError::UnauthorizedWithdrawal,
    )]
    pub vault_state: Account<'info, VaultState>,

    /// CHECK: SOL vault PDA
    #[account(
        mut,
        seeds = [VAULT_SEED.as_bytes(), creator.key().as_ref()],
        bump,
    )]
    pub vault: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<WithdrawTips>, amount: u64) -> Result<()> {
    let creator = &ctx.accounts.creator;
    let vault = &ctx.accounts.vault;
    let vault_state = &mut ctx.accounts.vault_state;

    // Validations
    require!(amount > 0, CharisError::InvalidAmount);
    require!(
        amount >= MIN_WITHDRAWAL_AMOUNT,
        CharisError::BelowMinimumWithdrawal
    );

    let vault_balance = vault.lamports();
    require!(
        vault_balance >= amount,
        CharisError::InsufficientVaultBalance
    );

    // Update vault state
    vault_state.total_earnings = vault_state
        .total_earnings
        .checked_sub(amount)
        .ok_or(CharisError::MathOverflow)?;

    // Transfer SOL from vault to creator
    let vault_seeds = &[
        VAULT_SEED.as_bytes(),
        creator.key.as_ref(),
        &[ctx.bumps.vault],
    ];
    let signer_seeds = &[&vault_seeds[..]];

    system_program::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: vault.to_account_info(),
                to: creator.to_account_info(),
            },
            signer_seeds,
        ),
        amount,
    )?;

    msg!(
        "Withdrawn: {} lamports from vault to {}",
        amount,
        creator.key()
    );

    Ok(())
}
