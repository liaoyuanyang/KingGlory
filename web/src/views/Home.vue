<template>
  <div class="home">

    <!-- swiper -->
    <swiper :options="swiperOption" loop="true" ref="mySwiper">
      <swiper-slide><img class="w-100" src="../assets/images/swiper_home_1.jpeg" alt=""></swiper-slide>
      <swiper-slide><img class="w-100" src="../assets/images/swiper_home_2.jpeg" alt=""></swiper-slide>
      <swiper-slide><img class="w-100" src="../assets/images/swiper_home_3.jpeg" alt=""></swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->

    <!-- nav icons -->
    <div class="nav-icons bg-white mt-3 pt-3 text-dark-1 fs-sm text-center">
      <div class="d-flex flex-wrap text-center">
        <div class="nav-item mb-3" v-for="(item,index) in spritesText">
          <i class="sprite" :class="sprites[index]"></i>
          <div class="py-2">{{item}}</div>
        </div>
      </div>
      <div class="bg-ligtht py-2 fs-sm jc-center">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->

    <!-- card -->
    <m-list-card icon="Menu" title="新闻资讯" :categories="newsCates">
       <!--  <div class="py-2 fs-lg d-flex" v-for="(news,i) in newsCates.newsList" :key="i">
        <span>[{{news.categoryName}}]</span>
        <span>|</span>
        <span class="flex-1">{{news.title}}</span>
        <span>{{news.createdAt}}</span>
      </div> -->
    </m-list-card>

    <m-card icon="Menu" title="英雄列表"></m-card>
    <m-card icon="Menu" title="精彩视频"></m-card>
    <m-card icon="Menu" title="图文攻略"></m-card>
  </div>
</template>

<script>

export default {
  data(){
    return{
      swiperOption:{
        pagination:{
          el:".pagination-home"
        },
        //自动轮播
        autoplay: {
          delay: 3000,
          //当用户滑动图片后继续自动轮播
          disableOnInteraction: false,
        },
        //开启循环模式
        loop: true
      },
      sprites:['sprite1','sprite2','sprite3','sprite4','sprite5','sprite6','sprite7','sprite8','sprite9'],
      spritesText:['爆料站','故事站','周边商城','体验服','新人专区','荣耀·传承','模拟战资料库','王者营地','公众号'],
      /* newsCates:[
        {
          name:'热门',
          newsList:new Array(5).fill(1).map(v=>({
            categoryName:'公告',
              title:'3月13日全服不停机更新公告',
              date:'03/12'
          }))
        },
        {
          name:'新闻',
          newsList:new Array(5).fill(1).map(v=>({
            categoryName:'公告',
              title:'【英雄修炼】活动问题修复及优化补偿方案公告',
              date:'03/11'
          }))
        },
        {
          name:'公告',
          newsList:new Array(5).fill(1).map(v=>({
            categoryName:'公告',
              title:'3月10日全服不停机更新公告',
              date:'03/10'
          }))
        },
        {
          name:'活动',
          newsList:new Array(5).fill(1).map(v=>({
            categoryName:'公告',
              title:'白色情人节 浪漫好礼来袭',
              date:'03/10'
          }))
        },
        {
          name:'赛事',
          newsList:new Array(5).fill(1).map(v=>({
            categoryName:'公告',
              title:'3月13日全服不停机更新公告',
              date:'03/12'
          }))
        },
      ], */
      newsCates:[]
    }
  },
  methods:{
    async fetchNewsCates(){
      const res = await this.$http.get('news/list')
      this.newsCates = res.data
      console.log(this.newsCates)
    }
  },
  created(){
    this.fetchNewsCates()
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/variables';
  .pagination-home{
    .swiper-pagination-bullet{
      opacity: 1;
      border-radius: 0.1538rem;
      background: map-get($map: $colors, $key: 'white');
      &.swiper-pagination-bullet-active{
      background: map-get($map: $colors, $key: 'info');
      }
    }
  }

  .nav-icons{
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    .nav-item{
      width: 25%;
      border-right: 1px solid $border-color;
      &:nth-child(4n){
        border-right: none;
      }
    }
  }
</style>
