<template>
  <div class="app">
    <!-- 搜索栏 -->
    <search-bar @search = 'searchA'></search-bar>
    <div class="swipe">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(activity, index) in swipeActivities"
        :key="index">
        <img @click="toInfo(activity.activity_id)" width="100%" height="100%" :src="activity.activity_img" alt=""></mt-swipe-item>
      </mt-swipe>
    </div>
    
    

    <!-- 强力推荐 -->
    <div class="recommend">
      <!-- 筛选栏 -->
      <div class="recommend-header">
        <div class="title">强力推荐</div>
        <div class="replace">换一批</div>
      </div>
      <!-- 列表 -->



      <ul class="list">
                <div v-for="(item, index1) in activityList" :key="index1" :id="index1">
                    <li class="list-item" @click="toInfo(item.activity_id)">
                      <!-- <el-image class="img" :src="item.activity_img"> </el-image> -->
                      <div class="image">
                         <img v-lazy="item.activity_img" :src="item.activity_img" width="100%" height="100%" alt="">
                      </div>
                         <!-- <div class="name">{{item.activity_title}}</div> -->
                        <!-- <div class="info">
                        <div class="title">
                         <div class="desc">精选</div>
                        </div>
                     
                        <div class="result">
                          <div class="time">{{$moment(item.activity_startTime).format('MM-DD')}}</div>
                          <div class="count">{{item.joinNumber}}人报名</div>
                        </div>
                      </div> -->
                          <div class="info">
                          <div class="title">
                              <h3>{{item.activity_title}}</h3>
                              <div class="desc">精选</div>
                          </div>
                          <div class="category" ><span>{{item.category.category_name}}</span></div>
                          <div class="tags">
                              <div class="time">时间:{{item.activity_startTime|timeFilter}}</div>
                              <div class="count">{{item.joinNumber}}人报名</div>
                          </div>
                      </div>
                    </li>
                </div>

           
      </ul>
    </div>
  </div>
</template>

<script>
import SearchBar from '../components/search-bar'
import {mapGetters} from 'vuex'
import { Swipe, SwipeItem } from 'mint-ui';

export default {
  name: 'home',
  data() {
        return {
            activityList:[],
            //activity_id:"",
            //url: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3381573685,1866477444&fm=26&gp=0.jpg'
        }
    },
    methods: {
      //跳转至详情界面，需要活动id
      toInfo(activity_id){
            this.$router.push(`/activityInfo/`+activity_id)
        },
      searchA(activities){
        this.activityList = activities
      }
    },
  components: {
    SearchBar
  },
  computed: {
    swipeActivities(){
      return this.$store.getters['activities/swipeActivities']
    }
  },
  created() {
    this.$api.activities.recommendActivity().then(data=>{
      this.activityList = data.rows
    })
  },
  filters:{
        timeFilter(value){
            let time = new Date(value)
            // let YY = time.getFullYear()
            let MM = time.getMonth()+1>=10?time.getMonth()+1:'0'+time.getMonth()
            let DD = time.getDate()>=10?time.getDate():'0'+time.getDate()
            return `${MM}-${DD}`
        }
    }
}
</script>

<style scoped>

.swipe{
  width: 100%;
  height: 250px;
}


.recommend{
  margin-top: 5px;
}
.app {
  padding-top: 50px;
  margin-bottom: 70px;
}

/* 菜单栏 */
.menus {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: white;
}
.menus .menu-item {
  width: 50px;
}
.menus .menu-item .icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
}
.menus .menu-item .icon .iconfont {
  color: white;
  font-size: 22px;
}
.menus .menu-item .name {
  text-align: center;
  font-size: 12px;
  color: #444;
}

/* 强力推荐 */
.recommend .recommend-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  padding: 0 20px;
  background-color: white;
}
.recommend .recommend-header .title {
  font-size: 14px;
}
.recommend .recommend-header .replace {
  font-size: 13px;
}
.recommend .list .list-item {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  background-color: white;
  padding: 15px 20px;
  margin-bottom: 15px;
  color: #444;
}
.recommend .list .list-item:last-of-type {
  margin-bottom: 0;
}
.recommend .list .list-item .image {
  width: 120px;
  min-width: 120px;
  height: 90px;
  overflow: hidden;
  margin-right: 15px;
}
.recommend .list .list-item .info .title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.recommend .list .list-item .info .title .desc {
  color: #c6b04d;
  white-space: nowrap;
  align-self: flex-start;
}
.recommend .list .list-item .info .address {
  margin-bottom: 8px;
}
.recommend .list .list-item .info .result {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.buttons{
    margin-top: 10px;
    display: flex;
    justify-content: space-around
}
.box{
    display: flex;
    flex-direction: column;
    background: white;
    padding: 15px 20px;
    margin-bottom: 15px;
    justify-content: space-between;
}
.list-item {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #444;
}
.list-item:last-of-type {
  margin-bottom: 0;
}
.list-item .image {
  width: 40%;
  min-width: 120px;
  height: 90px;
  background-color: #a8e8ff86;
  overflow: hidden;
  margin-right: 15px;
}
.list-item .info{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1
}
.list-item .info .title {
    font-size: 15px;
    color: #a3d8f0
}
.category span{
    color: #7b8b8b;
    border: #747e7e solid 1px;
    padding: 2px;
}
.list-item .info .introduce {
    border: none !important;
    height: 50px;
    overflow: hidden;
  
}
.list-item .info .tags {
    font-size: 12px;
    /* display: flex; */
    justify-content: space-between;
    align-items: center;
}
</style>
