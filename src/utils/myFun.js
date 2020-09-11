import { getCookie } from '@/utils/cookie'

// 将动态菜单数据转为树状结构
export function dataToTree(data) {
  let map = {}
  let treeData = []
  if (data) {
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
}

// 验证当前token是否在过期十分钟内，true则刷新token
export function checkToken() {
  let tokenTime = getCookie('tokenTime')
  const nowYear = new Date().getFullYear()
  const nowMonth = new Date().getMonth() + 1
  const nowDate = new Date().getDate()
  const nowHours = new Date().getHours()
  const nowMinutes = new Date().getMinutes()
  const nowSeconds = new Date().getSeconds()
  const nowTime = Date.UTC(nowYear, nowMonth, nowDate, nowHours, nowMinutes, nowSeconds)
  tokenTime = Date.UTC(tokenTime.slice(0, 4), tokenTime.slice(5, 7), tokenTime.slice(8, 10), tokenTime.slice(11, 13), tokenTime.slice(14, 16), tokenTime.slice(17, 19))
  return tokenTime - nowTime < 600000 && tokenTime - nowTime > 0 ? true : false
  // return tokenTime - nowTime < 600000 ? true : false
}
