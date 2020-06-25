<template>
    <div class="membersPage">
        <mt-header class="header" fixed title="报名人员">
            <router-link to=""  slot="left">
                <mt-button @click="$router.go(-1)" icon="back">back</mt-button>
            </router-link>
        </mt-header>
        <div class="list" v-if="members.length!=0">
            <card @add="add" @remove="remove" :records="records" v-for="(item, index) in members" :key="index" :activityID="activityId" :memberInfo="item"></card>
            <div class="button">
                <mt-button @click="submit" type='primary' size='small'>保存</mt-button>
            </div>
        </div>
        
        <div v-if="members.length==0" class="empty">无人报名</div>
    </div>
</template>

<script>
import card from '../../components/memberCard'
export default {
    name: 'membersPage',
    props:['activityId'],
    data() {
        return {
            members:'',
            records: [] //加分记录
        }
    },
    components:{
        card
    },
    methods: {
        add(ID){
            for(let i=0;i<this.records.length; i++){
                if(this.records[i].ID==ID){
                    this.records[i].passed=true
                    return
                }
            }
            this.records.push({ID:ID,passed:true})
        },
        remove(ID){
            for(let i=0;i<this.records.length; i++){
                if(this.records[i].ID==ID){
                    this.records[i].passed=false
                    return
                }
            }
            this.records.push({ID:ID,passed:false})
        },
        submit(){
            let that = this
            this.$api.activities.memberAwarded(this.records).then(res=>{
                that.$toast({
                    message: res.message,
                    iconClass: 'icon icon-success',
                    duration: 1000
                })
            })
        }
    },
    mounted() {
        this.$api.activities.getJoinMember(this.activityId).then(res=>{
            this.members = res.applyStudents
        })
    },
}
</script>

<style scoped>
.list,.empty{
    margin-top:70px;
}
.header{
    background: #00cec9 !important;
    height: 50px !important;
}
.button{
    display: flex;
    justify-content: center
}
.membersPage{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    background: rgb(250, 250, 250);
    z-index: 1000
}
</style>