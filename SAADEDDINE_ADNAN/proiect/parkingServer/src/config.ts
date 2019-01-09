export const configuration: Config = {
    GOOGLE_APPLICATION_CREDENTIALS: '/OneDrive/Facultate/DATC/DATC-2018/SAADEDDINE_ADNAN/proiect/parkingServer/datcParkingAcces.json',
    PROJECT_ID: 'datcparking',
    TOPIC_NAME: 'updateParkingStatus',
    SENSOR_SUBSCRIPTION_NAME: 'onAvailabilityChange',
    SPOTS_SUBSCRIPTION_NAME: 'onSpotsChange'
};

export interface SensorUpdate {
    sensorId: number;
    isActive: boolean;
}

export interface Spot {
    sensorId: number;
    position: {
        latitude: number;
        longitude: number;
    };
    isOccupied: boolean;
}

interface Config {
    GOOGLE_APPLICATION_CREDENTIALS: string;
    PROJECT_ID: string;
    TOPIC_NAME: string;
    SENSOR_SUBSCRIPTION_NAME: string;
    SPOTS_SUBSCRIPTION_NAME: string;
}