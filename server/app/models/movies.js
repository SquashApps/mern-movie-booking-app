import { genre } from '../seed/genreSeed.js';
import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
        unique: true,
    },
    cast: {
        type: String,
    },
    duration: {
        type: Number,
        required: true,
    },
    genre: {
        type: String,
        enum: genre,
        index: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    created: { 
        type: Date, 
        default : () => new Date()
    },
  });

module.exports = mongoose.model('Movie', movieSchema);