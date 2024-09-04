// server/services/omdbService.js
const axios = require('axios');
require("dotenv").config();



exports.searchMovies = async (s) => {
  try {
    
    const response = await axios.get(process.env.OMDB_API_URL, {
      params: {
        apikey:process.env.OMDB_API_KEY,
        s:s,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

exports.fetchMovieDetails = async (imdbId) => {
  try {
    const response = await axios.get(OMDB_API_URL, {
      params: {
        apikey: OMDB_API_KEY,
        i: imdbId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};