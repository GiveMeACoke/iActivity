<template>
    <div class="box" @click="to">
        <div class="list-item">
            <div class="image">
                <img v-lazy="activity_img" src="" width="100%" height="100%" alt="">
            </div>
            <div class="info">
                <div class="title">
                    <h3>{{activity_title}}</h3>
                </div>
                <div class="category" ><span>{{category.category_name}}</span></div>
                <div class="tags">
                    <div class="time">截止时间:{{activity_endTime|timeFilter}}</div>
                    <div class="count">{{joinNumber}}人报名</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'activityCardForMember',
    props:['activeActivities'],
    data() {
        return {
            ...this.activeActivities
        }
    },
    filters:{
        timeFilter(value){
            let time = new Date(value)
            let YY = time.getFullYear()
            let MM = time.getMonth()+1>=10?time.getMonth()+1:'0'+time.getMonth()
            let DD = time.getDate()>=10?time.getDate():'0'+time.getDate()
            return `${YY}-${MM}-${DD}`
        }
    },
    methods: {
        to(){
            this.$router.push(`/mine/memberSPage/${this.activity_id}`)
        }
    },
}
</script>
<style scoped>
.box{
    display: flex;
    flex-direction: column;
    background: white;
    padding: 15px 20px;
    margin: 15px 0;
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
.category span{
    color: #00cec9;
    border: #00cec9 solid 1px;
    padding: 2px;
}
.list-item .image {
  width: 40%;
  min-width: 120px;
  height: 90px;
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
    color: #0fbcf9
}
.list-item .info .introduce {
    border: none !important;
    height: 50px;
    overflow: hidden;
  
}
.list-item .info .tags {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>