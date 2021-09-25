import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

let instance = null
function render(props = {}) {
  const { container } = props
  instance = createApp(App)
  // 此处必须分开写
  instance
    .use(store)
    .use(router)
    .mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  console.log('subappVue3初始化')
}
export async function mount(props) {
  console.log('subappVue3完成加载', props)
  render(props)
}
export async function unmount() {
  console.log('subappVue3完成卸载')
  instance.unmount()
  instance._container.innerHTML = ''
  instance = null
}
