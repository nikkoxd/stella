import { Subcommand } from "@sapphire/plugin-subcommands";
import Member, { IMember } from "../schemas/Member";
import RoleReward, { IRoleReward } from "../schemas/RoleReward";
import { GuildMemberRoleManager } from "discord.js";
import i18next from "i18next";

export class GiveCommand extends Subcommand {
  public constructor(
    ctx: Subcommand.LoaderContext,
    options: Subcommand.Options,
  ) {
    super(ctx, {
      ...options,
      name: "give",
      subcommands: [
        {
          name: "coins",
          chatInputRun: "chatInputCoins",
        },
        {
          name: "exp",
          chatInputRun: "chatInputExp",
        },
      ],
    });
  }

  public override registerApplicationCommands(registry: Subcommand.Registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName("give")
          .setDescription("Give coins/exp")
          .addSubcommand((command) =>
            command
              .setName("coins")
              // TODO: Add translations
              .setDescription("Give coins to a member")
              .addUserOption((option) =>
                option
                  .setName("member")
                  .setDescription("Member")
                  .setRequired(true),
              )
              .addIntegerOption((option) =>
                option
                  .setName("coins")
                  .setDescription("Amount of coins")
                  .setRequired(true),
              ),
          )
          .addSubcommand((command) =>
            command
              .setName("exp")
              .setDescription("Give exp to a member")
              .addUserOption((option) =>
                option
                  .setName("member")
                  .setDescription("Member")
                  .setRequired(true),
              )
              .addIntegerOption((option) =>
                option
                  .setName("exp")
                  .setDescription("Amount of experience")
                  .setRequired(true),
              ),
          ),
      { idHints: [] },
    );
  }

  public async chatInputCoins(
    interaction: Subcommand.ChatInputCommandInteraction,
  ) {
    const member = interaction.options.getUser("member", true);
    const coins = interaction.options.getInteger("coins", true);

    try {
      const dbMember = await Member.findOne({ memberId: member.id });

      if (dbMember) {
        await dbMember.updateOne({ coins: dbMember.coins + coins });
      } else {
        await Member.create({ memberId: member.id, coins: coins });
      }

      this.container.client.log(
        interaction,
        i18next.t("commands.give.log.coins.title"),
        i18next.t("commands.give.log.coins.description", {
          moderatorId: interaction.user.id,
          memberId: member.id,
          oldBalance: dbMember ? dbMember.coins : 0,
          newBalance: dbMember ? dbMember.coins + coins : coins,
        }),
      );

      interaction.reply({
        content: `Баланс ${member.displayName} теперь составляет ${
          dbMember ? dbMember.coins + coins : coins
        } монеток`,
        ephemeral: true,
      });
    } catch (err: any) {
      this.container.client.error(err, interaction);
    }
  }

  private calculateLevel(exp: number): number {
    let level = 0;
    let reqExp = 0;

    while (exp >= reqExp) {
      reqExp = 100 * (level + 1) + Math.pow(level, 2) * 50;
      level++;
    }

    return level - 1;
  }

  private async processRoles(
    interaction: Subcommand.ChatInputCommandInteraction,
    member: IMember,
  ) {
    const roleManager = interaction.member!.roles as GuildMemberRoleManager;

    const level = member.level;
    const roles = await RoleReward.find().sort({ level: 1 });

    if (!roles) return;
    if (!interaction.member) return;

    try {
      let roleReward: IRoleReward | null = await RoleReward.findOne({
        level: level,
      });

      roles.forEach((role: IRoleReward) => {
        if (role.level <= level) {
          roleReward = role;
        }
        if (roleManager.cache.has(role.id)) {
          roleManager.remove(role.id);
        }
      });

      if (roleReward) roleManager.add(roleReward.id);
    } catch (error) {
      this.container.client.error(error, interaction);
    }
  }

  public async chatInputExp(
    interaction: Subcommand.ChatInputCommandInteraction,
  ) {
    const member = interaction.options.getUser("member", true);
    let exp = interaction.options.getInteger("exp", true);
    let level: number;

    try {
      let dbMember = await Member.findOne({ memberId: member.id });

      if (dbMember) {
        exp += dbMember.exp;
        level = this.calculateLevel(exp);

        await dbMember.updateOne({ exp: exp, level: level });
      } else {
        level = this.calculateLevel(exp);

        dbMember = new Member({ memberId: member.id, exp: exp, level: level });
        await dbMember.save();

        this.processRoles(interaction, dbMember);
      }

      this.container.client.log(
        interaction,
        i18next.t("commands.give.log.exp.title"),
        i18next.t("commands.give.log.exp.description", {
          moderatorId: interaction.user.id,
          memberId: member.id,
          oldExp: dbMember.exp,
          newExp: exp,
        }),
      );

      interaction.reply({
        content: `Опыт ${member.displayName} теперь составляет ${exp} и его уровень ${level}`,
        ephemeral: true,
      });
    } catch (err: any) {
      this.container.client.error(interaction, err);
    }
  }
}
