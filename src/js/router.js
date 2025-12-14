import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import SignupPage from '../views/SignupPage.vue';
import CreatePostPage from '../views/CreatePostPage.vue';
import Login from '../components/Login.vue';
import ContactPage from '../views/ContactPage.vue';
import APostPage from '../views/APostPage.vue';
import auth from './auth'

// funktsioon, mis kontrollib, kas kasutaja autenditud
const requireAuth = async(to, from, next) => {
        let authResult = await auth.authenticated();
        if (!authResult) {
            next('/login')
        } else {
            next();
        }
    }

const routes = [
  { path: '/', component: HomePage, beforeEnter: requireAuth },
  { path: '/login', component: Login },
  { path: '/signup', component: SignupPage},
  { path: '/create-post', component: CreatePostPage, beforeEnter: requireAuth },
  { path: '/contact', component: ContactPage },
  { path: '/apost/:id', component: APostPage, beforeEnter: requireAuth }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;