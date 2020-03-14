/**
 * 数据库连接文件
 */
module.exports = app => {
    const mongoose = require('mongoose')

    mongoose.connect('mongodb://localhost:27017/KingGlory', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }).then(() => console.log('数据库连接成功...'))
        .catch(err => console.log('数据库连接失败...'))

    // 使用require-all模块一次性将models中的所有文件引入
    require('require-all')(__dirname + '/../models')
}