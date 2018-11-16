
import mongoose from 'mongoose';

const seatSchema = mongoose.Schema({
    seatNo: { 
        type: String, 
        required: true,
    },
    bookingStatus: {
        type: String,
        enum: ['PENDING', 'CLOSED', 'CANCELLED', 'OPEN'],
        default: 'OPEN'
    },
    created: { 
        type: Date, 
        default : () => new Date()
    },
  });

module.exports = mongoose.model('Seat', seatSchema);