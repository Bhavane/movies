import React, { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './MovieCard'; // Import the MovieCard component

const API_KEY = 'a00f2d40c7d3fe1a235c1e3fdb147665'; // Replace with your API key

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('release_date.desc');
  const [minRating, setMinRating] = useState(0);

  
  useEffect(() => {
    fetchMovies();
  }, [sortBy]); // Fetch movies whenever sortBy changes

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
      <h1>Movie Search App</h1>
      <div>
        <input
          type="text"
          placeholder="Search by movie name"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch} className="searchBtn">Search</button>
      </div>
      {/* <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} /> // Use the MovieCard component
        ))}
      </div> */}
      <div className="pagination">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    Previous
  </button>
  <button
    disabled={lastItemIndex >= movies.length}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    Next
  </button>
</div>
<div>
        <label>Sort By:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="release_date.desc">Release Date (Desc)</option>
          <option value="release_date.asc">Release Date (Asc)</option>
          <option value="vote_average.desc">Rating (Desc)</option>
          <option value="vote_average.asc">Rating (Asc)</option>
        </select>
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
    </div>
  );
}

export default App;
