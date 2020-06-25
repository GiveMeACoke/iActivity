<template>
  <div class="page">
    <!-- 个人资料 -->
    <div class="profile">
      <div class="head">
        <img :src="userIcon" width="100%" height="100%" alt="" @click="toUpdate">
      </div>
      <div class="name">
        <h4>{{userName}}</h4>
      </div>
      <ul class="score">
        <li v-for="(item, index) in categories" :key="index" @click="toCategoryActivitiesInfo(item.category_id)">
          <div>{{getScore(item.category_id)}}</div>
          <div>{{item.category_name}}</div>
        </li>
      </ul>
    </div>
    <!-- 功能菜单 -->
    <ul class="menu">
      <li v-if="isCadre" @click="to('apply')">我发布的活动</li>
      <li v-if="isCadre" @click="to('member')">管理报名人员</li>
      <li @click="to('join')">我报名的活动</li>
      <li @click="logOut">退出登录</li>
    </ul>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from '../../api'
  export default {
    name: 'mine',
    data() {
      return {
        isCadre:false
      }
    },
    created() {
      if(this.$store.getters['user/roleName']=='学生干部'){
        this.isCadre = true
      }
    },
    computed: {
      ...mapGetters('user', ['userName', 'userIcon']),
      ...mapGetters('common', ['categories']),
      awardedActivities(){
        return this.$store.getters['user/awardedActivities']()
      }
    },
    methods: {
      async logOut() { 
        await this.$store.dispatch('user/logOut')
        this.$router.push('login')
      },
      to(mark){
        this.$router.push(`/mine/myActivitiesList/${mark}`)
      },
      getScore(category_id){
        let arr = []
        this.awardedActivities.forEach(element => {
          if(element.category_id==category_id){
            arr.push(element)
          }
        });
        let item = this.categories.find(item=>(item.category_id == category_id))
        return arr.length * item.category_score

      },
      toCategoryActivitiesInfo(category_id){
        this.$router.push(`/mine/categoryActivitiesPage/${category_id}`)
      },
      toUpdate(){
         this.$router.push(`/updateuserinfo/`)
      }
    }
  }
</script>

<style scoped>
.profile {
  background-color: #00cec9;
  padding-top: 30px;
}
.profile .head {
  overflow: hidden;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgb(128, 199, 149);
  margin: 0 auto;
}
.profile .name{
  text-align: center;
  color: white;
  margin-bottom: 20px;
}
.profile .score {
  display: flex;
  align-items: center;
  justify-content: space-between;
}


/**
如果没有这个>
就是匹配所有符合条件的子级
如果有这个，就是匹配下一级的,就是仅子元素一层
如果下两层的就不会匹配到

如果没有>
就是后代选择器
匹配所有后代

如果有>就是子选择器
仅匹配子代

为了防止li下面还会出现ul li 这样子的标签，所以加了>
这里用的是标签选择器
*/
.profile .score>li {
  flex-grow: 1;
  color: white;
  text-align: center;
  padding: 10px 0;
  font-size: 14px;
}
.menu>li{
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: rgb(57, 62, 65);
  padding: 0 20px;
  border-bottom: 1px solid #eee;
  background-color: white;
}

</style>
