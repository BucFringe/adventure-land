import { Character, Tools } from "alclient";

export async function lootLoop(bot: Character): Promise<void> {
    try {
        for(const [id, chest] of bot.chests) {
            if (Tools.distance(bot, chest) > 800) continue // Too far away to loot
            await bot.openChest(id)
        }
    } catch(e) {
        console.error(e);
    }
}