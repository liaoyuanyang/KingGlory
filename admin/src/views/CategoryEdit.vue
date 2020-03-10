<template>
  <div class="about">
    <!-- 有 id 说明是编辑分类页面，无 id 说明是 新建分类页面 -->
    <h1>{{id ? "编辑" : "新建"}}分类</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option  v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
      // 分类详情数据
      model:{},
      // 分类列表
      parents:[]
    }
  },
  methods:{
    // 保存分类数据的方法
    async save(){
      let res
      // 如果有 id，说明是要修改分类
      if(this.id){
        res = await this.$http.put(`rest/categories/${this.id}`,this.model)
      }
      // 如果没有 id，说明是要新建分类
      else{
        res = await this.$http.post('rest/categories',this.model)
      }
      this.$router.push('/categories/list')
      this.$message({
        type:'success',
        message:'保存成功'
      })
    },
    // 获取某一个分类详情信息的方法
    async fetch(){
      const res = await this.$http.get(`/rest/categories/${this.id}`)
      this.model = res.data
    },
    // 获取分类列表的方法
    async fetchParents(){
      const res = await this.$http.get('/rest/categories')
      this.parents = res.data
    }
  },
  created(){
    this.fetchParents()
    this.id && this.fetch() // 有 id 才执行 fetch() 获取数据
  }
}
</script>
