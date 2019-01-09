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
const config_1 = require("./config");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const { PubSub } = require('@google-cloud/pubsub');
class ParkingSensor {
    constructor(sensorId) {
        this.sensorId = sensorId;
        this.publisher = new PubSub({ projectId: config_1.configuration.PROJECT_ID }).topic(config_1.configuration.TOPIC_NAME).publisher();
    }
    startEmitting() {
        console.log(`On ${new Date().toString()} : Starting to emit value for sensor: ${this.sensorId}`);
        this.valueEmittingSubscriber = rxjs_1.interval(config_1.configuration.SECONDS_SENSOR_UPDATE)
            .pipe(operators_1.map(() => Math.random() >= 0.5))
            .subscribe((sensorValue) => __awaiter(this, void 0, void 0, function* () {
            const sensorUpdate = {
                sensorId: this.sensorId,
                isActive: sensorValue
            };
            try {
                yield this.publisher.publish(Buffer.from(JSON.stringify(sensorUpdate)));
                console.log(`On ${new Date().toString()} : Message: ${JSON.stringify(sensorUpdate)} send successfully`);
            }
            catch (error) {
                console.log(`On ${new Date().toString()} : Failed to send the massage: ${JSON.stringify(sensorUpdate)}, ${error}`);
            }
        }));
    }
    stopEmitting() {
        if (this.valueEmittingSubscriber) {
            this.valueEmittingSubscriber.unsubscribe();
        }
    }
}
exports.ParkingSensor = ParkingSensor;
//# sourceMappingURL=parkingSensor.js.map