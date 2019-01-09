export const configuration: Config = {
    GOOGLE_APPLICATION_CREDENTIALS: '/OneDrive/Facultate/DATC/DATC-2018/SAADEDDINE_ADNAN/proiect/parkingSensor/datcParkingAcces.json',
    PROJECT_ID: 'datcparking',
    TOPIC_NAME: 'updateParkingStatus',
    SUBSCRIPTION_NAME: 'onAvailabilityChange',
    SECONDS_SENSOR_UPDATE: 10000
};

export interface SensorUpdate {
    sensorId: number;
    isActive: boolean;
}

interface Config {
    GOOGLE_APPLICATION_CREDENTIALS: string;
    PROJECT_ID: string;
    TOPIC_NAME: string;
    SUBSCRIPTION_NAME: string;
    SECONDS_SENSOR_UPDATE: number;
}