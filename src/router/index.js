import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//导入路由组件
import Login from '@/views/Login'
import Main from '@/views/Main'
import Home from '@/views/Home'
import Personal from '@/views/Personal'
import UserManage from '@/views/UserManage'
import DetailContent from '@/views/DetailContent'
import CollectManage from '@/views/CollectManage'
//组件和路由映射
const routes = [
    {path:'/login',component:Login,name:'login'},
    {
        path: '/',
        component: Main,
        name:'Main',
        redirect: '/home',//重定向
        children: [
            {path:'home',component:Home,name:'home'},
            {
                path:'personal',
                component:Personal,
                children:[
                    {path:'/',redirect:'userManage'},//我的信息
                    {path:'userManage',component:UserManage,name:'userManage'},
                    {path:'collectManage',component:CollectManage,name:'collectManage'},
                ]
            },
            {path:'detailContent',component:DetailContent,name:'detailContent'},

        ]
      },
]
//创建router实例，传routes配置
const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
    }
})
export default router