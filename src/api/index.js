import request from '@/utils/request'

const api = {
  // 登录
  getTokenId(data) {
    return request({
      url: '/keyguard/auth/tokens',
      method: 'post',
      data
    })
  }
}

export default api
