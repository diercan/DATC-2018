import { configuration, SensorUpdate, Spot } from './config';
import { PubSub } from '@google-cloud/pubsub';
import DataStore from '@google-cloud/datastore'
import { Server } from 'ws';

const { PubSub } = require('@google-cloud/pubsub');
const Datastore = require('@google-cloud/datastore');

export class Parking {
    private dataStore: DataStore;
    private readonly socket: Server;

    constructor() {
        this.dataStore = new Datastore({
            projectId: configuration.PROJECT_ID,
        });
        this.socket = new Server({ port: 9091 });

        console.log(`On ${new Date().toString()} :Watching for sensor update`);
        new PubSub({projectId: configuration.PROJECT_ID})
            .subscription(configuration.SENSOR_SUBSCRIPTION_NAME)
            .on('message', async (message: any) => {
                const messageData: SensorUpdate = JSON.parse(message.data.toString());
                await this.updateSpot(messageData.sensorId, messageData.isActive);
                await this.sendUpdate();
                message.ack();
            });
    }

    private async updateSpot(sensorId: number, isOccupied: boolean) {
        try {
            const getSensorQuery = this.dataStore
                .createQuery('ParkingSpot')
                .filter('sensorId', sensorId);

            const [entities] : [any, any] = await getSensorQuery.run();
            if (entities.length) {
                entities[0].isOccupied = isOccupied;
                const task = {
                    key: entities[0][this.dataStore.KEY],
                    data: entities[0],
                };

                await this.dataStore.update(task);
                console.log(`On ${new Date().toString()} : Parking spot with sensor id: ${sensorId} successfully update isOccupied: ${isOccupied}`);
            }
        } catch (error) {
            console.log(`On ${new Date().toString()} : Failed to update the spot with sensor id: ${sensorId}, ${error}`);
        }
    }

    private async sendUpdate() {
        try {
            const getSensorQuery = this.dataStore
                .createQuery('ParkingSpot');

            const [entities] : [any, any] = await getSensorQuery.run();
            if (entities.length) {
                console.log(`On ${new Date().toString()} : Sending parking spot update`);
                this.socket.clients.forEach((socket) =>
                    socket.send(JSON.stringify(entities))
                )
            }
        } catch (error) {
            console.log(`On ${new Date().toString()} : Failed to send update of parking spots ${error}`);
        }
    }
}