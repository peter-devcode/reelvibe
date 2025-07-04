import { updateSearchCount } from "./updateSearchCount";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export async function fetchData(query = "") {
  try {
    
    const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response = await fetch(endpoint, API_OPTIONS);

    if (!response.ok) {
      throw new Error("Failed to fetch movies", response.status);
    }
    const data = await response.json();

    if (query && data.results.length > 0) {
      await updateSearchCount(query, data.results[0])
    }
    console.log(data.results);
    return data.results;
  } catch (error) {
    console.error("Error fetching movies", error);
  }
}
