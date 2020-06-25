const db = require('../config/db')

const categories = db.import(__dirname + '/categories.js')

const organizations = db.import(__dirname + '/organizations.js')

const roles = db.import(__dirname + '/roles.js')

const users = db.import(__dirname + '/users.js')

const activities = db.import(__dirname + '/activities.js') 

const student_activities = db.import(__dirname + '/student_activities.js')

users.belongsTo(organizations, {
    foreignKey: 'organization_id',
    targetKey: 'organization_id'
})

organizations.hasMany(users, {
    foreignKey: 'organization_id',
    sourceKey: 'organization_id'
})

users.belongsTo(roles, {
    foreignKey:'role_id',
    targetKey:'role_id'
})

roles.hasMany(users,{
    foreignKey: 'role_id',
    sourceKey: 'role_id'
})

activities.belongsTo(organizations, {
    foreignKey: 'organization_id',
    targetKey: 'organization_id'
})

organizations.hasMany(activities, {
    foreignKey: 'organization_id',
    sourceKey: 'organization_id'
})

/**
 * 活动与活动分类表的关联
 */
activities.belongsTo(categories, {
    foreignKey:'category_id',
    targetKey: 'category_id'
})
categories.belongsTo(activities, {
    foreignKey:'category_id',
    sourceKey: 'category_id'
})

/**
 * 活动与用户的关联
 */

activities.hasOne(users, {
    foreignKey: 'user_id',
    sourceKey: 'teacher_id',
    as:'teacher'
})

activities.hasOne(users, {
    foreignKey: 'user_id',
    sourceKey: 'cadre_id',
    as:'cadre'
})

users.hasMany(activities, {
    foreignKey: 'teacher_id',
    sourceKey: 'user_id',
    as:'teacherActivities'
})


users.hasMany(activities, {
    foreignKey: 'cadre_id',
    sourceKey: 'user_id',
    as:'cadreActivities'
})

users.belongsToMany(activities, {
    through: student_activities,
    as: 'applyActivities',
    foreignKey: 'user_id',
    sourceKey: 'user_id'
})
activities.belongsToMany(users, {
    through: student_activities,
    as: 'applyStudents',
    foreignKey: 'activity_id',
    sourceKey: 'activity_id'
})



module.exports = db.models
