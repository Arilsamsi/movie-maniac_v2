<template>
  <nav class="navbar" style="position: fixed;">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="navbar-logo">
        <!-- <img src="../assets/logo.png" class="navbar-icon"> -->
        <a href="/">Maniac Movie</a>
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
      <div :class="isOpen ? 'menu-links open' : 'menu-links'">
        <a href="/" class="menu-link">Home</a>
        <a href="/" class="menu-link">Popular</a>
        <a href="/" class="menu-link">Top Rated</a>
        <a href="/" class="menu-link">Upcoming</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style>
.navbar {
  background-color: #1c1c1e;
  color: #ffb400;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.navbar-container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo {
  font-size: 30px;
  font-weight: bold;
}

.navbar-icon {
  width: 30px; 
  height: 30px;
  margin-right: 8px; 
  vertical-align: middle;
}.navbar-logo a{
  text-decoration: none;
  color: #ffb400;
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
  align-items: end;
  justify-content: end;
  padding-right: 15px;
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
