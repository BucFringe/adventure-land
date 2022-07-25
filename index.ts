import AL from "alclient";
import { mageRun } from "./characters/mage";
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

var db = new JsonDB(new Config("myDataBase", true, false, '/'));
db.push("/pots",false)

async function run() {
    console.log("Starting...");
    await Promise.all([AL.Game.loginJSONFile("./credentials.json"), AL.Game.getGData()])
    await AL.Pathfinder.prepare(AL.Game.G)
    console.log("Loading Character...");
    const merchant = await AL.Game.startMerchant("stevenly", "EU", "I")
    const mage = await AL.Game.startMage("manarocks", "EU", "I")
    console.log("Characters loaded")
    
    mageRun(mage, db) // Run the Mage

}
run()