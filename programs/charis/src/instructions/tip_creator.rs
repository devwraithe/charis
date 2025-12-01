use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{transfer_checked, Mint, TokenAccount, TokenInterface, TransferChecked},
};

use crate::{
    constants::{
        FAN_STATS_SEED, MAX_MESSAGE_LENGTH, MAX_TIP_AMOUNT, MIN_TIP_AMOUNT, TIP_RECORD_SEED, VAULT_STATE_SEED
    },
    errors::CharisError,
    states::{FanStats, TipRecord, VaultState},
};

#[derive(Accounts)]
pub struct TipCreator<'info> {
    #[account(mut)]
    pub fan: Signer<'info>,
    /// CHECK: This is the creator receiving the tip
    pub creator: UncheckedAccount<'info>,
    #[account(mint::token_program = token_program)]
    pub mint: InterfaceAccount<'info, Mint>,
    #[account(
        mut,
        seeds = [VAULT_STATE_SEED.as_bytes(), creator.key().as_ref()],
        bump = vault_state.bump,
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
        init_if_needed,
        payer = fan,
        space = 8 + FanStats::INIT_SPACE,
        seeds = [
            FAN_STATS_SEED.as_bytes(),
            vault_state.key().as_ref(),
            fan.key().as_ref()
        ],
        bump,
    )]
    pub fan_stats: Account<'info, FanStats>,
    #[account(
        mut,
        associated_token::mint = mint,
        associated_token::authority = fan,
        associated_token::token_program = token_program,
    )]
    pub fan_token_account: InterfaceAccount<'info, TokenAccount>,
    #[account(
        init,
        payer = fan,
        space = 8 + TipRecord::INIT_SPACE,
        seeds = [
            TIP_RECORD_SEED.as_bytes(),
            vault_state.key().as_ref(),
            vault_state.number_of_tips.to_le_bytes().as_ref()
        ],
        bump,
    )]
    pub tip_record: Account<'info, TipRecord>,
    pub token_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<TipCreator>, amount: u64, message: String) -> Result<()> {
    let fan = &ctx.accounts.fan;
    let vault_state = &mut ctx.accounts.vault_state;
    let fan_stats = &mut ctx.accounts.fan_stats;
    let tip_record = &mut ctx.accounts.tip_record;
    let clock = Clock::get()?;

    // Verify fan has enough funds to tip
    require!(amount <= fan.lamports(), CharisError::InsufficientFunds);
    require!(amount > 0, CharisError::InvalidAmount);
    require!(amount >= MIN_TIP_AMOUNT, CharisError::BelowMinimumTip);
    require!(amount <= MAX_TIP_AMOUNT, CharisError::ExceedsMaximumTip);
    require!(message.len() <= MAX_MESSAGE_LENGTH, CharisError::MessageTooLong);

    // Update vault state
    vault_state.number_of_tips = vault_state
        .number_of_tips
        .checked_add(1)
        .ok_or(CharisError::MathOverflow)?;
    vault_state.total_tips_received = vault_state
        .total_tips_received
        .checked_add(amount)
        .ok_or(CharisError::MathOverflow)?;

    // Update fan stats
    fan_stats.tipper = fan.key();
    fan_stats.total_tips = fan_stats
        .total_tips
        .checked_add(1)
        .ok_or(CharisError::MathOverflow)?;
    fan_stats.total_amount = fan_stats
        .total_amount
        .checked_add(amount)
        .ok_or(CharisError::MathOverflow)?;
    if amount > fan_stats.biggest_tip {
        fan_stats.biggest_tip = amount;
    }
    fan_stats.last_tip = clock.unix_timestamp;
    fan_stats.bump = ctx.bumps.fan_stats;

    // Create tip record
    tip_record.creator_vault = vault_state.key();
    tip_record.fan = fan.key();
    tip_record.amount = amount;
    tip_record.timestamp = clock.unix_timestamp;
    tip_record.message = message;
    tip_record.bump = ctx.bumps.tip_record;

    // Transfer tokens
    let cpi_accounts = TransferChecked {
        from: ctx.accounts.fan_token_account.to_account_info(),
        to: ctx.accounts.vault.to_account_info(),
        authority: fan.to_account_info(),
        mint: ctx.accounts.mint.to_account_info(),
    };
    let cpi_ctx = CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts);
    transfer_checked(cpi_ctx, amount, ctx.accounts.mint.decimals)?;

    Ok(())
}
