import { getScreens, createScreens } from '../services/screens';
import express from 'express';
const router = express.Router();

module.exports = () => {

    // get 
    router.get('/movie/:id', getScreens);

    // post
    router.post('/', createScreens);

    return router;
}