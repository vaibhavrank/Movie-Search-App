import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import { getFavorites } from '../services/Favorites';
import '../styles/Favorites.css';
import FavMovie from '../components/FavMovie';
import { searchMovies } from '../services/api';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const userFavorites = await getFavorites();
        setFavorites(userFavorites);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    try {
      const searchResults = await searchMovies(searchTerm);
      if(searchResults.data.Response!=="False")
        setFavorites(searchResults.data.Search);
      else {
        throw new Error(`Error etching ${searchTerm} movie`);
      }

    } catch (error) {
      console.error('Error searching movies:', error);
    }
    setLoading(false);
  };

  return (
    <div className="favorites-page">
      <Navbar onSearch={handleSearch} />
      <div className="favorites-content">
        <h1 className='title1'>Your Favorite Movies</h1>
        {loading ? (
          <LoadingSpinner />
        ) : favorites.length > 0 ? (
          <div className="favorites-grid">
            {favorites.map((movie) => (
              // console.log("HI")||
              <FavMovie key={movie.imdbID} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="no-favorites-message">You haven't added any favorites yet. Start browsing movies to add some!</p>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Favorites;