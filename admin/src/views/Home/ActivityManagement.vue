<template>
  <div class="page">
    <div class="content-header">
      <span>共{{list.total}}条结果</span>
    </div>

    <div class="content-body">
      <el-table v-loading.box="list.loading" :data="list.data" border height="100%">
        <el-table-column prop="activity_title" label="活动名称"></el-table-column>
        <el-table-column prop="activity_introduce" label="活动名称"></el-table-column>
        <el-table-column prop="joinNumber" label="参与人数"></el-table-column>
        <el-table-column prop="cadre.user_name" label="组织人"></el-table-column>
        <el-table-column prop="activity_startTime" label="开始时间"></el-table-column>
        <el-table-column prop="activity_endTime" label="结束时间"></el-table-column>
        <el-table-column prop="teacher.user_name" label="指导老师"></el-table-column>
        <el-table-column prop="organization.organization_name" label="所属组织"></el-table-column>
        <el-table-column prop="category.category_name" label="活动类别"></el-table-column>
        <el-table-column label="审批结果">
          <template slot-scope="scope">
            <span v-if="scope.row.passed === null">未审核</span>
            <span v-else-if="scope.row.passed === false">已拒绝</span>
            <span v-else-if="scope.row.passed === true">已同意</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="content-pagination">
      <el-pagination
        layout="prev, pager, next"
        background
        :total="list.total"
        :current-page.sync="list.page"
        :page-size="list.page_size"
        @current-change="handleCurrentPageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getActivities } from '@/api/activities'

export default {
  data () {
    return {
      list: {
        total: 0,
        page: 1,
        page_size: 10,
        data: [],
        loading: false
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      if (this.list.loading) return false
      this.list.loading = true
      getActivities({
        page: this.list.page, // 从第几页开始，默认为1,
        page_size: this.list.page_zie // 一页包含多少条用户信息，默认为10
      }).then((res) => {
        this.list.total = res.count
        this.list.data = res.rows
      }).finally(() => {
        this.list.loading = false
      })
    },
    handleCurrentPageChange () {
      this.getList()
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

.page .content-pagination {
  text-align: center;
  margin-top: 10px;
}
</style>
