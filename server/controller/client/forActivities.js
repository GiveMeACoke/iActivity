const ActivitiesDao = require('../../service/ActivitiesDao')
const checkRole = require('../../utils/home').checkRole
const timeFormat = require('../../utils/home').timeFormat
module.exports = {
    //学生干部申请活动
    applyActivity:async (ctx, next) => {
        let ID = ctx.state.user.ID
        if(! await checkRole(ID, ["学生干部"])){
            ctx.status = 402
            ctx.body = {
                message:'权限不足'
            }
            return
        }
        let newActivity = ctx.request.body
        newActivity["cadre_id"] = ctx.state.user.user_id
        newActivity["organization_id"] = ctx.state.user.organization.organization_id
        newActivity['apply_time'] = timeFormat(new Date()) 
        let result = await ActivitiesDao.createActivity(newActivity)
        if(!result) {
            ctx.body = {
                code: -1,
                message:"申请失败"
            }
            return
        }
        ctx.body = {
            code: 1,
            message: "申请成功，等待审核"
        }
    },

    getActivities: async (ctx, next) => {
        let condition = ctx.query
        let list = await ActivitiesDao.getActivitiesList(condition)
        ctx.body = list
    },
    getUsersActivities: async (ctx, next) => {
        console.log(111)
        let ID = ctx.state.user.ID
        if(!await checkRole(ID, ['学生','学生干部'])){
            ctx.status = 402
            ctx.body = {
                message:'权限不足'
            }
            return 
        }
        let user_id = ctx.state.user.user_id
        console.log(user_id)
        let result = await ActivitiesDao.getActivitiesListByUserId(user_id)
        ctx.body = result
    },
    getActivityInfo: async(ctx,next)=>{
        let activity_id = ctx.params.activity_id
        let result = await ActivitiesDao.getActivityInfo(activity_id)
        ctx.body = result
    },
    //取消报名
    cancelRegister: async (ctx, next) => {
        let ID = ctx.state.user.ID
        let user_id = ctx.state.user.user_id
        if(!await checkRole(ID,['学生干部','学生'])){
            ctx.status = 402
            ctx.body = {
                message:'权限不足'
            }
            return 
        }
        let activity_id = ctx.params.activity_id
        let result = await ActivitiesDao.cancelRegister(user_id,activity_id)
        ctx.body = {
            message: '取消报名成功'
        }
        
    },

    //学生干部取消发布活动
    cancelApplication: async (ctx, next) => {
        /**
         * 未审核即可取消申请活动
         * 必须是学生干部自己负责的活动才能取消申请
         */
        let ID = ctx.state.user.ID
        if(!await checkRole(ID, ["学生干部"])) {
            ctx.status = 402
            ctx.body = {
                message: '权限不足'
            }
            return 
        }
        let activity_id = ctx.params.activity_id
        let activityInfo = await ActivitiesDao.getActivityInfo(activity_id)
        let {passed} = activityInfo
        if(!passed){
            let result = ActivitiesDao.cancelApplication(activity_id)
            ctx.body = {
                message: '取消申请成功'
            }
            return 
        }else{
            ctx.body = {
                message: '该活动已通过审核'
            }
        }
    },

    //报名
    register: async (ctx, next) => {
        let ID = ctx.state.user.ID
        if(!await checkRole(ID, ["学生", "学生干部"])){
            ctx.status = 402
            ctx.body = {
                message: "权限不足"
            }
            return
        }
        let user_id = ctx.state.user.user_id
        let activity_id = ctx.params.activity_id
        let result = await ActivitiesDao.register(user_id, activity_id)
        ctx.body = result
    },

    //学生干部修改未审核的活动信息
    updateActivityInfo: async( ctx, next ) => {
        let ID = ctx.state.user.ID
        if(!await checkRole(ID, ['学生干部'])){
            ctx.status = 402
            ctx.body = {
                message: '权限不足'
            }
            return
        }
        let activityId = ctx.params.activity_id
        let updateInfo = ctx.request.body
        let activityInfo = await ActivitiesDao.getActivityInfo(activityId)
        if(activityInfo.passed){
            ctx.body = {
                message: '已审核无法修改'
            }
            return
        }
        await ActivitiesDao.updateActivity(activityId, updateInfo)
        ctx.body = {
            message:'修改成功'
        }
    },
    //报名人员加分
    memberAwarded: async( ctx, next ) => {
        let ID = ctx.state.user.ID
        if(!await checkRole(ID, ['学生干部'])){
            ctx.status = 402
            ctx.body = {
                message: '权限不足'
            }
            return
        }
        let studentList = ctx.request.body.records
        //批量加分
        await ActivitiesDao.awardeMarks(studentList)
        ctx.body = {
            message:'操作成功'
        }
    }

    
}