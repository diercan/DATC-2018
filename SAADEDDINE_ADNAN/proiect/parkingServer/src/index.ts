import { configuration } from './config';
import { Parking } from './parking';

process.env.GOOGLE_APPLICATION_CREDENTIALS = configuration.GOOGLE_APPLICATION_CREDENTIALS;

new Parking();
