import cron from "node-cron";
import { freeAmericanoService } from "./freeAmericano.service";

export const runFreeAmericanoCleanup = async () => {
  const reminded = await freeAmericanoService.sendDeletionReminders();
  const deleted = await freeAmericanoService.deleteExpiredEvents();

  if (reminded > 0 || deleted > 0) {
    console.log(
      `🧹 Free Americano cleanup: ${reminded} reminders sent, ${deleted} events deleted`
    );
  }
};

export const freeAmericanoCron = () => {
  /**
   * every 5 minutes — reminders 2h before deletion, then deletion itself.
   * Both steps are safe to run more than once.
   */
  cron.schedule("*/5 * * * *", async () => {
    try {
      await runFreeAmericanoCleanup();
    } catch (err) {
      console.error("❌ Error in free Americano cleanup cron:", err);
    }
  });
};
