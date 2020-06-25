<template>
  <div class="page">
    <div class="content-header">
      <span>共 {{list.total}} 条结果</span>
      <el-button size="mini" type="primary" @click="add">新增</el-button>
    </div>
    <div class="content-body">
      <el-table v-loading.box="list.loading" :data="list.data" border height="100%">
        <el-table-column prop="user_name" label="学生名称"></el-table-column>
        <el-table-column prop="organization.organization_name" label="所属组织"></el-table-column>
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
import { getUserList } from '@/api/user.js'

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
    // 获取列表
    getList () {
      if (this.list.loading) return false
      this.list.loading = true
      getUserList({
        page: this.list.page,
        page_size: this.list.page_size,
        role_id: 2
      }).then(res => {
        this.list.total = res.count
        this.list.data = res.rows
      }).finally(() => {
        this.list.loading = false
      })
    },
    // 新增
    add () {
      this.$dialog({
        title: '新增学生干部',
        name: 'StudentCadre',
        methods: {
          done: () => {
            this.getList()
          }
        }
      })
    },
    // 当分页器选择页面的时候触发
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
