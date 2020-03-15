<template>
  <div class="about">
    <!-- 有 id 说明是编辑英雄页面，无 id 说明是 新建英雄页面 -->
    <h1>{{id ? "编辑" : "新建"}}英雄</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="baseInfo">
        <!-- 基础信息 -->
        <el-tab-pane label="基础信息" name="baseInfo">
          <!-- 名称 -->
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <!-- 称号 -->
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <!-- 头像 -->
          <el-form-item label="头像">
            <!-- action 表示要将图片上传到哪个接口，接口保存后图片后，
            会返回一个图片的 URL 地址，前端拿到地址后将图片展示出来
            on-success 表示成功之后的操作 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers = "getAuthHeaders()"
              :show-file-list="false"
              :on-success="res => $set(model,'avatar',res.url)">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 海报 -->
          <el-form-item label="海报">
            <!-- action 表示要将图片上传到哪个接口，接口保存后图片后，
            会返回一个图片的 URL 地址，前端拿到地址后将图片展示出来
            on-success 表示成功之后的操作 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers = "getAuthHeaders()"
              :show-file-list="false"
              :on-success="res => $set(model,'banner',res.url)">
              <img v-if="model.banner" :src="model.banner" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 类型 -->
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <!-- 难度 -->
          <el-form-item label="难度">
            <el-rate :max="9" 
              show-score
              style="margin-top:0.75rem;" 
              v-model="model.scores.difficult"></el-rate>
          </el-form-item>
          <!-- 技能 -->
          <el-form-item label="技能">
            <el-rate :max="9" 
              show-score
              style="margin-top:0.75rem;" 
              v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <!-- 攻击 -->
          <el-form-item label="攻击">
            <el-rate :max="9" 
              show-score
              style="margin-top:0.75rem;" 
              v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <!-- 生存 -->
          <el-form-item label="生存">
            <el-rate :max="9" 
              show-score
              style="margin-top:0.75rem;" 
              v-model="model.scores.survice"></el-rate>
          </el-form-item>
          <!-- 顺风出装 -->
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items"
                :key="item._id"
                :label="item.name"
                :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <!-- 逆风出装 -->
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items"
                :key="item._id"
                :label="item.name"
                :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <!-- 使用技巧 -->
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <!-- 对抗技巧 -->
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <!-- 团战思路 -->
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <!-- 技能 -->
        <el-tab-pane label='技能' name="skills">
          <el-button style="margin-bottom:1rem;" size="small"  @click="model.skills.push({})"> <i class="el-icon-plus" ></i> 添加技能</el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
              <el-form-item label="名称"  style="margin-top:1rem;">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
               <el-form-item label="图标">
                 <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :headers = "getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="res => $set(item,'icon',res.url)">
                    <img v-if="item.icon" :src="item.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
              </el-form-item>
              <el-form-item label="冷却值"  style="margin-top:1rem;">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗"  style="margin-top:1rem;">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="model.skills.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- 最佳搭档 -->
        <el-tab-pane label='最佳搭档' name="partners">
          <el-button style="margin-bottom:1rem;" size="small"  @click="model.partners.push({})"> 
            <i class="el-icon-plus" ></i> 添加英雄
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item,i) in model.partners" :key="i">
              <el-form-item label="英雄"  style="margin-top:1rem;">
                <el-select v-model="item.hero" filterable>
                  <el-option v-for="hero in heroes" 
                  :value="hero._id"
                  :label="hero.name"
                  :key="hero._id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="model.partners.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      
      <el-form-item>
        <el-button style="margin-top:1rem;" type="primary" native-type="submit">保存</el-button>
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
      // 英雄详情数据
      model:{
        name:'',
        avatar:'',
        scores:{
          difficult:0
        },
        skills:[],
        partners:[]
      },
      // 英雄分类数据
      categories:[],
      // 物品分类数据
      items:[],
      heroes:[]
    }
  },
  methods:{
    // 将服务器返回的 url 绑定到 model 上
    /* async afterUpload(res){
      this.model.avatar = res.url 
    }, */
    // 保存英雄数据的方法
    async save(){
      let res
      // 如果有 id，说明是要修改英雄
      if(this.id){
        res = await this.$http.put(`rest/heroes/${this.id}`,this.model)
      }
      // 如果没有 id，说明是要新建英雄
      else{
        res = await this.$http.post('rest/heroes',this.model)
      }
      // this.$router.push('/heroes/list')
      this.$router.go(0); // 保存后自动刷新页面
      this.$message({
        type:'success',
        message:'保存成功'
      })
    },
    // 获取某一个英雄详情信息的方法
    async fetch(){
      const res = await this.$http.get(`rest/heroes/${this.id}`)
      // this.model = res.data  // 这种方式会覆盖原有数据
      // 使用 Object.assign() 方法将数据拼接，避免覆盖
      this.model = Object.assign({},this.model,res.data)
    },
    // 获取英雄分类的方法
    async fetchCategories(){
      const res = await this.$http.get(`rest/categories/`)
      this.categories = res.data
    },
    // 获取物品分类的方法
    async fetchItems(){
      const res = await this.$http.get(`rest/items/`)
      this.items = res.data
    },
    async fetchHeroes(){
      const res = await this.$http.get(`rest/heroes/`)
      this.heroes = res.data
    }
  },
  created(){
    this.fetchHeroes()
    this.fetchItems()
    this.fetchCategories()
    this.id && this.fetch() // 有 id 才执行 fetch() 获取数据
  }
}
</script>

<style>
  
</style>