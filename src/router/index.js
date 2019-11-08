import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages'
import Music from '@/pages/music'
// import Movie from '@/pages/movie'
import Book from '@/pages/book'
import Photo from '@/pages/photo'



Vue.use(Router)

const Movie = () => import(/* webpackChunkName: "group-foo" */ '../pages/movie')


export default new Router({
  mode: "history",
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
      // () => import(/* webpackChunkName: "home" */ '@/pages/index.vue')
    },
    {
      path: '/photo',
      name: 'Photo',
      component: Photo
      // () => import(/* webpackChunkName: "photo" */ '@/pages/Photo/index.vue')
    },
    {
      path: '/music',
      name: 'Music',
      component: Music
      // () => import(/* webpackChunkName: "music" */  '@/pages/Music/index.vue')
    },
    {
      path: '/movie',
      name: 'Movie',
      component:Movie
    },
    {
      path: '/book',
      name: 'Book',
      component: Music
      // () => import(/* webpackChunkName: "book" */  '@/pages/Book/index.vue')
    }
  ]
})
