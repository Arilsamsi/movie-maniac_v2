import axios from "axios";

const apiKey = import.meta.env.VITE_APIKEY;
const baseUrl = import.meta.env.VITE_BASEURL;

export const getMovieList = async () => {
  const movie = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}`);
  return movie.data.results;
  // console.log(movie);
};

export const getMovieDetails = async (id) => {
  const url = `${baseUrl}/movie/${id}?api_key=${apiKey}`;
  try {
    const response = await axios.get(url);
    return response.data;
    // console.log(response);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw new Error("Failed to fetch movie details");
  }
};

export const getMovieTrailer = async (id) => {
  const response = await axios.get(
    `${baseUrl}/movie/${id}/videos?api_key=${apiKey}`
  );
  const trailers = response.data.results.filter(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
  return trailers.length ? trailers[0] : null; // Ambil trailer pertama jika ada
};

export const getMovieListTopRated = async () => {
  const movie = await axios.get(`${baseUrl}/movie/top_rated?api_key=${apiKey}`);
  return movie.data.results;
};

export const getMovieListUpcoming = async () => {
  const movie = await axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`);
  return movie.data.results;
  // console.log(movie);
};
export const searchMovie = async (q) => {
  const search = await axios.get(
    `${baseUrl}/search/movie?api_key=${apiKey}&query=${q}`
  );
  return search.data.results;
};
