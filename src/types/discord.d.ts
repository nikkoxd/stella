import { client } from "..";
import { error, log } from "../logger";
import Scheduler from "../scheduler";

declare module "discord.js" {
  export interface Client {
    error: typeof error;
    scheduler: Scheduler;
    log: typeof log;
  }
}
