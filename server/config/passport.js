//权限验证

const passport = require('koa-passport')

let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'lshkey10086'
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    
    let {ID} = jwt_payload
    const {users,roles,organizations} = require('../models/index')
    //多层检查，防止该账号已被禁用
    let user = await users.findByPk(ID,{
        where:{ usable: true },
        attributes: ['ID', 'user_id', 'user_name','icon'],
        include: [
            {
                model: roles
            },
            {
                model: organizations
            }
        ]
    })
    if(user != null){
        return done(null, user)
    }else{
        return done(null, false)
    }
}))

module.exports =  passport
