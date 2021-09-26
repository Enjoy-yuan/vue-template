<template>
  <div>
    <div id="container"></div>
    <router-view />
  </div>
</template>

<script>
// 使用qiankun
import { registerMicroApps, start } from 'qiankun'
export default {
  name: 'Micro',
  mounted() {
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
  }
}
</script>
