import { createRouter,createWebHistory } from "vue-router";
const router = createRouter({
    history: createWebHistory('/dc'), // 这里指定基本URL
    routes: [
        {
            path: '/demo',
            name: 'demo',
            component: () => import('@/components/demo.vue')
        },
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/views/home/index.vue')
        }
    ]
})
export default router