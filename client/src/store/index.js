import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import user from './modules/user'
import common from './modules/common'
import activities from './modules/activities'
export default new Vuex.Store({
    modules: {
        user,
        common,
        activities
    }
})
