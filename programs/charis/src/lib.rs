#![allow(deprecated, unexpected_cfgs)]
use anchor_lang::prelude::*;

mod constants;
mod errors;
mod events;
mod instructions;
mod states;

use instructions::*;

declare_id!("DDkLjak8nU9GRs1L9v3SPkXYXj8357qFr6JCSPPsuPqZ");

#[program]
pub mod charis {
    use super::*;

    pub fn initialize_creator(
        ctx: Context<InitializeCreator>,
        name: String,
        bio: String,
    ) -> Result<()> {
        initialize_creator::handler(ctx, name, bio)
    }

    pub fn tip_creator(ctx: Context<TipCreator>, amount: u64, message: String) -> Result<()> {
        tip_creator::handler(ctx, amount, message)
    }

    pub fn withdraw_tips(ctx: Context<WithdrawTips>, amount: u64) -> Result<()> {
        withdraw_tips::handler(ctx, amount)
    }
}
