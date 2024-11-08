<script setup>
import Header from "./components/Header.vue";
import MovieList from "./components/MovieList.vue";
</script>

<template>
  <Header />
  <MovieList />
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
