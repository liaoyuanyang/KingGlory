import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './style.css'

Vue.config.productionTip = false

// 引用网络请求文件
import http from './http'
// 将 http 加载到 Vue 原型中，其他地方就可以通过 this.$http 来进行网络请求了
Vue.prototype.$http = http

// 在Vue.mixin里面定义的方法和属性在其他组件中可以直接使用
Vue.mixin({
    computed: {
        // 文件上传请求路径
        uploadUrl() {
            return this.$http.defaults.baseURL + 'upload'
        }
    },
    methods: {
        // 携带token的请求头的方法
        getAuthHeaders() {
            return {
                Authorization: `Bearer ${localStorage.token || ''}`
            }
        }
    }
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')