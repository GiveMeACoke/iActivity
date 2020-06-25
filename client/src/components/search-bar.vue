<template>
  <div class="search-bar">
    <!-- 输入框 -->
    <div class="input-picker">
      <input type="text" v-model="searText" placeholder="搜索精彩活动"  @keyup.enter="search">
    </div>
    <div class="icon" @click="search">
      <i class="fa fa-search" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      searText:""
    }
  },
  methods: {
    search(){
      console.log(this.searText)
       this.$api.activities.searchActivity(this.searText).then(data=>{
            if(data.count>0){
              // this.$router.push(`/activityInfo/`+data.rows[0].activity_id)
              this.$emit('search', data.rows)
            }else{
              this.$toast({
                    message: "找不到该活动",
                    iconClass: 'icon icon-success',
                    duration: 3000
                })
            }
        })
    }
  }
}
</script>

<style scoped>
/* 搜索栏 */
.search-bar {
  background-color: #00cec9;
  color: white;
  height: 50px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
}
.search-bar div{
  margin-right: 10px;
}

.search-bar .icon{
  font-size: 18px;
}

.search-bar .input-picker {
  flex-grow: 1;
}
.search-bar .input-picker input {
  width: 100%;
  height: 26px;
  border-radius: 4px;
  padding: 0 8px;
}
</style>
