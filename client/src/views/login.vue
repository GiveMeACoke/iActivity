<template>
  <div class="login" @click.prevent>
    <div class="login-form">
      <form action="">
        <h1 class="title">I 活 动</h1>
        <input v-model="form.user_id" type="text" name="user_id"  placeholder="学号" >
        <input v-model="form.password" type="password" name="password" placeholder="密码">
        <input type="submit" value="登录" class="login-button"
        @click.prevent = "login">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      form: {
        user_id: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      let res = await this.$api.user.login(this.form)
      if(res.code == 1){
        let token = res.token
        //存入token
        localStorage.setItem('Token', token)
        this.$router.push('/')
        return
      }else {
        this.$toast({
          message: res.message,
          iconClass: 'fa fa-exclamation-triangle',
          className: 'warn'
        })
        this.form.user_id = '';
        this.form.password = '';
        return
      } 
      
    }
  }
}

</script>

<style scoped>
.login{
  position: absolute;
  left:0 ;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1000;
  background-image: url('@/../../assets/bg.jpg');
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center
}
.login-form{
  margin: 20px;
  padding: 20px;
  height: 320px;
  background: rgba(0, 0, 0, 0.596);
  border-radius: 10px;
}
.login-form form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.title{
  text-align: center;
  color: aliceblue;
  font-size: 60px;
  font-family:'JetLinkMediumOl1da8dd225e20e2e';
  margin-bottom: 10px;
}
.login-form form :nth-child(2),
.login-form form :nth-child(3)
{
  margin-bottom: 10px;
  height: 50px;
  padding: 20px;
  font-size: 18px;
  background: rgba(65, 160, 248, 0.329);
  color: aliceblue;
  transition: .4s;
  border-radius: 5px;
}

.login-form form :nth-child(2):focus,
.login-form form :nth-child(3):focus{
  border: #74b9ff 1px solid
}

.login-form form :nth-child(4){
  margin-top: 10px;
  height: 50px;
  width: 150px;
  border-radius: 5px;
  color: white;
  font-size: 18px;
  background: rgba(2, 78, 155, 0.664)
}

</style>
