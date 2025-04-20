import { Listener } from "@sapphire/framework";
import {
  Collection,
  GuildTextBasedChannel,
  Message,
  PermissionFlagsBits,
  TextChannel,
  User,
} from "discord.js";
import i18next from "i18next";
import Member, { IMember } from "../schemas/Member";
import ms from "ms";
import Guild, { IGuild } from "../schemas/Guild";
import RoleReward from "../schemas/RoleReward";

export class messageCreateListener extends Listener {
  public constructor(
    context: Listener.LoaderContext,
    options: Listener.Options,
  ) {
    super(context, {
      ...options,
      event: "messageCreate",
      once: false,
    });
  }

  coinCooldowns = new Collection<User, number>();
  expCooldowns = new Collection<User, number>();

  // TODO: Remove member and guild checking from all of the methods

  private getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  private processPings(message: Message) {
    if (message.content.includes("@everyone") || message.content.includes("@here")) {
      if (!message.member?.permissions.has(PermissionFlagsBits.MentionEveryone))
        message.react("🤡");
    }
  }

  private async giveCoins(
    message: Message,
    guild: IGuild | null,
    member: IMember | null,
  ) {
    const memberId = message.author.id;
    let cooldown, min, max;
    if (guild) {
      cooldown = ms(guild.coins.cooldown);
      min = guild.coins.min;
      max = guild.coins.max;
    } else {
      const guild = new Guild({ id: process.env.GUILD_ID });
      guild.save();
      cooldown = ms(guild.coins.cooldown);
      min = guild.coins.min;
      max = guild.coins.max;
    }

    if (!this.coinCooldowns.has(message.author)) {
      this.coinCooldowns.set(message.author, 0);
    }
    const now = Date.now();

    if (!message.author.bot) {
      if ((this.coinCooldowns.get(message.author) as number) >= now - cooldown)
        return;
      this.coinCooldowns.set(message.author, now);

      const addedCoins = this.getRandomInt(min, max);
      if (member) {
        await Member.updateOne(
          {
            memberId: memberId,
          },
          {
            coins: member.coins + addedCoins,
          },
        );
      } else {
        await Member.create({ memberId: memberId, coins: addedCoins });
      }
    }
  }

  private async processRoles(message: Message, member: IMember) {
    const level = member.level;
    const roles = await RoleReward.find();
    try {
      if (roles && message.member) {
        let roleReward = await RoleReward.findOne({
          level: level,
        });
        if (roleReward) {
          roles.forEach((role) => {
            if (message.member!.roles.cache.has(role.id))
              message.member!.roles.remove(role.id);
          });
          message.member!.roles.add(roleReward!.id);
        }
      }
    } catch (err: any) {
      this.container.logger.error(err);
    }
  }

  private async processExp(
    message: Message,
    member: IMember,
    addedExp: number,
  ) {
    const totalExp = member.exp + addedExp;
    let level;
    if (member.level) level = member.level;
    else {
      await Member.updateOne({ memberId: message.author.id }, { level: 0 });
      level = 0;
    }
    const reqExp = 100 * (level + 1) + Math.pow(level, 2) * 50;
    if (totalExp > reqExp) {
      await Member.updateOne(
        { memberId: message.author.id },
        { level: level + 1 },
      );

      if (!message.channel.isSendable()) return;

      message.channel.send(
        `<@${message.author.id}> достиг ${level + 1} уровня!`,
      );

      const newMember = await Member.findOne({ memberId: member.memberId });
      this.processRoles(message, newMember!);
    }
  }

  private async giveExp(
    message: Message,
    guild: IGuild | null,
    member: IMember | null,
  ) {
    const memberId = message.author.id;
    let cooldown, min, max;
    if (guild) {
      cooldown = ms(guild.exp.cooldown);
      min = guild.exp.min;
      max = guild.exp.max;
    } else {
      const guild = new Guild({ id: process.env.GUILD_ID });
      guild.save();
      cooldown = ms(guild.exp.cooldown);
      min = guild.exp.min;
      max = guild.exp.max;
    }

    if (!this.expCooldowns.has(message.author)) {
      this.expCooldowns.set(message.author, 0);
    }
    const now = Date.now();
    if (!message.author.bot) {
      if ((this.expCooldowns.get(message.author) as number) >= now - cooldown)
        return;
      this.expCooldowns.set(message.author, now);

      const addedExp = this.getRandomInt(min, max);
      if (member) {
        await Member.updateOne(
          {
            memberId: memberId,
          },
          {
            exp: member.exp + addedExp,
          },
        );
        await this.processExp(message, member, addedExp);
      } else {
        const member = new Member({ memberId: memberId, exp: addedExp });
        await this.processExp(message, member, addedExp);
      }
    }
  }

  private processLinks(message: Message) {
    if (
      message.content.startsWith("https://tenor.com/") &&
      !message.member
        ?.permissionsIn(message.channel as TextChannel)
        .has("EmbedLinks")
    ) {
      message.reply(i18next.t("listeners.messageCreate.cantSendGifs"));
    }
  }

  private async processCommands(message: Message, guild: IGuild) {
    enum bots {
      DSMonitoring = "575776004233232386",
      SDCMonitoring = "464272403766444044",
      ServerMonitoring = "315926021457051650",
    }
    const bot = message.author;
    const interaction = message.interaction;
    let author, authorRecord;
    let description, regex;

    if (bot.id == bots.DSMonitoring && interaction?.commandName == "like") {
      description = message.embeds[0]?.description;
      if (!description) return;

      regex = new RegExp("Вы успешно лайкнули");
      if (!regex.test(description)) return;

      author = interaction.user;

      authorRecord = await Member.findOne({ memberId: author.id });
      await authorRecord?.updateOne({
        coins: authorRecord.coins + guild.coins.bumpReward,
      });

      message.reply(
        i18next.t("listeners.messageCreate.bumpRewarded", {
          memberId: author.id,
          coins: guild.coins.bumpReward,
        }),
      );
    }

    if (bot.id == bots.SDCMonitoring && interaction?.commandName == "up") {
      if (message.embeds.length == 0) return;

      author = interaction.user;

      authorRecord = await Member.findOne({ memberId: author.id });
      await authorRecord?.updateOne({
        coins: authorRecord.coins + guild.coins.bumpReward,
      });

      message.reply(
        i18next.t("listeners.messageCreate.bumpRewarded", {
          memberId: author.id,
          coins: guild.coins.bumpReward,
        }),
      );
    }

    if (bot.id == bots.ServerMonitoring) {
      description = message.embeds[0]?.description;
      if (!description) return;

      regex = new RegExp("Server bumped");
      if (!regex.test(description)) return;

      const authorId = description.match(/<@(\d+)>/);
      if (!authorId) return;

      author = await message.guild?.members.fetch(authorId[1]);

      authorRecord = await Member.findOne({ memberId: author?.id });
      await authorRecord?.updateOne({
        coins: authorRecord.coins + guild.coins.bumpReward,
      });

      message.reply(
        i18next.t("listeners.messageCreate.bumpRewarded", {
          memberId: author?.id,
          coins: guild.coins.bumpReward,
        }),
      );
    }
  }

  public override async run(message: Message) {
    if (message.system) return;

    const guild = await Guild.findOne({ id: process.env.GUILD_ID });
    if (!guild) return;

    if (!message.author.bot) {
      const member = await Member.findOne({ memberId: message.author.id });

      await this.giveCoins(message, guild, member);
      await this.giveExp(message, guild, member);

      this.processPings(message);
      this.processLinks(message);
    } else {
      await this.processCommands(message, guild);
    }
  }
}
