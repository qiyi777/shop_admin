// 导入axios
// import axios from 'axios'
export default {
  data () {
    return {
      total: 0,
      // 当前页数
      pagenum: 1,
      // 每页的条数
      pagesize: 2,
      userList: [],
      // 输入搜索
      searchText: '',
      // 添加用户对话框和表单数据
      dialogFormVisible: false,
      userAddForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      userAddRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          // pattern 表示使用正则表达式对数据进行校验
          {
            pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            pattern: /^1(3|4|5|7|8)\d{9}$/,
            message: '手机号不正确',
            trigger: 'blur'
          }
        ]
      },
      userEditDailog: false,
      userEditForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      dialogmodify: false,
      modifyForm: {
        username: '',
        rid: '',
        // 保存当前用户ID
        userid: -1
      },
      // 获取角色
      userRoleList: []
    }
  }, // 发送ajax请求数据
  created () {
    this.getUserList(this.pagenum)
    this.getRolesList()
  },
  methods: {
    // 分页展示用户信息
    async getUserList (pagenum = 1, query = '') {
      const config = {
        params: {
          // 当前页数
          pagenum,
          // 每页的条数
          pagesize: this.pagesize,
          query
        }
      }
      const res = await this.$http.get('/users', config)
      const { meta, data } = res.data
      if (meta.status === 200) {
        // console.log(res)
        this.userList = data.users
        // 获取总页数
        this.total = data.total
        // 获取当前页
        this.pagenum = data.pagenum
      } else {
        // 否则就是没登录  先去登录
        localStorage.removeItem('token')
        this.$router.path('/login')
      }
    },
    changePage (curPage) {
      // console.log(curPage)
      this.getUserList(curPage, this.searchText)
    },
    search () {
      this.getUserList(1, this.searchText)
    },
    async switchs (curUser) {
      // console.log(curUser)
      // /设置地址
      const url = `/users/${curUser.id}/state/${curUser.mg_state}`
      // 发送ajax请求
      // 因为已配置header拦截器  把token通过拦截器加上去了  无需再设置
      const res = await this.$http.put(url)
      const { meta } = res.data
      if (res.data.meta.status === 200) {
        // 说明成功了 提示即可
        this.$message({
          message: meta.msg,
          type: 'success',
          duration: 1000
        })
      } else {
        this.$message({
          message: meta.msg,
          type: 'error',
          duration: 1000
        })
      }
    },
    async delUser (id) {
      try {
        await this.$confirm('确定删除该用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        const res = await this.$http.delete(`users/${id}`)
        // /说明删除成功
        if (res.data.meta.status === 200) {
          this.getUserList(1, this.searchText)
        }
      } catch (e) {
        this.$message({
          type: 'info',
          message: '已取消删除',
          duration: 600
        })
      }

      // console.log(id)
    },
    // 点击让当前框显示
    showUserAddDialog () {
      // console.log(1)
      this.dialogFormVisible = true
      // 清空表单
    },
    // 点击确定 添加用户
    async addUser () {
      try {
        await this.$refs.userAddForm.validate()
        const res = await this.$http.post('/users', this.userAddForm)
        // 解构赋值
        const { meta } = res.data
        if (meta.status === 201) {
          this.$message({
            type: 'success',
            message: meta.msg
          })
          // /关闭弹框
          this.dialogFormVisible = false
          // 重新刷新
          this.getUserList(1, this.searchText)
        }
      } catch (e) {}
    },
    // 关闭对话框 重置表单
    closeUserAddDialog () {
      this.$refs.userAddForm.resetFields()
    },
    // 弹出框修改的框
    showEditUserDialog (user) {
      this.userEditDailog = true
      // console.log(user)
      for (let key in this.userEditForm) {
        this.userEditForm[key] = user[key]
      }
    },
    // 修改数据
    async editUser () {
      // console.log(id)
      const { id, email, mobile } = this.userEditForm
      const res = await this.$http.put(`users/${id}`, {
        email,
        mobile
      })
      // 解构赋值
      const { meta } = res.data
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: meta.msg
        })
        // 关闭弹框
        this.userEditDailog = false
        // 刷新数据
        this.getUserList(1, this.searchText)
      } else {
        this.$message({
          type: 'error',
          message: meta.msg
        })
      }
    },
    // 分配角色  弹框
    async usersDistribution (user) {
      this.dialogmodify = true
      // 发送ajax请求 获取当前用户
      const res = await this.$http.get(`/users/${user.id}`)
      // 解构赋值
      let { rid, id, username } = res.data.data
      // 当当前rid等于-1   说明这时rid没有角色  所以直接给空值
      rid = rid === -1 ? '' : rid
      // 把当前用户名同步
      this.modifyForm.username = username
      // console.log(res)
      // 把角色信息展示
      this.modifyForm.rid = rid
      // 保存当前ID名
      this.modifyForm.userid = id
    },
    // 获取角色用户列表数据
    async getRolesList () {
      const res = await this.$http.get('/roles')
      this.userRoleList = res.data.data
    },
    // 确定分配角色
    async assignRole () {
      const { userid, rid } = this.modifyForm
      // console.log(userid, rid)
      // console.log(1)
      const res = await this.$http.put(`users/${userid}/role`, {
        rid
      })
      // 关闭对话框
      this.dialogmodify = false
      // /刷新列表数据
      this.getUserList(1, this.searchText)
      // 提示用户成功
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
    }
  }
}
