<template>
  <div class="login">
    <el-row class="login" type="flex" justify="center" align="middle">
      <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
        <el-form label-position="top" :model="loginForm" :rules="rules" ref="ruleForm" label-width="100px" class="login-form demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 导入axios
import axios from 'axios'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async submitForm (formName) {
      try {
        await this.$refs.ruleForm.validate()
        // 表示验证不成功
        // 校验成功  发送请求到登录接口  完成登录
        const res = await axios.post(
          'http://localhost:8888/api/private/v1/login',
          this.loginForm
        )

        // console.log(res)
        if (res.data.meta.status === 200) {
          // 说明登录成功了 页面重定向到首页 同时保存localstorage
          localStorage.setItem('token', res.data.data.token)
          this.$router.push('/home')
          // 提示到了首页
          this.$message({
            // 显示的提示信息
            message: res.data.meta.msg,
            type: 'success', // 主题
            // 显示的秒数
            duration: 1000
          })
        } else {
          // 登录失败
          this.$message({
            message: res.data.meta.msg,
            type: 'warning',
            duration: 1000
          })
        }
      } catch (e) {
        // 校验失败不作任何处理
      }
    },
    // 重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style>
.login {
  height: 100%;
  background: #2d434c;
}
.login-form {
  padding: 20px;
  border-radius: 15px;
  background: #fff;
}
</style>
