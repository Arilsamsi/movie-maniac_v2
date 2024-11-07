<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <img src="/src/assets/logo.png" alt="Logo" />
        <h1>Maniac Movie</h1>
      </div>
      <nav class="nav" :class="{ 'nav--active': isMenuOpen }">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#popular">Popular</a></li>
          <li><a href="#toprated">Top Rated</a></li>
          <li><a href="#upcoming">Upcoming</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
      <div class="hamburger" @click="toggleMenu">
        <span :class="{ open: isMenuOpen }"></span>
        <span :class="{ open: isMenuOpen }"></span>
        <span :class="{ open: isMenuOpen }"></span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
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
.header {
  background-color: #1c1c1e;
  padding: 20px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  position: fixed;
  width: 100%;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
  color: #ffb400;
}

.logo img {
  margin-right: 12px;
  width: 100px;
  height: 100px;
}

.logo h1 {
  font-size: 1.8rem;
  font-weight: bold;
  font-family: "Cinzel", serif;
  letter-spacing: 1px;
}

.nav {
  display: flex;
}

.nav ul {
  list-style: none;
  display: flex;
  gap: 25px;
  margin: 0;
  padding: 0;
}

.nav ul li a {
  color: #ffb400;
  text-decoration: none;
  font-size: 1.1rem;
  font-family: "Roboto", sans-serif;
  transition: color 0.3s ease;
}

.nav ul li a:hover {
  color: #e50914;
}

/* Hamburger Menu */
.hamburger {
  display: none;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
  position: relative;
}

.hamburger span {
  display: block;
  width: 30px;
  height: 3px;
  background-color: #ffffff;
  border-radius: 5px;
  transition: transform 0.4s ease, opacity 0.4s ease;
  text-align: center;
}

/* Elegant Animation for Hamburger to "X" */
.hamburger span.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger span.open:nth-child(2) {
  opacity: 0;
}

.hamburger span.open:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Responsive Styling */
@media (max-width: 768px) {
  .nav {
    position: absolute;
    top: 70px;
    right: 20px;
    background-color: #1c1c1e;
    flex-direction: column;
    width: 200px;
    display: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
  }

  .nav.nav--active {
    display: flex;
    text-align: center;
    /* padding: 50px;
    font-weight: bold; */
  }
  nav ul.open {
    transform: translateY(0);
  }

  .nav ul {
    flex-direction: column;
    gap: 15px;
  }

  .hamburger {
    display: flex;
  }
}
</style>
