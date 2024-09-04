import React from 'react';
import '../styles/MovieCard.css';
import { addToFavorites } from '../services/Favorites';
import image from '../assets/image.png'
const MovieCard = ({ movie }) => {
  const handleAddToFavorites = () => {
    addToFavorites(movie);
  };
  
  return (
    <div className="movie-card">
      <img src={movie.Poster!=="N/A"?movie.Poster:image} alt={movie.Title} className="movie-poster" />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        {/* <p>IMDB Rating: {movie.imdbRating}</p> */}
        <p>Duration: {movie.Year}</p>
        <p>Genre: {movie.Type}</p>
        {/* <p>Language: {movie.language}</p> */}
        <button onClick={handleAddToFavorites}>Add to Favorites</button>
      </div>
    </div>
  );
};

export default MovieCard;