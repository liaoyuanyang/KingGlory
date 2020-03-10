import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

Vue.config.productionTip = false

// 引用网络请求文件
import http from './http'
// 将 http 加载到 Vue 原型中，其他地方就可以通过 this.$http 来进行网络请求了
Vue.prototype.$http = http

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')