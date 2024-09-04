import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import { getRandomMovies, searchMovies } from '../services/api';
import '../styles/Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRandomMovies();
  }, []);

  const fetchRandomMovies = async () => {
    setLoading(true);
    try {
      const randomMovies = await getRandomMovies();
      if(randomMovies.data.Response!=="False")
        setMovies(randomMovies.data.Search);
      else {
        throw new Error('Error etching Random movie');
      }
    } catch (error) {
      console.error('Error fetching random movies:', error);
    }
    setLoading(false);
  };

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    try {
      const searchResults = await searchMovies(searchTerm);
      if(searchResults.data.Response!=="False")
        setMovies(searchResults.data.Search);
      else {
        throw new Error(`Error etching ${searchTerm} movie`);
      }
    } catch (error) {
      console.error('Error searching movies:', error);
    }
    setLoading(false);
  };

  return (
    <div className="home">
      <Navbar onSearch={handleSearch} />
      <main className="main-content">
        {loading ? (
          <LoadingSpinner className="spinner1" />
        ) : (
          <div className="movie-grid">
            { movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;