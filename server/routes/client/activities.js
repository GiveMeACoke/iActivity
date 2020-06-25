const router = require('koa-router')()
const forActivities = require('../../controller/client/forActivities')
const passport = require('koa-passport')
router.prefix('/client/api/activities')
router.all('*', passport.authenticate('jwt', {session: false}))

//获取所有已发布的活动
router.get('/', forActivities.getActivities)

//获取与自己有关的活动的活动
router.get('/userActivities', forActivities.getUsersActivities)

//根据id查询活动的详细信息
router.get('/activityInfo/:activity_id', forActivities.getActivityInfo)

router.post('/appliedActivity', forActivities.applyActivity)

//报名活动
router.post('/registeredActivity/:activity_id', forActivities.register)



//取消报名
router.delete('/registeredActivity/:activity_id', forActivities.cancelRegister)

//学生干部取消申请活动
router.delete('/appliedActivity/:activity_id', forActivities.cancelApplication)

//学生干部修改未审核的活动
router.put('/appliedActivity/:activity_id', forActivities.updateActivityInfo)

//批量加分
router.put('/member', forActivities.memberAwarded)
module.exports = router