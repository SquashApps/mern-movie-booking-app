import { getMoviesByGenre, getAllMovies } from '../services/movies';
import express from 'express';
const router = express.Router();

module.exports = () => {
    router.get('/', getAllMovies);
    router.get('/genre/:genre', getMoviesByGenre);
    return router;
}