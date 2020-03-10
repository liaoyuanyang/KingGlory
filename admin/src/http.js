/**
 * 网络请求文件
 */

import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api/'
})

export default http