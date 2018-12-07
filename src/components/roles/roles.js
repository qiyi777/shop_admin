export default {
  data () {
    return {
      rolesData: [],
      dialogRoles: false,
      formLabelWidth: '120px',
      rolesJurisd: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      curRoleId: -1
    }
  },
  async created () {
    this.getRolesList()
    const res = await this.$http.get('/rights/tree')
    // console.log(res)
    this.rolesJurisd = res.data.data
  },
  methods: {
    async getRolesList () {
      const res = await this.$http.get('/roles')
      this.rolesData = res.data.data
      // console.log(res)
    },
    getIndex (index) {
      return index
    },
    // 删除功能
    async rolesClose (role, rightId) {
      // console.log(rightId, rowId)
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      // console.log(res)
      const { meta } = res.data
      // console.log(role.children)
      // console.log(data)
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: meta.msg
        })
        this.getRolesList()
      }
    },
    // 点击弹出框  然后获取数据
    rolesJurisdiction (curRow) {
      // /让框弹出
      this.dialogRoles = true
      // console.log(curRow)
      this.curRoleId = curRow.id
      // /需要使用异步DOM获取数据
      this.$nextTick(() => {
        const checkedKeys = []
        // 遍历所有的子元素  获取数据
        curRow.children.forEach(level1 => {
          level1.children.forEach(level2 => {
            level2.children.forEach(level3 => {
              checkedKeys.push(level3.id)
            })
          })
        })
        // /展示选中
        this.$refs.tree.setCheckedKeys(checkedKeys)
      })
    },
    async assignRole () {
      // 获取所有选中的选框
      // console.log(this.$refs.tree.getCheckedKeys())
      // console.log(this.$refs.tree.getHalfCheckedKeys())
      // 获取全选中的选框
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      // 获取半选中的选框
      const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
      // /将两个数组和农到一起
      const allKeys = [...checkedKeys, ...halfCheckedKeys]

      const res = await this.$http.post(`roles/${this.curRoleId}/rights`, {
        rids: allKeys.join(',')
      })
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
        // 关闭弹出框
        this.dialogRoles = false
        // 更新页面
        this.getRolesList()
      }
    }
  }
}
