import { configuration } from './config';
import { from, timer  } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { ParkingSensor } from './parkingSensor';

process.env.GOOGLE_APPLICATION_CREDENTIALS= configuration.GOOGLE_APPLICATION_CREDENTIALS;

from([1, 2, 3, 4])
    .pipe(mergeMap((sensorId) => timer(sensorId * 2000).pipe(map(() => sensorId))))
    .subscribe((sensorId) => {
        const parkingSensor = new ParkingSensor(sensorId);
        parkingSensor.startEmitting();
    });


