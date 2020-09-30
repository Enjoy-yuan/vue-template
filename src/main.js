import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from '@/lang'
import api from '@/api'
// import '@/utils/mock'
import '@/utils/permission'
import '@/assets/css/index.scss'
import '@/assets/icon/iconfont'

Vue.prototype.$api = api

// 设置国际化
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
