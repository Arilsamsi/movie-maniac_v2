<template>
  <section id="popular">
    <div
      class="movie-section"
      v-bind:style="{ backgroundImage: `url(${backgroundImage})` }"
      style="background-position: center; background-repeat: no-repeat; background-size: cover;"
    >
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
          @click="goToMovieDetail(movie.id)"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
          />
          <div class="movie-info">
            <h3>{{ movie.title }}</h3>
            <p>{{ movie.release_date }}</p>
            <p class="genres">Genre: {{ movie.genres }}</p>
            <p class="runtimes">Durasi: {{ movie.runtime }}</p>
            <span class="rating">⭐ {{ movie.vote_average }}</span>
            <p class="popularity">👁 {{ movie.popularity }}</p>
          </div>
        </div>
      </div>
      <h2>Top Rated Movies</h2>
      <div class="movie-list">
        <div
          class="movie-card"
          v-for="movie in getMovieListTopRated"
          :key="movie.id"
          @click="goToMovieDetail(movie.id)"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
          />
          <div class="movie-info">
            <h3>{{ movie.title }}</h3>
            <p>{{ movie.release_date }}</p>
            <p class="genres">Genre: {{ movie.genres }}</p>
            <p class="runtimes">Durasi: {{ movie.runtime }}</p>
            <span class="rating">⭐ {{ movie.vote_average }}</span>
            <p class="popularity">👁 {{ movie.popularity }}</p>
          </div>
        </div>
      </div>
      <h2>Upcoming Movies</h2>
      <div class="movie-list">
        <div
          class="movie-card"
          v-for="movie in getMovieListUpcoming"
          :key="movie.id"
          @click="goToMovieDetail(movie.id)"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
          />
          <div class="movie-info">
            <h3>{{ movie.title }}</h3>
            <p>{{ movie.release_date }}</p>
            <p class="genres">Genre: {{ movie.genres }}</p>
            <p class="runtimes">Durasi: {{ movie.runtime }}</p>
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
  getMovieDetails,
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
      backgroundImage: "",
    };
  },
  computed: {
    displayedMovies() {
      return this.query ? this.searchResults : this.movies;
    },
  },
  async created() {
    this.movies = await this.fetchMovieDetails(await getMovieList());
    this.getMovieListTopRated = await this.fetchMovieDetails(await getMovieListTopRated());
    this.getMovieListUpcoming = await this.fetchMovieDetails(await getMovieListUpcoming());
    
    this.changeBackgroundImage();
    
    this.backgroundInterval = setInterval(this.changeBackgroundImage, 10000);
  },
  beforeDestroy() {
    clearInterval(this.backgroundInterval); 
  },
  methods: {
    async handleSearch() {
      if (this.query) {
        this.searchResults = await this.fetchMovieDetails(await searchMovie(this.query));
      } else {
        this.searchResults = [];
      }
    },
    async fetchMovieDetails(movieList) {
      const moviesWithDetails = await Promise.all(
        movieList.map(async (movie) => {
          try {
            const details = await getMovieDetails(movie.id);
            return {
              ...movie,
              runtime: this.formatDuration(details.runtime),
              genres: details.genres
                ? details.genres.map((genre) => genre.name).join(", ")
                : "N/A",
            };
          } catch (error) {
            console.error("Error fetching movie details:", error);
            return {
              ...movie,
              runtime: "N/A",
              genres: "N/A",
            };
          }
        })
      );
      return moviesWithDetails;
    },
    formatDuration(runtime) {
      if (runtime && runtime > 0) {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h ${minutes}m`;
      }
      return "N/A";
    },
    goToMovieDetail(id) {
      this.$router.push(`/movie/${id}`);
    },
    changeBackgroundImage() {
      // List of backdrop images
      const backdropImages = [
        "https://image.tmdb.org/t/p/original/l33oR0mnvf20avWyIMxW02EtQxn.jpg", 
        "https://image.tmdb.org/t/p/original/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
        "https://image.tmdb.org/t/p/original/tElnmtQ6yz1PjN1kePNl8yMSb59.jpg",
        "https://image.tmdb.org/t/p/original/hT2yA8oaKVjXHjPWlmy08fdPz9p.jpg",
        "https://image.tmdb.org/t/p/original/au3o84ub27qTZiMiEc9UYzN74V3.jpg",
      ];

      // Randomly select a backdrop image
      this.backgroundImage = backdropImages[Math.floor(Math.random() * backdropImages.length)];
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
  padding: 80px 20px 20px;
  /* background-color: #1c1c1e; */
  color: #ffffff;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  position: relative;
}
.movie-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Menambahkan layer gelap dengan transparansi */
  z-index: 1; /* Memastikan overlay ada di atas gambar latar belakang */
}

.movie-section > * {
  position: relative;
  z-index: 2; /* Membuat konten di atas overlay */
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
  display: flex;
  flex: 0 0 auto;
  width: 450px;
  background-color: transparent;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  justify-content: start;
  align-items: start;
  height: 200px;
}

.movie-card:hover {
  background-color: #2a2a2d;
  transform: scale(1.05);
}

.movie-card img {
  width: 190px;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
}

.movie-info {
  padding: 10px;
  height: 100%;
  width: 100%;
  position: relative;
  padding: 20px;
}

.movie-info h3 {
  font-size: 1rem;
  font-weight: bold;
  margin: 8px 0 5px;
  color: #ffffff;
  position: relative;
}

.rating {
  color: #ffb400;
  font-size: 1rem;
  text-align: center;
  position: absolute;
  bottom: 0;
  right: 105px;
}

.rating:hover {
  color: #e50914;
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
  margin-bottom: 2px;
  color: #ffb400;
  font-weight: 500;
  font-size: 1rem;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: 5px;
}

.popularity:hover {
  color: #e50914;
}

.movie-info h3:hover {
  color: #ffb400;
}

.genres,
.runtimes {
  font-size: 0.9rem;
  color: #b3b3b3;
  margin-top: 5px;
  text-align: left;
}

@media (max-width: 480px) {
  .movie-section{
    background-position: center;
  }
}
</style>
