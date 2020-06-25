const ActivitiesDao = require('../../service/ActivitiesDao')
const checkRole = require('../../utils/home').checkRole
const timeFormat = require('../../utils/home').timeFormat
module.exports = {
    /**
     * 指导老师发布活动，指定学生为负责人
     */
    releaseActivity: async (ctx, next) => {
        let ID = ctx.state.user.ID
        if(!await checkRole(ID,['指导老师'])){
            ctx.status = 401
            ctx.body = { message: '权限不足' }
            return
        }
        let newActivity = ctx.request.body
        newActivity["teacher_id"] = ctx.state.user.user_id
        newActivity["organization_id"] = ctx.state.user.organization.organization_id
        newActivity['apply_time'] = timeFormat(new Date()) 
        newActivity['release_time'] = timeFormat(new Date())
        let result = await ActivitiesDao.createActivity(newActivity)
        if(!result) {
            ctx.body = {
                code: -1,
                message:"发布失败"
            }
            return
        }
        ctx.body = {
            code: 1,
            message: "发布成功"
        }
    },
    //审批活动
    approvalActivity: async (ctx, next) => {
        let ID = ctx.state.user.ID
        console.log(await checkRole(ID,['指导老师']))
        if(!await checkRole(ID,['指导老师'])){
            ctx.status = 401
            ctx.body = { message: '权限不足' }
            return
        }
        let requesterId = ctx.state.user.user_id //请求者工号
        let activity_id = ctx.params.activity_id    //活动id
        let activityInfo = await ActivitiesDao.getActivityInfo(activity_id)
        let {teacher_id} = activityInfo
        if(teacher_id != requesterId){
            ctx.status = 402
            ctx.body = {
                message:'权限不足'
            }
            return
        }
        let isPassed = ctx.params.isPassed
        let result = await ActivitiesDao.approvalActivity(activity_id, isPassed)
        ctx.body = result
    },
    /**
     * 获取活动列表：
     * 若是管理员，可获取所有活动信息
     * 若是指导老师，可获取其负责的所有活动
     */
    getActivities: async (ctx, next) => {
        let ID = ctx.state.user.ID
        if(!await checkRole(ID,['指导老师', '管理员'])){
            ctx.status = 401
            ctx.body = { message: '权限不足' }
            return
        }

        let condition = ctx.request.query

        if(await checkRole(ID,['管理员'])){
            let list = await ActivitiesDao.getActivitiesList(condition)
            ctx.body = list
            return
        }

        let teacherId = ctx.state.user.user_id
        let list = await ActivitiesDao.getActivitiesListByUserId(teacherId)
        ctx.body = list
    },

    //获取活动信息
    getActivityInfo: async (ctx, next) => {
        let ID = ctx.state.user.ID
        if(!await checkRole(ID,['指导老师', '管理员'])){
            ctx.status = 401
            ctx.body = { message: '权限不足' }
            return
        }
        let activity_id = ctx.params.activity_id
        let result = await ActivitiesDao.getActivityInfo(activity_id)
        ctx.body = result
    }
}
