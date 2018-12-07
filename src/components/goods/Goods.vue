<template>
  <div class="goods">
    <el-table :data="goodsData" stripe style="width: 100%">
      <el-table-column type="index" width="120">
      </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="160">
      </el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="160">
      </el-table-column>
      <el-table-column prop="goods_weight" label="商品重量">
      </el-table-column>
      <el-table-column prop="add_time" label="创建时间">
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <!-- //修改 -->
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" size="mini" type="primary" plain></el-button>
          <!-- //删除 -->
          <el-button icon="el-icon-delete" size="mini" type="danger" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @current-change="goodsPage" :page-size="pagesize" :current-page="pagenum" background layout="prev, pager, next" :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  created () {
    this.goodsList()
  },
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
  methods: {
    async goodsList (page = 1) {
      const res = await this.$http.get('/goods', {
        params: {
          pagenum: page,
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
      this.goodsList(index)
    }
  }
}
</script>

<style>
</style>
