const baseUrl = 'http://localhost:3001/client/api'
export default {
    activityInfo: baseUrl + '/activities/activityInfo/',
    //关于报名的活动
    registration: baseUrl + '/activities/registeredActivity/',
    //关于申请的活动
    application: baseUrl + '/activities/appliedActivity/',
    //根据活动id获取活动报名人员
    joinMember: baseUrl + '/users/',
    //为报名人员加分
    memberAwarded: baseUrl + '/activities/member/',

    //推荐活动
    recommendActivity: baseUrl + '/activities/',

    //搜索活动
    searchActivity: baseUrl + '/activities/'
    
}