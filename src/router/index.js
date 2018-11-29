// 导入Vue
import Vue from 'vue'
// 导入路由
import Router from 'vue-router'
// 导入创建好的单文件组件
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
// 将路由经过use注册到Vue中
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})
// 导出router
export default router
