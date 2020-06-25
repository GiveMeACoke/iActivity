const UsersDao = require('../../service/UsersDao')
const MD5 = require('../../utils/home').MD5
const uuid = require('node-uuid')
const jwt = require('jsonwebtoken')
const checkRole = require('../../utils/home').checkRole
const ActivitiesDao = require('../../service/ActivitiesDao')
module.exports = {
    //修改用户信息
    updateUserInfo: async(ctx, next) => {
        let user = ctx.state.user
        if(!await checkRole(user.ID,['学生','学生干部'])){
            ctx.status = 401
            ctx.body = { message:'权限不足' }
            return 
        }
        let requesterId = user.ID
        let newInfo = ctx.request.body
        console.log(requesterId,newInfo)
        let {password} = newInfo
        if(password){
            let solt = uuid.v4()
            password = await MD5(password, solt)
            newInfo["password"] = password
            newInfo["solt"] = solt
        }
        
        await UsersDao.updateUserInfo(requesterId, newInfo)
        ctx.body = {
            message: '修改成功'
        }
    },


    //验证登录
    checkLogin: async (ctx, next) => {
        let {
            user_id,
            password
        } = ctx.request.body
        console.log(ctx.request.body)
        // console.log({user_id, password})
        let user = await UsersDao.getLoginInfo(user_id)
        if(!user) {
            ctx.body = {
                code: -1,
                message: '账号不存在'
            }
            return
        }
        if (!await checkRole(user.ID,["学生","学生干部"])) {
            ctx.body = {
                code: 0,
                message: '账号或密码不正确'
            }
            return
        } else {
            let correctPassword = user.password
            let {
                ID,solt,role,user_name,icon,user_id
            } = user
            // console.log(correctPassword,solt)
            password = await MD5(password, solt)
            if (password === correctPassword) {
                //生成token
                const playload = {
                    ID: user.ID,
                    user_id: user.user_id,
                    user_name: user.user_name
                }
                const token = jwt.sign(playload, 'lshkey10086', {
                    expiresIn: 6000 //有效期
                })
                ctx.body = {
                    code: 1,
                    message: "登录成功",
                    token: 'Bearer ' + token
                }
                return
            } else {
                ctx.body = {
                    code: 0,
                    message: "账号或密码不正确"
                }
                return
            }
        }
    },
    //学生干部获取某个活动的报名人员
    getRegistrationStudents: async (ctx, next) => {
        let ID = ctx.state.user.ID
        if(!await checkRole(ID, ['学生干部'])) {
            ctx.status = 402
            ctx.body = {
                message:'权限不足'
            }
            return
        }

        let activity_id = ctx.params.activity_id
        let activityInfo = await ActivitiesDao.getActivityInfo(activity_id)
        let { cadre_id } = activityInfo
        let requesterId = ctx.state.user.user_id
        if( cadre_id != requesterId ) {
            ctx.status = 402
            ctx.body = {
                message:'权限不足'
            }
            return
        }

        let result = await ActivitiesDao.getRegistrationStudents(activity_id)
        ctx.body = result
    },

    //获取自己的用户信息
    getUserInfo: async (ctx, next) => {
        let ID = ctx.state.user.ID
        if(!await checkRole(ID, ["学生干部", "学生"])){
            ctx.status = 402
            ctx.body = {
                message: '权限不足'
            }
            return
        }
        ctx.body = ctx.state.user
    }
}