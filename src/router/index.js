import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "NotFound" */ '@/views/NotFount')
  },
  {
    path: '/Layout',
    component: () => import(/* webpackChunkName: "Layout" */ '@/views/Layout'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '/', redirect: '/Home' },
      {
        path: '/Home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Home')
      },
      {
        path: '/Echarts/Bar',
        name: 'Bar',
        component: () => import(/* webpackChunkName: "Bar" */ '@/views/Echarts/Bar')
      },
      {
        path: '/Echarts/Line',
        name: 'Line',
        component: () => import(/* webpackChunkName: "Line" */ '@/views/Echarts/Line')
      },
      {
        path: '/Echarts/Pie',
        name: 'Pie',
        component: () => import(/* webpackChunkName: "Pie" */ '@/views/Echarts/Pie')
      },
      {
        path: '/Example/Tables',
        name: 'Tables',
        component: () => import(/* webpackChunkName: "Tables" */ '@/views/Example/Tables')
      },
      {
        path: '/Example/Clipboard',
        name: 'Clipboard',
        component: () => import(/* webpackChunkName: "Clipboard" */ '@/views/Example/Clipboard')
      },
      {
        path: '/Example/Moment',
        name: 'Moment',
        component: () => import(/* webpackChunkName: "Moment" */ '@/views/Example/Moment')
      },
      {
        path: '/Example/Tinymce',
        name: 'Tinymce',
        component: () => import(/* webpackChunkName: "Tinymce" */ '@/views/Example/Tinymce')
      },
      {
        path: '/Example/Backtop',
        name: 'Backtop',
        component: () => import(/* webpackChunkName: "Backtop" */ '@/views/Example/Backtop')
      },
      {
        path: '/Example/BaiduMap',
        name: 'BaiduMap',
        component: () => import(/* webpackChunkName: "BaiduMap" */ '@/views/Example/BaiduMap')
      },
      {
        path: '/Example/QRcode',
        name: 'QRcode',
        component: () => import(/* webpackChunkName: "QRcode" */ '@/views/Example/QRcode')
      },
      {
        path: '/Example/TreeMenu',
        name: 'TreeMenu',
        component: () => import(/* webpackChunkName: "TreeMenu" */ '@/views/Example/TreeMenu')
      },
      {
        path: '/CustomComponents/Button',
        name: 'Button',
        component: () => import(/* webpackChunkName: "Button" */ '@/views/CustomComponents/Button')
      },
      {
        path: '/Micro/Vue2/Home',
        name: 'MicroVue2Home',
        component: () => import(/* webpackChunkName: "Vue2" */ '@/views/Micro')
      },
      {
        path: '/Micro/Vue2/About',
        name: 'MicroVue2About',
        component: () => import(/* webpackChunkName: "MicroVue2About" */ '@/views/Micro')
      },
      {
        path: '/Micro/Vue3',
        name: 'MicroVue3',
        component: () => import(/* webpackChunkName: "MicroVue3" */ '@/views/Micro')
      }
    ]
  }
]

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
