import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

// 引入分类的编辑、列表模块
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

// 引入装备的编辑、列表模块
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

// 引入英雄的编辑、列表模块
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

// 引入文章的编辑、列表模块
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

// 引入广告位的编辑、列表模块
import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'

// 引入管理员的编辑、列表模块
import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

// 引入登录界面组件
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
    // 后台管理界面的路由
    {
        path: '/',
        name: 'main',
        component: Main,
        children: [
            // 分类的路由
            { path: '/categories/create', component: CategoryEdit },
            // props:true 表示动态参数 :id 将会被注入 CategoryEdit 组件中
            // 之后只需要在 CategoryEdit 组件中通过 porps 就可以使用了
            { path: '/categories/edit/:id', component: CategoryEdit, props: true },
            { path: '/categories/list', component: CategoryList },

            // 物品的路由
            { path: '/items/create', component: ItemEdit },
            { path: '/items/edit/:id', component: ItemEdit, props: true },
            { path: '/items/list', component: ItemList },

            // 英雄的路由
            { path: '/heroes/create', component: HeroEdit },
            { path: '/heroes/edit/:id', component: HeroEdit, props: true },
            { path: '/heroes/list', component: HeroList },

            // 文章的路由
            { path: '/articles/create', component: ArticleEdit },
            { path: '/articles/edit/:id', component: ArticleEdit, props: true },
            { path: '/articles/list', component: ArticleList },

            // 广告位的路由
            { path: '/ads/create', component: AdEdit },
            { path: '/ads/edit/:id', component: AdEdit, props: true },
            { path: '/ads/list', component: AdList },

            // 管理员的路由
            { path: '/admin_users/create', component: AdminUserEdit },
            { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
            { path: '/admin_users/list', component: AdminUserList },
        ]
    },
    // 登陆界面的路由
    {
        path: '/login',
        component: Login,
        meta: { isPublic: true } // 自定义的一个字段，表示是否可以公开访问
    }
]

const router = new VueRouter({
    routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
    // 如果要访问的路由不是公开的并且没有携带token，就跳转到首页
    if (!to.meta.isPublic && !localStorage.token) {
        return next('/login')
    }
    next()
})

export default router