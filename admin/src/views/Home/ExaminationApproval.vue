<template>
  <div class="page">
    <div class="content-header">
      <span>共 {{list.data.length}} 条结果</span>
    </div>
    <div class="content-body">
      <el-table v-loading.box="list.loading" :data="list.data" border height="100%">
        <el-table-column prop="activity_title" label="活动标题"></el-table-column>
        <el-table-column prop="activity_introduce" label="活动介绍"></el-table-column>
        <el-table-column prop="category.category_name" label="活动类别"></el-table-column>
        <el-table-column label="审批结果">
          <template slot-scope="scope">
            <span v-if="scope.row.passed === null" style="color:#f9ca24">未审核</span>
            <span v-else-if="scope.row.passed === false" style="color:#eb4d4b">已拒绝</span>
            <span v-else-if="scope.row.passed === true" style="color:#2ecc71">已同意</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="views(scope.row)" size="mini" type="primary">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getActivities } from '@/api/activities.js'

export default {
  data () {
    return {
      list: {
        data: [],
        loading: false
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取列表
    getList () {
      if (this.list.loading) return false
      this.list.loading = true
      getActivities({
        all: true
      }).then(res => {
        this.list.data = res.teacherActivities
      }).finally(() => {
        this.list.loading = false
      })
    },
    // 查看
    views (item) {
      this.$dialog({
        title: '审批活动',
        name: 'Examination',
        propsData: {
          id: item.activity_id
        },
        methods: {
          done: () => {
            this.getList()
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.page{
  padding: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(243, 240, 240, 0.568);
}
.page .content-header {
  display: flex;
  justify-content: space-between;
  margin-bottom:20px;
  align-items: center;
}
.page .content-body {
  flex-grow: 1;
  height: 1px;
  overflow: hidden;
}
</style>
