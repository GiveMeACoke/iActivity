<template>
  <div class="menu">
    <el-menu :default-active="currentRouterName"
      class="el-menu-vertical"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">

      <el-menu-item v-for="(item,index) in showMenus" :key="index" :index="item.name" >
        <i :class="item.icon"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import permissions from '@/assets/js/permissions'
// getTeacherList
// import { getTeacherList } from '@/api/teacher.js'
export default {
  data () {
    return {
      menus: [
        {
          name: 'teachers-management',
          title: '教师管理',
          icon: 'el-icon-s-custom'
        },
        {
          name: 'activity-management',
          title: '活动管理',
          icon: 'el-icon-magic-stick'
        },
        {
          name: 'categories-management',
          title: '活动分类管理',
          icon: 'el-icon-s-promotion'
        },
        {
          name: 'schoolOrganization-management',
          title: '学校组织管理',
          icon: 'el-icon-files'
        },
        {
          name: 'userAccount-management',
          title: '用户帐号管理',
          icon: 'el-icon-user'
        },
        {
          name: 'examination-management',
          title: '审批活动',
          icon: 'el-icon-receiving'
        },
        {
          name: 'studentCadre-management',
          title: '学生干部管理',
          icon: 'el-icon-user-solid'
        }
      ]
    }
  },
  computed: {
    currentRouterName () {
      return this.$route.name
    },
    // 需要显示的菜单
    showMenus () {
      const roleId = this.$store.state.user.role.role_id
      const pages = permissions[roleId]
      const menus = []
      this.menus.forEach(item => {
        if (pages.includes(item.name)) {
          menus.push(item)
        }
      })
      return menus
    }
  },
  methods: {
    handleSelect (key) {
      if (key === this.currentRouterName) return false
      this.$router.replace({
        name: key
      })
    }

  }

}
</script>

<style scoped>
.menu{
  width: 200px;
  height: 100%;
  background-color:rgb(26, 24, 24);
}
.menu .el-menu-vertical {
  height: 100%;

}

</style>
