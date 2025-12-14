use anchor_lang::prelude::*;
use anchor_lang::system_program;

use crate::{
    constants::{
        FAN_STATS_SEED, MAX_MESSAGE_LENGTH, MAX_TIP_AMOUNT, MIN_TIP_AMOUNT, TIP_RECORD_SEED,
        VAULT_SEED, VAULT_STATE_SEED,
    },
    errors::CharisError,
    states::{FanStats, TipRecord, VaultState},
};

#[derive(Accounts)]
pub struct SendTip<'info> {
    #[account(mut)]
    pub fan: Signer<'info>,

    /// CHECK: Creator's public key
    pub creator: SystemAccount<'info>,

    #[account(
        mut,
        seeds = [VAULT_STATE_SEED.as_bytes(), creator.key().as_ref()],
        bump = vault_state.vault_state_bump,
    )]
    pub vault_state: Account<'info, VaultState>,

    /// CHECK: SOL vault PDA
    #[account(
        mut,
        seeds = [VAULT_SEED.as_bytes(), creator.key().as_ref()],
        bump,
    )]
    pub vault: AccountInfo<'info>,

    #[account(
        init_if_needed,
        payer = fan,
        space = 8 + FanStats::INIT_SPACE,
        seeds = [FAN_STATS_SEED.as_bytes(), fan.key().as_ref()],
        bump,
    )]
    pub fan_stats: Account<'info, FanStats>,

    #[account(
        init,
        payer = fan,
        space = 8 + TipRecord::INIT_SPACE,
        seeds = [
            TIP_RECORD_SEED.as_bytes(),
            fan.key().as_ref(),
            &vault_state.total_no_tips_received.to_le_bytes()
        ],
        bump,
    )]
    pub tip_record: Account<'info, TipRecord>,

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<SendTip>, amount: u64, message: String) -> Result<()> {
    let fan = &ctx.accounts.fan;
    let creator = &ctx.accounts.creator;
    let vault = &ctx.accounts.vault;
    let vault_state = &mut ctx.accounts.vault_state;
    let fan_stats = &mut ctx.accounts.fan_stats;
    let tip_record = &mut ctx.accounts.tip_record;
    let clock = Clock::get()?;
    let now = clock.unix_timestamp;
    let month_seconds = 30i64.wrapping_mul(24).wrapping_mul(60).wrapping_mul(60);

    // Validations
    require!(amount > 0, CharisError::InvalidAmount);
    require!(amount >= MIN_TIP_AMOUNT, CharisError::BelowMinimumTip);
    require!(amount <= MAX_TIP_AMOUNT, CharisError::ExceedsMaximumTip);
    require!(
        message.len() <= MAX_MESSAGE_LENGTH,
        CharisError::MessageTooLong
    );
    require!(fan.lamports() >= amount, CharisError::InsufficientFunds);
    require!(creator.key() != fan.key(), CharisError::SelfTip);

    // Reset monthly stats if a month has passed
    if now.wrapping_sub(vault_state.month_start_timestamp) >= month_seconds {
        vault_state.tips_this_month = 0;
        vault_state.month_start_timestamp = now;
    }

    // Check if first-time supporter
    let is_first_time = fan_stats.first_tip_at == 0;
    if is_first_time {
        vault_state.total_supporters = vault_state
            .total_supporters
            .checked_add(1)
            .ok_or(CharisError::MathOverflow)?;
    }

    // Update fan stats
    fan_stats.fan = fan.key();
    fan_stats.total_tips_sent = fan_stats
        .total_tips_sent
        .checked_add(1)
        .ok_or(CharisError::MathOverflow)?;
    fan_stats.total_amount_sent = fan_stats
        .total_amount_sent
        .checked_add(amount)
        .ok_or(CharisError::MathOverflow)?;

    if amount > fan_stats.biggest_tip {
        fan_stats.biggest_tip = amount;
    }
    if fan_stats.smallest_tip == 0 || amount < fan_stats.smallest_tip {
        fan_stats.smallest_tip = amount;
    }
    if fan_stats.first_tip_at == 0 {
        fan_stats.first_tip_at = now;
    }
    fan_stats.last_tip_at = now;
    fan_stats.bump = ctx.bumps.fan_stats;

    // Update vault state
    vault_state.total_no_tips_received = vault_state
        .total_no_tips_received
        .checked_add(1)
        .ok_or(CharisError::MathOverflow)?;
    vault_state.total_amount_of_tips_received = vault_state
        .total_amount_of_tips_received
        .checked_add(amount)
        .ok_or(CharisError::MathOverflow)?;
    vault_state.total_earnings = vault_state.total_amount_of_tips_received;
    vault_state.tips_this_month = vault_state
        .tips_this_month
        .checked_add(amount)
        .ok_or(CharisError::MathOverflow)?;
    vault_state.last_tip_at = now;
    vault_state.average_tip = vault_state
        .total_amount_of_tips_received
        .checked_div(vault_state.total_no_tips_received)
        .unwrap_or(0);

    // Create tip record
    tip_record.creator_vault = vault.key();
    tip_record.creator = creator.key();
    tip_record.fan = fan.key();
    tip_record.amount = amount;
    tip_record.timestamp = now;
    tip_record.message = message;
    tip_record.is_anonymous = false;
    tip_record.bump = ctx.bumps.tip_record;

    // Transfer SOL from fan to vault
    system_program::transfer(
        CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: fan.to_account_info(),
                to: vault.to_account_info(),
            },
        ),
        amount,
    )?;

    msg!(
        "Tip sent: {} lamports from {} to {}",
        amount,
        fan.key(),
        creator.key()
    );

    Ok(())
}
