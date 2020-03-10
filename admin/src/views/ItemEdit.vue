<template>
  <div class="about">
    <!-- 有 id 说明是编辑物品页面，无 id 说明是 新建物品页面 -->
    <h1>{{id ? "编辑" : "新建"}}物品</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <!-- action 表示要将图片上传到哪个接口，接口保存后图片后，
        会返回一个图片的 URL 地址，前端拿到地址后将图片展示出来
        on-success 表示成功之后的操作 -->
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + 'upload'"
          :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
    // 将服务器返回的 url 绑定到 model 上
    async afterUpload(res){
      // 由于 model 原先并没有内容，所以不能显示的直接赋值
      // this.model.icon = res.url 
      // 这时，要么给 data 中的 model 设置一些空值的属性，要么使用 set 方法
      this.$set(this.model,'icon',res.url)
    },
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

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

