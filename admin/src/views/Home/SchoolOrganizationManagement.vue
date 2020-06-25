<template>
  <div class="page">
    <div class="content-header">
      <span>共 {{ list.data.length }} 条结果</span>
      <el-button  @click="add" size="medium" type="primary">新增</el-button>
    </div>

    <div class="content-body">
      <el-table v-loading.box="list.loading" :data="list.data" border height="100%">
        <el-table-column prop="organization_name" label="组织名称"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getOrganizationsList, deleteOrganizations } from '@/api/organizations'

export default {
  data () {
    return {
      list: {
        total: 0,
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
      if (this.loading) return false
      this.loading = true
      getOrganizationsList().then(res => {
        this.list.data = res
      }).finally(() => {
        this.loading = false
      })
    },
    add () {
      this.$dialog({
        title: '新增组织',
        name: 'SchoolOrganization',
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
    edit (item) {
      this.$dialog({
        title: '编辑组织',
        name: 'SchoolOrganization',
        propsData: {
          type: 2,
          id: item.organization_id,
          name: item.organization_name
        },
        methods: {
          done: () => {
            this.getList()
          }
        }
      })
    },
    del (item) {
      deleteOrganizations(item.organization_id).then(res => {
        if (res.deleted) {
          this.$message.success('删除成功')
          this.getList()
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

.page .content-pagination {
  text-align: center;
  margin-top: 10px;
}
</style>
