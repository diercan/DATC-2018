const { parentPort, workerData } = require('worker_threads');

let interval;
let index = -1;

var registerForEventListening = () => {

    // callback method is defined to receive data from main thread
    let cb = (err, result) => {
        if (err) return console.error(err);

        console.log("****\nTask Received From Parent Thread: " + JSON.stringify(result) + "\n****");
        processDataAndSendData();
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
    // parentPort.postMessage({ index, val: "hello world from worker send val : " + index });
}

registerForEventListening();
