const router = require('koa-router')()
const forUsers = require('../../controller/admin/forAdminUsers')
const passport = require('koa-passport')
router.prefix('/admin/api/users')


//用户登录接口（未完善）
router.post('/login', forUsers.checkLogin)
//权限认证中间件
router.all('*',passport.authenticate('jwt',{session:false}))
//添加用户
router.post('/', forUsers.addUser)

//根据id获取用户
router.get('/:id',forUsers.getUserInfo)
//获取所有用户（实现分页以及条件搜素功能）
router.get('/', forUsers.getList)


/**
 * 修改指导老师或管理员用户信息
 * 指导老师将普通学生授权为学生干部
 * 管理员修改指导老师所属组织
 */
router.put('/:id', forUsers.updateUserInfo)

//删除（禁用）用户账号
router.delete('/:id', forUsers.deleteUser)

module.exports = router