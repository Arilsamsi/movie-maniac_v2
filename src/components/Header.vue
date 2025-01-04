<template>
  <nav class="navbar" style="position: fixed;" :class="{ 'navber': true, 'navbar-scrolled': isScrolled }">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="navbar-logo">
        <a style="width: 100px; height: 100px;" href="/"><img src="../assets/logo.png" class="navbar-icon" width="100px" height="100px"></a>
        <!-- <a href="/">Maniac Movie</a> -->
      </div>

      <!-- Hamburger Menu for Mobile -->
      <div class="hamburger-menu">
        <button @click="toggleMenu" class="hamburger-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="hamburger-icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      <!-- Menu Links -->
      <div class="center" :class="isOpen ? 'menu-links open' : 'menu-links'">
        <a href="/" class="menu-link">Home</a>
        <a href="/" class="menu-link">Popular</a>
        <a href="/" class="menu-link">Top Rated</a>
        <a href="/" class="menu-link">Upcoming</a>
        <form class="form">
          <button>
            <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </button>
          <input 
            class="input"
            type="text" 
            v-model="query"
            @input="handleSearch"
            placeholder="Search...">
          <button class="reset" type="reset">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import { searchMovie } from '../api/api';

export default {
  name: 'Header',
  data() {
    return {
      isOpen: false,
      isScrolled: false,
      searchResults: [],
      query: "",
    };
  },
  computed: {
    displayedMovies() {
      return this.query ? this.searchResults : this.movies;
    },
  },
  methods: {
    async handleSearch() {
      if (this.query) {
        this.searchResults = await this.fetchMovieDetails(await searchMovie(this.query));
      } else {
        this.searchResults = [];
      }
    },
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 0;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy(){
    window.addEventListener('scroll', this.handleScroll);
  }
};
</script>

<style>
.center{
  display: flex;
  align-items: center;
  justify-self: center;
}
.navbar {
  /* background-color: #1c1c1e; */
  background-color: transparent;
  color: #ffb400;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5); */
  z-index: 999;
  transition: background-color 0.3s ease;
}

.navbar-scrolled {
  background-color: #1c1c1e;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

.navbar-container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

.navbar-logo {
  font-size: 30px;
  font-weight: bold;
}

.navbar-icon {
  /* width: 30px;  */
  width: 100px;
  height: 100px;
  margin-right: 8px; 
  vertical-align: middle;
}.navbar-logo a{
  text-decoration: none;
  color: #ffb400;
  /* margin-bottom: 50px; */
  /* padding-bottom: 50px; */
}
.hamburger-menu {
  display: none;
  cursor: pointer;
}

.hamburger-button {
  background: none;
  border: none;
  outline: none;
}

.hamburger-icon {
  width: 24px;
  height: 24px;
  color: #ffb400;
}

.menu-links {
  display: flex;
  gap: 20px;
}

.menu-link {
  text-decoration: none;
  color: #ffb400;
  font-size: 16px;
  transition: color 0.3s ease;
  display: flex;
  /* align-items: end;
  justify-content: end; */
  align-items: center;
  justify-content: center;
  padding-right: 15px;
}

.form button {
  border: none;
  background: none;
  color: #8b8ba7;
}
/* styling of whole input container */
.form {
  /* display: none; */
  --timing: 0.3s;
  --width-of-input: 200px;
  --height-of-input: 40px;
  --border-height: 2px;
  --input-bg: #1c1c1c;
  --border-color: #e50914;
  --border-radius: 30px;
  --after-border-radius: 1px;
  position: relative;
  width: var(--width-of-input);
  height: var(--height-of-input);
  display: flex;
  align-items: center;
  padding-inline: 0.8em;
  border-radius: var(--border-radius);
  transition: border-radius 0.5s ease;
  background: var(--input-bg,#fff);
  border: 1px #ffb400 solid;
}
.input {
  font-size: 0.9rem;
  background-color: transparent;
  width: 100%;
  height: 100%;
  padding-inline: 0.5em;
  padding-block: 0.7em;
  border: none;
  color: #fff;
}

.form:before {
  content: "";
  position: absolute;
  background: var(--border-color);
  transform: scaleX(0);
  transform-origin: center;
  width: 100%;
  height: var(--border-height);
  left: 0;
  bottom: 0;
  border-radius: 1px;
  transition: transform var(--timing) ease;
}

.form:focus-within {
  border-radius: var(--after-border-radius);
}

input:focus {
  outline: none;
}

.form:focus-within:before {
  transform: scale(1);
}

.reset {
  border: none;
  background: none;
  opacity: 0;
  visibility: hidden;
}

input:not(:placeholder-shown) ~ .reset {
  opacity: 1;
  visibility: visible;
}

.form svg {
  width: 17px;
  margin-top: 3px;
}

.menu-link:hover {
  color: #e50914;
}

@media (max-width: 768px) {
  .hamburger-menu {
    display: block;
  }
  .menu-links {
    display: none;
    flex-direction: column;
    gap: 10px;
    background-color: #1c1c1e;
    position: absolute;
    top: 60px;
    right: 0;
    width: 100%;
    padding: 10px 0;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
  }
  .menu-links.open {
    display: flex;
  }
}
</style>
