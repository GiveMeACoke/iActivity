<template>
    <div class="container">
        <mt-header class="header" fixed :title="info.activity_title">
            <router-link to="/mine" slot="left">
                <mt-button @click="$router.go(-1)" icon="back">back</mt-button>
            </router-link>
        </mt-header>
        <div class="info">
            <div class="activityImg">
                <img :src="info.activity_img" width="100%" height="100%" alt="">
                <h3>{{info.activity_title}}</h3>
            </div>
            <div class="card" style="">
                <div class="tags">
                    <div class="or">
                        <div><i class="fa fa-sitemap" aria-hidden="true"></i></div>
                        {{info.organization.organization_name}}
                    </div>
                    <div class="type">
                        <div><i class="fa fa-tag" aria-hidden="true"></i></div>
                        {{info.category.category_name}}
                    </div>
                    
                </div>
            </div>
            <div class="card" style="min-height: 200px;">
                <div class="card-title">
                    活动简介
                </div>
                <div class="card-contain" style=" text-indent:2em;">
                    {{info.activity_introduce}}
                </div>
            </div>
            <div class="card" style="min-height: 100px;">
                <div class="card-title">
                    活动时间
                </div>
                <div class="card-contain">
                    开始时间：{{info.activity_startTime | timeFilter}}<br>
                    结束时间：{{info.activity_endTime | timeFilter}}
                </div>
            </div>
            <div class="card" style="min-height: 100px;">
                <div class="card-title">
                    负责人员
                </div>
                <div class="card-contain">
                    学生干部：{{info.cadre.user_name}}<br>
                    指导老师：{{info.teacher.user_name}}
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="backToHome">
                <li class="fa fa-home"></li>
            </div>
            <div class="apply">
                <mt-button :disabled ="isJoin" @click="join"
                :style="{'background':isJoin?'#ff7675':'#00cec9'}" >{{tip}}</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'activityInfo',
    props:['activityId'],
    data() {
        return {
            info:this.$store.state.activities.activityInfo,
            isJoin: false,
            tip:'立即报名'
        }
    },
    created() {
        this.isJoin = this.$store.getters['user/isJoin'](this.info.activity_id)
        if(this.isJoin){
            this.tip = "已报名"
        }
        if(this.info.passed==null){
            this.isJoin = true;
            this.tip = "未审核"
        }else if(this.info.passed==false){
            this.isJoin = true;
            this.tip = "未通过审核"
        }
    },
    filters:{
        timeFilter(value){
            let time = new Date(value)
            let YY = time.getFullYear()
            let MM = time.getMonth()+1>=10?time.getMonth()+1:'0'+time.getMonth()
            let DD = time.getDate()>=10?time.getDate():'0'+time.getDate()
            let hh = time.getHours()>=10?time.getHours():'0'+time.getHours()
            let mm = time.getMinutes()>=10?time.getMinutes():'0'+time.getMinutes()
            return `${YY}-${MM}-${DD} ${hh}:${mm}`
        }
    },
    methods: {
        join(){
            this.$api.activities.registeredActivity(this.info.activity_id).then(data=>{
                console.log(data)
                this.isJoin = true
                this.tip = '已报名'
            })
        }
    },
}
</script>

<style scoped>

.footer{
    position: fixed;
    bottom: 0px;
    left: 0px;
    background: white;
    width: 100%;
    display: flex;
    height: 50px;
    border-radius: 10px;
    border-top:solid rgba(51, 50, 50, 0.336) .5px
}

.footer div{
    display: flex;
    justify-content: center;
    align-items: center;
}
.footer .backToHome{
    width: 30%;
}
.footer .apply{
    color: white;
    width: 70%;
}
.footer .apply button{
    width: 100%;
    background: #00cec9;
    color: white
}
.tags{
    display: flex;
    justify-content: space-around
}
.tags>div{
    display: flex;
}
.tags>div>div{
    margin: 0 5px;
    color: #f39c12;
}
.card{
    padding: 10px;
    margin: 10px;
    background: white;
}
.card-title{
    font-size: large;
    color: #f39c12;
    border-bottom: #95a5a6 solid .3px;
    padding: 10px 0;
}
.card-contain{
    line-height: 1.5em;
}
.header{
    background: #00cec9 !important;
    height: 50px !important;
}
.container{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #f7f6fb;
    z-index: 1000
}
.info{
    margin: 60px 0;
}

.activityImg{
    color:aliceblue; 
    width: 100%;
    height: 250px;
    position: relative;
    z-index: -1;
}
.activityImg h3{
    position: absolute;
    bottom: 10px;
    left: 10px;
    z-index: 2
}
.activityImg::after{
    content: '';
    background: rgba(0, 0, 0, 0.521);
    position: absolute;
    width: 100%;
    height: 20%;
    left: 0;
    bottom: 0;
    z-index: 1;
}
</style>