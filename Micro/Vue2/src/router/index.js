import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/Home' },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/About',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: window.__POWERED_BY_QIANKUN__ ? '/Micro/Vue2' : '/',
  // base: process.env.BASE_URL,
  routes
})

export default router
