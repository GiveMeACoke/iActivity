import Vue from 'vue'
import App from './App.vue'
import router from './router'
import MintUI from 'mint-ui'
import {Upload} from 'element-ui'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css'

import '../public/font-awesome/css/font-awesome.min.css'
import 'mint-ui/lib/style.css'
// import rem from '../config/rem'
import api from './api/install'
import store from './store'
import '@/permission'
import moment from 'moment'



//设置端口号
// var ServerConf=require("./config/ServerConf");
Vue.prototype.$moment = moment
Vue.use(api)
Vue.use(ElementUI);

Vue.use(MintUI)
Vue.use(Upload)
Vue.config.productionTip = false

//全局方法
Vue.mixin({
  methods:{
    getAuthHeaders(){
        return {
            Authorization: localStorage.getItem('Token') || ''
        }
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
