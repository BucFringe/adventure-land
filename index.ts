import AL from "alclient";
import { mageRun } from "./characters/mage";

async function run() {
    console.log("Starting...");
    await Promise.all([AL.Game.loginJSONFile("./credentials.json"), AL.Game.getGData()])
    await AL.Pathfinder.prepare(AL.Game.G)
    console.log("Loading Character...");
    const merchant = await AL.Game.startMerchant("stevenly", "EU", "I")
    const mage = await AL.Game.startMage("manarocks", "EU", "I")
    console.log("Characters loaded")
    
    mageRun(mage) // Run the Mage

}
run()