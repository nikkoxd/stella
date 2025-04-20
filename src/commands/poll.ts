import { Subcommand } from "@sapphire/plugin-subcommands";
import { ChannelType, Message, PermissionFlagsBits } from "discord.js";
import i18next from "i18next";
import Guild from "../schemas/Guild";

export class pollCommand extends Subcommand {
  constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
    super(context, {
      ...options,
      name: "poll",
      subcommands: [
        {
          name: "start",
          chatInputRun: "chatInputStart",
        },
        {
          name: "edit",
          chatInputRun: "chatInputEdit",
        },
        {
          name: "end",
          chatInputRun: "chatInputEnd",
        },
      ],
    });
  }

  registerApplicationCommands(registry: Subcommand.Registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName("poll")
          .setDescription(i18next.t("commands.poll.description"))
          .setDefaultMemberPermissions(PermissionFlagsBits.ManageEvents)
          .addSubcommand((command) =>
            command
              .setName("start")
              .setDescription(i18next.t("commands.poll.start.description"))
              .addStringOption((option) =>
                option
                  .setName(i18next.t("commands.poll.start.options.text.name"))
                  .setDescription(
                    i18next.t("commands.poll.start.options.text.description"),
                  )
                  .setRequired(true),
              )
              .addChannelOption((option) =>
                option
                  .setName(
                    i18next.t("commands.poll.start.options.channel.name"),
                  )
                  .setDescription(
                    i18next.t(
                      "commands.poll.start.options.channel.description",
                    ),
                  )
                  .setRequired(false),
              ),
          )
          .addSubcommand((command) =>
            command
              .setName("edit")
              .setDescription(i18next.t("commands.poll.edit.description"))
              .addStringOption((option) =>
                option
                  .setName(i18next.t("commands.poll.edit.options.id.name"))
                  .setDescription(
                    i18next.t("commands.poll.edit.options.id.description"),
                  )
                  .setRequired(true),
              )
              .addStringOption((option) =>
                option
                  .setName(i18next.t("commands.poll.edit.options.text.name"))
                  .setDescription(
                    i18next.t("commands.poll.edit.options.text.description"),
                  )
                  .setRequired(true),
              ),
          )
          .addSubcommand((command) =>
            command
              .setName("end")
              .setDescription(i18next.t("commands.poll.end.description"))
              .addStringOption((option) =>
                option
                  .setName(i18next.t("commands.poll.end.options.id.name"))
                  .setDescription(
                    i18next.t("commands.poll.end.options.id.description"),
                  )
                  .setRequired(true),
              ),
          ),
      { idHints: [process.env.POLL_ID as string] },
    );
  }

  public async chatInputStart(
    interaction: Subcommand.ChatInputCommandInteraction,
  ) {
    const text = interaction.options.getString(
      i18next.t("commands.poll.start.options.text.name"),
      true,
    );
    const channel = interaction.options.getChannel(
      i18next.t("commands.poll.start.options.channel.name"),
      false,
      [ChannelType.GuildText],
    );

    try {
      const guild = await Guild.findOne({ id: process.env.GUILD_ID });
      let reactYes, reactNo;

      if (guild) {
        reactYes = guild.reactions.yes;
        reactNo = guild.reactions.no;
      } else {
        const guild = new Guild({ id: process.env.GUILD_ID });
        guild.save();

        reactYes = guild.reactions.yes;
        reactNo = guild.reactions.no;
      }

      if (channel) {
        const msg = await channel.send(`📊 **${text}**`);
        msg.react(reactYes);
        msg.react(reactNo);

        // prettier-ignore
        interaction.reply({
          content: `${i18next.t("commands.poll.success")}\n${i18next.t("commands.poll.link",)} <#${channel.id}>`,
          ephemeral: true,
        });
      } else {
        const channel = interaction.channel;

        if (!channel) return;
        if (!channel.isSendable()) return;

        const msg = await channel.send(`📊 **${text}**`);
        msg.react(reactYes);
        msg.react(reactNo);

        interaction.reply({
          content: i18next.t("commands.poll.success"),
          ephemeral: true,
        });
      }
    } catch (err) {
      this.container.client.error(err, interaction);
    }
  }

  public async chatInputEdit(
    interaction: Subcommand.ChatInputCommandInteraction,
  ) {
    const messageID = interaction.options.getString(
      i18next.t("commands.poll.edit.options.id.name"),
      true,
    );
    const message = interaction.channel?.messages.fetch(messageID);
    const text = interaction.options.getString(
      i18next.t("commands.poll.edit.options.text.name"),
      true,
    );

    try {
      (await message)?.edit(`📊 **${text}**`);
      interaction.reply({
        content: i18next.t("commands.poll.edited"),
        ephemeral: true,
      });
    } catch (err) {
      this.container.client.error(err, interaction);
    }
  }

  public async chatInputEnd(
    interaction: Subcommand.ChatInputCommandInteraction,
  ) {
    const messageID = interaction.options.getString(
      i18next.t("commands.poll.end.options.id.name"),
      true,
    );
    const message = interaction.channel?.messages.fetch(messageID);

    try {
      if ((await message)?.reactions.cache.size) {
        const text = (await message)?.content;
        const reactions = (await message)?.reactions.cache;
        let reactionsYes;
        let reactionsNo;
        // Get reactions
        if (process.env.REACT_YES && process.env.REACT_NO) {
          reactionsYes = (await reactions)?.get(process.env.REACT_YES)?.count;
          reactionsNo = (await reactions)?.get(process.env.REACT_NO)?.count;
        } else {
          reactionsYes = (await reactions)?.get("👍")?.count;
          reactionsNo = (await reactions)?.get("👎")?.count;
        }
        // Edit the message
        (await message)?.edit(
          `${text?.replace("📊", "🔒")}\n${i18next.t("poll.for")} - ${
            (reactionsYes as number) - 1
          }   ${i18next.t("poll.against")} - ${(reactionsNo as number) - 1}`,
        );
        // Remove all reactions
        (await message)?.reactions.removeAll();
        interaction.reply({
          content: i18next.t("commands.poll.ended"),
          ephemeral: true,
        });
      } else {
        throw new Error(
          "Message is either not a poll or the poll has already ended",
        );
      }
    } catch (err) {
      this.container.client.error(err, interaction);
    }
  }
}
