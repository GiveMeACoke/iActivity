import api from '../../api/apiList'
const user = {
    namespaced: true,//开启命名空间
    state: {
        userIcon:'',//用户头像
        userId: '',
        userName:'',
        roleId:'',
        roleName: '',
        organizationId: '',
        organizationName:'',
        activities: '',//与用户相关的活动
    },
    getters: {
        userIcon: state => state.userIcon,
        userId: state => state.userId,
        userName: state => state.userName,
        roleId: state => state.roleId,
        roleName: state => state.roleName,
        organizationId: state => state.organizationId,
        organizationName: state => state.organizationName,
        cadreActivities: state => {
            //筛选出由该学生干部负责，正在审核的活动
            let activities = state.activities.cadreActivities
            let arr = []
            activities.forEach(activity => {
                if(activity.passed==null){
                    arr.push(activity)
                }
            });
            return arr
        },
        passedActivities: state => {
            //筛选出由该学生干部负责，审核通过成功发布的活动
            let activities = state.activities.cadreActivities
            let arr = []
            activities.forEach(activity => {
                if(activity.passed==true){
                    arr.push(activity)
                }
            });
            return arr
        },
        rejectActivities: state => {
            //筛选出由该学生干部负责，审核不通过的活动
            let activities = state.activities.cadreActivities
            let arr = []
            activities.forEach(activity => {
                if(activity.passed==false){
                    arr.push(activity)
                }
            });
            return arr
        },
        applyActivities: state => {
            //筛选出已报名，但未加分的活动
            let activities = state.activities.applyActivities
            let arr = []
            activities.forEach(activity => {
                if(!activity.state.passed){
                    arr.push(activity)
                }
            });
            return arr
        },
        awardedActivities: state => (categoryId) => {
            //筛选出已加分的活动
            //筛选出已报名，但未加分的活动
            let activities = state.activities.applyActivities
            if(!categoryId){
                let arr = []
                activities.forEach(activity => {
                    if(activity.state.passed){
                        arr.push(activity)
                    }
                });
                return arr
            }
            let categoryArr = []
            activities.forEach(activity => {
                if(activity.state.passed && activity.category_id==categoryId){
                    categoryArr.push(activity)
                }
            });
            return categoryArr
        },
        //是否已经报名该活动
        isJoin: state => (activityId) => {
            let activities = state.activities.applyActivities
            let isJoin = false
            activities.forEach(element => {
                if(element.activity_id==activityId){
                    isJoin = true
                }
            });
            return isJoin
        }
        
    },
    mutations: {
        SET_USERID: (state, userId) => {
            state.userId = userId
        },
        SET_USERNAME: (state, userName) => {
            state.userName = userName
        },
        SET_ROLE: (state, role) => {
            state.roleId = role.role_id
            state.roleName = role.role_name
        },
        SET_ORGANIZATION: (state, organization) => {
            state.organizationId = organization.organization_id
            state.organizationName = organization.organization_name
        },
        SET_ACTIVITIES: (state, activities) => {
            state.activities = activities
        },
        SET_USERICON: (state, icon) => {
            state.userIcon = icon
        }
    },
    actions: {
        async logOut() {
            localStorage.removeItem('Token')
        },
        //刷新活动
        async updateActivities(context){
            api.user.getUserActivities()
            .then(data=>{
                delete data["ID"]
                delete data["user_id"]
                delete data["user_name"]
                context.commit('SET_ACTIVITIES',data)
            })
        },
    }
}


export default user