//路由守卫
import router from './router'
import api from './api/apiList'
import store from './store'
//白名单
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
    if (localStorage.getItem('Token')) {
        if (to.path === '/login') {
            next({
                path: '/'
            })
        } else {
            Promise.all([   
                api.common.getOrganizations(),
                api.common.getCategories(), 
                api.user.getUserInfo()
            ])
            .then(res=>{
                store.commit('common/SET_ORGANIZATIONS',res[0])
                store.commit('common/SET_CATEGORIES',res[1])
                store.commit('user/SET_USERID',res[2].user_id)
                store.commit('user/SET_USERNAME',res[2].user_name)
                store.commit('user/SET_ROLE',res[2].role)
                store.commit('user/SET_USERICON',res[2].icon)
                if(res.organization){
                    store.commit('user/SET_ORGANIZATION',res[2].organization)
                }
                next()
            })
            .catch(error => {
                console.log(error)
                store.dispatch('user/logOut').then(() => {
                    next({ path: '/' })
                })
            })
        }
    }else{
        if (whiteList.indexOf(to.path) != -1){
            next()
        }else{
            next('/login')
        }
    }
})