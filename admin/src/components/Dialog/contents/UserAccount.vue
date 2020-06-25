<template>
  <div>
    <el-form ref="form" :model="formdata" :rules="rules" size="mini" label-width="100px">
      <el-form-item label="用户编号:" prop="user_id">
        <el-input v-model="formdata.user_id"></el-input>
      </el-form-item>
      <el-form-item label="登陆密码:" prop="password">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-form-item label="用户名称:" prop="user_name">
        <el-input v-model="formdata.user_name"></el-input>
      </el-form-item>
      <el-form-item label="用户身份:" prop="role_id">
        <el-select v-model="formdata.role_id">
          <el-option label="学生" :value="1"></el-option>
          <el-option label="学生干部" :value="2"></el-option>
          <el-option label="管理员" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="formdata.role_id !== 1" label="所属组织:" prop="organization_id">
        <el-select v-model="formdata.organization_id" clearable>
          <el-option v-for="(item,index) in options" :key="index" :label="item.organization_name" :value="item.organization_id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="btns">
      <el-button :loading="loading" type="primary" size="medium" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import { getOrganizationsList } from '@/api/organizations'
import { createUser } from '@/api/user'

export default {
  data () {
    return {
      formdata: {
        user_id: '',
        password: '',
        user_name: '',
        role_id: '',
        organization_id: ''
      },
      rules: {
        user_id: [{ message: '请填写用户编号', required: true, trigger: 'blur' }],
        password: [{ message: '请填写密码', required: true, trigger: 'blur' }],
        user_name: [{ message: '请填写名称', required: true, trigger: 'blur' }],
        role_id: [{ message: '请选择身份', required: true, trigger: 'change' }]
      },
      options: [],
      loading: false
    }
  },
  created () {
    // 获取组织列表
    getOrganizationsList().then(res => {
      this.options = res
    })
  },
  methods: {
    // 提交
    async submit () {
      if (this.loading) return false
      const validate = await new Promise(resolve => {
        this.$refs.form.validate().then(() => {
          resolve(true)
        }).catch(() => {
          resolve(false)
        })
      })
      if (validate === false) return false
      this.loading = true
      const sendData = {
        user_id: this.formdata.user_id,
        password: this.formdata.password,
        user_name: this.formdata.user_name,
        role_id: this.formdata.role_id
      }
      if (this.formdata.role_id !== 1) sendData.organization_id = this.formdata.organization_id
      createUser(sendData).then(res => {
        if (res.added) {
          this.$emit('hide')
          this.$emit('done')
        }
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
.btns {
  text-align: center;
}
</style>
