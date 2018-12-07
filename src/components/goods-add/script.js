export default {
  // 页面渲染就获取商品所有信息
  created () {
    // 渲染级联选择中的商品列表数据
    this.getGoodsOptions()
  },
  data () {
    return {
      tabPosition: 'left',
      // 当前步骤条进度
      stap: 0,
      // 步骤条当前选择
      activeName: 'first',
      // 提交表单
      goodsAddForm: {
        // 商品名称
        goods_name: '',
        // 商品价格
        goods_price: '',
        // 商品重量
        goods_weight: '',
        // 商品数量
        goods_number: '',
        // 是否促销数据绑定
        is_promote: false,
        // 商品分类
        goods_cat_arr: [],
        // 级联选择器商品分类信息展示
        GoodsAddOptions: [],
        // 图片上传的地址数组
        pics: []
      },
      // 图片上传需要一个请求token
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  methods: {
    // 渲染商品分类数据到级联选择器
    async getGoodsOptions () {
      const res = await this.$http.get('/categories', {
        params: {
          type: 3
        }
      })
      // console.log(res)
      this.goodsAddForm.GoodsAddOptions = res.data.data
    },
    // 让步骤条和tab栏同步
    tabPane (tab) {
      // console.log(tab)
      this.stap = tab.index - 0
    },

    // 级联选择对象
    handleChange (value) {
      console.log(value)
    },
    // 下一步下一步按钮
    nextTab (page, tab) {
      // 当前的tab往下走
      this.activeName = tab
      // 当前的步骤往下一个
      this.stap = page
      // console.log(page, tab)
    },
    // 上传图片数据
    handleUpload (response, file, fileList) {
      // console.log(response, file, fileList)
      this.goodsAddForm.pics.push({
        pic: response.data.tmp_path
      })

      // console.log()
    }
  }
}
