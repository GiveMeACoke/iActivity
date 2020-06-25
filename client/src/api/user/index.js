import api from '../index'
import urls from './urls'
export default {
    login(data) {
        let body = {
            user_id: data.user_id,
            password: data.password
        }
        return api.post(urls.login, body)
    },
    getUserInfo() {
        return api.get(urls.userInfo)
    },
    applyActivity(body) {
        return api.post(urls.applyActivity, body)
    },
    getUserActivities() {
        return api.get(urls.userActivities)
    },

    updateUserInfo(body){
          return api.put(urls.updateUserInfo, body)
    }
}