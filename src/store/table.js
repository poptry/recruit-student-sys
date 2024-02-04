import Cookie from "js-cookie"
export default {
    namespaced:true,
    state:{
        loading:false,
        menu:[]//动态路由
    },
    getters:{
    },
    actions:{
    },
    mutations:{
        isLoading(state,status){
            state.loading = status
        },
        //设置menu的数据
        setMenu(state,val){
            state.menu = val
            Cookie.set('menu',JSON.stringify(val))
        },
        //动态注册路由
        addMenu(state,router){
            //判断当前缓存中是否有数据
            if(!Cookie.get('menu') || Cookie.get('identity'))return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            //组装动态路由的数据
            const menuArray = []
            menu.forEach(item => {
                item.component = () =>import(`../views/${item.url}`)
                menuArray.push(item)
            })
            //路由的动态添加
            menuArray.forEach(element => {
                router.addRoute('personal',element)
            });
        }
    }
}