// 配置为局部组件
import ElTreeGrid from 'element-tree-grid'
// Vue.component(ElTreeGrid.name, ElTreeGrid)

export default {
  components: {
    [ElTreeGrid.name]: ElTreeGrid
  },
  data () {
    return {
      categoriesData: [],
      pagenum: 0,
      pagesize: 0,
      total: 0,
      isLoading: false,
      cateAddForm: {
        // 分类父 ID
        cat_pid: -1,
        // 分类名称
        cat_name: '',
        // 分类层级
        cat_level: -1,
        // 级联选择器中选中项的值
        catIds: []
      },
      // 控制弹框显示和隐藏
      dialogFormCate: false,
      // 级联选择数据
      cateAddList: [],
      propObj: {
        value: 'cat_id',
        label: 'cat_name'
      }
    }
  },
  created () {
    this.getCategorie(this.pagenum)
    // 获取商品数据
    this.getcateAddList()
  },
  methods: {
    // 渲染当前商品列表数据
    async getCategorie (pagenum = 1) {
      this.isLoading = true
      const res = await this.$http.get('/categories', {
        params: {
          type: 3,
          // 当前页
          pagenum,
          // 每页显示条数
          pagesize: 6
        }
      })
      let { pagenum: pages, pagesize, total, result } = res.data.data
      this.categoriesData = result
      this.total = total
      this.pagenum = pages + 1
      this.pagesize = pagesize
      // console.log(this.total)
      this.isLoading = false
    },
    cateCur (index) {
      this.pagenum = index
      this.getCategorie(this.pagenum)
    },
    // 控制显示和隐藏
    cateToggle () {
      this.dialogFormCate = true
    },
    // 获取所有商品数据
    async getcateAddList () {
      const res = await this.$http.get('/categories', {
        params: {
          type: 2
        }
      })
      // console.log(res)
      this.cateAddList = res.data.data
    },
    // 添加数据
    async addCate () {
      const { cat_name: catname, catIds } = this.cateAddForm
      const data = {
        cat_name: catname,
        cat_pid: catIds[catIds.length - 1],
        cat_level: catIds.length
      }
      await this.$http.post('/categories', data)
      this.dialogFormCate = false
      // 刷新列表数据
      this.getCategorie()
    }
  }
}
