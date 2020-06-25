<template>
    <div class="myActivitiesList">
        <mt-header class="header" fixed :title="title">
            <router-link to="/mine" slot="left">
                <mt-button icon="back">back</mt-button>
            </router-link>
        </mt-header>
        <mt-navbar class="nav" v-model="selected">
            <mt-tab-item v-for="(item, index) in navs" :key="index"
            :id="index" @click.native.prevent="active=index">{{item}}</mt-tab-item>
        </mt-navbar>
        
        <div class="page-tab-container" v-if="mark!='member'">
            <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
                <mt-tab-container-item v-for="(item, index1) in activityList" :key="index1" :id="index1">
                    <activity-card :isNeedButton="index1===activityList.length-1?false:true" :type="mark" v-for="(activity, index) in item" :key="index"
                    :activityInfo = "activity"></activity-card>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <div v-else>
            <card v-for="(item, index) in passedActivities" :activeActivities="item" :key="index" ></card>
        </div>
    </div>
</template>

<script>
import activityCardForMine from '../../components/activityCardForMine'
import activityCardForMember from '../../components/activityCardForMember'
import { mapGetters } from 'vuex'
import bus from '../../util/bus'
export default {
    name:'myActivitiesList',
    data() {
        return {
            selected:0,
            active: 0,    
            navs:'',
            title:'',
            getters:'',
            activityList:''
        }
    },
    components:{
        'activity-card': activityCardForMine,
        'card': activityCardForMember
    },
    computed: {
        mark(){
            return this.$route.params.mark
        },
        ...mapGetters('user',['cadreActivities','rejectActivities', 'passedActivities', 'applyActivities']),
        awardedActivities(){
            return this.$store.getters['user/awardedActivities']()
        },
    },
    created() {
        if(this.mark=='apply'){
            this.title = '我发布的活动'
            this.navs = ['待审核','未通过','已审核']
            this.activityList = [this.cadreActivities,this.rejectActivities, this.passedActivities]
        }else if(this.mark=='join'){
            this.title = '我报名的活动'
            this.navs = ['已报名','已加分']
            this.activityList = [this.applyActivities, this.awardedActivities]
        }else if(this.mark=='member'){
            this.title = '报名人员管理'
        }
    },
    mounted() {

    },
}
</script>

<style scoped>

.header{
    background: #00cec9 !important;
    height: 50px !important;
}
.myActivitiesList{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    background: rgb(250, 250, 250);
    z-index: 1000
}

.page-tabbar-tab-container{
    background: rgb(250, 250, 250);
}

.item {
display: inline-block;
}

.nav {
    display: flex;
    margin-top: 50px;
}
.nav > a{
    text-align: center;
    font-size: 17px !important;
    padding: 10px;
    width: 100%;
    height: 100%;
    border-bottom: rgb(116, 116, 116) 1px solid;
}

.is-selected{
    color: #00cec9;
    border-bottom: #00cec9 1px solid !important;
}

.link {
color: inherit;
padding: 20px;
display: block;
}
</style>