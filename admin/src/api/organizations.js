import axios from '@/plugins/axios'

// 获取组织列表
export const getOrganizationsList = params => axios({
  url: '/admin/api/common/organizations',
  method: 'get',
  params
})

// 新增组织
export const createOrganizations = data => axios({
  url: '/admin/api/common/organizations',
  method: 'post',
  data
})

// 修改组织
export const updateOrganizations = (id, data) => axios({
  url: `/admin/api/common/organizations/${id}`,
  method: 'put',
  data
})

// 删除组织
export const deleteOrganizations = id => axios({
  url: `/admin/api/common/organizations/${id}`,
  method: 'delete'
})
