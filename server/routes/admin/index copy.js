/**
 * 原始的 admin 的路由文件，作为备份
 * 该文件导出一个方法，需要调用者传进来一个 app 参数
 * 这个参数是一个网站服务器实例
 * 这样，在该文件中就可以使用 app 实例了
 */

module.exports = app => {
    const express = require('express')

    // 创建一个 router 子路由，对 admin 进行 CRUD 操作
    const router = express.Router()

    // 引入分类数据集合
    const Category = require('../../models/Category')

    // 新建分类
    router.post('/categories', async(req, res) => {
        const model = await Category.create(req.body)
        console.log(req.body)
        console.log(model)
        res.send(model)
    })

    // 修改分类
    router.put('/categories/:id', async(req, res) => {
        await Category.findByIdAndUpdate(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 删除分类
    router.delete('/categories/:id', async(req, res) => {
        const model = await Category.findByIdAndDelete(req.params.id)
        res.send(model)
    })

    // 获取分类列表
    router.get('/categories', async(req, res) => {
        // populate 可以取出关联的数据
        // limit 限制条数
        const items = await Category.find().populate('parent').limit(10)
        res.send(items)
    })

    // 获取某一分类详情信息
    router.get('/categories/:id', async(req, res) => {
        const model = await Category.findById(req.params.id)
        res.send(model)
    })



    // 将子路由 router 挂载到 app 中
    // /admin/api 为响应路径的前缀
    app.use('/admin/api', router)
}