import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/home.vue'
import Event from '../views/event/event.vue'
import EditingActivity from '../views/event/EditingActivity.vue'
import Mine from '../views/mine/mine.vue'
import Login from '../views/login.vue'
import api from '../api/apiList'
import MyActivitiesList from '../views/mine/myActivitiesList.vue'
import categoryActivitiesPage from '../views/mine/categoryActivitiesPage.vue'
import membersPage from '../views/mine/membersPage.vue'
import activityInfo from '../views/activityInfoPage.vue'
import UpdateUserInfo from '../views/mine/UpdateUserInfo'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter:(to, from, next) =>{
      Promise.all([
        api.user.getUserActivities(),
        api.activities.recommendActivity()
      ]).then(res=>{
        delete res[0]["ID"]
        delete res[0]["user_id"]
        delete res[0]["user_name"]
        store.commit('user/SET_ACTIVITIES',res[0])
        store.commit('activities/SET_ACTIVITIES',res[1].rows)
        next()
      })
    }
  },
  {
    path: '/event',
    name: 'Event',
    component: Event
  },
  {
    path: '/updateuserinfo',
    name: 'UpdateUserInfo',
    component: UpdateUserInfo
  },
  {
    path: '/mine',
    name: 'Mine',
    component: Mine,
    beforeEnter:(to, from, next) => {
      api.user.getUserActivities()
      .then(data=>{
        delete data["ID"]
        delete data["user_id"]
        delete data["user_name"]
        store.commit('user/SET_ACTIVITIES',data)
        next()
      })
    },
    children:[
      {
        path: 'myActivitiesList/:mark',
        name: 'MyActivitiesList',
        component: MyActivitiesList,
        beforeEnter:(to, from, next) => {
          api.user.getUserActivities()
          .then(data=>{
            delete data["ID"]
            delete data["user_id"]
            delete data["user_name"]
            store.commit('user/SET_ACTIVITIES',data)
            next()
          })
        },
      },
      {
        path: 'categoryActivitiesPage/:categoryId',
        props:true,
        alias:'categoryActivitiesPage',
        name: 'categoryActivitiesPage',
        component: categoryActivitiesPage,
        beforeEnter:(to, from, next) => {
          api.user.getUserActivities()
          .then(data=>{
            delete data["ID"]
            delete data["user_id"]
            delete data["user_name"]
            store.commit('user/SET_ACTIVITIES',data)
            next()
          })
        },
      },
      {
        path: 'membersPage/:activityId',
        props: true,
        name: 'membersPage',
        component: membersPage
      }
    ],
    
  },
  {
    //申请活动或修改活动信息的组件
    path: '/editingActivity',
    name: 'EditingActivity',
    component: EditingActivity,
    beforeEnter: (to, from, next) => {
      let roleName = store.state.user.roleName
      if(roleName=="学生干部"){
          api.common.getTeachers()
          .then(data=>{
            store.commit('common/SET_TEACHERS',data)
          next()
        })
      }
    }
  },
  {
    //申请活动或修改活动信息的组件
    path: '/editingActivity/:activityId',
    name: 'EditingActivity',
    props: true,
    component: EditingActivity,
    beforeEnter: (to, from, next) => {
      let roleName = store.state.user.roleName
      if(roleName=="学生干部"){
          api.common.getTeachers()
          .then(data=>{
            store.commit('common/SET_TEACHERS',data)
          next()
        })
      }
    }
  },
  {
    //活动详情页
    path:'/activityInfo/:activityId',
    props:true,
    name: 'activityInfo',
    component: activityInfo,
    beforeEnter: (to, from, next) => {
      let activityId = to.params.activityId
      api.activities.getActivityInfo(activityId).then(res=>{
        store.commit('activities/SET_ACTIVITYINFO',res)
        next()
      })
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
