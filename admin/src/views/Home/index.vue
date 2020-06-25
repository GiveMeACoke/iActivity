<template>
  <div class="app">
      <my-header class="my-header"></my-header>
      <div class="content">
        <my-menu class="menu-left"></my-menu>
        <div class="main-right">
          <router-view></router-view>
        </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MyHeader from '@/components/Header'
import MyMenu from '@/components/Menu'

export default {
  components: {
    MyHeader,
    MyMenu
  }
}

</script>

<style scoped>
.app{
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.app .content {
  flex-grow: 1;
  display: flex;
  height: 1px;
}
.app .content .menu-left {
  width: 200px;
  min-width: 200px;
  background:#fff;
}
.app .content .main-right {
  width: 1px;
  height: 100%;
  flex-grow: 1;
}
</style>
