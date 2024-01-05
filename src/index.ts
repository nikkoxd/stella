// Import sequelize
import { Sequelize } from "sequelize";
// Import necessary sapphire.js & discord.js classes
import "@sapphire/plugin-logger/register";
import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
// Import i18next
import i18next from "i18next";
import I18NexFsBackend, { FsBackendOptions } from "i18next-fs-backend";
// Import .env
import "dotenv/config";

// Create a new client instance
const client = new SapphireClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

// Connect to a database
export const sequelize = new Sequelize(process.env.POSTGRES_URL as string);

// Configure i18next
i18next.use(I18NexFsBackend).init<FsBackendOptions>(
  {
    lng: process.env.LANGUAGE,
    fallbackLng: "en",
    preload: ["en", "ru"],
    ns: ["translation"],
    defaultNS: "translation",
    backend: {
      loadPath: "./locales/{{lng}}/{{ns}}.json",
    },
  },
  (err, t) => {
    if (err) return client.logger.error(err);
    client.logger.info("i18next is ready...");
  },
);

client.logger.info("Running on", process.env.NODE_ENV);
// Login to Discord with client's token
client.login(process.env.TOKEN);
