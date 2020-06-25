import axios from '@/plugins/axios'

// 获取列表
// params是post的参数
export const getUserList = params => axios({
  url: '/admin/api/users',
  method: 'get',
  params
})

// 新增用户
export const createUser = data => axios({
  url: '/admin/api/users',
  method: 'post',
  data
})

// 删除账号
export const deleteUser = id => axios({
  url: `/admin/api/users/${id}`,
  method: 'delete'
})

// 讲学生设置成学生干部
export const setStudents = id => axios({
  url: `/admin/api/users/${id}`,
  method: 'put'
})
