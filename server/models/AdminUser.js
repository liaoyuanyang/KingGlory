/**
 * 管理员数据模型
 */
const mongoose = require('mongoose')

// 创建管理员集合规则
const schema = new mongoose.Schema({
    // 管理员名称
    username: { type: String },
    // 管理员密码
    password: {
        type: String,
        select: false, // 让密码默认不被查出来
        // 将传进来的密码散列加密（使用bcrypt）
        set(val) {
            return require('bcrypt').hashSync(val, 10)
        }
    }
})


module.exports = mongoose.model('AdminUser', schema)