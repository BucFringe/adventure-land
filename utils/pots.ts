import AL, { Character, Player } from "alclient"
import { sleep } from "./randoms";
import { JsonDB } from 'node-json-db';


export async function manaHelper(bot: Character) {
    try {
        if (bot.socket.disconnected) return
        if(!bot.rip) {
            const mpot0 = bot.locateItem("mpot0")
            if(bot.mp < bot.max_mp - 300 && mpot0) {
                await bot.useMPPot(mpot0);
                console.log(bot.name, "Used MP Pot: ", bot.countItem("mpot0"));
            }
        }
    } catch(e) {
        console.error(e);
    }
    
    setTimeout(async () => {manaHelper(bot)}, Math.max(100, bot.getCooldown("use_mp")))
}

export async function healthHelper(bot: Character) {
    try{
        if (bot.socket.disconnected) return
        // console.log('HealthHelper')
        if(!bot.rip) {
            const hpot0 = bot.locateItem("hpot0")
            // console.log(hpot0)
            if(bot.hp < bot.max_hp - 200 && hpot0) {
                await bot.useHPPot(hpot0);
                console.log(bot.name, "Used HP Pot:", bot.countItem("hpot0"));
            }
        }
    } catch(e) {
        console.error(e);
    }
    setTimeout(async () => {healthHelper(bot)}, Math.max(100, bot.getCooldown("use_hp")))
}

export async function buyPotions(bot: Character, minHpPots = 100, minMpPots = 100, db: JsonDB ): Promise<void> {
    try {
        const currentHpPots = bot.countItem("hpot0")
        const currentMpPots = bot.countItem("mpot0")

        if (currentHpPots >= minHpPots && currentMpPots >= minMpPots) {
            db.push("/pots", false)
            return // We don't need any more.
        }
        db.push("/pots",true);
        // We're under the minimum, go buy potions
        if (!bot.smartMoving) {
            await bot.smartMove("fancypots")
        }
        let mpotsToBuy = Math.min(200 - bot.countItem("mpot0"), bot.gold / AL.Game.G.items.mpot1.g)
        console.log()
        if (mpotsToBuy > 0) await bot.buy("mpot0", mpotsToBuy)

        let hpotsToBuy = Math.min(200 - bot.countItem("hpot0"), bot.gold / AL.Game.G.items.hpot1.g)
        if (mpotsToBuy > 0) await bot.buy("hpot0", hpotsToBuy)
    } catch(e) {
        console.error(e);
    }
}
