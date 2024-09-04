// controllers/movieController.js
const axios = require('axios');
const Movie = require('../models/Movie');
const User = require('../models/User');
require("dotenv").config();

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const OMDB_API_URL = 'http://www.omdbapi.com/';

exports.getRandomMovies = async (req, res) => {
  try {
    // const {s} = "";
    const response = await axios.get(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}`);
    // const movies = await Movie.aggregate([{ $sample: { size: 10 } }]);
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.searchMovies = async (req, res) => {
  try {
    const { s:searchItem } = req.query;
    const response = await axios.get(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&s=${searchItem}`);
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getMovieDetails = async (req, res) => {
  try {
    const { imdbID } = req.params;
    const response = await axios.get(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&i=${imdbID}`);
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const { movieId ,email } = req.body;
    const user = await User.findOne({email:email});
    let movie = await Movie.findOne({ imdbID : movieId });
    if (!movie) {
      const movieDetails = await axios.get(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&i=${movieId}`);
      movie = await Movie.create({
        title: movieDetails.data.Title,
        year: movieDetails.data.Year,
        imdbID: movieDetails.data.imdbID,
        poster: movieDetails.data.Poster,
        plot: movieDetails.data.Plot
      });
    }
    await User.findByIdAndUpdate(user._id, { $addToSet: { favorites : movie._id } });
    res.status(200).json({ success: true, message: 'Movie added to favorites' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const {email} = req.query;
    const user = await User.findOne({email:email}).populate('favorites');
    res.status(200).json({ success: true, data : user.favorites });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.removeFavorite = async (req,res) =>{
  try{
    const {email, movieId} = req.query;
    let movie = await Movie.findOne({ imdbID : movieId });
    const user = await User.findOne({email:email});
    await User.findByIdAndUpdate(user._id,{$pull: {favorites:movie._id}});
    await Movie.findOneAndDelete({_id:movie._id});
    res.status(200).json({
      success:true,
      message:"Message Deleted Successfully"
    })
  }catch(error){
    res.status(400).json({ success: false, error: error.message });
  }
}