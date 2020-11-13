import Mock from 'mockjs'
const Random = Mock.Random

Mock.mock('/mock/api/login', 'post', req => {
  const { username, password } = JSON.parse(req.body)
  if (username === 'admin' && password === '123456') {
    return {
      code: 200,
      role: 'admin'
    }
  } else if (username === 'user' && password === '123456') {
    return {
      code: 200,
      role: 'user'
    }
  } else {
    return {
      code: 400
    }
  }
})

// table数据
const list = []
const total = Random.natural(10, 20)
for (let i = 0; i < total; i++) {
  const item = {}
  item.name = Random.cname()
  item.age = Random.integer(1, 100)
  item.birthday = Random.date()
  item.city = Random.city()
  item.color = Random.color()
  list.push(item)
}
Mock.mock('/mock/api/users', 'post', req => {
  const { currentPage, pageSize } = JSON.parse(req.body)
  return {
    data: list.slice(pageSize * (currentPage - 1), pageSize * currentPage),
    total: total
  }
})

Mock.mock('/mock/api/getMenu', 'post', req => {
  const { role } = JSON.parse(req.body)
  let catalog = {}
  if (role === 'admin') {
    catalog = {
      catalog: [
        {
          catalogEngName: 'menu1',
          icon: 'el-icon-menu',
          rowId: 1,
          url: '/menu1'
        },
        {
          catalogEngName: 'menu2',
          icon: 'el-icon-menu',
          rowId: 2,
          url: '/menu2'
        },
        { catalogEngName: 'menu3', parentId: 1, rowId: 3, url: '/menu1/menu3' },
        {
          catalogEngName: 'menu4',
          parentId: 3,
          rowId: 4,
          url: '/menu1/menu3/menu4'
        }
      ]
    }
  } else if (role === 'user') {
    catalog = {
      catalog: [
        {
          catalogEngName: 'menu1',
          icon: 'el-icon-menu',
          rowId: 1,
          url: '/menu1'
        },
        { catalogEngName: 'menu3', parentId: 1, rowId: 3, url: '/menu1/menu3' },
        {
          catalogEngName: 'menu4',
          parentId: 3,
          rowId: 4,
          url: '/menu1/menu3/menu4'
        }
      ]
    }
  }
  return catalog
})

// let getTableList = () => {
//   return {
//     'user|5-100': [
//       {
//         name: '@cname',
//         'id|+1': 1,
//         'age|10-60': 0, //10-60以内的随机数，0用来确定类型
//         birthday: '@date("yyyy-MM-dd")', //年月日
//         city: '@city(true)' //中国城市
//       }
//     ]
//   }
// }

// Mock.mock('/mock/api/users', getTableList)
