/**
 * 分类数据模型
 */
const mongoose = require('mongoose')

// 创建分类集合规则
const itemSchema = new mongoose.Schema({
    // 分类名称
    name: { type: String },
    icon: { type: String }
})

// 创建分类结合
const Item = mongoose.model('Item', itemSchema)

module.exports = Item