<template>
  <div class="page">
    <div class="content-header">
      <span class="left">
        <span>共 {{list.total}} 条结果</span>
        <el-radio-group class="filter-radio" v-model="filter.role_id" @change="onSelectRole">
          <el-radio :label="1">学生</el-radio>
          <el-radio :label="2">学生干部</el-radio>
          <el-radio :label="3">指导老师</el-radio>
          <el-radio :label="4">管理员</el-radio>
        </el-radio-group>
      </span>
      <el-button  @click="add" size="medium" type="primary">新增</el-button>
    </div>

    <div class="content-body">
      <el-table v-loading.box="list.loading" :data="list.data" border height="100%">
        <el-table-column prop="user_name" label="用户名称"></el-table-column>
        <el-table-column prop="user_id" label="编号"></el-table-column>
        <el-table-column v-if="filter.role_id !== 1" prop="organization.organization_name" label="所属组织"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
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
import { getUserList, deleteUser } from '@/api/user.js'
export default {
  data () {
    return {
      filter: {
        role_id: 1
      },
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
      getUserList({
        page: this.list.page, // 从第几页开始，默认为1,
        page_size: this.list.page_zie, // 一页包含多少条用户信息，默认为10
        role_id: this.filter.role_id, // 根据身份id  用户类型是固定的  1 学生 2 学生干部 3 指导老师 4 管理员
        usable: true
      }).then((res) => {
        this.list.total = res.count
        this.list.data = res.rows
      }).finally(() => {
        this.list.loading = false
      })
    },
    // 新增
    add () {
      this.$dialog({
        name: 'UserAccount',
        title: '新增用户',
        methods: {
          done: () => {
            this.getList()
          }
        }
      })
    },
    // 选择用户身份执行
    onSelectRole (val) {
      this.list.page = 1
      this.getList()
    },
    // 删除
    del (item) {
      deleteUser(item.ID).then(res => {
        this.$message.success('删除成功')
        this.getList()
      })
    },
    // 选择页数
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
.page .content-header .left {
  display: flex;
  align-items: center;
}
.page .content-header .left .filter-radio {
  margin-left: 20px;
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
