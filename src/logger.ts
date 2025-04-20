import {
  Interaction,
  RepliableInteraction,
  TextChannel,
  EmbedBuilder
} from "discord.js";
import Guild from "./schemas/Guild";
import { client } from ".";
import i18next from "i18next";

export async function error(err: any, interaction: RepliableInteraction) {
  interaction.reply({
    content: `${i18next.t("logError")}\n\`\`\`${err}\`\`\``,
    ephemeral: true,
  });
  client.logger.error("Error reading message:", err);
}

export async function log(
  interaction: Interaction,
  title: string,
  description: string,
  color?: string | number,
): Promise<void> {
  const guild = interaction.guild;
  if (!guild) return;

  const config = await Guild.findOne({ id: guild.id });
  if (!config || !config.logChannel) return;

  const channel = guild.channels.cache.get(config.logChannel) as TextChannel;
  if (!channel) return;

  if (!color) {
    color = config.embedColor;
  }

  if (typeof color === "string") {
    color = parseInt(color, 16);
  }

  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(color)
    .setTimestamp(Date.now());

  channel.send({ embeds: [embed] });
}
