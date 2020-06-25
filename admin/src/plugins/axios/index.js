import Vue from 'vue'
import Axios from 'axios'
import store from '@/store'
import router from '@/router'

const axios = Axios.create({
  // baseUrl就是给你所用的请求加一个公共的路径
  baseURL: 'http://localhost:3001/'
})

// 请求拦截器
axios.interceptors.request.use(config => {
  if (config.url !== '/admin/api/users/login') {
    config.headers.common['Authorization'] = store.state.user.token
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(response => {
  return response.data
}, error => {
  if (error.message === 'Request failed with status code 401') {
    Vue.prototype.$message.error('登陆过期')
    store.commit('removeUserInfo')
    router.replace({
      name: 'login'
    })
  }
  return Promise.reject(error)
})

export default axios
