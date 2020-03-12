<template>
  <div class="about">
    <!-- 有 id 说明是编辑文章页面，无 id 说明是 新建文章页面 -->
    <h1>{{id ? "编辑" : "新建"}}文章</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option  v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <vue-editor v-model="model.body"
          useCustomImageHandler 
          @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";  // 富文本编辑器

export default {
  components: {
    VueEditor
  },
  props:{
    id:{} // 这里的 id 相当于：this.$route.params.id
  },
  data(){
    return {
      // 文章详情数据
      model:{},
      // 文章分类
      categories:[]
    }
  },
  methods:{
    // 保存文章数据的方法
    async save(){
      let res
      // 如果有 id，说明是要修改文章
      if(this.id){
        res = await this.$http.put(`rest/articles/${this.id}`,this.model)
      }
      // 如果没有 id，说明是要新建文章
      else{
        res = await this.$http.post('rest/articles',this.model)
      }
      this.$router.push('/articles/list')
      this.$message({
        type:'success',
        message:'保存成功'
      })
    },
    // 获取某一个文章详情信息的方法
    async fetch(){
      const res = await this.$http.get(`/rest/articles/${this.id}`)
      this.model = res.data
    },
    // 获取文章分类的方法
    async fetchCategories(){
      const res = await this.$http.get('/rest/categories')
      this.categories = res.data
    },
    // 富文本编辑器中上传图片的方法
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post('upload',formData)
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    }
  },
  created(){
    this.fetchCategories()
    this.id && this.fetch() // 有 id 才执行 fetch() 获取数据
  }
}
</script>
