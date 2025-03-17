import { createRouter, createWebHistory } from 'vue-router';
import DeckCollectionPage from './pages/DeckCollection.page.vue';
import DeckBuilder from './pages/DeckBuilder.page.vue';
import LoginFormPage from './pages/LoginForm.page.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginFormPage, name: 'login' },
  { path: '/register', component: LoginFormPage, name: 'register' },
  { path: '/deck-builder', component: DeckBuilder },
  { path: '/deck-collection', component: DeckCollectionPage },

];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});