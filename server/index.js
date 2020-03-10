/**
 * 后端入口文件
 */

const express = require('express')

const app = express()
const path = require('path')
    // 允许跨域请求
    // 跨域支持一定要写在注册路由的前面!!!!!!!!!
app.use(require('cors')())

// 允许处理 post 请求
app.use(express.json())

// 将 uploads 文件夹开放为静态资源
// app.use('/upload', express.static(__dirname + '/uploads'))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// 引入admin的路由方法，将网站实例app作为一个参数传进去
require('./routes/admin')(app)

// 引入连接数据的方法
require('./plugins/db')(app)

app.listen(3000, () => {
    console.log('服务器启动成功...')
})