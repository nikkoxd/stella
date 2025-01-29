use crate::{utils, Context, Error};
use poise::samples::HelpConfiguration;
use poise::serenity_prelude as serenity;
use sqlx::Row;

/// Get bot's ping
#[poise::command(
    slash_command, 
    prefix_command,
    category = "Utility",
    name_localized("ru", "пинг"),
    description_localized("ru", "Получить пинг бота"),
)]
pub async fn ping(ctx: Context<'_>) -> Result<(), Error> {
    let ping = ctx.ping().await;
    ctx.say(format!("Pong! Response time: {ping:?}")).await?;
    Ok(())
}

/// Register/unregister application commands
#[poise::command(
    prefix_command,
    hide_in_help,
    required_permissions = "ADMINISTRATOR",
)]
pub async fn register(ctx: Context<'_>) -> Result<(), Error> {
    poise::builtins::register_application_commands_buttons(ctx).await?;
    Ok(())
}

/// Setup guild
#[poise::command(
    slash_command,
    prefix_command,
    hide_in_help,
    required_permissions = "ADMINISTRATOR",
    name_localized("ru", "настройка"),
    description_localized("ru", "Настройка гильдии")
)]
pub async fn setup(ctx: Context<'_>) -> Result<(), Error> {
    let guild_id = ctx.guild_id().ok_or_else(|| anyhow::anyhow!("Not in a guild"))?;
    let pool = &ctx.data().pool;

    let guild_exists = sqlx::query("select 1 from guilds where id = $1")
        .bind(i64::from(guild_id))
        .fetch_optional(pool)
        .await?
        .is_some();

    if guild_exists {
        ctx.say("Guild has already been setup").await?;
    } else {
        sqlx::query("insert into guilds (id) values ($1)")
            .bind(i64::from(guild_id))
            .execute(pool)
            .await?;
        tracing::info!("Guild created in database: {guild_id:?}");
        ctx.say("Setup complete!").await?;
    }

    Ok(())
}

/// Test the welcome message
#[poise::command(
    slash_command,
    prefix_command,
    hide_in_help,
    required_permissions = "MANAGE_MESSAGES",
    name_localized("ru", "приветствие"),
    description_localized("ru", "Приветствие пользователя")
)]
pub async fn welcome(ctx: Context<'_>) -> Result<(), Error> {
    let user_id = ctx.author().id;
    let guild_id = ctx.guild_id().ok_or_else(|| anyhow::anyhow!("Not in a guild"))?;
    let pool = &ctx.data().pool;

    let row = sqlx::query("select welcome_role_id from guilds where id = $1")
        .bind(i64::from(guild_id))
        .fetch_one(pool)
        .await?;
    let welcome_role_id: Option<i64> = row.try_get("welcome_role_id").ok();

    let mut message = format!("Приветик, <@{}>, приветствуем тебя в нашем кафе! <a:hellow:1327303097751572583>", user_id);

    if let Some(role_id) = welcome_role_id {
        message.push_str(format!("\n<@&{}>", role_id).as_str());
    }

    ctx.say(message).await?;

    Ok(())
}

/// Help message
#[poise::command(
    prefix_command, 
    category = "Utility",
    name_localized("ru", "помощь"),
    description_localized("ru", "Помощь по командам")
)]
pub async fn help(
    ctx: Context<'_>,
    #[description = "Command to get help for"]
    #[rest]
    mut command: Option<String>,
) -> Result<(), Error> {
    if ctx.invoked_command_name() != "help" {
        command = match command {
            Some(c) => Some(format!("{} {}", ctx.invoked_command_name(), c)),
            None => Some(ctx.invoked_command_name().to_string()),
        };
    }
    let extra_text_at_bottom = "Type `!help command` for more info on a command.\nYou can edit your `?help` message to the bot and the bot will edit its response.";

    let config = HelpConfiguration {
        show_subcommands: true,
        show_context_menu_commands: true,
        ephemeral: true,
        extra_text_at_bottom,

        ..Default::default()
    };
    poise::builtins::help(ctx, command.as_deref(), config).await?;
    Ok(())
}

/// Print current level
#[poise::command(
    slash_command,
    prefix_command,
    name_localized("ru", "уровень"),
    description_localized("ru", "Узнать уровень")
)]
pub async fn level(
    ctx: Context<'_>,
    #[description = "Member to print the level of"]
    member: Option<serenity::User>
) -> Result<(), Error> {
    let mut member_id = ctx.author().id;

    if let Some(member) = member {
        member_id = member.id;
    }

    let row = sqlx::query("select exp, level from members where id = $1")
        .bind(i64::from(member_id))
        .fetch_optional(&ctx.data().pool)
        .await;

    let mut required_exp = utils::get_required_exp(1);
    if let Ok(Some(row)) = row {
        let exp: i32 = row.try_get("exp").unwrap();
        let level: i32 = row.try_get("level").unwrap();
        required_exp = utils::get_required_exp(level + 1);

        ctx.say(format!("**Уровень:** {level:?}\n**Опыт:** {exp:?}/{required_exp:?}")).await?;
    } else {
        ctx.say(format!("**Уровень:** 0\n**Опыт:** 0/{required_exp:?}")).await?;
    }

    Ok(())
}

/// Print current balance
#[poise::command(
    slash_command,
    prefix_command,
    name_localized("ru", "баланс"),
    description_localized("ru", "Узнать баланс")
)]
pub async fn balance(
    ctx: Context<'_>,
    #[description = "Member to print the balance of"]
    member: Option<serenity::User>
) -> Result<(), Error> {
    let mut member_id = ctx.author().id;

    if let Some(member) = member {
        member_id = member.id;
    }

    let row = sqlx::query("select balance from members where id = $1")
        .bind(i64::from(member_id))
        .fetch_optional(&ctx.data().pool)
        .await;

    if let Ok(Some(row)) = row {
        let balance: i32 = row.try_get("balance").unwrap();

        ctx.say(format!("**Баланс:** {balance:?}")).await?;
    } else {
        ctx.say(format!("**Баланс:** 0")).await?;
    }

    Ok(())
}

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
