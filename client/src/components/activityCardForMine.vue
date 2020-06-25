<template>
<div class="box" v-if="!isRemove" @click="toInfo">
    <div class="list-item">
        <div class="image">
            <img v-lazy="activity_img" :src="activity_img" width="100%" height="100%" alt="">
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
    <div v-if="isNeedButton" class="buttons">
        <mt-button v-if="type=='apply'" size="small" type="primary" @click.stop="update(activity_id)">修改</mt-button>
        <mt-button @click.stop="remove" size="small" type="danger">取消</mt-button>
    </div>
</div>
    
</template>

<script scoped>
import bus from '../util/bus'
export default {
    name: 'activityCardForMine',
    props:['activityInfo','isNeedButton', 'type'],
    data() {
        return {
            ...this.activityInfo,
            isRemove:false
        }
    },
    computed: {
        applyTime(){
            let time = new Date(this.apply_time)
            let y = time.getFullYear()
            let m = time.getMonth()+1
            let date = time.getDate()
            return `${y}-${m}-${date}`
        },
        releaseTime(){
            let time = new Date(this.release_time)
            let y = time.getFullYear()
            let m = time.getMonth()+1
            let date = time.getDate()
            return `${y}-${m}-${date}`
        }
    },
    methods: {
        toInfo(){
            this.$router.push(`/activityInfo/${this.activity_id}`)
        },
        update(activityId){
            console.log(activityId)
            this.$router.push(`/editingActivity/${activityId}`)
        },
        remove(){
            if(this.type=='join'){
                let that =  this
                this.$api.activities.cancelRegistration(this.activityInfo.activity_id)
                .then(res=>{
                    that.$toast({
                        message: res.message,
                        iconClass: 'icon icon-success',
                        duration: 1000
                    })
                    //刷新
                    that.isRemove = true
                })
            }else{
                let that =  this
                this.$api.activities.cancelApplication(this.activityInfo.activity_id)
                .then(res=>{
                    that.$toast({
                        message: res.message,
                        iconClass: 'icon icon-success',
                        duration: 1000
                    })
                    //刷新
                    that.isRemove = true
                })
            }
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
    }
}
</script>

<style scoped>
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
.category span{
    color: #00cec9;
    border: #00cec9 solid 1px;
    padding: 2px;
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