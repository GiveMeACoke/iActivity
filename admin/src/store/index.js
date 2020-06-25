import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let user = sessionStorage.getItem('user')
if (user) {
  user = JSON.parse(user)
}

// JSON.stringify 把对象转化成 json 字符串
// JSON.parse 把 json 字符串转化成 对象
// 登陆成功后存储用户信息
// 点击登出的时候，再移除掉

export default new Vuex.Store({
  state: {
    user: user
  },
  mutations: {
    // 存储用户信息
    saveUserInfo (state, user) {
      state.user = user
      sessionStorage.setItem('user', JSON.stringify(user))
    },
    // 移除用户信息
    removeUserInfo (state) {
      state.user = null
      sessionStorage.removeItem('user')
    }
  }
  // actions: {
  // },
  // modules: {
  // }
})
