<template>
  <div class="page">
    <div class="content-header">
      <span>共 {{ list.data.length }} 条结果</span>
      <el-button  @click="add" size="medium" type="primary">新增</el-button>
    </div>

    <div class="content-body">
      <el-table v-loading.box="list.loading" :data="list.data" border height="100%">
        <el-table-column prop="category_name" label="分类名称"></el-table-column>
        <el-table-column prop="category_score" label="活动分数"></el-table-column>
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
import { getCategoriesList, deleteCategories } from '@/api/categories'

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
      getCategoriesList().then(res => {
        this.list.data = res
      }).finally(() => {
        this.loading = false
      })
    },
    add () {
      this.$dialog({
        title: '新增分类',
        name: 'Categories',
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
        title: '编辑分类',
        name: 'Categories',
        propsData: {
          type: 2,
          id: item.category_id,
          name: item.category_name,
          score: item.category_score
        },
        methods: {
          done: () => {
            this.getList()
          }
        }
      })
    },
    del (item) {
      deleteCategories(item.category_id).then(res => {
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
