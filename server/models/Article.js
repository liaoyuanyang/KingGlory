/**
 * 文章数据模型
 */
const mongoose = require('mongoose')

// 创建文章集合规则
const articleSchema = new mongoose.Schema({
    // 分类
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    // 文章名称
    title: { type: String },
    // 文章内容
    body: { type: String },
}, {
    // 时间戳(会自动生成创建时间和更新时间)
    timestamps: true
})

// 创建文章结合
const Article = mongoose.model('Article', articleSchema)

module.exports = Article