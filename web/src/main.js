import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 轮播图模块
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */ )

// 全局scss样式
import './assets/scss/style.scss'

// 字体图标
import './assets/iconfont/iconfont.css'

// Cart
import Card from './components/Card.vue'
Vue.component('m-cart', Card)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')