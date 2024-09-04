// src/services/favorites.js
// src/services/favorites.js
const API_BASE_URL = 'http://localhost:5000/api';
export const addToFavorites = async (movie) => {
  const mail = localStorage.getItem('email');
  try {
    console.log(localStorage.getItem('token'));
    const response = await fetch(`${API_BASE_URL}/movies/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'), // Assuming token-based authentication
      },
      body: JSON.stringify({
        movieId: movie.imdbID, // Use the movie's imdbID to identify it
        email: mail, // Assuming you store the username in localStorage
      }),
    });
    const data = await response.json();
     
    if (!response) { 
      alert(data.message);
      throw new Error(data.message || 'Failed t  o add movie to favorites');
    }else{
      alert(data.message);
    }


  } catch (error) {
    console.error('Error adding to favorites:'+ error);
    alert('Failed to add movie to favorites');
  }
};

export const getFavorites = async () => {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  try {
    const response = await fetch(`${API_BASE_URL}/movies/favorites?email=${email}`, {
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      }
    });
    const data = await response.json()
    if (!response.ok) {
      throw new Error('Failed to fetch favorites');
    }
    return data.data;
  } catch (error) {
    console.error('Error in getFavorites:', error);
    throw error;
  }
};

export const removeFavorite = async (movieId) => {
  try {
    const mail = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/movies/remove?email=${mail}&movieId=${movieId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    });

    

    const data = await response.json();
    alert("Data Deleted successfully");
    window.location.reload();
    return data;
  

  } catch (error) {
    console.log(error.message);
    alert("Movie is Not Deleted From Favorites. Please Try again!!!");
  }
};
