
import mongoose from 'mongoose';

const showSchema = new mongoose.Schema({
    movieID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        unique: true,
        required: true,
    },
    seatID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seat',
        required: true,
        unique: true,
    },
    screenID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Screen',
        required: true,
        unique: true,
    },
});

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true,
    },
    shows: [showSchema],
    created: { 
        type: Date, 
        default : () => new Date()
    },
});


module.exports = mongoose.model('User', userSchema);