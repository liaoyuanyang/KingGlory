module.exports = app => {

    // 创建一个路由
    const router = require('express').Router()

    // 引用模型
    const Article = require('../../models/Article')
    const Category = require('../../models/Category')


    // 初始化新闻
    router.get('/news/init', async(req, res) => {
        // 获取新闻分类中的所有子分类
        // lean()表示取纯粹的json或js数据
        const parent = await Category.findOne({ name: '新闻分类' })
        const cates = await Category.find().where({ parent: parent }).lean()

        // 获取王者荣耀网站中新闻资讯的一些标题数据
        // 可以在浏览器中通过js语法获取：$$('.news_list .title').map(el=>el.innerHTML).splice(5)
        const newsTitles = ["体验服爆料丨拒绝被抢野，loading能打气，峡谷调整抢先知", "全新限时活动玩法【万镜觉醒】3.13开启，五倍快乐等你来~", "王者音乐课：五岳山河志", "【虎牙大腿杯S3】玩法升级，火热开战！", "体验服爆料丨全新玩法万镜觉醒，爽快翻5倍！", "3月13日体验服不停机更新公告", "【体验服】王者模拟战模式暂时关闭调优公告", "3月13日体验服停机更新公告", "心愿单功能异常说明", "3月13日全服不停机更新公告", "白色情人节【玫瑰芬芳，纸短情长】活动公告", "白色情人节 浪漫好礼来袭", "峡谷女神节 福利大集结", "【稷下修学游】活动公告", "伽罗星元上新 多重福利来袭", "王者荣耀国际巡回赛（KPLGT）2020年春季赛开赛时间公告", "2020年KPL春季赛大名单公布", "2020年KPL春季赛“云开赛”在即 全新视觉与六大城市主场来袭！", "高校联赛女神挑战赛周末开赛啦！来看高颜值组合强强联手", "你和那个TA会是峡谷校园最佳CP吗？高校联赛白色情人节开启CP大作战！"]

        // 遍历将获取到的标题数据存放到对象中
        const newsList = newsTitles.map(title => {
            // 将新闻子分类随机打乱
            const randomCates = cates.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                categories: randomCates.slice(0, 2), // 随机取出两条新闻子分类
                title: title
            }
        })

        /* await Article.deleteMany({}) // 清空原有文章
        await Article.insertMany(newsList) // 插入文章 */

        res.send(newsList)
    })

    // 获取新闻分类及其子分类
    router.get('/news/list', async(req, res) => {
        /* const parent = await Category.findOne({
            name: '新闻分类'
        }).populate({
            path: 'children',
            populate: {
                path: 'newsList'
            }
        }).lean()
        res.send(parent) */

        // 聚合查询
        const parent = await Category.findOne({ name: '新闻分类' })
        const cates = await Category.aggregate([
            // 查出新闻子分类:$match
            {
                $match: { parent: parent._id }
            },
            // 关联查出各个子分类对应的文章列表:$lookup
            {
                $lookup: {
                    from: 'articles', // 要关联查询哪个表
                    localField: '_id', // 用自己的哪个字段关联
                    foreignField: 'categories', // 关联表的字段
                    as: 'newsList' // 查到数据的名称
                }
            },
            // 修改newsList字段，显示前五条
            {
                $addFields: {
                    newsList: { $slice: ['$newsList', 5] }
                }
            }
        ])

        // 在最前面加上 热门 分类
        const subCates = cates.map(v => v._id)
        cates.unshift({
            name: '热门',
            newsList: await Article.find().where({
                categories: { $in: subCates }
            }).populate('categories').limit(5).lean()
        })

        // 为每个子分类{添加一个分类名称
        cates.map(cate => {
            cate.newsList.map(news => {
                news.categoryName = (cate.name === '热门') ? news.categories[0].name : cate.name
                return news
            })
            return cate
        })


        res.send(cates)
    })



    // 将router挂载到app上
    app.use('/web/api', router)
}