/**
 * CRUD通用接口
 * 所有的路径都动态写入，这样可以实现一套接口对应多个请求
 */

module.exports = app => {
    const express = require('express')

    // 创建一个 router 子路由，对 admin 进行 CRUD 操作
    const router = express.Router({
        // 表示可以将父级的路径参数合并到子级中
        mergeParams: true
    })

    // 新建分类
    router.post('/', async(req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    // 修改分类
    router.put('/:id', async(req, res) => {
        await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 删除分类
    router.delete('/:id', async(req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id)
        res.send(model)
    })

    // 获取分类列表
    router.get('/', async(req, res) => {
        // populate：可以取出关联的数据，limit：限制条数
        // const items = await req.Model.find().populate('parent').limit(10)

        // 将连接查询的参数转为动态
        const queryOptions = {}
            // 如何要查询的集合是 Category，则需要连接查询
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })

    // 获取某一分类详情信息
    router.get('/:id', async(req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })


    /**
     * 将子路由 router 挂载到 app 中
     * /admin/api/rest/:resource 为响应路径的前缀
     * :resource 为动态参数，根据客户端请求发生变化
     * 第二个参数是一个中间件，可以将客户端传来的集合名称转为单数且首子母大写形式
     */
    app.use('/admin/api/rest/:resource', async(req, res, next) => {
        // inflection 模块用来处理类名，如单复数转换、大小写转换等
        const modelName = require('inflection').classify(req.params.resource)

        // 将集合名挂载到 req 上，后续就可以通过 req.Model 访问了
        req.Model = require(`../../models/${modelName}`)
        next()
    }, router)

    /**
     * 文件上传
     * 由于 express 默认不能接收文件的上传，
     * 所以需要一个专门处理文件上传的中间件 multer
     */
    const multer = require('multer')

    // 指定要上传的路径
    // const upload = multer({ dest: __dirname + '../../uploads' })
    const upload = multer({ dest: require('path').join(__dirname, '../../uploads') })

    // single 表示上传单个文件，'file'是前端传来的文件名
    app.post('/admin/api/upload', upload.single('file'), async(req, res) => {
        const file = req.file

        // 拼接一个完整的 url 作为文件属性返回给前端
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
}