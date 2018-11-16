import seeder from 'mongoose-seed';
import config from 'config';
import { generateSeatSeed } from './seatSeed.js';

const connection_uri = `mongodb://${config.get('DB_CONFIG.HOST')}:${config.get('DB_CONFIG.PORT')}/${config.get('DB_CONFIG.DB_NAME')}`;

const noOfSeats = 50;

module.exports = () => {

    // connect to the database
    seeder.connect(connection_uri, () => {

    const seedData = generateSeatSeed(noOfSeats)
    
    // drop seats collection
    seeder.clearModels(['Seat'], () => {
        seeder.populateModels(seedData, () => {
            // eslint-disable-next-line
            console.info('Movie seed has been restored in the DB');
        });
    });
    // bootstrap seat model
    seeder.loadModels([
        'dist/app/models/seats.js'
    ]);
});
}