<template>
  <section id="popular">
    <div class="movie-section">
      <h1>Discover Your Movie</h1>
      <div class="search-bar">
        <input
          type="text"
          v-model="query"
          @input="handleSearch"
          placeholder="Search for movies..."
        />
      </div>
      <h2>Popular Movies</h2>
      <div class="movie-list">
        <div
          class="movie-card"
          v-for="movie in displayedMovies"
          :key="movie.id"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
          />
          <div class="movie-info">
            <h3>{{ movie.title }}</h3>
            <p>{{ movie.release_date }}</p>
            <span class="rating">⭐ {{ movie.vote_average }}</span>
            <p class="popularity">👁 {{ movie.popularity }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="toprated">
    <div class="movie-section">
      <h2>Top Rated Movies</h2>
      <div class="movie-list">
        <div
          class="movie-card"
          v-for="movie in getMovieListTopRated"
          :key="movie.id"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
          />
          <div class="movie-info">
            <h3>{{ movie.title }}</h3>
            <p>{{ movie.release_date }}</p>
            <span class="rating">⭐ {{ movie.vote_average }}</span>
            <p class="popularity">👁 {{ movie.popularity }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="upcoming">
    <div class="movie-section">
      <h2>Upcoming Movies</h2>
      <div class="movie-list">
        <div
          class="movie-card"
          v-for="movie in getMovieListUpcoming"
          :key="movie.id"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
          />
          <div class="movie-info">
            <h3>{{ movie.title }}</h3>
            <p>{{ movie.release_date }}</p>
            <span class="rating">⭐ {{ movie.vote_average }}</span>
            <p class="popularity">👁 {{ movie.popularity }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  getMovieList,
  getMovieListTopRated,
  getMovieListUpcoming,
  searchMovie,
} from "../api/api";

export default {
  name: "MovieList",
  data() {
    return {
      movies: [],
      getMovieListTopRated: [],
      getMovieListUpcoming: [],
      searchResults: [],
      query: "",
    };
  },
  computed: {
    displayedMovies() {
      return this.query ? this.searchResults : this.movies;
    },
  },
  async created() {
    this.movies = await getMovieList();
    this.getMovieListTopRated = await getMovieListTopRated();
    this.getMovieListUpcoming = await getMovieListUpcoming();
  },
  methods: {
    async handleSearch() {
      if (this.query) {
        this.searchResults = await searchMovie(this.query);
      } else {
        this.searchResults = [];
      }
    },
  },
};
</script>

<style scoped>
html,
body {
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}
.movie-section {
  padding: 140px 20px 20px;
  background-color: #1c1c1e;
  color: #ffffff;
  width: 100%;
}
.movie-section h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #ffb400;
  font-family: "Cinzel", serif;
  text-align: center;
}
.movie-section h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  font-family: "Cinzel", serif;
  color: #ffb400;
  text-align: left;
}

/* Search Bar Styling */
.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-bar input {
  width: 60%;
  max-width: 500px;
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid #ffb400;
  outline: none;
  font-size: 1rem;
  color: #ffffff;
  background-color: #2a2a2d;
  transition: border-color 0.3s ease;
}

.search-bar input::placeholder {
  color: #b3b3b3;
}

.search-bar input:focus {
  border-color: #e50914;
}

/* Movie List Styling */
.movie-list {
  display: flex;
  overflow-x: auto;
  gap: 15px;
  padding-bottom: 10px;
  scrollbar-width: thin;
  scrollbar-color: #ffb400 transparent;
  width: 100%;
  cursor: pointer;
}

.movie-card {
  flex: 0 0 auto;
  width: 150px;
  background-color: #2a2a2d;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.movie-info {
  padding: 10px;
  text-align: center;
}

.movie-info h3 {
  font-size: 1rem;
  font-weight: bold;
  margin: 8px 0 5px;
  color: #ffffff;
}

.rating {
  color: #ffb400;
  font-size: 0.9rem;
}

/* Custom Scrollbar */
.movie-list::-webkit-scrollbar {
  height: 8px;
}

.movie-list::-webkit-scrollbar-track {
  background: transparent;
}

.movie-list::-webkit-scrollbar-thumb {
  background-color: #ffb400;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.movie-list::-webkit-scrollbar-thumb:hover {
  background-color: #e50914;
}
.popularity {
  display: flex;
  /* position: fixed; */
  margin-bottom: 2px;
  color: #ffb400;
  font-weight: 500;
  font-size: 1rem;
  text-decoration: underline;
  /* display: none; */
}
.popularity:hover {
  color: #e50914;
}
.movie-info h3:hover {
  color: #ffb400;
}
</style>
