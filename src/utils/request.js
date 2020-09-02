import axios from 'axios'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getCookie, setCookie } from '@/utils/cookie'
import { checkToken } from '@/utils/myFun'
import router from '@/router/index'
import api from '@/api'

const service = axios.create({
  timeout: 16000
})
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

// 响应拦截器
service.interceptors.response.use(
  function(response) {
    NProgress.done()
    if (response.status === 200) {
      return response
    }
  },
  function(error) {
    if (error) {
      if (error.response) {
        if (error.response.status === 401) {
          Message.error({
            showClose: true,
            message: 'token过期，请重新登录！'
          })
          router.push('/login')
        } else {
          Message.error({
            showClose: true,
            message: `${error.response.data.message}`
          })
        }
      }
    }
    return Promise.reject(error)
  }
)

export default service
