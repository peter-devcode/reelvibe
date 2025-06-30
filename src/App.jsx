import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import { fetchData } from "./utils/fetchData";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "use-debounce";
import { getTrendingMovies } from "./utils/getTrendingMovies";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 1000);
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);

      return movies;
    } catch (error) {
      console.error("Failed to load trending movies:", error);
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      try {
        const movies = await fetchData(debouncedSearch);
        setMovies(movies);
      } catch (error) {
        console.error("Failed to load movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [debouncedSearch]);

  useEffect(() => {
    loadTrendingMovies();
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
          <Search search={searchTerm} setSearch={setSearchTerm} />
        </section>
        {trendingMovies.length > 0 && (
          <section id="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>

                  <img src={movie.poster_path} alt={movie.searchTerm} />
                </li>
              ))}
            </ul>
          </section>
        )}
        <section id="all-movie">
          <h2>All Movies</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
};

export default App;
