<template>
  <div class="home">
    <swiper :options="swiperOption" loop="true" ref="mySwiper">
      <swiper-slide><img class="w-100" src="../assets/images/swiper_home_1.jpeg" alt=""></swiper-slide>
      <swiper-slide><img class="w-100" src="../assets/images/swiper_home_2.jpeg" alt=""></swiper-slide>
      <swiper-slide><img class="w-100" src="../assets/images/swiper_home_3.jpeg" alt=""></swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
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
      }
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
</style>
