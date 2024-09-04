import React from 'react';
import { useState } from 'react';
import '../styles/MovieCard.css';
import { getFavorites, removeFavorite } from '../services/Favorites';
import image from '../assets/image.png'
const FavMovie = ( {movie} ) => {
  const [Deleted,setDeleted] = useState('');
  const handleRemoveFavorites = () => {
    console.log(movie.imdbID);
    const response =  removeFavorite(movie.imdbID);
    
    if(response.success){
      getFavorites();
      alert("DAta Deleted Successfully");
    }
  };
  
  return (
    <div className="movie-card">
      <img src={movie.poster!=="N/A"?movie.poster:image} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        {/* <p>IMDB Rating: {movie.imdbRating}</p> */}
        <p>Duration: {movie.year}</p>
        <p>Genre: {movie.type}</p>
        {/* <p>Language: {movie.language}</p> */}
        <button onClick={handleRemoveFavorites}>Remove Favorites</button>
      </div>
    </div>
  );
};

export default FavMovie;