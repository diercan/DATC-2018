"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDb_1 = require("./db/UserDb");
const ParkingDb_1 = require("./db/ParkingDb");
const { parentPort, workerData } = require('worker_threads');
let interval;
let index = -1;
let userDb = new UserDb_1.UserDb();
let parkingDb = new ParkingDb_1.ParkingDb();
let registerForEventListening = () => {
    // callback method is defined to receive data from main thread
    let cb = (err, result) => {
        if (err)
            return console.error(err);
        console.log("@@@@@@@@@@@@@@@@@@@\nTask Received From Parent Thread: " + JSON.stringify(result) + "\n@@@@@@@@@@@@@@@@@@@");
        checkPark();
    };
    // registering to events to receive messages from the main thread
    parentPort.on('error', cb);
    parentPort.on('message', (msg) => {
        cb(null, msg);
    });
};
// item of list will be multiplied with a factor as per index
let checkPark = () => __awaiter(this, void 0, void 0, function* () {
    console.time("elapsed");
    for (let i = 1; i <= 17; i++) {
        let park = yield parkingDb.getLastTempParkStatus(i);
        console.log(`[${i}] Status : ${park[0].Status}, ${park[0].Status != 2 ? 'SUCCESS' : 'ERROR'}`);
        park[0].Status != 2 ? yield parkingDb.updateParkStatus(i, park[0].Status) : {};
    }
    console.timeEnd("elapsed");
});
registerForEventListening();
