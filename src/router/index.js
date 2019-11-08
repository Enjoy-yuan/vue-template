import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [{
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "home" */ '@/pages')
    },
    {
      path: '/photo',
      name: 'Photo',
      component: () => import(/* webpackChunkName: "photo" */ '@/pages/Photo')
    },
    {
      path: '/music',
      name: 'Music',
      component: () => import(/* webpackChunkName: "music" */  '@/pages/Music')
    },
    {
      path: '/movie',
      name: 'Movie',
      component: () => import(/* webpackChunkName: "movie" */  '@/pages/Movie')
    },
    {
      path: '/book',
      name: 'Book',
      component: () => import(/* webpackChunkName: "book" */  '@/pages/Book')
    }
  ]
})
