import { createSeats, getSeats, checkSeatAvailability, bookTickets, getAllSeats } from '../services/seats';
import express from 'express';
const router = express.Router();

module.exports = () => {

    // get 
    router.get('/', getAllSeats)
    router.get('/screen/:id', getSeats);
    router.get('/availability/:seatIDs', checkSeatAvailability);

    // post
    router.post('/', createSeats);

    //put 

    router.put('/book', bookTickets);

    return router;
}