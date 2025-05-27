import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Optional: adds createdAt and updatedAt
});

const movieModel = mongoose.model('Movie', movieSchema);

export {movieModel};