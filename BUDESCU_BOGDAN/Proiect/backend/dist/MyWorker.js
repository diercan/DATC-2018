const { parentPort, workerData } = require('worker_threads');

let interval;
let index = -1;

var registerForEventListening = () => {

    // callback method is defined to receive data from main thread
    let cb = (err, result) => {
        if (err) return console.error(err);

        console.log("**** Task Received From Parent Thread: ", result, " ****");

        //  setting up interval to call method to multiple with factor
        if (index == -1) {
            interval = setInterval(processDataAndSendData, 1000, "hello world from worker");
        }
        // processDataAndSendData()
    };

    // registering to events to receive messages from the main thread
    parentPort.on('error', cb);
    parentPort.on('message', (msg) => {
        cb(null, msg);
    });
}

// item of list will be multiplied with a factor as per index
function processDataAndSendData() {

    index++;
    console.log("WORKER ", index)
    parentPort.postMessage({ index, val: "hello world from worker send val : " + index });
    if (index == 10) {
        clearInterval(interval);
        parentPort.postMessage({ index, val: "Worker job done." });
    }
}

registerForEventListening();
