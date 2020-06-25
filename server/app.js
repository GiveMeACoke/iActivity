const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const passport = require('./config/passport')

app.use(passport.initialize())//passport初始化

const admin_common = require('./routes/admin/common')
const admin_users = require('./routes/admin/users')
const client_users = require('./routes/client/users')
const admin_activities = require('./routes/admin/activities')
const client_activities = require('./routes/client/activities')
const client_common = require('./routes/client/common')
const upload = require('./routes/index')
const log4js = require('./utils/log4js')

//使用跨域
app.use(require('./config/cors_config'))
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  log4js.resLogger(ctx, ms)
})

// routes
app.use(admin_common.routes(), admin_common.allowedMethods())
app.use(admin_users.routes(), admin_users.allowedMethods())
app.use(admin_activities.routes(), admin_activities.allowedMethods())
app.use(client_activities.routes(), client_activities.allowedMethods())
app.use(client_users.routes(), client_users.allowedMethods())
app.use(client_common.routes(), client_common.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  log4js.errLogger(ctx, err)
  console.error('server error', err, ctx)
});

module.exports = app
