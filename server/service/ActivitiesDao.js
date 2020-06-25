const Sequelize = require('sequelize')
const timeFormat = require('../utils/home').timeFormat
const Op = Sequelize.Op
const {
    activities,
    categories,
    users,
    student_activities,
    organizations
} = require('../models/index')
//c操作model model用来控制数据库的
class ActivitiesDao {

    static ACTIVITIES_INCLUDE = [
        {
            model: users, as:'cadre',
            attributes:['ID', 'user_id', 'user_name','icon']
        },
        {
            model: users, as:'teacher',
            attributes:['ID', 'user_id', 'user_name','icon']
        },
        {
            model:organizations
        },
        {
            model:categories
        }
    ]

    //新增
    static async createActivity(details) {
        let result = await activities.create(details)
        return result
    }


    //获取活动信息
    static async getActivityInfo(activity_id) {
        let result = await activities.findOne({
            where: {
                activity_id
            },
            include: this.ACTIVITIES_INCLUDE
        })
        return result
    }

    //审批活动
    static async approvalActivity(activity_id, isPassed) {
        isPassed = JSON.parse(isPassed)
        return await activities.update({
            passed: isPassed
        }, {
            where: {
                activity_id
            }
        })
    }

    //获取活动列表
    static async getActivitiesList(condition) {
        let {
            all = false,
            page = 1,
            page_size = 10,
        } = condition
        all = JSON.parse(all)
        if(all){
            let result = await activities.findAndCountAll({
                where:{passed: true},
                include: this.ACTIVITIES_INCLUDE
            })
            for (let index = 0; index < result.rows.length; index++) {
                const element = result.rows[index];
                let activity_id = element.activity_id
                let users = await this.getRegistrationStudents(activity_id)
                let userNumber = users.applyStudents.length
                element.dataValues.joinNumber = userNumber
            }
            return result
        }
        delete condition['all']
        delete condition['page']
        delete condition['page_size']
        for (const key in condition) {
            if (!condition[key]) delete condition[key]
        }
        for (const key in condition) {
            if(key!='passed'){
                condition[key] = {
                    [Op.like]: `%${condition[key]}%`
                }
            }
        }
        const offset = (page - 1) * page_size
        const limit = parseInt(page_size)
        let result = await activities.findAndCountAll({
            offset,
            limit,
            where:{
                passed: true,
                ...condition
            },
            include:this.ACTIVITIES_INCLUDE 
        }) 
        for (let index = 0; index < result.rows.length; index++) {
            const element = result.rows[index];
            let activity_id = element.activity_id
            let users = await this.getRegistrationStudents(activity_id)
            let userNumber = users.applyStudents.length
            element.dataValues.joinNumber = userNumber
        }
        return result
    }

    //通过用户id查询负责的活动
    static async getActivitiesListByUserId(user_id) {
        let result = await users.findOne({
            attributes:["ID", "user_id", "user_name"],
            where:{user_id},
            include:[
                { 
                    // attributes:['activity_id', 'activity_img', 'activity_title', 'activity_introduce', 'passed'],
                    model: activities, as:'teacherActivities',
                    include:[
                        {model: categories}
                    ]
                },
                { 
                    // attributes:['activity_id', 'activity_img', 'activity_title', 'activity_introduce', 'passed'],
                    model: activities, as:'cadreActivities' ,
                    include:[
                        {model: categories}
                    ]
                },
                { 
                    // attributes:['activity_id', 'activity_img', 'activity_title', 'activity_introduce'],
                    model: activities, as:'applyActivities',
                    include:[
                        {model: categories}
                    ],
                    through:{
                        as:'state',
                        attributes: ['apply_time', 'passed']
                    }
                },
                
            ]
        })
        for (let index = 0; index < result.cadreActivities.length; index++) {
            const element = result.cadreActivities[index];
            let activity_id = element.activity_id
            let users = await this.getRegistrationStudents(activity_id)
            let userNumber = users.applyStudents.length
            element.dataValues.joinNumber = userNumber
        }
        for (let index = 0; index < result.applyActivities.length; index++) {
            const element = result.applyActivities[index];
            let activity_id = element.activity_id
            let users = await this.getRegistrationStudents(activity_id)
            let userNumber = users.applyStudents.length
            element.dataValues.joinNumber = userNumber
        }
        for (let index = 0; index < result.teacherActivities.length; index++) {
            const element = result.teacherActivities[index];
            let activity_id = element.activity_id
            let users = await this.getRegistrationStudents(activity_id)
            let userNumber = users.applyStudents.length
            element.dataValues.joinNumber = userNumber
        }
        return result
    }

    static async register(user_id ,activity_id) {
        let result = await student_activities.create({
            user_id,activity_id,
            apply_time: timeFormat(new Date())
        })
        return result
    }

    //取消报名
    static async cancelRegister(user_id, activity_id) {
        // console.log(user_id, activity_id)
        let result = await student_activities.destroy(
            {
                where:{
                    user_id, activity_id
                }
            }
        )
        return result
    }

    //取消申请
    static async cancelApplication(activity_id) {
        let result = await activities.destroy({
            where:{
                activity_id
            }
        })
        return result
    }

    //获取某个活动已报名的学生列表
    static async getRegistrationStudents(activity_id) {
        let result = await activities.findOne({
            where:{activity_id},
            attributes: ['activity_id'],
            include: [
                {
                    attributes:['ID', 'user_id', 'user_name', 'icon', 'usable'],
                    model: users,
                    as: 'applyStudents',
                    include: [
                        { model: organizations }
                    ],
                    through:{
                        as:'state',
                        attributes: ['ID','apply_time', 'passed']
                    }
                }
            ]
        })
        return result
    }

    //更新活动信息
    static async updateActivity(id, info) {
        let result = activities.update( info, {
            where: {
                activity_id: id
            }
        })
        return result
    }

    //学生干部为报名学生批量加分
    static async awardeMarks(records){
        let result = await student_activities.bulkCreate(records,{updateOnDuplicate:['passed']})
        return result
    }


}


module.exports = ActivitiesDao
