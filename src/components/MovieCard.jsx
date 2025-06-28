import React from "react";

const MovieCard = ({
  movie: {
    title,
    backdrop_path,
    poster_path,
    release_date,
    vote_average,
    original_language,
  },
}) => {
  return (
    <div className="movie-card">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "./no-poster.png"
        }
        alt={title}
      />
      <h3>{title}</h3>

      <div className="rating">
        <img src="./rating.svg" alt="rating star" />
        <p>{vote_average ? vote_average.toFixed(1) : "n/a"}</p>
      </div>

      <div>
        <span>.</span>

        <p>{original_language}</p>

        <span>.</span>

        <p>{release_date ? release_date.split("-")[0] : "n/a"}</p>
      </div>
    </div>
  );
};

export default MovieCard;
