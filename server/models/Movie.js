// models/Movie.js
const mongoose = require('mongoose');


const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String },
  imdbID: { type: String, required: true, unique: true },
  poster: { type: String },
  plot: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Movie', MovieSchema);