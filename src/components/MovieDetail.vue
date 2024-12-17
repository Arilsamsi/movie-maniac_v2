<template>
    <div v-if="movieDetails" class="movie-detail">
      <!-- Banner Image -->
      <div class="movie-banner">
        <img
          v-if="movieDetails.backdrop_path"
          :src="`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`"
          :alt="movieDetails.title"
          class="banner-image"
        />
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
            <div class="rating">
              <span>⭐ {{ movieDetails.vote_average }}</span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Movie Info Section -->
    </div>
  
    <div v-else class="loading">Loading...</div>
  </template>
  
  <script>
  import { getMovieDetails } from "../api/api";
  import { onMounted, ref } from "vue";
  import { useRoute } from "vue-router";
  
  export default {
    name: "MovieDetail",
    setup() {
      const movieDetails = ref(null);
      const route = useRoute();
      const movieId = route.params.id;
  
      onMounted(async () => {
        try {
          movieDetails.value = await getMovieDetails(movieId);
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      });
  
      return { movieDetails };
    },
  };
  </script>
  
  <style scoped>
  .movie-detail {
    color: #fff;
    background-color: #1e1e1e;
    position: relative;
    padding-top: 110px;
  }
  
  .movie-banner {
    position: relative;
    width: 100%;
    height: 84vh;
  }
  
  .banner-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
  }
  
  .movie-info {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    position: absolute;
    left: 0;
    top: 50%;
    padding: 60px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 8px;
    backdrop-filter: blur(0.1px);
    transform: translateY(-50%);
    justify-content: center;
    width: 100%;
    height: 84vh;
  }
  
  .poster-container {
    flex: 1;
    max-width: 250px;
    display: flex;
    justify-content: center;
    /* width: 100%; */
    height: 400px
  }
  
  .poster {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
    /* object-fit: contain; */
    /* height: 100%; */
  }
  
  .movie-text {
    flex: 2;
    max-width: 700px;
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
  }
  
  .loading {
    font-size: 1.5rem;
    text-align: center;
    color: #fff;
  }
  
  /* Mobile Responsiveness */
  @media (max-width: 768px) {
    .movie-banner{
        position: relative;
        width: 100%;
        height: 84vh;
    }
    .movie-info {
      padding: 15px;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding-top: 350px;
    }
  
    .movie-text h1 {
      font-size: 1.5rem;
    }
  
    .poster-container {
      max-width: 200px;
    }
  
    .poster {
      width: 80%;
    }
  
    .movie-banner {
      height: 50vh;
    }
  }
  
  @media (max-width: 480px) {
    .movie-banner {
    position: relative;
    width: 100%;
    /* height: 84vh; */
  }
  .movie-info {
    padding: 10px;
    flex-direction: column;
    padding-top: 100px;
    height: 100%;
  }

  .movie-banner {
    height: 90vh;
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

  .rating {
    font-size: 1rem;
  }
}
  </style>
  