<template>
  <div>
    <el-form ref="form" :model="formdata" :rules="rules" label-width="100px">
      <el-form-item label="分类名称" prop="category_name">
        <el-input v-model="formdata.category_name"></el-input>
      </el-form-item>
      <el-form-item label="分数" prop="category_score">
        <el-input-number v-model="formdata.category_score" :min="0" :controls="false"></el-input-number>
      </el-form-item>
    </el-form>
    <div class="btns">
      <el-button :loading="loading" type="primary" size="mini" @click="type === 1 ? add() : edit()">提交</el-button>
    </div>
  </div>
</template>

<script>
import { createCategories, updateCategories } from '@/api/categories'
export default {
  props: ['type', 'id', 'name', 'score'],
  data () {
    return {
      formdata: {
        category_name: '',
        category_score: undefined
      },
      rules: {
        category_name: [{ message: '请填写名称', required: true, trigger: 'blur' }],
        category_score: [{ message: '请填写分数', required: true, trigger: 'blur' }]
      },
      loading: false
    }
  },
  created () {
    if (this.type === 2) {
      this.formdata.category_name = this.name
      this.formdata.category_score = this.score
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
      createCategories({
        category_name: this.formdata.category_name,
        category_score: this.formdata.category_score
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
      updateCategories(this.id, {
        category_name: this.formdata.category_name,
        category_score: this.formdata.category_score
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
