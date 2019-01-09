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
const ws_1 = require("ws");
const { PubSub } = require('@google-cloud/pubsub');
const Datastore = require('@google-cloud/datastore');
class Parking {
    constructor() {
        this.dataStore = new Datastore({
            projectId: config_1.configuration.PROJECT_ID,
        });
        this.socket = new ws_1.Server({ port: 9091 });
        console.log(`On ${new Date().toString()} :Watching for sensor update`);
        new PubSub({ projectId: config_1.configuration.PROJECT_ID })
            .subscription(config_1.configuration.SENSOR_SUBSCRIPTION_NAME)
            .on('message', (message) => __awaiter(this, void 0, void 0, function* () {
            const messageData = JSON.parse(message.data.toString());
            yield this.updateSpot(messageData.sensorId, messageData.isActive);
            yield this.sendUpdate();
            message.ack();
        }));
    }
    updateSpot(sensorId, isOccupied) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getSensorQuery = this.dataStore
                    .createQuery('ParkingSpot')
                    .filter('sensorId', sensorId);
                const [entities] = yield getSensorQuery.run();
                if (entities.length) {
                    entities[0].isOccupied = isOccupied;
                    const task = {
                        key: entities[0][this.dataStore.KEY],
                        data: entities[0],
                    };
                    yield this.dataStore.update(task);
                    console.log(`On ${new Date().toString()} : Parking spot with sensor id: ${sensorId} successfully update isOccupied: ${isOccupied}`);
                }
            }
            catch (error) {
                console.log(`On ${new Date().toString()} : Failed to update the spot with sensor id: ${sensorId}, ${error}`);
            }
        });
    }
    sendUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getSensorQuery = this.dataStore
                    .createQuery('ParkingSpot');
                const [entities] = yield getSensorQuery.run();
                if (entities.length) {
                    console.log(`On ${new Date().toString()} : Sending parking spot update`);
                    this.socket.clients.forEach((socket) => socket.send(JSON.stringify(entities)));
                }
            }
            catch (error) {
                console.log(`On ${new Date().toString()} : Failed to send update of parking spots ${error}`);
            }
        });
    }
}
exports.Parking = Parking;
//# sourceMappingURL=parking.js.map