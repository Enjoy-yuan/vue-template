## 1.安装脚手架

- 代码格式化在 vscode 的 setting.json 中设置
- eslint 直接使用 vscode 扩展
- 不使用 typescript

```
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, Vuex, CSS Pre-processors
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with dart-sass)
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? No
```

## 2.启动项目

- 安装依赖：yarn
- 启动本地环境：yarn serve
- 启动测试环境：yarn qa
- 启动生产环境：yarn build

## 3.项目功能

- 登录
- 自动刷新 token(已移除)
- 多环境配置
- 国际化
- 动态菜单
- 面包屑
- 标签导航
- 404 错误页面
- 富文本
- 弹出框可拖拽
- 按钮点击波纹动画
- 请求封装
- 请求进度条
- 按钮防抖
- 文字复制
- 时间格式化
- 高度自适应

## 4.package.json 依赖

- 国际化：vue-i18n
- 富文本：@tinymce/tinymce-vue
- promise 请求：axios
- pc 组件库：element-ui
- cookie：js-cookie
- 进度条：nprogress
- 防抖：lodash
- 时间：moment
- 剪切板：clipboard
- 图表：echarts
- mock 数据：mockjs(已移除)

## 5.环境配置

- 本地：.env.development
- 测试：.env.production
- 生产：.env.qa

```js
"scripts": {
    "serve": "vue-cli-service serve --open",
    "qa": "vue-cli-service build --mode qa",
    "build": "vue-cli-service build"
  },
```

## 6.国际化的实现

- 在 src 下新建 lang 文件夹，新建 en.js，zh.js，index.js

```js
// src/lang/index.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import en from '@/lang/en.js'
import zh from '@/lang/zh.js'
import { getToken } from '@/utils/cookie'
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: getToken(),
  messages: {
    en: {
      ...en,
      ...enLocale
    },
    zh: {
      ...zh,
      ...zhLocale
    }
  }
})

export default i18n

// main.js
import i18n from './lang'
// 设置国际化
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')

// 切换语言
this.$i18n.locale = 'en'
setCookie('language', 'en')

this.$i18n.locale = 'zh'
setCookie('language', 'zh')
```

## 7.动态路由的实现

- 从后端获取动态路由，在前端将其格式化成树状结构
- 编写递归树状菜单组件，根据后端的唯一字段设置国际化
- 折叠时动态菜单的文字无法隐藏，可通过 isCollapse 来控制文字的显示隐藏

```js
// src/utils/myFun.js
// 将动态菜单数据转为树状结构
export function dataToTree(data) {
  let map = {}
  let treeData = []
  data.map((item) => {
    map[item.rowId] = item
  })
  data.map((item) => {
    const parent = map[item.parentId]
    if (parent) {
      if (!Array.isArray(parent.children)) parent.children = []
      parent.children.push(item)
    } else {
      treeData.push(item)
    }
  })
  return treeData
}

// 递归组件， src/views/Layout/Menu/components/Menutree
<template>
  <div class="menutree">
    <div v-for="menu in data" :key="menu.url">
      <el-submenu :index="menu.url" v-if="menu.children">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{ $t(menu.catalogEngName) }}</span>
        </template>
        <div>
          <Menutree :data="menu.children"></Menutree>
        </div>
      </el-submenu>
      <el-menu-item v-else :index="menu.url">
        <span slot="title">{{ $t(menu.catalogEngName) }}</span>
      </el-menu-item>
    </div>
  </div>
</template>
<script>
import Menutree from '@/views/Layout/Menu/components/Menutree'
export default {
  name: 'Menutree',
  components: { Menutree },
  props: ['data']
}
</script>
```

## 8.刷新 token 和访问 token 的处理(已移除)

- 设置 token 的过期时间是 1 小时，在过期时间的前十分钟内通过刷新 token 来重新获取访问 token
- 重新获取访问 token 的请求，可以放在请求拦截器中，也可放在路由的前置钩子函数里面
- 当保存密码到 cookie 中时需要对其进行加密，可只保存刷新 token，通过刷新 token 来获取新的刷新 token 和访问 token

```js
let isRefreshing = true
// 请求拦截器
service.interceptors.request.use(
  function(config) {
    NProgress.start()
    if (getCookie('token')) {
      // 验证当前时间是否在token过期时间前10分钟内，true则重新拉取token，若当前时间超过过期时间则返回登录页要求用户重新登录
      // isRefreshing确保请求只执行一次，避免请求调用自身一直执行
      // 只有isRefreshing为true时checkToken才会执行
      if (isRefreshing && checkToken()) {
        isRefreshing = false
        const auths = {
          auth: {
            identity: {
              methods: ['password'],
              password: {
                user: {
                  name: getCookie('username'),
                  password: getCookie('password')
                }
              }
            }
          }
        }
        // 获取刷新token
        api.getTokenId(auths).then((res) => {
          const userToken = {
            auth: {
              identity: {
                methods: ['token'],
                token: {
                  id: res.headers['x-subject-token']
                }
              }
            }
          }
          //获取访问token
          api.getTokenId(userToken).then((res) => {
            // Message.success({
            //   showClose: true,
            //   message: '刷新token'
            // })
            setCookie('tokenTime', res.data.token.expireAt)
            setCookie('token', res.headers['x-subject-token'])
          })
        })
      }
      config.headers['X-Auth-Token'] = getCookie('token')
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
```

## 9.富文本的实现

- 到官网注册登录，获取 api-key
- 需下载中文包
- 图片上传使用 images_upload_handler 钩子函数
- 不得使用 keep-alive 包裹

## 10.回到顶部

- 在 class 为 content 的元素上设置 overflow: auto;使得滚动事件不再挂载在 window 上

```js
window.addEventListener('scroll', this.handleScroll)
window.pageYOffset
// 替换
this.oContent = document.getElementById('content')
this.oContent.addEventListener('scroll', this.handleScroll)
this.oContent.scrollTop
```

## 11.菜单点击报错

- vue-router3.0 及以上版本，点击菜单可能报错，可更换为"^2.8.0"版本

## 12.threejs 的使用

- jsm 下的文件可直接使用 import 来进行引入

```js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
```

## 13.echarts 图表高度的自适应

- resize 事件在不同组件之间可能会相互覆盖，必须使用以下写法，数值自定义

```js
created() {
    window.addEventListener('resize', this.resizeHeight, false)
    this.resizeHeight()
},
destroyed() {
    window.removeEventListener('resize', this.resizeHeight, false)
},
resizeHeight() {
    this.echartsHeight = document.body.offsetHeight - 175 + 'px'
},
```

## 14.代码的格式化

- 安装扩展插件：ESLint(提示修复)，Prettier ESLint(格式化)，Prettier(格式化非 js 文件，在 setting.json 中设置)
- 添加格式化的依赖
- 新建并修改.eslintrc.js 文件
- 修改.eslintrc.js 文件后需要重启项目
- 在项目根目录下新建文件夹.vscode，新建文件 settings.json，主要用来格式化 vue 文件

```js
"@vue/cli-plugin-babel": "~4.5.0",
"@vue/cli-plugin-eslint": "~4.5.0",
"@vue/cli-plugin-router": "~4.5.0",
"@vue/cli-plugin-vuex": "~4.5.0",
"@vue/cli-service": "~4.5.0",
"@vue/eslint-config-standard": "^5.1.2",
"babel-eslint": "^10.1.0",
"eslint": "^6.7.2",
"eslint-plugin-import": "^2.20.2",
"eslint-plugin-node": "^11.1.0",
"eslint-plugin-promise": "^4.2.1",
"eslint-plugin-standard": "^4.0.0",
"eslint-plugin-vue": "^6.2.2",
"sass": "^1.26.5",
"sass-loader": "^8.0.2",
"vue-template-compiler": "^2.6.11",


// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
// settings.json
{
  // 设置字体大小
  "editor.fontSize": 14,
  // 设置prettier扩展格式化2个空格
  "prettier.tabWidth": 2,
  // 设置prettier扩展格式化单引号
  "prettier.singleQuote": true,
  // 设置prettier扩展末尾不带分号
  "prettier.semi": false,
  // 设置prettier扩展末尾不带逗号
  "prettier.trailingComma": "none",
  // 设置prettier扩展代码宽度130
  "prettier.printWidth": 130
}
```
