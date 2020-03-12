<template>
  <div class="about">
    <!-- 有 id 说明是编辑广告位页面，无 id 说明是 新建广告位页面 -->
    <h1>{{id ? "编辑" : "新建"}}广告位</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button style="margin-bottom:1rem;" size="small"  @click="model.items.push({})"> <i class="el-icon-plus" ></i> 添加广告</el-button>
        <el-row type="flex" style="flex-wrap:wrap">
          <el-col :md="24" v-for="(item,i) in model.items" :key="i">
            <el-form-item label="跳转链接">
              <el-input v-model="item.url" ></el-input>
            </el-form-item>
              <el-form-item label="图片" style="margin-top:1rem;">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + 'upload'"
                  :show-file-list="false"
                  :on-success="res => $set(item,'image',res.url)">
                  <img v-if="item.image" :src="item.image" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="model.items.splice(i,1)" style="margin-top:1rem;margin-bottom:2rem;">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
      // 广告位详情数据
      model:{
        items:[]
      },
    }
  },
  methods:{
    // 保存广告位数据的方法
    async save(){
      let res
      // 如果有 id，说明是要修改广告位
      if(this.id){
        res = await this.$http.put(`rest/ads/${this.id}`,this.model)
      }
      // 如果没有 id，说明是要新建广告位
      else{
        res = await this.$http.post('rest/ads',this.model)
      }
      this.$router.push('/ads/list')
      this.$message({
        type:'success',
        message:'保存成功'
      })
    },
    // 获取某一个广告位详情信息的方法
    async fetch(){
      const res = await this.$http.get(`/rest/ads/${this.id}`)
      // this.model = res.data
      this.model = Object.assign({},this.model,res.data)
    },
  },
  created(){
    this.id && this.fetch() // 有 id 才执行 fetch() 获取数据
  }
}
</script>
