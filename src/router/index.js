import { createRouter, createWebHistory } from 'vue-router';
import MovieList from '../components/MovieList.vue'; // Sesuaikan dengan struktur proyek Anda
import MovieDetail from '../components/MovieDetail.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MovieList,
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: MovieDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
