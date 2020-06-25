const {
    users,
    roles,
    organizations
} = require('../models/index')
const Op = require('sequelize').Op;
class UserDao {
    /**
     * 分页查询用户列表
     * page: 第几页
     * page_size:每一页的长度
     * all:是否查询全部
     */
    static async getList(query) {
        let {
            page = 1, page_size = 10, all = false
        } = query
        all = JSON.parse(all)
        //筛选出条件对象
        for (const key in query) {
            if (key == "page" || key == "page_size" || key == "all") {
                delete query[key]
            }else if(key=="usable"){
                query[key] = JSON.parse(query[key])
            }
        }
        let conditions = query
        // console.log(conditions)
        //在条件对象中添加模糊查询语法
        for (const key in conditions) {
            if(key!='usable'){
                conditions[key] = {
                    [Op.like]: `%${conditions[key]}%`
                }
            }
        }
        // console.log(conditions)
        if (all) {
            return await users.findAndCountAll({
                where: conditions,
                attributes: ['ID', 'user_id', 'organization_id', 'user_name','icon', 'usable'],
                include: [{
                        model: roles
                    },
                    {
                        model: organizations
                    }
                ]
            })
        }
        const offset = (page - 1) * page_size
        const limit = parseInt(page_size)
        return await users.findAndCountAll({
            where: conditions,
            attributes: ['ID', 'user_id', 'organization_id', 'user_name', 'usable'],
            offset,
            limit,
            include: [{
                    model: roles
                },
                {
                    model: organizations
                }
            ]
        })


    }

    /**
     * 添加用户
     */
    static async add(newUser) {
        return await users.create(newUser)
    }

    /**
     * 根据user_id获取用户消息
     */
    static async getUserInfo(id) {
        return await users.findByPk(id, {
            where:{
                usable: true
            },
            attributes: ['ID', 'user_id', 'user_name', 'usable', 'icon'],
            include: [{
                    model: roles
                },
                {
                    model: organizations
                }
            ]
        })
    }

    /**
     * 根据id更新用户信息
     */
    static async updateUserInfo(id, newInfo) {
        return await users.update(newInfo, {
            where: {
                ID: id
            }
        })
    }

    /**
     * 禁用用户账号
     */
    static async disableUser(id) {
        return await users.update({
            usable: false
        }, {
            where: {
                ID: id
            }
        })
    }

    static async getLoginInfo(id) {
        return await users.findOne({
            where: {
                user_id: id,
                usable: true
            },
            attributes: ['ID','user_id', 'user_name','password', 'solt', 'icon'],
            include:[{model: roles}]
        })
    }
}

module.exports = UserDao