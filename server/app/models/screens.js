import mongoose from 'mongoose';

const screenSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true,
    },
    noOfSeats: {
        type: Number,
        min:1,
        max: 1000000
    },
    availableSeats: {
        type: Number,
        min: 1,
        max: 1000000
    },
    movieID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    created: { 
        type: Date, 
        default : () => new Date()
    },
  });

module.exports = mongoose.model('Screen', screenSchema);