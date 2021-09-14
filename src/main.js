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

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
