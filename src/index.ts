import "@sapphire/plugin-logger/register";
import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";

import i18next from "i18next";
import I18NexFsBackend, { FsBackendOptions } from "i18next-fs-backend";

import mongoose from "mongoose";

import "dotenv/config";
import Guild, { IGuild } from "./schemas/Guild";
import { error, log } from "./logger";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Scheduler from "./scheduler";

export const app = express();

const port = process.env.PORT || 3000;

const requiredEnvVars = [
  "CLIENT_ID",
  "GUILD_ID",
  "TOKEN",
  "DB_USERNAME",
  "DB_PASSWORD",
];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Environment variable ${envVar} is not defined.`);
  }
}

// Creating a new instance of the Discord bot client
export const client = new SapphireClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildExpressions,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.logger.info("Running on", process.env.NODE_ENV);

// Initializing i18next for internationalization
function i18nConfig(guild: IGuild) {
  i18next.use(I18NexFsBackend).init<FsBackendOptions>(
    {
      lng: guild.language,
      fallbackLng: "en",
      preload: ["en", "ru"],
      ns: ["translation"],
      defaultNS: "translation",
      backend: {
        loadPath: "./locales/{{lng}}/{{ns}}.json",
      },
    },
    (err, _) => {
      if (err) return client.logger.error(err);
      client.logger.info("i18next is ready...");
    },
  );
}

async function init() {
  try {
    let config = await Guild.findOne({ id: process.env.GUILD_ID });
    if (!config) config = new Guild({ id: process.env.GUILD_ID });
    i18nConfig(config);

    client.error = error;
    client.log = log;
    client.scheduler = new Scheduler();

    await client.login(process.env.TOKEN);
    client.logger.info("Successfully connected to Discord API");
  } catch (error) {
    client.logger.error("Error starting bot:", error);
  }
}

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@database.9jp4vnl.mongodb.net/${process.env.GUILD_ID}?retryWrites=true&w=majority`,
  )
  .then(() => {
    client.logger.info("Connected to MongoDB");
    init();
  })
  .catch((error) => client.logger.error("Error connecting to MongoDB:", error));

app.use(bodyParser.json(), cors())

require("./routes/api")(app);

app.listen(port, () => {
  client.logger.info(`App listening on port ${port}`);
});
