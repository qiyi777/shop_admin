// import VueQuillEditor from 'vue-quill-editor'

// 引入vue-quill-editor样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  // vue-quill-editor注册局部组件
  components: {
    quillEditor
  },
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
        pics: [],
        // 富文本数据
        goods_introduce: ''
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
    },
    // 添加商品发送ajax请求
    async addCommodity () {
      // 让 eslint 不再使用 camelcase 校验下一行代码：
      /* eslint-disable camelcase */
      const {
        goods_name,
        goods_price,
        goods_weight,
        goods_number,
        is_promote,
        goods_cat_arr,
        pics,
        goods_introduce
      } = this.goodsAddForm
      const res = await this.$http.post('/goods', {
        goods_name,
        goods_price,
        goods_weight,
        goods_number,
        is_promote,
        goods_cat: goods_cat_arr.join(','),
        pics,
        goods_introduce,
        attrs: []
      })
      // console.log(res)
      // 提示创建成功
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: this.data.meta.msg
        })
      }
      // 跳转到商品列表页
      this.$router.push('/goods')
    }
  }
}
