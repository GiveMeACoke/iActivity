const UsersDao = require('../../service/UsersDao')
const MD5 = require('../../utils/home').MD5
const uuid = require('node-uuid')
const jwt = require('jsonwebtoken')
const checkRole = require('../../utils/home').checkRole
// const logger = require('../../models/logger'); //上面配置的log4js地址

module.exports = {
    /**
     * 添加用户
     * 权限：管理员操作
     */
    addUser: async (ctx, next) => {
        if(await checkRole(ctx.state.user.ID,["管理员"])){
            let newUser = ctx.request.body
            //密码加密
            let solt = uuid.v4() //盐值
            newUser["password"] = await MD5(newUser.password, solt)
            newUser["solt"] = solt
            try {
                await UsersDao.add(newUser)
                ctx.status = 200
                ctx.body = {
                    added: true
                }
            } catch {
                ctx.status = 402
                ctx.body = {
                    added: false
                }
            }
        }else{
            ctx.status = 401
            ctx.body = { message: '权限不足' }
        }
        
    },

    /**
     * 获取用户列表
     * 权限：指导老师/管理员
     */
    getList: async (ctx, next) => {
        let ID = ctx.state.user.ID
        if (await checkRole(ID, ["管理员", "指导老师"])) {
            let query = ctx.query
            let users = await UsersDao.getList(query)
            ctx.body = users
        } else {
            ctx.status = 401
            ctx.body = {
                message: "权限不足"
            }
        }
    },

    /**
     * 获取用户信息
     * 权限：指导老师/管理员
     */
    getUserInfo: async (ctx, next) => {
        let user = await UsersDao.getUserInfo(ctx.params.id)
        if (!user) {
            ctx.body = {
                code: 0,
                message: '查无此人'
            }
        } else {
            ctx.body = {
                code: 1,
                userInfo: user
            }
        }
    },
    /**
     * 修改管理员/指导老师本人的用户信息
     * 管理员修改指导老师的组织
     * 指导老师添加某个组织的学生干部
     */
    updateUserInfo: async (ctx, next) => {
        /**
         * 只有管理员或指导老师才能访问
         */
        let user = ctx.state.user   //这是访问用户  
        let id = ctx.params.id  //这是需修改的用户
        let newInfo = ctx.request.body
        if(!await checkRole(user.ID,['指导老师','管理员'])){
            console.log(1)
            ctx.status = 401
            ctx.body = { message:'权限不足' }
        }else{
            /**
             * 如果请求用户与需修改用户是同一个人，则需要修改用户信息
             * 若不是一个人，再次对其身份就行判断，
             * 若是指导老师则为将学生身份设置为某个组织的学生干部
             * 若是管理员，则为修改指定指导老师的所属组织
             */
            if(user.ID == id) {
                let {
                    password, organization_id, role_id, usable, user_id
                } = newInfo
                if(user_id) delete newInfo["user_id"]
                if(organization_id) delete newInfo["organization_id"]
                if(role_id) delete newInfo["role_id"]
                if(usable) delete newInfo["usable"]
                if (password) {     //这一步是为了检查是否需要修改密码，若需要，对密码重新加密
                    let solt = uuid.v4()
                    password = await MD5(password, solt)
                    newInfo["password"] = password
                    newInfo["solt"] = solt
                }
                let result = await UsersDao.updateUserInfo(id, newInfo)
                ctx.body = {
                    message:'修改成功'
                }
            }else{
                if(await checkRole(user.ID, ["指导老师"]) && await checkRole(id, ["学生"])){
                    let organization_id = ctx.state.user.organization.organization_id
                    let info = {}
                    info["organization_id"] = organization_id
                    info["role_id"] = 2
                    await UsersDao.updateUserInfo(id, info)
                    ctx.body = {
                        message: '授权成功'
                    }
                    return
                }else if(await checkRole(user.ID, ["管理员"]) && await checkRole(id, ["指导老师"])){
                    console.log(1)
                    let { organization_id } = newInfo
                    let info = {}
                    info["organization_id"] = organization_id
                    await UsersDao.updateUserInfo(id, info)
                    ctx.body =  {
                        message: '修改成功'
                    }
                }else{
                    ctx.status = 401
                    ctx.body = {message:"权限不足"}
                }
            }
        }
        
        
    },

    /**
     * 禁用用户账号
     * 权限：管理员
     */
    deleteUser: async (ctx, next) => {
        let ID = ctx.state.user.ID
        if (await checkRole(ID, ["管理员"])) {
            let result = await UsersDao.disableUser(ctx.params.id)
            ctx.body = {
                message: '已禁用该账号'
            }
        } else {
            ctx.status = 402
            ctx.body = {
                message: '权限不足'
            }
        }
    },

    //验证管理员/指导老师的登录
    checkLogin: async (ctx, next) => {
        let {
            user_id,
            password
        } = ctx.request.body
        // console.log({user_id, password})
        let user = await UsersDao.getLoginInfo(user_id)
        if(!user) {
            ctx.body = {
                code: -1,
                message: '账号不存在'
            }
            logger.info("账号不存在");
            return
        }
        if (!await checkRole(user.ID,["管理员","指导老师"])) {
            ctx.body = {
                code: 0,
                message: '账号或密码不正确'
            }
            logger.info("账号或密码不正确");
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
                    token: 'Bearer ' + token,
                    ID,
                    role,
                    user_name,
                    icon,
                    user_id
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
    }
}