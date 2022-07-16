import AL, { Character, Mage, MonsterName } from "alclient"
import { lootLoop } from "../utils/loot";
import { buyPotions, manaHelper, healthHelper } from "../utils/pots"


export async function mageRun(mage : Mage) {
    if (mage.rip) {
        await mage.respawn()
    }
    let startingGold = mage.gold;
    moveLoop(mage, "goo")
    await manaHelper(mage);
    await healthHelper(mage);
    await basicAttackLoop(mage, "goo");
    await lootLoop(mage);
    await goldTracker(mage, startingGold);

}

async function moveLoop(bot: Character, monster: MonsterName) {
    try {
        await bot.smartMove(monster)

        // TODO: More logic for moving closer to monsters if you want
    } catch (e) {
        console.error(e)
    }
    setTimeout(async () => { moveLoop(bot, monster)}, 5000)
}

async function basicAttackLoop(bot: Character, monster: MonsterName) {
    buyPotions(bot)
    if (bot.rip) return
    if (bot.mp < 50) return
    try {
        const target = bot.getEntity({ canWalkTo: true, returnNearest: true, type: monster, withinRange: "attack" })
        if (target) {
            await bot.basicAttack(target.id)
        }
        if (!target) {
            await bot.smartMove(monster);
        }
        await lootLoop(bot);
    } catch(e){
        console.error(e)
    }
    setTimeout(async () => { basicAttackLoop(bot, monster) }, Math.max(100, bot.getCooldown("attack")))
}

async function goldTracker(bot: Character, startingGold: number) {
    if (bot.gold > startingGold) {
        console.log(bot.name, "Earned", bot.gold - startingGold, "gold")
    }
    setTimeout(async () => { goldTracker(bot, startingGold) }, 10000)
}


    
