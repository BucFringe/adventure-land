import AL, { Mage, MonsterName } from "alclient"

export async function magerun(mage : Mage) {
    await mage.smartMove("goo")

    // while (true) {
    //     if (mage.canUse("attack")) {
    //         for (const [, entity ] of mage.entities) {
    //             if (AL.Tools.distance(mage, entity) > mage.range) continue // Too Far to Attack
    //             await mage.basicAttack(entity.id)
    //                 .catch(error => console.log(error))
    //             break
    //         }
    //     }
    // }
}

export async function attackLoop(bot: Mage, monster: MonsterName) {
    try {
        const target = bot.getEntity({ canWalkTo: true, returnNearest: true, type: monster, withinRange: "attack" })
        if (target) {
            await bot.basicAttack(target.id)
        }
    } catch(e){
        console.error(e)
    }
    setTimeout(async () => { attackLoop(bot, monster) }, Math.max(100, bot.getCooldown("attack")))
}
