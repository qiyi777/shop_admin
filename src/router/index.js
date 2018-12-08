// 导入Vue
import Vue from 'vue'
// 导入路由
import Router from 'vue-router'
// 可以对组件进行按需加载

// 导入创建好的单文件组件
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
// 导入css
import '@/assets/css/index.css'
// 导入组件users
import Users from '@/components/users/Users'
// 导入rights组件
import Rights from '@/components/rights/Rights'
// 导入Roles组件
import Roles from '@/components/roles/Roles.vue'
// 导入goods组件
import Goods from '@/components/Goods/Goods.vue'
// 导入goods-add组件
import GoodsAdd from '@/components/goods-add/GoodsAdd.vue'
// 将路由经过use注册到Vue中
// 导入组件category
import Categories from '@/components/categories/Categories'
// 导入当输入错误跳转页面的组件
import Notfound from '@/components/notfond/Notfound'
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/users', component: Users },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
        { path: '/categories', component: Categories },
        { path: '/goods/:page?', component: Goods },
        { path: '/goods-add', component: GoodsAdd }
      ]
    },
    // 当输入的页面不存在 处理
    { path: '*', component: Notfound }
  ]
})

// 导航守卫
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
