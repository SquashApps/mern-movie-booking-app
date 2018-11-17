
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

seatSchema.index({ bookingStatus: 1 });

module.exports = mongoose.model('Seat', seatSchema);