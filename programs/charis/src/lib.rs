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
}
