const baseUrl = 'http://localhost:3001/client/api'
export default {
    login: baseUrl + '/users/login',
    userInfo: baseUrl + '/users/userInfo',
    applyActivity: baseUrl + '/activities/appliedActivity',  //申请活动
    userActivities: baseUrl + '/activities/userActivities',//获取与自己有关的活动
    updateUserInfo: baseUrl + '/users'
}