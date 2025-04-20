import { Command } from "@sapphire/framework";
import {
  ActionRowBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ChannelType,
  PermissionFlagsBits,
  StringSelectMenuBuilder,
  TextChannel,
} from "discord.js";
import i18next from "i18next";
import Message from "../schemas/Message";

export class SendMessageCommand extends Command {
  public constructor(ctx: Command.LoaderContext, options: Command.Options) {
    super(ctx, { ...options });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName("sendmsg")
          .setDescription(i18next.t("commands.sendMessage.description"))
          .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
          .addStringOption((option) =>
            option
              .setName(i18next.t("commands.sendMessage.options.id.name"))
              .setDescription(
                i18next.t("commands.sendMessage.options.id.description"),
              )
              .setRequired(true),
          )
          .addChannelOption((option) =>
            option
              .setName(i18next.t("commands.sendMessage.options.channel.name"))
              .setDescription(
                i18next.t("commands.sendMessage.options.channel.description"),
              )
              .setRequired(false)
              .addChannelTypes(ChannelType.GuildText),
          ),
      { idHints: [process.env.SENDMSG_ID as string] },
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const name = interaction.options.getString(
      i18next.t("commands.sendMessage.options.id.name"),
      true,
    );
    const message = await Message.findOne({ name: name });

    if (message) {
      try {
        const channel: TextChannel | null = interaction.options.getChannel(
          i18next.t("commands.sendMessage.options.channel.name"),
        );
        let attachments = [];

        // ATTACHMENTS

        if (message.attachments) {
          for (let index = 0; index < message.attachments.length; index++) {
            const fileName = message.attachments[index];
            const path = `./dist/attachments/${fileName}`;
            const file = new AttachmentBuilder(path);
            try {
              attachments.push(file);
            } catch (err) {
              this.container.client.error(err, interaction);
            }
          }
        }

        // ROWS

        let rows = [];

        if (message.rows) {
          for (let i = 0; i < message.rows.length; i++) {
            const row = message.rows[i];
            let rowComponent;
            if (row.buttons.length != 0) {
              rowComponent = new ActionRowBuilder<ButtonBuilder>();
              let buttons: ButtonBuilder[] = [];
              for (let j = 0; j < row.buttons.length; j++) {
                const button = row.buttons[j];
                const buttonComponent = new ButtonBuilder(button);
                buttons.push(buttonComponent);
              }
              rowComponent.addComponents(buttons);
              rows.push(rowComponent);
            } else if (row.buttons.length != 0) {
              rowComponent = new ActionRowBuilder<StringSelectMenuBuilder>();
              let selectMenus: StringSelectMenuBuilder[] = [];
              for (let j = 0; j < row.selectMenus.length; j++) {
                const selectMenu = row.selectMenus[j];
                const selectMenuComponent = new StringSelectMenuBuilder(
                  selectMenu,
                );
                selectMenus.push(selectMenuComponent);
              }
              rowComponent.addComponents(selectMenus);
              rows.push(rowComponent);
            }
          }
        }

        if (channel) {
          channel.send({
            content: message.content,
            embeds: message.embeds,
            components: rows,
            files: attachments,
          });
        } else {
          if (!interaction.channel?.isSendable()) return;

          interaction.channel.send({
            content: message.content,
            embeds: message.embeds,
            components: rows,
            files: attachments,
          });
        }

        interaction.reply({
          content: i18next.t("commands.sendMessage.success"),
          ephemeral: true,
        });
      } catch (err: any) {
        this.container.client.error(interaction, err);
      }
    } else {
      this.container.logger.error(`Message ${name} not found`);
    }
  }
}
