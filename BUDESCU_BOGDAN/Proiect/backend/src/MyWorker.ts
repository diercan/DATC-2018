import { UserDb } from "./db/UserDb";
import { ParkingDb } from "./db/ParkingDb";
const { parentPort, workerData } = require('worker_threads');

let interval;
let index = -1;
let userDb: UserDb = new UserDb();
let parkingDb: ParkingDb = new ParkingDb();

let registerForEventListening = () => {

    // callback method is defined to receive data from main thread
    let cb = (err, result) => {
        if (err) return console.error(err);

        console.log("@@@@@@@@@@@@@@@@@@@\nTask Received From Parent Thread: " + JSON.stringify(result) + "\n@@@@@@@@@@@@@@@@@@@");
        checkPark();
    };

    // registering to events to receive messages from the main thread
    parentPort.on('error', cb);
    parentPort.on('message', (msg) => {
        cb(null, msg);
    });
}

// item of list will be multiplied with a factor as per index
let checkPark = async () => {

    console.time("elapsed")
    for (let i = 1; i <= 17; i++) {
        let park: any = await parkingDb.getLastTempParkStatus(i);
        console.log(`[${i}] Status : ${park[0].Status}, ${park[0].Status != 2 ? 'SUCCESS' : 'ERROR'}`)
        park[0].Status != 2 ? await parkingDb.updateParkStatus(i, park[0].Status) : {}
    }
    console.timeEnd("elapsed")

    // index++;
    // console.log("WORKER ", index)
    // // parentPort.postMessage({ index, val: "hello world from worker send val : " + index });
}

registerForEventListening();
