import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import { fetchData } from "./utils/fetchData";
import MovieCard from "./components/MovieCard";

const App = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      try {
        const movies = await fetchData();
        setMovies(movies);
      } catch (error) {
        console.error("Failed to load movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <>
      <header>
        <img src="./logo.svg" alt="reelvibe logo" />
        <img src="./hero-img.png" alt="reelvibe hero" />
        <h1>Find the Movies You'll Enjoy Without the Hassle.</h1>
      </header>

      <main>
        <section id="search">
          <Search search={search} setSearch={setSearch} />
        </section>
        <section id="trending">Trending</section>
        <section id="all-movie">
          <h2>All Movies</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <MovieCard
                key={movie.id}
                movie={movie}
                />
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
};

export default App;
