// SearchBar.js
import React, { useState } from 'react';
import { searchMovies } from '../Apis/Api';

const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (query.trim() !== '') {
      const results = await searchMovies(query);
      onSearchResults(results);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
