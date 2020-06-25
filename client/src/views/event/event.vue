<template>
  <div class="app">
    <!-- 菜单栏 -->
    <div class="menus">
      <div class="menu-item" v-for="(category, index) in categories" :key="index">
        <div class="icon">
          <i :class="['iconfont',`icon-zuzhi${index+1}`]" ></i>
        </div>
        <div class="name">{{category.category_name}}</div>
      </div>
    </div>
    <!-- 搜索栏 -->
    <search-bar></search-bar>
    <div v-if="isCadre" class="addActivity" @click = "addActivity">
      <div><h4>申请活动</h4></div>
      <i class="fa fa-chevron-right" aria-hidden="true"></i>
    </div>
    <router-view />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import SearchBar from '../../components/search-bar'
export default {
  components: {
    SearchBar
  },
  computed: {
    ...mapGetters('common', ['categories']),
  },
  data() {
    return {
      isCadre:false
    }
  },
  methods: {
    addActivity(){
      this.$router.push('/editingActivity')
    }
  },
  mounted() {
    if(this.$store.getters['user/roleName']=='学生干部'){
        this.isCadre = true
    }
  },
}
</script>

<style scoped>
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
  background-color: #00cec9;
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
.addActivity{
  display: flex;
  justify-content: space-between;
  height: 50px;
  background: white;
  align-items: center;
  padding: 0 20px;
  color: #636e72
}

.app {
  padding-top: 50px;
}
/* 筛选菜单 */
.filter-menu {
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 50px;
  width: 100%;
}
.filter-menu>li {
  height: 40px;
  line-height: 40px;
  flex-grow: 1;
  text-align: center;
  background-color: white;
  font-size: 14px;
  color: #888;
}
.filter-menu>li.select {
  border-bottom: 1px solid #0fbcf9;
  color: #0fbcf9;
}


</style>
