import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Home = () => import(/* webpackChunkName: "home" */ "../views/Home.vue");
const Music = () => import(/* webpackChunkName: "music" */ "../views/Music.vue");
const Movie = () => import(/* webpackChunkName: "movie" */ "../views/Movie.vue");
const Book = () => import(/* webpackChunkName: "book" */ "../views/Book.vue");
const Photo = () => import(/* webpackChunkName: "photo" */ "../views/Photo.vue");

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
    path: "/movie",
    name: "movie",
    component: Movie
  },
  {
    path: "/book",
    name: "book",
    component: Book
  },
  {
    path: "/photo",
    name: "photo",
    component: Photo
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
