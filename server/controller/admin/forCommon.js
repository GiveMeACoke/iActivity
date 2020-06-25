const CommonDao = require('../../service/CommonDao')
const UsersDao = require('../../service/UsersDao')
const checkRole = require('../../utils/home').checkRole
module.exports = {
    getList: async (ctx, next) => {
        let modelName = ctx.params.modelName
        let result = await CommonDao.getList(modelName)
        ctx.body = result
    },

    getById: async (ctx, next) => {
        let modelName = ctx.params.modelName
        let id = ctx.params.id;
        let result = await CommonDao.getById(modelName,id)
        ctx.body = result
    },

    add: async (ctx, next) => {
        if(await checkRole(ctx.state.user.ID,["管理员","指导老师"])){
            let modelName = ctx.params.modelName
            let newObj = ctx.request.body
            try{
                console.log(11)
                await CommonDao.add(modelName, newObj)
                ctx.status = 201
                ctx.body = {added:true}
            }catch{
                ctx.status = 402
                ctx.body = {added:false}
            }
        }else{
            ctx.status = 401
            ctx.body = {message:'权限不足'}
        }
        
    },
    update: async(ctx, next) => {
        if(await checkRole(ctx.state.user.ID,["管理员","指导老师"])){
            let modelName = ctx.params.modelName
            let id = ctx.params.id
            let newValue = ctx.request.body
            await CommonDao.update(modelName,id, newValue)
            ctx.body = {update: true}
        }else{
            ctx.status = 401
            ctx.body = {message:'权限不足'}
        }  
    },

    delete: async (ctx, next) => {
        if(await checkRole(ctx.state.user.ID,["管理员","指导老师"])){
            let modelName = ctx.params.modelName
            let id = ctx.params.id
            let result = await CommonDao.delete(modelName,id)
            if(result===1){
                ctx.status = 200
                ctx.body = {deleted: true}
            }else{
                ctx.status = 402
                ctx.body = {deleted: false}
            }
        }else{
            ctx.status = 401
            ctx.body = {message:'权限不足'}
        }
        
    },

    getTeahcerList: async(ctx, next) => {
        if(!await checkRole(ctx.state.user.ID,["学生干部"])){
            ctx.status = 402
            ctx.body = {
                message:'权限不足'
            }
            return 
        }
        let organization_id = ctx.state.user.organization.organization_id
        let teachers = await UsersDao.getList({organization_id,role_id:3})
        ctx.body = teachers.rows
    }
}