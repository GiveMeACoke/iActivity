import axios from '@/plugins/axios'

// 获取活动分类列表
export const getCategoriesList = params => axios({
  url: '/admin/api/common/categories',
  method: 'get',
  params
})

// 新增分类
export const createCategories = data => axios({
  url: '/admin/api/common/categories',
  method: 'post',
  data
})

// 修改分类
export const updateCategories = (id, data) => axios({
  url: `/admin/api/common/categories/${id}`,
  method: 'put',
  data
})

// 删除分类
export const deleteCategories = id => axios({
  url: `/admin/api/common/categories/${id}`,
  method: 'delete'
})
