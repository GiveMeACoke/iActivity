<template>
   <div class="updateUserInfo">
        <mt-header class="header" fixed title="用户信息">
            <router-link to=""  slot="left">
                <mt-button @click="$router.go(-1)" icon="back">back</mt-button>
            </router-link>
        </mt-header>

        <div class="selectImg">
          <P>添加头像:</P>
          <el-upload
          class="avatar-uploader"
          :on-success = "handleImg"
          :headers = "getAuthHeaders()"
          :action="userImg"
          :show-file-list="false">
              <img v-if="form.icon" :src="form.icon" style="width:100%;height:100%" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          </div>




        <div class="name">
          <mt-field label="昵称" placeholder="请输入昵称" class="aTitle" v-model="form.user_name"></mt-field>
          <mt-field label="密码" placeholder="请输入新密码" class="aTitle" v-model="form.password"></mt-field>
        </div>
        <div class="button">
                <mt-button @click="submit" type='primary' size='small'>保存</mt-button>
        </div>
    </div>
</template>

<script>
import url from '../../api/uploadImgUrls'
export default {
   name: 'mine',
    data() {
      return {
        form:{
          user_name:'',
          password:'',
          icon:''
        }
      }
    },
    computed: {
      userImg(){
        return url.userImg
      }
    },
    methods:{
      async logOut() { 
        await this.$store.dispatch('user/logOut')
        this.$router.push('login')
      },
      handleImg(file){
          this.form.icon = file.url
      },
      submit(){
        console.log(this.form)
        this.$api.user.updateUserInfo(this.form).then(res=>{
          this.$toast({
            message: res.message,
            duration: 1000,
            iconClass :'icon icon-success'
          })
          if(this.form.password){
            this.$toast({
              message: res.message + '请重新登录',
              duration: 1000,
              iconClass :'icon icon-success'
            })
            this.logOut()
          }
          this.form = {
            user_name:'',
            password:'',
            icon:''
          }
        })
      }
    }
  
}
</script>

<style scoped>

.updateUserInfo{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  background: rgb(250, 250, 250);
  z-index: 1000

}
.header{
    background: #00cec9 !important;
    height: 50px !important;
}


/**上传图片 */
.selectImg{
    margin: 50px 0;
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

</style>