// 导入Vue
import Vue from 'vue'
// 导入路由
import Router from 'vue-router'
// 导入创建好的单文件组件
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
// 导入css
import '@/assets/css/index.css'
// 将路由经过use注册到Vue中
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  // 如果是login则直接就在login页
  if (to.path === '/login') {
    return next()
  }
  // 查看是否有token
  const token = localStorage.getItem('token')
  // 判断是否有token
  if (token) {
    // 直接跳转到要去的页面
    next()
  } else {
    // 否则就是没登录  直接跳转到登录页
    next('/login')
  }
})
// 导出router
export default router
