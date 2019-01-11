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
var fs = require('fs');
const { execSync } = require('child_process');
let interval;
let userDb = new UserDb_1.UserDb();
let parkingDb = new ParkingDb_1.ParkingDb();
let registerForEventListening = () => {
    // callback method is defined to receive data from main thread
    let cb = (err, result) => {
        if (err)
            return console.error(err);
        console.log("@@@@@@@@@@@@@@@@@@@\nTask Received From Parent Thread: " + JSON.stringify(result) + "\n@@@@@@@@@@@@@@@@@@@");
        checkPark();
        checkFile(__dirname + "/../uploaded_files");
    };
    // registering to events to receive messages from the main thread
    parentPort.on('error', cb);
    parentPort.on('message', (msg) => {
        cb(null, msg);
    });
};
let checkPark = () => __awaiter(this, void 0, void 0, function* () {
    console.time("elapsed");
    for (let i = 1; i <= 17; i++) {
        let park = yield parkingDb.getLastTempParkStatus(i);
        console.log(`[${i}] Status : ${park[0].Status}, ${park[0].Status != 2 ? 'SUCCESS' : 'ERROR'}`);
        park[0].Status != 2 ? yield parkingDb.updateParkStatus(i, park[0].Status) : {};
    }
    console.timeEnd("elapsed");
});
let checkFile = (dirname) => __awaiter(this, void 0, void 0, function* () {
    fs.readdir(dirname, (err, filenames) => {
        if (err) {
            console.log(err);
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
});
registerForEventListening();
