<template>
  <div v-if="detail">
    <el-form size="mini">
      <el-form-item label="活动图片:"></el-form-item>
       <el-image
    style="width: 45%; height: 45%"
    :src="detail.activity_img">
  </el-image>
      <el-form-item label="活动标题:">{{ detail.activity_title }}</el-form-item>
      <el-form-item label="活动介绍:">{{ detail.activity_introduce }}</el-form-item>
      <el-form-item label="活动类别:">{{ detail.category.category_name }}</el-form-item>
      <el-form-item label="所属协会:">{{ detail.organization.organization_name }}</el-form-item>
      <el-form-item label="组织干部:">{{ detail.cadre.user_name }}</el-form-item>
      <el-form-item label="开始时间:">{{$moment(detail.activity_startTime).format('YYYY-MM-DD HH:mm:ss')}}</el-form-item>
      <el-form-item label="结束时间:">{{$moment(detail.activity_endTime).format('YYYY-MM-DD HH:mm:ss')}}</el-form-item>
      <el-form-item label="审批结果:">
        <span v-if="detail.passed === null">未审核</span>
        <span v-else-if="detail.passed === false">已拒绝</span>
        <span v-else-if="detail.passed === true">已同意</span>
      </el-form-item>
    </el-form>
    <div v-if="detail.passed === null" class="btns">
      <el-button type="primary" size="medium" @click="resolve">同意</el-button>
      <el-button type="danger" size="medium" @click="reject">拒绝</el-button>
    </div>
  </div>
</template>

<script>
import { getActivitiesDetail, updateActivities } from '@/api/activities.js'

export default {
  props: ['id'],
  data () {
    return {
      detail: null,
      url: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3381573685,1866477444&fm=26&gp=0.jpg'
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    // 获取详情
    getDetail () {
      getActivitiesDetail(this.id).then(res => {
        this.detail = res
      })
    },
    // 同意
    resolve () {
      updateActivities(this.id, true).then(res => {
        this.$message.success('审核完成')
        this.$emit('hide')
        this.$emit('done')
      })
    },
    // 拒绝
    reject () {
      updateActivities(this.id, false).then(res => {
        this.$message.success('审核完成')
        this.$emit('hide')
        this.$emit('done')
      })
    }
  }
}
</script>

<style scoped>
.btns {
  margin-top: 25px;
  text-align: center;
}
</style>
