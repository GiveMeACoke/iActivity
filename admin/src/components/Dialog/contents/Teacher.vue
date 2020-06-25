<template>
  <div>
    <el-form ref="form" :model="formdata" :rules="rules" size="mini" label-width="100px">
      <el-form-item v-if="type === 1" label="教师工号:" prop="user_id">
        <el-input v-model="formdata.user_id"></el-input>
      </el-form-item>
      <el-form-item v-if="type === 1" label="登陆密码:" prop="password">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-form-item v-if="type === 1" label="教师名称:" prop="user_name">
        <el-input v-model="formdata.user_name"></el-input>
      </el-form-item>
      <el-form-item label="所属组织:" prop="organization_id">
        <el-select v-model="formdata.organization_id">
          <el-option v-for="(item,index) in options" :key="index" :label="item.organization_name" :value="item.organization_id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="btns">
      <el-button :loading="loading" type="primary" size="medium" @click="type === 1 ? add() : edit()">提交</el-button>
    </div>
  </div>
</template>

<script>
import { getOrganizationsList } from '@/api/organizations'
import { createUser } from '@/api/user'
import { updateTeacherOrganization } from '@/api/teacher'

export default {
  props: ['type', 'id', 'organization'],
  data () {
    return {
      formdata: {
        user_id: '',
        password: '',
        user_name: '',
        organization_id: ''
      },
      rules: {
        user_id: [{ message: '请填写工号', required: true, trigger: 'blur' }],
        password: [{ message: '请填写密码', required: true, trigger: 'blur' }],
        user_name: [{ message: '请填写名称', required: true, trigger: 'blur' }],
        organization_id: [{ message: '请选择组织', required: true, trigger: 'change' }]
      },
      options: [],
      loading: false
    }
  },
  created () {
    if (this.type === 2 && this.organization) {
      this.formdata.organization_id = this.organization.organization_id
    }
    // 获取组织列表
    getOrganizationsList().then(res => {
      this.options = res
    })
  },
  methods: {
    // 提交
    async add () {
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
      createUser({
        user_id: this.formdata.user_id,
        password: this.formdata.password,
        user_name: this.formdata.user_name,
        role_id: 3,
        organization_id: this.formdata.organization_id
      }).then(res => {
        if (res.added) {
          this.$emit('hide')
          this.$emit('done')
        }
      }).finally(() => {
        this.loading = false
      })
    },
    // 编辑提交
    edit () {
      updateTeacherOrganization(this.id, {
        organization_id: this.formdata.organization_id
      }).then(res => {
        this.$message.success('编辑成功')
        this.$emit('hide')
        this.$emit('done')
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
