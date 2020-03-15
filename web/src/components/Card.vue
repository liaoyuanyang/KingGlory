<template>
  <div class="card p-3 bg-white mt-3">
      <div class="card-header pb-3 d-flex ai-center" 
      :class="{'border-bottom':!plain,'pb-3':!plain}">
        <i class="iconfont" :class="`icon-${icon}`"></i>
        <div class="fs-xl flex-1 px-2"><strong>{{title}}</strong></div>
        <i v-if="!plain" class="iconfont icon-more2"></i>
      </div>
      <div class="card-body pt-3">
        <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
  props:{
    title:{
      type:String,
      required:true
    },
    icon:{
      type:String,
      required:true
    },
    plain:{type:Boolean}
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/variables';
  .card {
    border-bottom: 1px solid $border-color;
    /* .card-header {
      border-bottom: 1px solid $border-color;
    } */
  }
</style>