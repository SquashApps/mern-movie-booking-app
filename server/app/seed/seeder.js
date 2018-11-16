import seeder from 'mongoose-seed';
import config from 'config';
import movieSeed from './moviesSeed.js';

const connection_uri = `mongodb://${config.get('DB_CONFIG.HOST')}:${config.get('DB_CONFIG.PORT')}/${config.get('DB_CONFIG.DB_NAME')}`;

module.exports = () => {
    seeder.connect(connection_uri, () => {

    seeder.clearModels(['Movie', 'Screen', 'Seat', 'User'], () => {
        seeder.populateModels(movieSeed, () => {
            // eslint-disable-next-line
            console.info('Movie seed has been restored in the DB');
        });
    })
    seeder.loadModels([
        'dist/app/models/movies.js'
    ]);
});
}