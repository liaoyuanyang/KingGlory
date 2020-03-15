<template>
  <m-card :icon="icon" :title="title">
    <div class="nav jc-between">
        <div class="nav-item" :class="{active:active === i}"
        v-for="(category,i) in categories" :key="i">
          <div class="nav-link" @click="$refs.list.swiper.slideTo(i)">{{category.name}}</div>
        </div>
      </div>
      <div class="pt-3">
        <swiper ref="list" :options="{autoHeight:true}" @slide-change="()=> active = $refs.list.swiper.realIndex">
          <swiper-slide v-for="(category,i) in categories" :key="i">
            <div v-if="category.newsList">
              <div class="py-2 fs-lg d-flex" v-for="(item,j) in category.newsList" :key="j">
                <span class="text-info">[{{item.categoryName}}]</span>
                <span class="px-2">|</span>
                <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{item.title}}</span>
                <span class="text-grey-1 fs-sm">{{item.createdAt | date}}</span>
              </div>
            </div>
            <div v-if="category.heroList" style="margin:0 -0.5rem;" class="d-flex flex-wrap">
              <div class="p-2 fs-lg text-center"
              style="width:20%;"
               v-for="(item,j) in category.heroList"
               :key="j">
                 <img :src="item.avatar" class="w-100" alt="">
                 <div>{{item.name}}</div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
  </m-card>
</template>

<script>
import dayjs from 'dayjs'
export default {
  filters:{
    date(val){
      return dayjs(val).format('MM/DD')
    }
  },
  data(){
    return {
      active:0
    }
  },
  props:{
    title:{type:String,required:true},
    icon:{type:String,required:true},
    categories:{type:Array,required:true},
  }
}
</script>

<style>

</style>