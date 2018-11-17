import Movies from '../models/movies';
import status from 'statuses'

/**
 * API's for further enhancement of features
 */

export const getAllMovies = (req, res) => {
    Movies.find({}, (err, movies) => {

        if(err) {
            res.status(500).send(status[500]);
            return;
        }
        
        res.status(200).send(movies);

    });
};

export const getMoviesByGenre = (req, res) => {

    const { genre } = req.params || req.query;

    if(!genre) {
        res.status(400).send(status[400]);
        return;
    }

    Movies.find({ genre }, (err, movies) => {
        
        if(err) {
            res.status(500).send(status[500]);
            return;
        }

        res.status(200).send(movies);
    });
};

