<template>
  <div class="home">
    <!-- 轮播图 -->
    <swiper :options="swiperOption" loop="true" ref="mySwiper">
      <swiper-slide><img class="w-100" src="../assets/images/swiper_home_1.jpeg" alt=""></swiper-slide>
      <swiper-slide><img class="w-100" src="../assets/images/swiper_home_2.jpeg" alt=""></swiper-slide>
      <swiper-slide><img class="w-100" src="../assets/images/swiper_home_3.jpeg" alt=""></swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- 快速入口 -->
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
      sprites:['sprite1','sprite2','sprite3','sprite4','sprite5',
      'sprite6','sprite7','sprite8','sprite9'],
      spritesText:[
        '爆料站','故事站','周边商城','体验服','新人专区',
        '荣耀·传承','模拟战资料库','王者营地','公众号',]
    }
  },
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
