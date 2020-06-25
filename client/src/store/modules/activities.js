const activities = {
    namespaced: true,//开启命名空间
    state: {
        activityInfo:'',
        activities:''
    },
    getters:{
        swipeActivities: state=>{
            let swipeActivities = []
            let len = 4
            if(state.activities.length<4){
                len = state.activities.length
            }
            for(let i=0; i<len;i++){
                swipeActivities.push(state.activities[i])
            }
            return swipeActivities
        }
    },
    mutations: {
        SET_ACTIVITYINFO: (state, activityInfo) => {
            state.activityInfo = activityInfo
        },
        SET_ACTIVITIES:(state, activities) =>{
            state.activities = activities
        }
    },
}

export default activities