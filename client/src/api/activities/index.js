import api from '../index'
import urls from './urls'
export default {
    getActivityInfo(activityId){
        return api.get(`${urls.activityInfo}${activityId}`)
    },
    updateActivityInfo(activityId, info){
        return api.put(`${urls.application}${activityId}`,info)
    },
    //取消报名活动
    cancelRegistration(activityId){
        return api.delete(`${urls.registration}${activityId}`)
    },
    //取消申请活动
    cancelApplication(activityId){
        return api.delete(`${urls.application}${activityId}`)
    },
    getJoinMember(activityId){
        return api.get(`${urls.joinMember}${activityId}`)
    },
    //批量加分
    memberAwarded(records){
        return api.put(`${urls.memberAwarded}`,{"records":records})
    },
    //报名活动
    registeredActivity(activityId){
        return api.post(`${urls.registration}${activityId}`)
    },
    //推荐活动
    recommendActivity(){
        return api.get(`${urls.recommendActivity}`,{
            all:true
        })
    },
     //搜索活动
     searchActivity(name){
        return api.get(`${urls.recommendActivity}`,{"activity_title":name})
    }
    
    
    
}