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
}