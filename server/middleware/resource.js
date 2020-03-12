/**
 * 获取模型中间件
 * 可以将客户端传来的集合名称转为单数且首字母大写形式
 */
module.exports = options => {
    return async(req, res, next) => {
        // inflection 模块用来处理类名，如单复数转换、大小写转换等
        const modelName = require('inflection').classify(req.params.resource)
            // 将集合名挂载到 req 上，后续就可以通过 req.Model 访问了
        req.Model = require(`../models/${modelName}`)
        next()
    }
}