// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 导入路由
import router from './router'
// 导入elementUI
import ElementUI from 'element-ui'
// 导入样式
import 'element-ui/lib/theme-chalk/index.css'
// 安装在Vue中
Vue.use(ElementUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 导入路由规则
  router
})
