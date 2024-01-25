import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui'
import './assets/iconfont/iconfont.css'
import store from './store';
import router from './router'//引入router from './router
//引入cookie
import Cookie from 'js-cookie';

Vue.config.productionTip = false
Vue.use(ElementUI)
router.beforeEach((to, from, next) => {
  const token = Cookie.get('token')
  const isVisitor = store.state.user.isVisitor || Cookie.get('identity')
  if(!token && !isVisitor && to.name !== 'login'){
    //token不存在，当前未登录，跳转到登录页面
    next({name:'login'})
  }else if(token && to.name === 'login'){
    //存在token，跳转至首页
    next({name:'home'})
  }else{
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
