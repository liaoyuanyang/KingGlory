<template>
  <div>
    <h1>文章列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="small" 
            @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      items:[]
    }
  },
  methods:{
    // 获取文章列表的方法
    async fetch(){
      const res = await this.$http.get('rest/articles')
      this.items = res.data
    },
    // 删除文章的方法
    async remove(row){
      // 提示是否要删除
      this.$confirm(`确认要删除文章“${row.title}”吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          // 如果确认要删除,发起一个删除的网络请求
          const res = await this.$http.delete(`rest/articles/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 删除后重新获取数据，刷新页面
          this.fetch()
        })
        // 如果不删除
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
  created(){
    this.fetch()
  }
}
</script>