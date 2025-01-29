use crate::commands::serenity;
use crate::{Context, Error};

/// Give exp or balance to user
#[poise::command(
    slash_command,
    prefix_command,
    subcommands("exp", "coins"),
    name_localized("ru", "дать"),
    description_localized("ru", "Дать опыт или монеты")
)]
pub async fn give(ctx: Context<'_>) -> Result<(), Error> {
    ctx.say("This command is supposed to be used with subcommands\nTry `!give exp` or `!give coins`").await?;
    Ok(())
}

/// Give exp to user
#[poise::command(
    slash_command,
    prefix_command,
    name_localized("ru", "опыт"),
    description_localized("ru", "Дать опыт")
)]
pub async fn exp(
    ctx: Context<'_>,
    #[description = "Member to give exp to"]
    member: serenity::User,
    #[description = "Amount of exp to give"]
    amount: i32
) -> Result<(), Error> {
    let member_tag = member.tag();
    
    match sqlx::query("update members set exp = exp + $1 where id = $2")
        .bind(amount)
        .bind(i64::from(member.id))
        .execute(&ctx.data().pool)
        .await
    {
        Ok(_) => {
            ctx.say(format!("Gave {amount} exp to {member_tag}")).await?;
        }
        Err(e) => {
            ctx.say(format!("Failed to give {amount} exp to {member_tag}: {e}")).await?;
        }
    }

    Ok(())
}

/// Give balance to user
#[poise::command(
    slash_command,
    prefix_command,
    name_localized("ru", "монеты"),
    description_localized("ru", "Дать монеты")
)]
pub async fn coins(
    ctx: Context<'_>,
    #[description = "Member to give balance to"]
    member: serenity::User,
    #[description = "Amount of balance to give"]
    amount: i32
) -> Result<(), Error> {
    let member_tag = member.tag();

    match sqlx::query("update members set balance = balance + $1 where id = $2")
        .bind(amount)
        .bind(i64::from(member.id))
        .execute(&ctx.data().pool)
        .await
    {
        Ok(_) => {
            ctx.say(format!("Gave {amount} coins to {member_tag}")).await?;
        }
        Err(e) => {
            ctx.say(format!("Failed to give {amount} coins to {member_tag}: {e}")).await?;
        }
    }

    Ok(())
}
