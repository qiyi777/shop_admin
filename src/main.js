// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 导入路由
import router from './router'
// 导入elementUI
import ElementUI from 'element-ui'
// 导入elementUI的样式
import 'element-ui/lib/theme-chalk/index.css'
// 配置HTTP请求地址
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 添加数据到Vue原型中
Vue.prototype.$http = axios
// /配置设置请求拦截器
axios.interceptors.request.use(
  config => {
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  error => {
    // 配置错误处理
    return Promise.reject(error)
  }
)
// 配置响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.meta.status === 403) {
      console.log('错误,您无权访问')
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
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
