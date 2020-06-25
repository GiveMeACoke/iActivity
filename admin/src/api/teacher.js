import axios from '@/plugins/axios'

// 修改指导老师的组织
export const updateTeacherOrganization = (id, data) => axios({
  url: `admin/api/users/${id}`,
  method: 'put',
  data
})
