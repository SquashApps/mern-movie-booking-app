module.exports = {
    APP_PORT: process.env.PORT || 8081,
    APP_HOST: process.env.APP_HOST || '0.0.0.0',
    DB_CONFIG: {
        HOST: process.env.MONGODB_HOST || 'localhost',
        PORT: process.env.MONGODB_PORT || '27017',
        DB_NAME: process.env.DB_NAME || 'bookflicks',
        MONGO_USER: process.env.MONGO_USER || '',
        MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'B0oK$F!iCk$P@$sW0rD',
        MONGODB_OPTS: process.env.MONGODB_OPTS || '', // Options for end of MongoDB connection string. Local unconfigured MongoDB leave blank.
        MONGODB_TRIES: process.env.MONGODB_TRIES || '300', // Number of tries at the MONGODB_INTERVAL to attempt to connect to the database before failing.
        MONGODB_INTERVAL: process.env.MONGODB_INTERVAL || '1000', // Time in ms to wait to retry to connect to the db.
        MONGODB_CONNECTED_STATE: 1,
    },
};
