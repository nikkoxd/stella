import {
  InteractionHandler,
  InteractionHandlerTypes,
} from "@sapphire/framework";
import {
  ActionRowBuilder,
  ButtonInteraction,
  ChannelType,
  ComponentType,
  GuildChannel,
  PermissionFlagsBits,
  UserSelectMenuBuilder,
} from "discord.js";
import Guild from "../schemas/Guild";
import i18next from "i18next";

export class OptionsButtonHandler extends InteractionHandler {
  public constructor(
    ctx: InteractionHandler.LoaderContext,
    options: InteractionHandler.Options,
  ) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.Button,
    });
  }

  public override parse(interaction: ButtonInteraction) {
    return interaction.customId.startsWith("rooms-")
      ? this.some()
      : this.none();
  }

  public async run(interaction: ButtonInteraction) {
    const guildConfig = await Guild.findOne({ id: process.env.GUILD_ID });
    if (!guildConfig) return;

    if (!interaction.guild) return;
    if (!interaction.channel) return;

    if (interaction.channel.type != ChannelType.GuildVoice) return;
    if (interaction.channel.parentId != guildConfig.rooms.category) return;

    if (!interaction.channel.permissionsFor(interaction.user)) return;

    if (
      !interaction.channel
        .permissionsFor(interaction.user)!
        .has(PermissionFlagsBits.ManageChannels)
    ) {
      interaction.reply({
        content: i18next.t(
          "interaction-handlers.optionsButton.notChannelOwner",
        ),
        ephemeral: true,
      });
      return;
    }

    switch (interaction.customId) {
      case "rooms-lock":
        interaction.channel.permissionOverwrites.create(interaction.guild.id, {
          Connect: false,
        });

        interaction.reply({
          content: i18next.t("interaction-handlers.optionsButton.locked"),
          ephemeral: true,
        });
        break;
      case "rooms-unlock":
        interaction.channel.permissionOverwrites.create(interaction.guild.id, {
          Connect: true,
        });

        interaction.reply({
          content: i18next.t("interaction-handlers.optionsButton.unlocked"),
          ephemeral: true,
        });
        break;
      case "rooms-newmod":
        const reply = await interaction.deferReply({
          ephemeral: true,
          fetchReply: true,
        });

        const selectMenu = new UserSelectMenuBuilder()
          .setCustomId("rooms-newmod-select")
          .setPlaceholder(
            i18next.t("interaction-handlers.optionsButton.newMod.select"),
          );

        const row = new ActionRowBuilder<UserSelectMenuBuilder>().addComponents(
          selectMenu,
        );

        interaction.editReply({ components: [row] });

        const collector = reply.createMessageComponentCollector({
          componentType: ComponentType.UserSelect,
          time: 60_000,
        });

        collector.on("collect", async (collectedInteraction) => {
          if (!collectedInteraction.channel) return;
          if (!collectedInteraction.guild) return;

          (
            collectedInteraction.channel as GuildChannel
          ).permissionOverwrites.create(collectedInteraction.values[0], {
            Connect: true,
            ManageChannels: true,
          });

          collectedInteraction.reply({
            content: i18next.t(
              "interaction-handlers.optionsButton.newMod.success",
            ),
            ephemeral: true,
          });
        });
        break;
      default:
        interaction.reply({ content: "Not implemented", ephemeral: true });
        break;
    }
  }
}
