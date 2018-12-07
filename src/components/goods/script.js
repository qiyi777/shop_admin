export default {
  data () {
    return {
      goodsData: [],
      // 当前页
      pagenum: -1,
      // 每页显示条数
      pagesize: 5,
      // 查询条件
      query: '',
      total: 0
    }
  },
  created () {
    // 进页面就拿到哈希值的数
    const page = this.$route.params.page
    // 调用渲染商品数据的方法
    this.goodsList(page)
  },
  watch: {
    $route (to, from) {
      this.goodsList(to.params.page - 0)
    }
  },
  methods: {
    // 渲染商品数据
    async goodsList (pages = 1) {
      const res = await this.$http.get('/goods', {
        params: {
          pagenum: pages,
          pagesize: 5
        }
      })
      // console.log(res)
      const { pagenum, total, goods } = res.data.data
      // 拿到的是字符串  所以转为数值
      this.pagenum = pagenum - 0
      this.total = total
      this.goodsData = goods
    },
    // 点击页码翻页
    goodsPage (index) {
      // console.log(index)
      // 当分页按钮动的时候让URL后的数据也改变
      this.$router.push(`/goods/${index}`)
      this.goodsList(index)
    },
    // 点击添加按钮到添加页面去
    goodsAdd () {
      this.$router.push(`/goods-add`)
    }
  }
}
