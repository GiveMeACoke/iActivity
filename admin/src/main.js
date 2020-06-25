import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'

import './plugins/element-ui'

// 注册的方法
import './components/Dialog/register.js'

Vue.prototype.$moment = moment

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
