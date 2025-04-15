import { schedule } from "node-cron";
import Member, { IMember } from "./schemas/Member";
import { client } from ".";
import { Document } from "mongoose";

export default class Scheduler {
  private timing = "0 */1 * * *";

  public constructor() {
    if (process.env.NODE_ENV == "development") this.timing = "*/1 * * * *";
    schedule(this.timing, this.checkStuff.bind(this));
  }

  private async checkStuff() {
    try {
      const date = Date.now();

      const members = await Member.find();

      for (const member of members) {
        this.checkRooms(date, member);
        this.checkRoles(date, member);
      }
    } catch (error) {
      client.logger.error("Error in scheduler: ", error);
    }
  }

  private async checkRooms(
    date: number,
    member: Document<unknown, {}, IMember> & IMember,
  ) {
    for (let i = 0; i < member.rooms.length; i++) {
      const room = member.rooms[i];
      const guild = client.guilds.cache.get(room.guildId);
      if (!guild) return;

      if (date >= room.expiryDate) {
        const channel = guild.channels.cache.get(room.channelId);
        const filteredChannels = member.rooms.filter((_, index) => index !== i);

        await member.updateOne({ rooms: filteredChannels });

        if (!channel) return;
        await channel.delete();
      }
    }
  }

  private async checkRoles(
    date: number,
    member: Document<unknown, {}, IMember> & IMember,
  ) {
    for (let i = 0; i < member.rooms.length; i++) {
      const role = member.roles[i];
      const guild = client.guilds.cache.get(role.guildId);
      if (!guild) return;

      if (date >= role.expiryDate) {
        const discordRole = guild.roles.cache.get(role.roleId);
        const discordMember = guild.members.cache.get(member.memberId);

        const filteredRoles = member.roles.filter((_, index) => index !== i);

        await member.updateOne({ roles: filteredRoles });

        if (!discordRole || !discordMember) return;
        await discordMember.roles.remove(discordRole);
      }
    }
  }
}
