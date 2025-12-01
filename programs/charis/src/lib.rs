use anchor_lang::prelude::*;

declare_id!("DDkLjak8nU9GRs1L9v3SPkXYXj8357qFr6JCSPPsuPqZ");

#[program]
pub mod charis {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
