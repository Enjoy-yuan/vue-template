import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Home = () => import(/* webpackChunkName: "home" */ "@/views/Home.vue");
const Music = () => import(/* webpackChunkName: "music" */ "@/views/Music.vue");
const Shop1 = () => import(/* webpackChunkName: "Shop1" */ "@/views/Shop1.vue");
const Shop2 = () => import(/* webpackChunkName: "Shop2" */ "@/views/Shop2.vue");
const Shop3 = () => import(/* webpackChunkName: "Shop3" */ "@/views/Shop3.vue");
const About = () => import(/* webpackChunkName: "about" */ "@/views/About.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/music",
    name: "music",
    component: Music
  },
  {
    path: "/Shop1",
    name: "Shop1",
    component: Shop1
  },
  {
    path: "/Shop2",
    name: "Shop2",
    component: Shop2
  },
  {
    path: "/Shop3",
    name: "Shop3",
    component: Shop3
  },
  {
    path: "/about",
    name: "about",
    component: About
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
