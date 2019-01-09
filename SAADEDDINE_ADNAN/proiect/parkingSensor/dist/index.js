"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const parkingSensor_1 = require("./parkingSensor");
process.env.GOOGLE_APPLICATION_CREDENTIALS = config_1.configuration.GOOGLE_APPLICATION_CREDENTIALS;
rxjs_1.from([1, 2, 3, 4])
    .pipe(operators_1.mergeMap((sensorId) => rxjs_1.timer(sensorId * 2000).pipe(operators_1.map(() => sensorId))))
    .subscribe((sensorId) => {
    const parkingSensor = new parkingSensor_1.ParkingSensor(sensorId);
    parkingSensor.startEmitting();
});
//# sourceMappingURL=index.js.map