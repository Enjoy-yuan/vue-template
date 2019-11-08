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
      component: Movie
    },
    {
      path: '/movie',
      name: 'Movie',
      component: Music
    },
    {
      path: '/book',
      name: 'Book',
      component: Music
    },
    {
      path: '/photo',
      name: 'Photo',
      component: () => import( /* webpackChunkName: "music" */ '@/pages/music')
    }
  ]
})
