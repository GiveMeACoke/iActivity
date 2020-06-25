<template>
    <div class="myActivitiesList">
        <mt-header class="header" fixed :title="title">
            <router-link to="/mine" slot="left">
                <mt-button icon="back">back</mt-button>
            </router-link>
        </mt-header>
        <div class="list">
            <activity-card v-for="(item, index) in activities" :key="index" 
            :activityInfo="item"></activity-card>
        </div>
    </div>
</template>

<script>
import activityCardForMine from '../../components/activityCardForMine'
import { mapGetters } from 'vuex'
export default {
    props:['categoryId'],
    name:'categoryActivitiesPage',
    data() {
        return {
            
        }
    },
    components:{
        'activity-card': activityCardForMine
    },
    computed: {
        title(){
            return this.$store.getters['common/getCategoryName'](this.categoryId)
        },
        activities(){
            return this.$store.getters['user/awardedActivities'](this.categoryId)
        }
    },
    created() {
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

.timePickerButton{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid rgb(207, 203, 203)
}
.list{
    margin-top: 60px;
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