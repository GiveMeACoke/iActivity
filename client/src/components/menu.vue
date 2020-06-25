<template>
  <div class="box">
    <div class="menu">
      <div class="menu-item" 
      v-for="(item, index) in icons" :key="index"
      :class="{ select: name === item.path }" 
      @click="to(item.path, index)">
        <div class="icon">
          <i :class="item.icon" aria-hidden="true"></i>
        </div>
        <div class="name">{{item.label}}</div>
      </div>
    </div>
  </div>
</template>

<script >
export default {
  mounted() {
    console.log(this.activeIndex)
  },
  computed: {
    // 当前路由的名字
    name () {
      return this.$route.name
    }
  },
  data() {
    return {
      icons: [
        {icon: 'fa fa-home', label:'首页', path:'Home'},
        {icon: 'fa fa-paper-plane', label: '活动', path: 'Event'},
        {icon: 'fa fa-user-circle', label: '我的', path: 'Mine'}],
      activeIndex: '',

    }
  },
  methods: {
    // 路由跳转
    to (name, index) {
      this.activeIndex = index
      // 如果点击的是当前页，则不跳转
      if (name === this.name) return false
      // 跳转去点击的页面
      this.$router.replace({
        name
      })
    }
  }
}
</script>

<style scoped>
.box{
  position: relative;
}
.menu {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 65px;
  display: flex;
  width: 100%;
  background-color: white;
  border-top: 1px solid #dadada;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  border: white solid 5px 
}


.menu .menu-item {
  z-index: 2;
  flex-grow: 1;
  color: #ccc;
  /* 垂直水平居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 修改主轴方向 */
  flex-direction: column;
}
.icon {
  color: #00cec9;
  font-size: 20px;
  transition: .3s;
  transform: translate(0, 10px)
}
.select .icon{
  font-size: 25px;
  transform: translate(0, 0px)
}
.name {
  opacity: 0;
  color: #00cec9;
  font-size: 12px;
  transition: .3s
}
.select .name{
  opacity: 1;
}
</style>
