import {createApp} from 'vue'
import App from './App.vue'
import router from './routers' // 注册路由
import {store} from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
createApp(App).use(router).use(store).use(ElementPlus).mount('#app')