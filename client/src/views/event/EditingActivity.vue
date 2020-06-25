<template>
    <div class="applyActivity">
        <mt-header class="header" fixed title="申请活动">
            <router-link to=""  slot="left">
                <mt-button @click="$router.go(-1)" icon="back">back</mt-button>
            </router-link>
        </mt-header>
        <form class="container">
            <mt-field label="活动标题" placeholder="请输入活动标题" class="aTitle" v-model="form.activity_title"></mt-field>
            <div class="selectImg">
                <P>选择封面:</P>
                <el-upload
                class="avatar-uploader"
                :on-success = "handleImg"
                :headers = "getAuthHeaders()"
                :action="activityImgUrl"
                :show-file-list="false">
                    <img v-if="form.activity_img" :src="form.activity_img" style="width:100%;height:100%" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            
            <!-- 开始时间 -->
            <div class="timePicker">
                <div class="timePickerButton" @click="openPicker('startTime')">
                    <div class="lable">
                        开始时间
                    </div>
                    <div class="time">
                        {{form.activity_startTime  | timeFormat}}
                    </div>
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                </div>
                    
                    <mt-datetime-picker 
                        :startDate="startDate"
                        v-model="form.activity_startTime" 
                        type="datetime" 
                        ref="startTime"
                        @confirm="handleStartTimeConfirm">
                    </mt-datetime-picker>
            </div>

            <!-- 结束时间 -->
            <div class="timePicker">
                <div class="timePickerButton" @click="openPicker('endTime')">
                    <div class="lable">
                        结束时间：
                    </div>
                    <div class="time">
                        {{form.activity_endTime | timeFormat }}
                    </div>
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                </div>
                    <mt-datetime-picker 
                        :startDate="startDate"
                        v-model="form.activity_endTime" 
                        type="datetime" 
                        ref="endTime"
                        @confirm="handleEndTimeConfirm">
                    </mt-datetime-picker>
            </div>

            <mt-field class="introduce" label="活动简介" placeholder="活动简介"
             type="textarea" rows="5" v-model="form.activity_introduce"></mt-field>
            <p>选择活动分类：</p>
            <mt-picker class="Picker" ref=categoryPicker :show-toolbar="false" :slots="categories" @change="onCategoryChange"></mt-picker>
            <p>选择指导老师：</p>
            <mt-picker class="Picker" ref=teacherPicker :show-toolbar="false" :slots="teachers" @change="onTeachersChange"></mt-picker>
            <div class="buttons">
                <mt-button v-if="isUpdate" type="primary" @click.prevent="update" size="small">保存</mt-button>
                <mt-button :disabled='disabled' v-else type="primary" @click.prevent="submit" size="small">申请</mt-button>
                <mt-button type="danger"  @click.prevent="reset"  size="small">重填</mt-button>
            </div>
        </form>
    </div>
</template>

<script>
import timeformat from "../../util/timeformat"
import { Field } from 'mint-ui';
import url from '../../api/uploadImgUrls'
export default {
    props:['activityId'],
    name: 'applyActivity',
    components:{
        'mt-field':Field
    },
    data() {
        return {
            isUpdate:false,
            startDate:new Date(),
            form:{
                activity_title:'',
                activity_img:'',
                activity_introduce:'',
                activity_startTime:new Date(),
                activity_endTime:new Date(),
                category_id:'',
                teacher_id:''
            },
            disabled:false
        }
    },
    computed: {
        categories(){
            let data = this.$store.state.common.categories
            
            let values = []
            data.forEach(element=>{
                values.push(element.category_name)
            })
            return [
                {
                    flex: 1,
                    values,
                    textAlign: 'center'
                }
            ]
        },
        teachers(){
            let data = this.$store.state.common.teachers
            let values = []
            data.forEach(element=>{
                values.push(element.user_name)
            })
            return [
                {
                    flex: 1,
                    values,
                    textAlign: 'center'
                }
            ]
        },
        //活动图片上传的接口
        activityImgUrl(){
            return url.activityImg
        }
    },
    methods: {
        //修改活动内容
        update(){
            this.$api.activities.updateActivityInfo(this.activityId, this.form).then(res=>{
                this.$toast({
                     message: res.message,
                     iconClass: 'icon icon-success',
                     duration:1000
                })
                this.$router.go(-1)
            })
        },
        onCategoryChange(picker,values){
            let category_id = this.$store.getters['common/getCategoryId'](values[0])
            this.form.category_id = category_id
        },
        onTeachersChange(picker,values){
            let teacher_id = this.$store.getters['common/getTeacherId'](values[0])
            this.form.teacher_id = teacher_id
        },
        //申请按钮
        submit() {
            this.disabled = true
            for (const key in this.form) {
                if( !this.form[key] ){
                    this.$toast({
                        message: '请填写完整',
                        duration: 1000,
                        iconClass: 'fa fa-exclamation-triangle',
                        className: 'warn'
                    })
                    this.disabled = false
                    return
                }
            }    
            this.$api.user.applyActivity(this.form)
            .then(res=>{
                this.disabled = true
                this.$toast({
                    message: res.message,
                    duration: 1000,
                    iconClass :'icon icon-success'
                })
                this.$router.push('/event')
            })
            .catch(err=>{
                this.disabled = true
                this.$toast({
                    message: err.message,
                    duration: 1000,
                    iconClass: 'fa fa-exclamation-triangle',
                    className: 'warn'
                })
            })
        },
        reset() {
            for (const key in this.form) {
                this.form[key] = ''
            }
        },
        handleImg(file){
            this.form.activity_img = file.url
        },
        openPicker(type) {
            if(type=='startTime') this.$refs.startTime.open();
            if(type=='endTime') this.$refs.endTime.open();
            
        },
        handleStartTimeConfirm(value){
            this.form.activity_startTime = timeformat(new Date(value))
            this.$refs.startTime.close()
        },
        handleEndTimeConfirm(value){
            this.form.activity_endTime = timeformat(new Date(value))
            this.$refs.endTime.close()
        },
        getYear(date){
            return date.getFullYear()
        }
    },
    filters:{
        timeFormat(value){
            let time = new Date(value)
            let YYYY = time.getFullYear()
            let MM = time.getMonth()+1
            let DD = time.getDate()
            DD = DD<10 ? '0' + DD : DD
            let h = time.getHours()
            h = h<10 ? '0' + h : h
            let m = time.getMinutes()
            m = m<10 ? '0' + m : m
            let s = time.getSeconds()
            s = s<10 ? '0' + s : s
            return `${YYYY}-${MM}-${DD} ${h}:${m}:${s}`
        }
    },
    mounted() {
      if(this.activityId){
        this.isUpdate = true;
        this.$api.activities.getActivityInfo(this.activityId).then(data=>{
            let {
                activity_title,
                activity_img,
                activity_introduce,
                activity_startTime,
                activity_endTime,
                category_id,
                teacher_id
            } = data
            this.form = {
                activity_title,
                activity_img,
                activity_introduce,
                activity_startTime,
                activity_endTime,
                category_id,
                teacher_id
            }
        })
      }  
    },
}
</script>

<style scoped>
.timePicker .timePickerButton{
    display: flex;
    justify-content: space-between;
    padding:  10px 0;
    border-bottom: 1px solid rgb(119, 119, 119)
}


.header{
    background: #00cec9 !important;
    height: 50px !important;
}
.container{
    margin-top: 50px !important;
}
.buttons{
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}
.applyActivity{
    overflow: auto;
    padding: 0 20px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    background: white
}
.aTitle{
    border-bottom: 1px solid rgb(207, 203, 203)
}


/**上传图片 */
.selectImg{
    margin: 10px 0;
}
.avatar-uploader .el-upload {
    width: 100%;
    text-align: center;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

.introduce{
    border-bottom: 1px solid rgb(207, 203, 203);
    margin-bottom: 10px;
}
</style>