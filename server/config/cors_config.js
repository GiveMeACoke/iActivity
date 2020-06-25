//跨域配置
const Cors = require('koa2-cors')

const cors = Cors({
    // origin: ctx => {    //设置允许来自指定域名的请求
    //     const whiteList = ['http://172.16.124.66:8088','http://172.16.124.66:8080'];
    //     let url = ctx.request.header.referer
    //     for(let i=0; i<whiteList.length; i++){
    //         if(url.indexOf(whiteList[i])!=-1){
    //             return whiteList[i]
    //         }
    //     }
    // },
    origin: '*',
    maxAge: 5,//指定本次预检的有效期，单位为秒
    credentials: true,//是否允许发送cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],//设置允许的http请求方法
})


module.exports = cors