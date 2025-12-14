import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import CreatePostPage from '../views/CreatePostPage.vue';

// Here you define your routes (website pages)
const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/create-post', component: CreatePostPage },
];

// some bs
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;