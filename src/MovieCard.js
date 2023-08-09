// src/MovieCard.js
import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const imagePath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="movie-card">
      <div className="movie-image">
        <img src={imagePath} alt={movie.title} />
      </div>
      <div className="movie-details">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="release-date">Release Date: {movie.release_date}</p>
        <p className="rating">Rating: {movie.vote_average}</p>
        <p className="overview">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
