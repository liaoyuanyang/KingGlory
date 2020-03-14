/**
 * 分类数据模型
 */
const mongoose = require('mongoose')

// 创建分类集合规则
const schema = new mongoose.Schema({
    // 分类名称
    name: { type: String, },
    // 父级分类
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})

// 虚拟属性（可以get,set他们但是不持续化到MongoDB）
// 子分类
schema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Category'
})

// 文章分类
schema.virtual('newsList', {
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Article'
})

// 创建分类结合
const Category = mongoose.model('Category', schema)

module.exports = Category