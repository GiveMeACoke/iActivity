//加密
const UserDao = require('../service/UsersDao')
const md5 = require('md5')
module.exports = {
    MD5: async ( val, solt ) => {
        let password = await md5(md5(val) + solt)
        return password
    },
    checkRole: async (ID, rs) => {
        // console.log(ID,rs)
        let user = await UserDao.getUserInfo(ID)
        let role_name = user.role.role_name
        let pass = false
        rs.forEach(element => {
            if(role_name==element){
                pass = true
            }
        });
        return pass
    },
    timeFormat: (time) => {
        let YYYY = time.getFullYear()
        let MM = time.getMonth()+1
        let DD = time.getDate()
        DD = DD<10 ? '0' + DD : DD
        let h = time.getHours()
        h = h<10 ? '0' + h : h
        let m = time.getMinutes()
        m = m<10 ? '0' + m : m
        let s = time.getSeconds()
        s = s<10 ? '0' + s : s
        return `${YYYY}-${MM}-${DD} ${h}:${m}:${s}`
    }
    
    //将复数转化为单数形式
    

    
}
