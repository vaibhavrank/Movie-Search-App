const express = require('express');
const router = express.Router();
const {searchMovies,getFavorites,getMovieDetails,getRandomMovies,addFavorite,removeFavorite} = require('../controllers/movieController');
const {authMiddleware} = require('../middleware/auth');

router.get('/search', searchMovies);
router.get('/details/:imdbID', getMovieDetails);
router.get('/random', getRandomMovies);
router.post('/favorites', authMiddleware, addFavorite);
router.get('/favorites', authMiddleware, getFavorites);
router.post('/remove',authMiddleware,removeFavorite)


module.exports = router;