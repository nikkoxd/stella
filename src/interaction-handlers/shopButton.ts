import {
  InteractionHandler,
  InteractionHandlerTypes,
} from "@sapphire/framework";
import {
  EmbedBuilder,
  type ButtonInteraction,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  Role,
  ButtonBuilder,
  ComponentType,
} from "discord.js";
import i18next from "i18next";
import ShopItem, { IShopItem } from "../schemas/ShopItem";
import Member, { IMember } from "../schemas/Member";
import Guild from "../schemas/Guild";

export class ShopButtonHandler extends InteractionHandler {
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
    return interaction.customId == "shop" ? this.some() : this.none();
  }

  private createEmbedFields(role: Role, roleItem: IShopItem) {
    let value = `**${i18next.t("shop.price")}** ${roleItem.price} ${i18next.t("shop.coins")}`;
    if (roleItem.duration)
      value = `${value}\n**${i18next.t("shop.duration")}** ${roleItem.duration}`;
    return {
      name: role ? role.name : "Unknown Role",
      value,
      inline: true,
    };
  }

  private async fetchShopRoles(interaction: ButtonInteraction) {
    const roles = await ShopItem.find().sort({ price: -1 });
    return Promise.all(
      roles.map(async (roleItem: IShopItem) => {
        try {
          const role = await interaction.guild!.roles.fetch(roleItem.roleId);
          return { role, roleItem };
        } catch (error) {
          this.container.logger.error(
            `Error fetching role ${roleItem.roleId}:`,
            error,
          );
          return { role: null, roleItem };
        }
      }),
    );
  }

  private async createPageEmbed(
    page: number,
    itemsPerPage: number,
    memberItem: IMember,
    roleData: { role: Role | null; roleItem: IShopItem }[],
  ): Promise<EmbedBuilder> {
    const guild = await Guild.findOne({ id: process.env.GUILD_ID });
    const totalPages = Math.ceil(roleData.length / itemsPerPage);

    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;

    const embed = new EmbedBuilder()
      .setTitle(i18next.t("shop.title"))
      .setDescription(`${i18next.t("shop.balance")} ${memberItem!.coins}`)
      .setFooter({ text: `Страница: ${page}/${totalPages}` });

    embed.setColor(`#${guild!.embedColor}`);

    const paginatedRoles = roleData.slice(startIdx, endIdx);
    const fields = paginatedRoles
      .filter(({ role }) => role !== null)
      .map(({ role, roleItem }) => this.createEmbedFields(role!, roleItem))
      .flat();

    embed.addFields(fields);

    return embed;
  }

  public async run(interaction: ButtonInteraction) {
    if (interaction.guild && interaction.channel) {
      const memberItem = await Member.findOne({
        memberId: interaction.user.id,
      });
      if (!memberItem) {
        await Member.create({ memberId: interaction.user.id, coins: 0 });
      }
      const roleOptions: StringSelectMenuOptionBuilder[] = [];

      try {
        const reply = await interaction.deferReply({
          ephemeral: true,
          fetchReply: true,
        });
        const roleData = await this.fetchShopRoles(interaction);
        const itemsPerPage = 9;
        const totalPages = Math.ceil(roleData.length / itemsPerPage);

        let page = 1;

        roleData.forEach(({ role, roleItem }) => {
          if (role) {
            roleOptions.push(
              new StringSelectMenuOptionBuilder()
                .setLabel(role.name)
                .setValue(role.id)
                .setDescription(
                  `${i18next.t("shop.price")} ${roleItem.price} ${i18next.t("shop.coins")}`,
                ),
            );
          }
        });

        const embed = await this.createPageEmbed(
          page,
          itemsPerPage,
          memberItem!,
          roleData,
        );

        const menu = new StringSelectMenuBuilder()
          .setCustomId("shop-select")
          .setPlaceholder(i18next.t("shop.selectRole"))
          .addOptions(roleOptions);

        const selectRow =
          new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu);

        if (totalPages > 1) {
          const buttonRow = new ActionRowBuilder<ButtonBuilder>();
          buttonRow.addComponents(
            new ButtonBuilder()
              .setCustomId("prev-page")
              .setLabel(i18next.t("shop.previous-page"))
              .setStyle(1), // ButtonStyle.PRIMARY
            new ButtonBuilder()
              .setCustomId("next-page")
              .setLabel(i18next.t("shop.next-page"))
              .setStyle(1), // ButtonStyle.PRIMARY
          );

          await interaction.editReply({
            embeds: [embed],
            components: [selectRow, buttonRow],
          });

          const collector = reply.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: 60_000,
          });

          collector.on("collect", async (collectedInteraction) => {
            if (collectedInteraction.customId == "prev-page" && page != 1)
              page--;
            if (
              collectedInteraction.customId == "next-page" &&
              page != totalPages
            )
              page++;

            const embed = await this.createPageEmbed(
              page,
              itemsPerPage,
              memberItem!,
              roleData,
            );

            await collectedInteraction.update({ embeds: [embed] });
          });
          collector.on("end", async (collected) => {
            buttonRow.components.map(async (component: ButtonBuilder) => {
              component.setDisabled(true);
            });
            await interaction.editReply({ components: [selectRow, buttonRow] });
            console.log(`Collected ${collected.size} interactions.`);
          });
        } else {
          await interaction.editReply({
            embeds: [embed],
            components: [selectRow],
          });
        }
      } catch (error) {
        this.container.client.error(error, interaction);
      }
    }
  }
}
