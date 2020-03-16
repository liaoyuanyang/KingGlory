/**
 * 网络请求文件
 */

import axios from 'axios'
import Vue from 'vue'
import router from './router/index'
const http = axios.create({
    // baseURL: 'http://localhost:3000/admin/api/'
    baseURL: process.env.VUE_APP_API_URL || '/admin/api'
})

// 给请求添加token请求头的拦截器
// 当客户端发生请求时，所有的请求都会被拦截，然后加上一个带token的请求头
http.interceptors.request.use(config => {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config
}, err => {
    return Promise.reject(err)
})

// 给响应添加全局错误处理拦截器
// 当发生错误时，所有来自服务器的错误提示都会在这里被拦截
http.interceptors.response.use(res => {
    return res
}, err => {
    // 服务器返回的错误信息提示
    // console.log(err.response.data.message)
    // 当message中有内容时，在前端利用element弹出
    if (err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })
    }
    // 当错误码为401时，跳转到登录页面
    if (err.response.status === 401) {
        router.push('/login')
    }

    return Promise.reject(err)
})

export default http