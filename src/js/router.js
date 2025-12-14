import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import SignupPage from '../views/SignupPage.vue';
import CreatePostPage from '../views/CreatePostPage.vue';
import Login from '../components/Login.vue';
import ContactPage from '../views/ContactPage.vue';
import auth from "./auth";

// Here you define your routes (website pages)
const routes = [
  {
    path: '/', component: HomePage,
    beforeEnter: async(to, from, next) => {
        let authResult = await auth.authenticated();
        if (!authResult) {
            next('/login')
        } else {
            next();
        }
    }
  },
  { path: '/login', component: Login },
  { path: '/signup', component: SignupPage},
  { path: '/create-post', component: CreatePostPage },
  { path: '/contact', component: ContactPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;