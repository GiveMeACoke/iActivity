import axios from '@/plugins/axios'

// const axios = require('axios')

// 登录
export const toLogin = data => axios({
  url: '/admin/api/users/login',
  method: 'post',
  data// data是把信息放到body体里面传输
})
