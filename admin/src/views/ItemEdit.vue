<template>
  <div class="about">
    <!-- 有 id 说明是编辑物品页面，无 id 说明是 新建物品页面 -->
    <h1>{{id ? "编辑" : "新建"}}物品</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="model.icon"></el-input>
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
      // 物品详情数据
      model:{},
    }
  },
  methods:{
    // 保存物品数据的方法
    async save(){
      let res
      // 如果有 id，说明是要修改物品
      if(this.id){
        res = await this.$http.put(`rest/items/${this.id}`,this.model)
      }
      // 如果没有 id，说明是要新建物品
      else{
        res = await this.$http.post('rest/items',this.model)
      }
      this.$router.push('/items/list')
      this.$message({
        type:'success',
        message:'保存成功'
      })
    },
    // 获取某一个物品详情信息的方法
    async fetch(){
      const res = await this.$http.get(`rest/items/${this.id}`)
      this.model = res.data
    }
  },
  created(){
    this.id && this.fetch() // 有 id 才执行 fetch() 获取数据
  }
}
</script>
