import React, { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './MovieCard'; // Import the MovieCard component

const API_KEY = 'a00f2d40c7d3fe1a235c1e3fdb147665'; 

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minRating, setMinRating] = useState(0);

  
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=release_date.desc`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      fetchMovies();
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

// ...

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentMovies = movies.slice(firstItemIndex, lastItemIndex);

// ...
const handleRatingFilter = () => {
  const filteredMovies = movies.filter((movie) => movie.vote_average >= minRating);
  setMovies(filteredMovies);
};

  return (
    <div className="App">
      <div className="bg">
      <div className="titles">
      <h1 className="moviename">MOVIE NAME</h1>
        <input
          type="text" className="searchInput"
          placeholder="Search by movie name"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch} className="searchBtn">Search!</button>
        </div>
<input
  type="number"
  placeholder="Min Rating"
  value={minRating}
  onChange={(e) => setMinRating(parseFloat(e.target.value))}
/>
<button onClick={handleRatingFilter}>Filter by Rating</button>

<ul className="movie-list">
  {currentMovies.map((movie) => (
    <MovieCard key={movie.id} movie={movie} />
  ))}
</ul>
<div className="pagination">
  <button className="pagebtns"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    Previous
  </button>
  <button className="pagebtns"
    disabled={lastItemIndex >= movies.length}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    Next
  </button>
</div>
    </div>
    </div>
  );
}

export default App;
