use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{transfer_checked, Mint, TokenAccount, TokenInterface, TransferChecked},
};

use crate::{
    constants::{MIN_WITHDRAWAL_AMOUNT, VAULT_STATE_SEED},
    errors::CharisError,
    states::VaultState,
};

#[derive(Accounts)]
pub struct WithdrawTips<'info> {
    #[account(mut)]
    pub creator: Signer<'info>,
    #[account(mint::token_program = token_program)]
    pub mint: InterfaceAccount<'info, Mint>,
    #[account(
        mut,
        seeds = [VAULT_STATE_SEED.as_bytes(), creator.key().as_ref()],
        bump = vault_state.bump,
        has_one = creator,
    )]
    pub vault_state: Account<'info, VaultState>,
    #[account(
        mut,
        associated_token::mint = mint,
        associated_token::authority = creator,
        associated_token::token_program = token_program,
    )]
    pub vault: InterfaceAccount<'info, TokenAccount>,
    #[account(
        mut,
        associated_token::mint = mint,
        associated_token::authority = creator,
        associated_token::token_program = token_program,
    )]
    pub creator_token_account: InterfaceAccount<'info, TokenAccount>,
    pub token_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<WithdrawTips>, amount: u64) -> Result<()> {
    let vault = &ctx.accounts.vault;

    // Check vault has sufficient balance
    require!(
        vault.amount >= amount,
        CharisError::InsufficientVaultBalance
    );

    // Check withdrawal meets minimum (5 USDC = 5_000_000 with 6 decimals)
    require!(
        amount >= MIN_WITHDRAWAL_AMOUNT,
        CharisError::BelowMinimumWithdrawal
    );

    // Transfer from vault to creator's wallet
    let cpi_accounts = TransferChecked {
        from: ctx.accounts.vault.to_account_info(),
        to: ctx.accounts.creator_token_account.to_account_info(),
        authority: ctx.accounts.creator.to_account_info(),
        mint: ctx.accounts.mint.to_account_info(),
    };
    let cpi_ctx = CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts);
    transfer_checked(cpi_ctx, amount, ctx.accounts.mint.decimals)?;

    Ok(())
}
