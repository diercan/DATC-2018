import { UserDb } from "./db/UserDb";
import { ParkingDb } from "./db/ParkingDb";
const { parentPort, workerData } = require('worker_threads');
var fs = require('fs');
const { execSync } = require('child_process');

let interval;
let userDb: UserDb = new UserDb();
let parkingDb: ParkingDb = new ParkingDb();

let registerForEventListening = () => {

    // callback method is defined to receive data from main thread
    let cb = (err, result) => {
        if (err) return console.error(err);

        console.log("@@@@@@@@@@@@@@@@@@@\nTask Received From Parent Thread: " + JSON.stringify(result) + "\n@@@@@@@@@@@@@@@@@@@");
        checkPark();
        checkFile(__dirname + "/../uploaded_files");
    };

    // registering to events to receive messages from the main thread
    parentPort.on('error', cb);
    parentPort.on('message', (msg) => {
        cb(null, msg);
    });
}

let checkPark = async () => {

    console.time("elapsed")
    for (let i = 1; i <= 17; i++) {
        let park: any = await parkingDb.getLastTempParkStatus(i);
        console.log(`[${i}] Status : ${park[0].Status}, ${park[0].Status != 2 ? 'SUCCESS' : 'ERROR'}`)
        park[0].Status != 2 ? await parkingDb.updateParkStatus(i, park[0].Status) : {}
    }
    console.timeEnd("elapsed")

}

let checkFile = async (dirname) => {
    fs.readdir(dirname, (err, filenames) => {
        if (err) {
            console.log(err)
            return;
        }
        filenames.forEach((filename) => {
            if (!filename.includes("_tumb.") && filename.includes(".")) {
                let tumbFile = dirname + "/" + filename.split(".")[0] + "_tumb." + filename.split(".")[1];
                let originalFile = dirname + "/" + filename;
                if (!fs.existsSync(tumbFile)) {
                    let stdout = execSync('convert -size 60x ' + originalFile + " " + tumbFile);
                    console.log(" stdout : " + stdout);
                    console.log("####### image resized with success #######");
                }
            }
        });
        return;
    });
}
registerForEventListening();
