import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Details from '../pages/Details.vue';
import Favorites from '../pages/Favorites.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/show/:id', component: Details },
  { path: '/favorites', component: Favorites },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
