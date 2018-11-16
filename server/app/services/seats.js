import async from 'async';
import Seats from '../models/seats';
import { generateSeatSeed } from '../seed/seatSeed';


export const getAllSeats = (req, res) => {
    Seats.find({}, (err, seats) => {
        if(err) res.status(500).send(err);
        res.status(200).send(seats);
    });
}

export const checkSeatAvailability = (req, res) => {
    
    let bookingStatus = [];
    const { seatIDs, callback } = req.params || req.query;

    if (!seatIDs) {
        callback ? res(400) : res.status(400).send('No seatID found');
    }

    Seats.find({ _id: { $in: [...seatIDs] } }).lean().exec((err, seats) => {
        if (err) {
            if(req.params.callback) {
                res(err);
             } else { 
                res.status(500).send(err); 
            }
        }

        bookingStatus = seats.map((seat) => {
            return {
                seatNo: seat.seatNo,
                bookingStatus: seat.bookingStatus,
                _id: seat._id
            }
        });
       
        if(req.params.callback) {
            res(null, bookingStatus);
        } else { 
            res.status(200).send(bookingStatus); 
        }
    });
}

export const updateBookingStatus = (req, res) => {
    let { seatIDs, bookingStatus, callback } = req.body;
    
    const seatStatus = bookingStatus;
    
    if (!seatIDs || seatIDs.length <= 0 || !seatStatus) {
        callback ? res(400) :  res.status(400);
    }

    Seats.findAndModify({ _id: {  $in: [...seatIDs] }}, 
        { $set: { bookingStatus:seatStatus } }, { new: true, multi: true }, (err, seats) => {
            
            if (err) {
                callback ? res(err) : res.status(500).send(err);
            } 
            
            callback ? res(null, seats) : res.status(201).send(seats);
        });
}

export const bookTickets = (req, res) => {

    let isSeatsAvailable = false;
    let bookedSeatData = [];

    const { seats, status } = req.body;

    if (!seats || !status) res.status(400);

    if(['PENDING', 'CLOSED', 'CANCELLED', 'OPEN'].includes(status) === false) res.status(400).send('Invalid status');

    if(['PENDING', 'OPEN'].includes(status)) return res.status(200).send({status:'pending', message:'Feature to be implemented'})

    const checkAvailability = () => {

        const request = {
            params: {
                callback: true,
                seatIDs: [...seats]
            }
       }
        return new Promise((resolve, reject) => {
            checkSeatAvailability(request, (err, seats) => {
                if(err) reject(err);

                isSeatsAvailable = seats.every(seat => seat.bookingStatus === 'OPEN' || seat.bookingStatus === 'CANCELLED');

                if (!isSeatsAvailable) bookedSeatData = seats.filter(seat => seat.bookingStatus === 'CLOSED');

                resolve(isSeatsAvailable);
            });
        });
    }

    const bookAvailableTickets = () => {
        return new Promise ((resolve, reject) => {
            
            const request = {
                body: {
                    callback: true,
                    seatIDs: [...seats],
                    bookingStatus: status
                }
            };

            updateBookingStatus(request, (err, seat) => {
                if(err) reject(err);
                resolve({status:'success', seat});
            })
        })
    }

    const sendResponse = (isAvailable) => {
        if(!isAvailable) {
            res.status(200).send({status:'success', seat:bookedSeatData});
        }

        bookAvailableTickets()
            .then((seat) => res.status(201).send(seat))
            .catch((err) => res.status(500).send({ status: 'error', err}))
    }

    if(status === 'CLOSED') {
        checkAvailability()
        .then(sendResponse)
        .catch((err) => res.status(500).send({ status: 'error', err}))
    } 

    if(status === 'CANCELLED') {
        bookAvailableTickets()
            .then((seat) => res.status(201).send(seat))
            .catch((err) => res.status(500).send({ status: 'error', err}))
    }

}

/**
 * 
 * API's for further enhancement of features
 */
export const createSeats = (req, res) => {

    const { movieID, screenID, noOfSeats } = req.body;

    if (movieID || screenID || noOfSeats) res.status(400);

    const seatSeed = generateSeatSeed(movieID, screenID, noOfSeats);
    let newSeats = [];
    async.each(seatSeed, (seat, cb) => {
        if (!seat) return cb('No seat found');

        const Seat = new Seats(seat);

        Seat.save((err, newSeat) => {
            if (err) return cb(err);

            newSeats = [...newSeats, ...[newSeat]];

            cb();
        })
    }, (err) => {
        if (err) return res.status(500).send(err);
        // console.log('newSeats', newSeats);
        return res.status(201).send(newSeats);
    });
}

export const getSeats = (req, res) => {

    const { screenID } = req.params || req.query;

    if (!screenID) res.status(400);

    Seats.get({ screenID }, (err, seats) => {
        if (err) res.status(500).send(err);

        res.status(200).send(seats);
    });
}
