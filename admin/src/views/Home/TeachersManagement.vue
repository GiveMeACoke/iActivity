<template>
  <div class="page">
    <div class="content-header">
      <span>共{{list.total}}条结果</span>
      <el-button  @click="add" size="medium" type="primary">新增</el-button>
    </div>

    <div class="content-body">
      <el-table v-loading.box="list.loading" :data="list.data" border height="100%">
        <el-table-column prop="user_name" label="教师名称"></el-table-column>
        <el-table-column prop="user_id" label="教师工号"></el-table-column>
        <el-table-column prop="role.role_name" label="教师角色"></el-table-column>
        <el-table-column prop="organization.organization_name" label="所属组织"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
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
        role_id: 3, // 根据身份id  用户类型是固定的  1 学生 2 学生干部 3 指导老师 4 管理员
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
        name: 'Teacher',
        title: '新增教师',
        propsData: {
          type: 1
        },
        methods: {
          done: () => {
            this.getList()
          }
        }
      })
    },
    // 编辑
    edit (item) {
      this.$dialog({
        name: 'Teacher',
        title: '编辑教师',
        propsData: {
          type: 2,
          id: item.ID,
          organization: item.organization
        },
        methods: {
          done: () => {
            this.getList()
          }
        }
      })
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
