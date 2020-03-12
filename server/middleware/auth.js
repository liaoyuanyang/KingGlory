/**
 * 登录校验中间件
 */

module.exports = options => {
    const assert = require('http-assert') // 判断状态的模块
    const jwt = require('jsonwebtoken') // 加密生成token的模块
    const AdminUser = require('../models/AdminUser') // 引入管理员用户数据模型
    return async(req, res, next) => {
        // 获取客户端传来的token
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登录')
            // 解密验证token,获取token中的用户id
        const { id } = jwt.verify(token, req.app.get('serect'))
        assert(id, 401, '请先登录')
            // 通过获取的用户id找到用户,并挂载到req上，方便后面的调用
        req.user = await AdminUser.findById(id)
        assert(req.user, 401, '请先登录')
        await next()
    }
}