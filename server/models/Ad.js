/**
 * 广告位数据模型
 */
const mongoose = require('mongoose')

// 创建广告位集合规则
const adSchema = new mongoose.Schema({
    // 广告位名称
    name: { type: String },
    // 广告位内容
    items: [{
        image: { type: String },
        url: { type: String },
    }]
})

// 创建广告位集合
const Ad = mongoose.model('Ad', adSchema)

module.exports = Ad