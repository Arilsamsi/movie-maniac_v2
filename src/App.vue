<script setup>
import Header from "./components/Header.vue";
import MovieList from "./components/MovieList.vue";
import TopRated from "./components/TopRated.vue";
import Upcoming from "./components/Upcoming.vue";
</script>

<template>
  <Header />
  <MovieList />
  <TopRated />
  <Upcoming />
</template>

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
</style>
