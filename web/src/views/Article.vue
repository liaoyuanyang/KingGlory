<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 ai-center border-bottom">
      <div class="iconfont icon-back text-info-title"></div>
      <strong class="flex-1 pr-1 text-ellipsis text-info-title">{{model.title}}</strong>
      <div class="text-grey fs-xs">2020-03-12</div>
    </div>
    <div v-html="model.body" class="px-3 fs-xl body"></div>
    <div class="px-3 border-top py-3">
      <div class="d-flex">
        <i class="iconfont icon-guanlian"></i>
        <strong class="text-info-title fs-lg ml-2">相关资讯</strong>
      </div>
      <div class="pt-2">
        <router-link
          class="py-1 d-flex ai-center"
          tag="div" 
          v-for="item in model.related" 
          :key="item._id"
          :to="`/articles/${item._id}`"
          >
          <div class="text-ellipsis flex-1">{{item.title}}</div>
          <div class="text-grey">2020-03-12</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    id:{required:true}
  },
  data(){
    return{
      model:null
    }
  },
  watch:{
    // id:'fetch',
    /* id(){
      this.fetch()
    } */
  },
  methods:{
    async fetch(){
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data
    }
  },
  created(){
    this.fetch()
  }
}
</script>

<style lang="scss">
  .page-article {
    .icon-back {
      font-size: 1.6923rem;
    }
    .body {
      img {
        max-width: 100%;
        height: auto;
      }
      iframe {
        width: 100;
        height: auto;
      }
    }
  }
</style>