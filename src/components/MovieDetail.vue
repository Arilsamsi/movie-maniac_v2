<template>
  <div v-if="movieDetails && movieDetails !== null" class="movie-detail">
    <!-- Banner Image -->
    <div class="movie-banner">
      <img
        v-if="movieDetails.backdrop_path"
        :src="`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`"
        :alt="movieDetails.title"
        class="banner-image"
        style="background-position: center;"
      />
      <!-- Movie Info -->
      <div class="movie-info">
        <div class="poster-container">
          <img
            v-if="movieDetails.poster_path"
            :src="`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`"
            alt="Movie Poster"
            class="poster"
          />
        </div>
        <div class="movie-text">
          <h1>{{ movieDetails.title }}</h1>
          <p class="release-date">{{ movieDetails.release_date }}</p>
          <p class="overview">{{ movieDetails.overview }}</p>
          
          
          <!-- Duration -->
          <div v-if="movieDetails.runtime" class="runtime">
            <span>Durasi: {{ formatDuration(movieDetails.runtime) }}</span>
          </div>
          
          <!-- Genre -->
          <div v-if="movieDetails.genres && movieDetails.genres.length" class="genres">
            <span>Genre: {{ movieDetails.genres.map(genre => genre.name).join(', ') }}</span>
          </div>

          <!-- Rating -->
          <div class="rating">
            <span>⭐ {{ movieDetails.vote_average }}</span>
          </div>

          <div class="popularity">
            <span>👁️ {{ movieDetails.popularity }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Trailer Section -->
    <div v-if="movieTrailer" class="movie-trailer">
      <!-- <h2>Watch Trailer</h2> -->
      <iframe
        :src="`https://www.youtube.com/embed/${movieTrailer.key}`"
        title="Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="trailer-iframe"
      ></iframe>
    </div>
    <div v-else class="no-trailer">
      <p>No Trailer Available</p>
    </div>
  </div>

  <!-- Loading State -->
  <div v-else class="loading">Loading...</div>
</template>

<script>
import { getMovieDetails, getMovieTrailer } from "../api/api";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "MovieDetail",
  setup() {
    const movieDetails = ref(null);  // Properti movieDetails didefinisikan sebagai null
    const movieTrailer = ref(null);
    const route = useRoute();
    const movieId = route.params.id;

    onMounted(async () => {
      try {
        movieDetails.value = await getMovieDetails(movieId); // Mendapatkan detail film
        movieTrailer.value = await getMovieTrailer(movieId); // Mendapatkan trailer film
      } catch (error) {
        console.error("Error fetching movie details or trailer:", error);
      }
    });

    // Format durasi
    const formatDuration = (runtime) => {
      if (runtime && runtime > 0) {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h ${minutes}m`;
      }
      return "N/A";
    };

    return { movieDetails, movieTrailer, formatDuration };
  },
};
</script>

<style scoped>
/* Movie Detail Styling */
.movie-detail {
  color: #fff;
  background-color: #1e1e1e;
  position: relative;
  padding-top: 60px;
}

/* Banner Section */
.movie-banner {
  position: relative;
  width: 100%;
  height: 90vh;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-position: center;
}

/* Movie Info Section */
.movie-info {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    position: absolute;
    left: 0;
    top: 50%;
    padding: 60px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    backdrop-filter: blur(0.1px);
    transform: translateY(-50%);
    justify-content: center;
    width: 100%;
    height: 90vh;
  }

.poster-container {
  flex: 1;
  max-width: 250px;
  display: flex;
  justify-content: center;
  height: 400px;
}

.poster {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
}

.movie-text {
  flex: 2;
  max-width: 700px;
  position: relative;
}

.movie-text h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.release-date {
  font-size: 1rem;
  margin-bottom: 15px;
  color: #bbb;
}

.overview {
  font-size: 1.1rem;
  margin-bottom: 15px;
  line-height: 1.6;
}

.rating {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffb400;
  position: absolute;
  top: 330px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.popularity{
  color: #ffb400;
  position: absolute;
  top: 360px;
}

/* Trailer Section */
.movie-trailer {
  margin-top: 15px;
  text-align: center;
  /* margin-bottom: 10px; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.trailer-iframe {
  width: 100%;
  max-width: 800px;
  height: 450px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-trailer {
  text-align: center;
  font-size: 1.2rem;
  color: #bbb;
}

/* Loading State */
.loading {
  font-size: 1.5rem;
  text-align: center;
  color: #fff;
}

/* Responsiveness */
@media (max-width: 768px) {
  .movie-banner{
    height: 100vh;
    background-position: center;
  }
  .movie-info {
    padding: 15px;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .poster-container {
    max-width: 200px;
  }

  .trailer-iframe {
    height: 300px;
    align-items: center;
    justify-content: center;
    display: flex;
  }
}

@media (max-width: 480px) {
  .movie-banner {
    height: 100vh;
    background-position: center;
  }

  /* Place poster at the top for mobile view */
  .movie-info {
    padding: 10px;
    display: flex;
    flex-direction: column;
    padding-top: 100px;
    height: 100%;
  }
  .poster-container {
    max-width: 150px;
    margin-bottom: 15px;
  }

  .poster {
    width: 100%;
  }

  .movie-text h1 {
    font-size: 1.2rem;
  }

  .rating,
  .popularity
  {
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 40%;
  }

  .trailer-iframe {
    height: 200px;
  }
}

</style>
