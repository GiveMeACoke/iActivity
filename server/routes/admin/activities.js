const router = require('koa-router')()
const forActivities = require('../../controller/admin/forActivities')
const passport = require('koa-passport')
router.prefix('/admin/api/activities')
router.all('*', passport.authenticate('jwt', {session: false}))
//指导老师审批活动
router.put('/:activity_id/:isPassed', forActivities.approvalActivity)
//指导老师发布活动
router.post('/', forActivities.releaseActivity)
//获取活动列表
router.get('/', forActivities.getActivities)
router.get('/:activity_id', forActivities.getActivityInfo)


module.exports = router