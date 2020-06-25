<template>
  <div>
    <el-form ref="form" :model="formdata" :rules="rules" label-width="100px">
      <el-form-item label="组织名称" prop="organization_name">
        <el-input v-model="formdata.organization_name"></el-input>
      </el-form-item>
    </el-form>
    <div class="btns">
      <el-button :loading="loading" type="primary" size="mini" @click="type === 1 ? add() : edit()">提交</el-button>
    </div>
  </div>
</template>

<script>
import { createOrganizations, updateOrganizations } from '@/api/organizations'
export default {
  props: ['type', 'id', 'name'],
  data () {
    return {
      formdata: {
        organization_name: ''
      },
      rules: {
        organization_name: [{ message: '请填写名称', required: true, trigger: 'blur' }]
      },
      loading: false
    }
  },
  created () {
    if (this.type === 2) {
      this.formdata.organization_name = this.name
    }
  },
  methods: {
    // 提交新增
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
      createOrganizations({
        organization_name: this.formdata.organization_name
      }).then(res => {
        if (res.added) {
          this.$message.success('新增成功')
          this.$emit('hide')
          this.$emit('done')
        }
      }).finally(() => {
        this.loading = false
      })
    },
    // 提交编辑
    async edit () {
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
      updateOrganizations(this.id, {
        organization_name: this.formdata.organization_name
      }).then(res => {
        if (res.update) {
          this.$message.success('编辑成功')
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
