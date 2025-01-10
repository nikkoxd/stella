use crate::{Context, Error};

#[poise::command(slash_command)]
pub async fn ping(ctx: Context<'_>) -> Result<(), Error> {
    let ping = ctx.ping().await;
    ctx.say(format!("Pong! Response time: {ping:?}")).await?;
    Ok(())
}
