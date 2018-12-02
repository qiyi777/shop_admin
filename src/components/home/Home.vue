<template>
  <!-- <h1>这是 Home 组件</h1> -->
  <el-container class="home-el-container">
    <el-header class="home-header">
      <el-row type="flex" justify="space-between" :gutter="20">
        <el-col :span="8">
          <div class="home-grid-content grid-content bg-purple">
            <img src="@/assets/images/logo.png" alt="">
          </div>
        </el-col>
        <el-col :span="8">
          <div class="home-grid-content grid-content bg-purple">
            <h2>电商后台管理系统</h2>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="home-grid-content grid-content bg-purple">
            <p>欢迎上海前端27期星曜会员
              <a href="javascript:;" @click.prevent="withdraw">退出</a>
            </p>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="home-container">
      <el-aside width="200px">
        <el-menu :router="true" default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users">
              <i class="el-icon-menu"></i>
              用户列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>
              角色列表</el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>
              权限列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              商品列表</el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              分类参数</el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-menu"></i>
              商品分类</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>
              订单列表</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>
              数据统计</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 这里应该写出口路由 Main -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    withdraw () {
      this.$confirm('您即将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
          // 退出成功执行  1.清除localstorage  2.回到登录页
          localStorage.removeItem('token')
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
}
</script>
<style lang="less">
.home-el-container {
  height: 100%;
  background-color: #eaeef1;
  .home-header {
    background-color: #b3c1cd;
    .home-grid-content {
      height: 100%;
      img {
        padding-top: 5px;
        width: 180px;
      }
    }
    h2 {
      font-size: 30px;
      text-align: center;
      color: #fff;
      margin: 0;
      line-height: 60px;
    }
    p {
      float: right;
      font-weight: bolder;
      a {
        color: #daa520;
      }
    }
  }
  .el-container {
    height: 100%;
  }
  .el-menu-vertical-demo {
    height: 100%;
  }
}
</style>
