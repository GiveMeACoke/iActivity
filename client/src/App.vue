<template>
  <div id="app">
    <router-view class="main"></router-view>
    <!-- 导航 -->
    <my-menu></my-menu>
  </div>
</template>

<script>
import './assets/styles/reset.css'
import MyMenu from './components/menu.vue'


export default {
  components: {
    MyMenu
  }
}
</script>

<style>
/* 00cec9 */
</style>