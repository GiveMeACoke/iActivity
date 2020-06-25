<template>
  <div class="card">
    <div class="icon">
      <img :src="icon" width="100%" height="100%" alt="">
    </div>
    <div class="info">
      <div class="name">姓名：{{user_name}}</div>
      <div class="name">学号：{{user_id}}</div>
    </div>
    <mt-switch v-model="isMark" @click.native.prevent="mark">加分</mt-switch>
  </div>
</template>

<script>
import {MessageBox} from 'mint-ui'
export default {
  name:'memberCard',
  props:['memberInfo','activityId','records'],
  data() {
    return {
      ...this.memberInfo,
      isMark:false
    }
  },
  computed: {
  },
  mounted() {
    this.isMark = this.state.passed
  },
  methods: {
    mark(){
      let that = this
      if(this.isMark){
        MessageBox.confirm(`是否取消${this.user_name}的加分?`)
          .then(action => {
              that.isMark = false
              that.$emit('remove', that.state.ID)
              console.log(that.records)
          }).catch(action => {
            console.log('取消')
          })
      }else{
        MessageBox.confirm(`是否为${this.user_name}加分?`)
          .then(action => {
              that.isMark = true
              that.$emit('add', that.state.ID)
              console.log(that.records)
          }).catch(action => {
            console.log('取消')
          })
      }
      
    }
  },
}
</script>

<style scoped>
.card{
  margin: 20px 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: white;
  padding: 10px 0;
  border-radius: 5px;
}
.icon{
  width: 80px;
  border-radius: 50%;
  border: 1px solid #00cec9;
  overflow: hidden;
}
</style>