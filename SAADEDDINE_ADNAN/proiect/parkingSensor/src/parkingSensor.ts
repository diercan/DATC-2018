import { Publisher, PubSub } from '@google-cloud/pubsub';
import { configuration, SensorUpdate } from './config';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

const { PubSub } = require('@google-cloud/pubsub');

export class ParkingSensor {
    private publisher: Publisher;
    private valueEmittingSubscriber: Subscription;

    constructor(private sensorId: number) {
        this.publisher = new PubSub({projectId: configuration.PROJECT_ID}).topic(configuration.TOPIC_NAME).publisher();
    }

    public startEmitting(): void {
        console.log(`On ${new Date().toString()} : Starting to emit value for sensor: ${this.sensorId}`);
        this.valueEmittingSubscriber = interval(configuration.SECONDS_SENSOR_UPDATE)
            .pipe(map(() => Math.random() >= 0.5))
            .subscribe(async (sensorValue: boolean) => {
                const sensorUpdate: SensorUpdate = {
                    sensorId: this.sensorId,
                    isActive: sensorValue
                };
                try {
                    await this.publisher.publish(Buffer.from(JSON.stringify(sensorUpdate)));

                    console.log(`On ${new Date().toString()} : Message: ${JSON.stringify(sensorUpdate)} send successfully`);
                } catch (error) {
                    console.log(`On ${new Date().toString()} : Failed to send the massage: ${JSON.stringify(sensorUpdate)}, ${error}`);
                }
            });
    }

    public stopEmitting(): void {
        if (this.valueEmittingSubscriber) {
            this.valueEmittingSubscriber.unsubscribe();
        }
    }
}