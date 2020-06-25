import Vue from 'vue'
import Dialog from './index.vue'
import router from '@/router'
import store from '@/store'

Vue.prototype.$dialog = obj => {
  // console.log(obj)// {title:'新增'}
  // obj.title

  const id = 'custom-dialog'
  const div = document.createElement('div')
  div.id = id
  document.body.appendChild(div)

  // const title = obj.title

  // 注册组件
  const DialogComponent = Vue.extend(Dialog)

  // 实例化
  const DialogInstant = new DialogComponent({
    router,
    store,
    // 传递数据时用propsData进行传递
    propsData: {
      name: obj.name,
      title: obj.title,
      // 注册器接收 设置一个默认值
      // 如果调用的时候不传递参数的话，就默认是个空对象
      contentPropsData: obj.propsData || {}
    }
  })

  // 挂载进入HTML
  DialogInstant.$mount(`#${id}`)

  // 显示
  DialogInstant.show({
    methods: obj.methods
  })
}
