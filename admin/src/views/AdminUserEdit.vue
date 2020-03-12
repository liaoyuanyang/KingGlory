<template>
  <div class="about">
    <!-- 有 id 说明是编辑管理员页面，无 id 说明是 新建管理员页面 -->
    <h1>{{id ? "编辑" : "新建"}}管理员</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="text" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props:{
    id:{} // 这里的 id 相当于：this.$route.params.id
  },
  data(){
    return {
      // 管理员详情数据
      model:{},
    }
  },
  methods:{
    // 保存管理员数据的方法
    async save(){
      let res
      // 如果有 id，说明是要修改管理员
      if(this.id){
        res = await this.$http.put(`rest/admin_users/${this.id}`,this.model)
      }
      // 如果没有 id，说明是要新建管理员
      else{
        res = await this.$http.post('rest/admin_users',this.model)
      }
      this.$router.push('/admin_users/list')
      this.$message({
        type:'success',
        message:'保存成功'
      })
    },
    // 获取某一个管理员详情信息的方法
    async fetch(){
      const res = await this.$http.get(`/rest/admin_users/${this.id}`)
      this.model = res.data
    },
  },
  created(){
    this.id && this.fetch() // 有 id 才执行 fetch() 获取数据
  }
}
</script>
