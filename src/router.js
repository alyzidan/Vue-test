/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import authGuard from './guards';
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      beforeEnter: authGuard
    },
    {
      path: '/',
      name: 'login',
      component: Login,
    },
  ],
});
