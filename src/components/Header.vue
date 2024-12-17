<template>
  <header
    class="py-3 mb-3 border-bottom bg-dark position-fixed w-100"
    style="z-index: 555"
  >
    <div
      class="container-fluid d-grid gap-3 align-items-center"
      style="grid-template-columns: 1fr 2fr"
    >
      <div class="dropdown">
        <a
          href="#"
          class="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-body-emphasis text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="../assets/logo.png"
            class="bi me-2"
            width="90px"
            height="70px"
          />
        </a>
        <ul class="dropdown-menu text-small shadow text-white bg-black">
          <li>
            <a class="dropdown-item active text-warning" href="/">Home</a>
          </li>
          <li>
            <a class="dropdown-item text-warning" href="#popular"
              >Popular Movie</a
            >
          </li>
          <li>
            <a class="dropdown-item text-warning" href="#toprated">Top Rated</a>
          </li>
          <li>
            <a class="dropdown-item text-warning" href="#upcoming">Upcoming</a>
          </li>
          <li><hr class="dropdown-divider" /></li>
        </ul>
      </div>
      <div id="Logo"><a href="/">Maniac Movie</a></div>
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
#Logo a {
  font-weight: bold;
  font-size: 40px;
  cursor: pointer;
  position: absolute;
  right: 1rem;
  color: #ffb400;
  text-decoration: none;
  top: 21px;
}
a:hover {
  color: #e50914;
}
</style>
