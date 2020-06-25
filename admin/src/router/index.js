import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes.js'

import store from '@/store'
import permissions from '@/assets/js/permissions'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// next是vue router定好的，不执行next，vue router就不会进入页面

// to 前往的页面， from 来自的页面，next是一个方法

// next调用了，才会前往页面

router.beforeEach((to, from, next) => {
  const user = store.state.user

  if (user !== null && to.name === 'login') {
    next({
      replace: true,
      name: 'home'
    })
  } else if (user === null && to.name !== 'login') {
    next({
      replace: true,
      name: 'login'
    })
  } else if (user !== null) {
    const roleId = user.role.role_id
    const pages = permissions[roleId]
    if (pages.includes(to.name)) {
      next()
    } else if (to.name !== 'error') {
      next({
        // name: pages[0],
        name: 'error',
        replace: true
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
