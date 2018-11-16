import fs from 'fs';
import path from 'path';
import config from 'config';
import mongoose from 'mongoose';

const SRC_PATH = __dirname;



module.exports = () => {

    const connectstring = `mongodb://${config.get('DB_CONFIG.HOST')}:${config.get('DB_CONFIG.PORT')}/${config.get('DB_CONFIG.DB_NAME')}`;

    const mongoOpts = {
        autoReconnect: true,
        promiseLibrary: global.Promise,
        useNewUrlParser: true,
        reconnectTries: config.get('DB_CONFIG.MONGODB_TRIES'),
        reconnectInterval: config.get('DB_CONFIG.MONGODB_INTERVAL'),
    };
    // Database connection
    const connect = () => {
        mongoose.connect(connectstring, mongoOpts)
            .then(() => {
                 // seed the database with movies and screens and seats      
                require('../seed/seeder')();
            })
            .catch(function () { });
    };

    let wasConnectedBefore = -1 * mongoOpts.reconnectTries;
    let connection = mongoose.connection;

    connection.on('error', (error) => {
        //eslint-disable-next-line
        console.error('Connection failed', error);
        mongoose.disconnect();
    });

    mongoose.connection.on('disconnected', () => {
         //eslint-disable-next-line
        console.error('DB disconnected')

        // we exit if we are unable to reconnect
        if (wasConnectedBefore === 0 || wasConnectedBefore === mongoOpts.reconnectTries) {
             //eslint-disable-next-line
            console.error(`DB reconnection failed after ${mongoOpts.reconnectTries}`);
            process.exit(); // eslint-disable-line no-process-exit
        }

        // Reconnection logic: if <0 never been connected, >0 was connected previously
        if (wasConnectedBefore < 0 || wasConnectedBefore > 0) {
            wasConnectedBefore++;
            setTimeout(connect, mongoOpts.reconnectInterval);
        }
    });

    connection.on('connected', () => {
        //eslint-disable-next-line
       console.log('DB is open for operations');
       
       wasConnectedBefore = 1;
   });


    connect();


    // Bootstrap mongoose models;
    let collections = {};

    // eslint-disable-next-line
    fs.readdirSync(SRC_PATH).forEach(file => {

        let f = path.basename(file, '.js');
        // TODO: Bootstrap other models after basic feature setup
        if (f !== file && f !== 'index' && f == 'seats') {
            // eslint-disable-next-line
            collections.f = require(path.join(`${__dirname}/${file}`));
        }
    });

    return collections;
}