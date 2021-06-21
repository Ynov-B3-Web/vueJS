import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
},
{
  path: '/users/:id',
  name: 'UserPage',
  component: () => import('../views/UserPage.vue'),
},
{
  path: '/create-user',
  name: 'CreateUser',
  component: () => import('../views/CreateUser.vue'),
},
{
  path: '/other',
  name: 'Other',
  component: () => import('../views/Other.vue'),
}];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;