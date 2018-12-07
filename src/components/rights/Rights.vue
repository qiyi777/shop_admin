<template>
  <div class="rights">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="rights-bread" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表格 -->
    <el-table :data="rightsData" style="width: 100%">
      <el-table-column type="index" :index="getIndex" width="50">
      </el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180">
      </el-table-column>
      <el-table-column prop="path" label="路径" width="180">
      </el-table-column>
      <el-table-column prop="address" label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level === '0'">一级</span>
          <span v-else-if="scope.row.level === '1'">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rightsData: []
    }
  },
  async created () {
    const res = await this.$http.get('/rights/list')
    // console.log(res)
    this.rightsData = res.data.data
  },
  methods: {
    getIndex (index) {
      return index
    }
  }
}
</script>

<style lang="less">
.rights {
  .rights-bread {
    height: 40px;
    background: #d4dae0;
    font-size: 16px;
    line-height: 40px;
    padding-left: 15px;
  }
  .input-btn {
    margin-left: 20px;
  }
}
</style>
