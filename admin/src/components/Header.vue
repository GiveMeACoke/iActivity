<template>
  <div class="header">
    <div class="left">
      <span class="title">i活动后台管理系统</span>
    </div>
    <div class="right">
      <span class="hello"><i class="el-icon-s-custom"></i>{{name}}</span>
      <span @click="exit" class="exit"><i class="el-icon-switch-button"></i>退出</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  // created生命周期
  // 这个组件被创建的时候，就会设置 this.name
  // 然后放到html 上面显示
  // this.$store.state,获取store里面的state的
  created () {
    this.name = this.$store.state.user.user_name
    // console.log(this.$store.state)
  },
  methods: {
    exit () {
      this.$store.commit('removeUserInfo')
      this.$router.replace({
        name: 'login'
      })
    }
  }
}
</script>

<style scoped>
.header{
  height: 50px;
  min-height: 50px;
  display:flex;
  justify-content:space-between;
  align-items: center;
  border-bottom:1px solid rgb(194, 171, 171);
  padding: 0 20px;
}
.header .left .title {
  font-size: 18px;
  font-weight: bold;
}
.header .right .hello{
  padding-right:30px;
}
</style>
