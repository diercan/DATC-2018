"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Worker, isMainThread, workerData } = require('worker_threads');
const app_1 = require("./app");
const PORT = 3000;
var myWorker;
var initiateWorker = () => {
    // define callback
    let cb = (err, result) => {
        if (err) {
            return console.error(err);
        }
        console.log("Message From Worker: ", result.val);
        // myWorker.postMessage({ data: "Hello World From Main Thread Again !" });
    };
    // start worker
    myWorker = startWorker(__dirname + '/MyWorker.js', cb);
    // post a message to worker thread
    myWorker.postMessage({ data: "Hello World From Main Thread !" });
};
var startWorker = (path, cb) => {
    let w = new Worker(path, { workerData: "null" });
    w.on('message', (msg) => {
        cb(null, msg);
    });
    w.on('error', cb);
    w.on('exit', (code) => {
        if (code != 0)
            console.error(new Error(`Worker stopped with exit code ${code}`));
    });
    return w;
};
if (isMainThread) {
    app_1.default.listen(PORT, () => {
        console.log('server listening on port ' + PORT);
    });
    initiateWorker();
    setTimeout(() => {
        console.log("Main thread again do something 2 ");
    }, 3000);
    setTimeout(() => {
        console.log("Main thread again do something ooops 6");
    }, 7000);
}
