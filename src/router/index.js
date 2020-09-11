import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: () => import(/* webpackChunkName: "Login" */ '@/views/Login') },
  { path: '/three/music', name: 'Music', component: () => import(/* webpackChunkName: "Music" */ '@/views/Three/Music') },
  { path: '/three/car', name: 'Car', component: () => import(/* webpackChunkName: "Car" */ '@/views/Three/Car') },
  { path: '*', name: 'NotFound', component: () => import(/* webpackChunkName: "NotFound" */ '@/views/Error') },
  {
    path: '/layout',
    component: () => import(/* webpackChunkName: "Layout" */ '@/views/Layout'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '/', redirect: '/Home' },
      { path: '/Home', name: 'Home', component: () => import(/* webpackChunkName: "Home" */ '@/views/Home') },
      {
        path: '/example/table',
        name: 'Table',
        component: () => import(/* webpackChunkName: "Table" */ '@/views/Example/Table')
      },
      {
        path: '/example/echart',
        name: 'Echart',
        component: () => import(/* webpackChunkName: "Echart" */ '@/views/Example/Echart')
      },
      {
        path: '/example/clipboard',
        name: 'Clipboard',
        component: () => import(/* webpackChunkName: "Clipboard" */ '@/views/Example/Clipboard')
      },
      {
        path: '/example/moment',
        name: 'Moment',
        component: () => import(/* webpackChunkName: "Moment" */ '@/views/Example/Moment')
      },
      {
        path: '/example/tinymce',
        name: 'Tinymce',
        component: () => import(/* webpackChunkName: "Tinymce" */ '@/views/Example/Tinymce')
      },
      {
        path: '/example/backtop',
        name: 'Backtop',
        component: () => import(/* webpackChunkName: "Backtop" */ '@/views/Example/Backtop')
      },
      {
        path: '/example/three',
        name: 'Three',
        component: () => import(/* webpackChunkName: "Three" */ '@/views/Example/Three')
      },
      {
        path: '/example/test',
        name: 'Test',
        component: () => import(/* webpackChunkName: "Test" */ '@/views/Example/Test')
      },
      {
        path: '/menu1/menu3/menu4',
        name: 'Menu4',
        component: () => import(/* webpackChunkName: "Menu4" */ '@/views/Menu/Menu1/Menu3/Menu4')
      },
      {
        path: '/Menu2',
        name: 'Menu2',
        component: () => import(/* webpackChunkName: "Menu2" */ '@/views/Menu/Menu2')
      }
    ]
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
