<template>
  <div>
    <el-form ref="form" :model="formdata" :rules="rules" label-width="100px">
      <el-form-item label="选择学生" prop="id">
          <el-select v-model="formdata.id">
            <el-option v-for="(item,index) in list" :key="index" :label="item.user_name" :value="item.ID"></el-option>
          </el-select>
      </el-form-item>
    </el-form>
    <div class="btns">
      <el-button :loading="loading" type="primary" size="mini" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import { getUserList, setStudents } from '@/api/user.js'
export default {
  data () {
    return {
      formdata: {
        id: ''
      },
      rules: {
        id: [{ message: '请选择学生', required: true, trigger: 'change' }]
      },
      list: [],
      loading: false
    }
  },
  created () {
    this.getStudents()
  },
  methods: {
    // 获取学生
    getStudents () {
      getUserList({
        all: true,
        role_id: 1,
        usable: true
      }).then(res => {
        this.list = res.rows
      })
    },
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
      setStudents(this.formdata.id).then(res => {
        this.$emit('hide')
        this.$emit('done')
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
