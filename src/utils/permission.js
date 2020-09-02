import router from '../router'
import { getCookie } from '@/utils/cookie'

router.beforeEach((to, from, next) => {
  next()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!getCookie('username')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
