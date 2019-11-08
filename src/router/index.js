import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/pages'
// import Music from '@/pages/music'
// import Movie from '@/pages/movie'
// import Book from '@/pages/book'
// import Photo from '@/pages/photo'



Vue.use(Router)

const Home = () => import( /* webpackChunkName: "home" */ '@/pages')
const Music = () => import( /* webpackChunkName: "music" */ '@/pages/music')
const Movie = () => import( /* webpackChunkName: "movie" */ '@/pages/movie')
const Book = () => import( /* webpackChunkName: "book" */ '@/pages/book')
const Photo = () => import( /* webpackChunkName: "photo" */ '@/pages/photo')
// const Movie = () => import( /* webpackChunkName: "movie" */ '@/pages/movie')

export default new Router({
  mode: "history",
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/music',
      name: 'Music',
      component: () => import( /* webpackChunkName: "music" */ '@/pages/music')
    },
    {
      path: '/movie',
      name: 'Movie',
      component: () => import( /* webpackChunkName: "movie" */ '@/pages/movie')
    },
    {
      path: '/book',
      name: 'Book',
      component: () => import( /* webpackChunkName: "book" */ '@/pages/book')
    },
    {
      path: '/photo',
      name: 'Photo',
      component: () => import( /* webpackChunkName: "photo" */ '@/pages/photo')
    }
  ]
})
