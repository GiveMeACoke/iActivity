import axios from '@/plugins/axios'

// 获取活动列表
export const getActivities = params => axios({
  url: '/admin/api/activities',
  method: 'get',
  params
})

// 获取活动详情
export const getActivitiesDetail = id => axios({
  url: `/admin/api/activities/${id}`,
  method: 'get'
})

// 审核活动
export const updateActivities = (id, result) => axios({
  url: `/admin/api/activities/${id}/${result}`,
  method: 'put'
})
