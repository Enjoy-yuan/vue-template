import Vue from 'vue'
import App from '@/App.vue'
import { routes, router } from '@/router'
import store from '@/store'
import ElementUI from 'element-ui'
import i18n from '@/lang'
import api from '@/api'
import echarts from 'echarts'
import axios from 'axios'
// import '@/utils/mock'
import '@/utils/permission'
import '@/assets/css/index.scss'
import '@/assets/icon/iconfont'
// 全局引入echarts主题
import 'echarts/theme/macarons.js'

// import  'echarts/theme/chalk.js'
import { getCookie } from '@/utils/cookie'

// 使用qiankun
import { registerMicroApps, start } from 'qiankun'
// 调用npm自定义组件
import Button from 'yc-vue-common/components/Button'
Vue.use(Button)

Vue.prototype.$api = api
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts

if (getCookie('menuData')) {
  JSON.parse(getCookie('menuData')).map((item) => {
    routes[routes.length - 1].children.push({
      path: item.path,
      name: item.name,
      component: () => import('@/views' + item.path)
    })
  })
  router.addRoutes(routes)
}

// 设置国际化
Vue.use(ElementUI, {
  size: 'small',
  zIndex: 3000,
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

// 子应用列表
let apps = []

if (process.env.NODE_ENV === 'development') {
  apps = [
    {
      name: 'microVue2',
      entry: '//localhost:8080', // 子应用的地址，这里演示是本地启动的地址。
      container: '#container', // 子应用的容器节点的选择器（vue一般为app）
      activeRule: '/Micro/Vue2' // 访问子应用的规则，比如：主应用为localhost:8081，那访问该子应用的url应为localhost:8081/subapp
    },
    {
      name: 'microVue3',
      entry: '//localhost:8081', // 子应用的地址，这里演示是本地启动的地址。
      container: '#container', // 子应用的容器节点的选择器（vue一般为app）
      activeRule: '/Micro/Vue3' // 访问子应用的规则，比如：主应用为localhost:8081，那访问该子应用的url应为localhost:8081/subapp
    }
  ]
} else if (process.env.NODE_ENV === 'production') {
  apps = [
    {
      name: 'microVue2',
      entry: 'https://vue2.yuanchengjs.cn/', // 子应用的地址，这里演示是本地启动的地址。
      container: '#container', // 子应用的容器节点的选择器（vue一般为app）
      activeRule: '/Micro/Vue2' // 访问子应用的规则，比如：主应用为localhost:8081，那访问该子应用的url应为localhost:8081/subapp
    },
    {
      name: 'microVue3',
      entry: 'https://vue3.yuanchengjs.cn/', // 子应用的地址，这里演示是本地启动的地址。
      container: '#container', // 子应用的容器节点的选择器（vue一般为app）
      activeRule: '/Micro/Vue3' // 访问子应用的规则，比如：主应用为localhost:8081，那访问该子应用的url应为localhost:8081/subapp
    }
  ]
}

// 注册子应用
registerMicroApps(apps)

// 启动
start()

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
