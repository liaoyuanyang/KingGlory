import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

Vue.use(VueRouter)

const routes = [{
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
    ]
}, ]

const router = new VueRouter({
    routes
})

export default router