/**
 * 分类的集合文件
 */
const mongoose = require('mongoose')

// 创建分类集合规则
const categorySchema = mongoose.Schema({
    // 分类名称
    name: {
        type: String,
        // TMD这个父级分类一定要放在外面啊！！！！！！
        /* // 父级分类
        parent: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Category'
        } */
    },
    // 父级分类
    parent: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    }
})

// 创建分类结合
const Category = mongoose.model('Category', categorySchema)

module.exports = Category