const router = require('koa-router')()
const passport = require('koa-passport')
router.prefix('/api')
router.all('*',passport.authenticate('jwt',{session:false}))


//处理上传文件
const multer = require('koa-multer')

//设置保存的位置
var upload = multer({ dest: __dirname + '/../public/activityImgs' });

router.post('/activityImg',upload.single('file'), async (ctx, next)=> {
    let file = ctx.req.file
    const baseUrl = require('../config/httpUrl').baseUrl
    file.url = `${baseUrl}/activityImgs/${file.filename}`
    ctx.body = file
})


//上传用户头像
var uploadUserIcon = multer({ dest: __dirname + '/../public/userIcons' });

router.post('/userImg',uploadUserIcon.single('file'),(ctx,next)=>{
    let file = ctx.req.file
    const baseUrl = require('../config/httpUrl').baseUrl
    file.url = `${baseUrl}/userIcons/${file.filename}`
    ctx.body = file
})
module.exports = router