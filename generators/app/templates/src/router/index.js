import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
// import Suspense from '../views/suspense/Suspense';
const Suspense = () => import('../views/suspense/Suspense');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/study',
    name: 'Study',
    component: () => import('../views/Study.vue'),
  },
  {
    path: '/suspense',
    name: 'Suspense',
    component: Suspense,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
