<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import MovieList from "./components/MovieList.vue";
</script>

<template>
  <Header />
  <RouterView></RouterView>
  <!-- <MovieList /> -->
</template>

<style scoped>
html,
body {
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  background-color: white;
}

* {
  box-sizing: border-box;
}
</style>
