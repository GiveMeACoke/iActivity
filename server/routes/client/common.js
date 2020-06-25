//通用路由（活动分类表categories,身份表：roles,组织表：organizations）
const router = require('koa-router')()
const forCommon = require('../../controller/admin/forCommon')
const passport = require('koa-passport')
router.all('*',passport.authenticate('jwt',{session:false}))

router.prefix('/client/api/common')
//获取某个组织的所有老师
router.get('/teachers', forCommon.getTeahcerList)

router.get('/:modelName/:id', forCommon.getById)

router.get('/:modelName', forCommon.getList)

module.exports = router