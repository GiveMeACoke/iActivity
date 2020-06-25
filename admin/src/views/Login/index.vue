<template>
  <div class="login">
    <div class="box">
      <div ref="sb-title">i活动后台管理系统</div>
      <el-form ref="login-form" :model="formDate" :rules="formRules">
        <!-- 账号 -->
        <el-form-item label="账号" prop="username">
          <el-input v-model="formDate.username" placeholder="请输入账号"></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formDate.password" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="button" type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import { toLogin } from '@/api/admin.js'
import permissions from '@/assets/js/permissions'

export default {
  data () {
    return {
      formDate: {
        username: '',
        password: ''
      },
      formRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 提交表单
    async onSubmit () {
      // 获取表单组件实例
      const loginForm = this.$refs['login-form']
      // 验证表单内容

      const validate = await new Promise(resolve => {
        loginForm.validate().then(() => {
          resolve(true)
        }).catch(() => {
          resolve(false)
        })
      })

      // 如果验证不通过，则return
      if (validate === false) return false

      // 发送请求给接口
      toLogin({
        user_id: this.formDate.username,
        password: this.formDate.password
      }).then(res => {
        console.log('res是后台返回的数据:')
        console.log(res)
        if (res.code === 1) {
          // 登录成功后存储数据进入store
          this.$store.commit('saveUserInfo', res)

          // 弹框提示登录成功
          this.$message.success('登录成功')

          // 跳转页面
          const roleId = this.$store.state.user.role.role_id
          const pages = permissions[roleId]
          this.$router.replace({
            name: pages[0]
          })
        } else {
          this.$message.error('登录失败')
        }
      })
    }
  }
}
</script>

<style scoped>
.login{
  height: 100vh;
  width: 100vw;
  background-image: url("../../assets/images/login.jpg");
  background-size: cover;
  background-repeat:no-repeat;
  background-position:center;
  overflow: hidden;
  display:flex;
  justify-content: center;
  align-items: center
}
.login .box{
  width:300px;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 8px 1px #dedede;

}
.login .box .button{
  width: 100%;
  margin-top: 20px;
}
</style>
