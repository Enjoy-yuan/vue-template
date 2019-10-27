import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages'
import Music from '@/pages/music'
import Movie from '@/pages/movie'
import Book from '@/pages/book'
import Photo from '@/pages/photo'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/photo',
      name: 'Photo',
      component: Photo
    },
    {
      path: '/music',
      name: 'Music',
      component: Music
    },
    {
      path: '/movie',
      name: 'Movie',
      component: Movie
    },
    {
      path: '/book',
      name: 'Book',
      component: Book
    }
  ]
})
