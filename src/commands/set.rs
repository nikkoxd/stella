use crate::commands::serenity;
use crate::{Context, Error};

/// Set exp or balance of user
#[poise::command(
    slash_command,
    prefix_command,
    subcommands("exp", "coins"),
    name_localized("ru", "установить"),
    description_localized("ru", "Установить опыт или монеты")
)]
pub async fn set(ctx: Context<'_>) -> Result<(), Error> {
    ctx.say("This command is supposed to be used with subcommands\nTry `!set exp` or `!set coins`").await?;
    Ok(())
}

/// Set exp of user
#[poise::command(
    slash_command,
    prefix_command,
    name_localized("ru", "опыт"),
    description_localized("ru", "Установить опыт")
)]
pub async fn exp(
    ctx: Context<'_>,
    #[description = "Member to set exp of"]
    member: serenity::User,
    #[description = "Amount of exp to set"]
    amount: i32
) -> Result<(), Error> {
    let member_tag = member.tag();
    
    match sqlx::query("update members set exp = $1 where id = $2")
        .bind(amount)
        .bind(i64::from(member.id))
        .execute(&ctx.data().pool)
        .await
    {
        Ok(_) => {
            ctx.say(format!("Set {amount} exp to {member_tag}")).await?;
        }
        Err(e) => {
            ctx.say(format!("Failed to set {amount} exp to {member_tag}: {e}")).await?;
        }
    }

    Ok(())
}

/// Set balance of user
#[poise::command(
    slash_command,
    prefix_command,
    name_localized("ru", "монеты"),
    description_localized("ru", "Установить монеты")
)]
pub async fn coins(
    ctx: Context<'_>,
    #[description = "Member to set balance of"]
    member: serenity::User,
    #[description = "Amount of balance to set"]
    amount: i32
) -> Result<(), Error> {
    let member_tag = member.tag();

    match sqlx::query("update members set balance = $1 where id = $2")
        .bind(amount)
        .bind(i64::from(member.id))
        .execute(&ctx.data().pool)
        .await
    {
        Ok(_) => {
            ctx.say(format!("Set {amount} coins to {member_tag}")).await?;
        }
        Err(e) => {
            ctx.say(format!("Failed to set {amount} coins to {member_tag}: {e}")).await?;
        }
    }

    Ok(())
}
