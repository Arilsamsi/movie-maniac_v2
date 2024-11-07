import axios from "axios";

const apiKey = import.meta.env.VITE_APIKEY;
const baseUrl = import.meta.env.VITE_BASEURL;

export const getMovieList = async () => {
  const movie = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}`);
  return movie.data.results;
  // console.log(movie);
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
