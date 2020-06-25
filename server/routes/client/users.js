const router = require('koa-router')()
const forUsers = require('../../controller/client/forClientUsers')
const passport = require('koa-passport')


router.prefix('/client/api/users')
//用户登录接口
router.post('/login', forUsers.checkLogin)

router.all('*', passport.authenticate('jwt', {session: false}))

router.get('/userInfo', forUsers.getUserInfo)
router.put('/', forUsers.updateUserInfo)
//学生干部获取自己负责活动的报名人员
router.get('/:activity_id', forUsers.getRegistrationStudents)
module.exports = router