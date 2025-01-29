use anyhow::Context as _;
use poise::serenity_prelude::{ClientBuilder, GatewayIntents};
use shuttle_runtime::SecretStore;
use shuttle_serenity::ShuttleSerenity;
use poise::serenity_prelude::model::id::UserId;
use tokio::sync::Mutex;
use std::collections::HashMap;

mod commands;
mod event_handler;
mod utils;

struct Data {
    pool: sqlx::PgPool,
    exp_cooldowns: Mutex<HashMap<UserId, std::time::Instant>>,
    balance_cooldowns: Mutex<HashMap<UserId, std::time::Instant>>,
}
type Error = Box<dyn std::error::Error + Send + Sync>;
type Context<'a> = poise::Context<'a, Data, Error>;

#[shuttle_runtime::main]
async fn main(#[shuttle_shared_db::Postgres(
        local_uri = "{secrets.DATABASE_URL}",
)] pool: sqlx::PgPool, #[shuttle_runtime::Secrets] secret_store: SecretStore) -> ShuttleSerenity {
    sqlx::migrate!()
        .run(&pool)
        .await
        .expect("Failed to run migrations");

    let discord_token = secret_store
        .get("DISCORD_TOKEN")
        .context("'DISCORD_TOKEN' was not found")?;

    let intents = GatewayIntents::non_privileged()
        | GatewayIntents::MESSAGE_CONTENT
        | GatewayIntents::GUILD_MEMBERS;

    let framework = poise::Framework::builder()
        .options(poise::FrameworkOptions {
            commands: vec![
                commands::ping(),
                commands::register(),
                commands::setup(),
                commands::welcome(),
                commands::help(),
                commands::level(),
                commands::balance(),
                commands::give(),
            ],
            pre_command: |ctx| {
                Box::pin(async move {
                    let user_name = ctx.author().tag();
                    let command_name = &ctx.command().name;
                    tracing::info!("Command triggered by {user_name}: {command_name:?}");
                })
            },
            post_command: |ctx| {
                Box::pin(async move {
                    let command_name = &ctx.command().name;
                    tracing::info!("Command executed: {command_name:?}");
                })
            },
            prefix_options: poise::PrefixFrameworkOptions {
                prefix: Some("!".to_string()),
                ..Default::default()
            },
            event_handler: |ctx, event, _framework, data| {
                Box::pin(async move {
                    event_handler::event_handler(ctx, event, data).await
                })
            },
            ..Default::default()
        })
        .setup(|_ctx, _ready, _framework| {
            Box::pin(async move {
                // poise::builtins::register_globally(ctx, &framework.options().commands).await?;
                Ok(Data{
                    pool,
                    exp_cooldowns: Mutex::new(HashMap::new()),
                    balance_cooldowns: Mutex::new(HashMap::new()),
                })
            })
        })
        .build();

    let client = ClientBuilder::new(discord_token, intents)
        .framework(framework)
        .await
        .map_err(shuttle_runtime::CustomError::new)?;

    Ok(client.into())
}
