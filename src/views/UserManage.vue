<template>
  <div class="container">
    <!-- 首行 菜单 -->
    <el-row class="first-row">
      <el-col :span="12">
        <div class="search">
          <el-input @keyup.enter.native="subSearch" placeholder="用户名" v-model="searchContent"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="subSearch">搜索</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 产品表 -->
    <el-table
      v-loading="loading"
      @select="selectTable"
      @select-all="selectAll"
      stripe
      :border="true"
      :data="tableData.slice((paging.currentPage-1)*paging.pagesize,paging.currentPage*paging.pagesize)"
      height="500">
      <el-table-column
          type="selection"
          align="center"
          >
      </el-table-column>
      <el-table-column
          prop="proId"
          align="center"
          label="用户ID">
      </el-table-column>
      <el-table-column
          prop="proId"
          align="center"
          label="用户名">
      </el-table-column>
      <el-table-column
          prop="proId"
          align="center"
          label="城市">
      </el-table-column>
      <el-table-column
          prop="proId"
          align="center"
          label="手机">
      </el-table-column>
      <el-table-column
          prop="proId"
          align="center"
          label="权限">
      </el-table-column>
      <el-table-column
      prop=""
      align="center"
      label="操作">
          <template slot-scope="scope">
          <div style="display: flex; justify-content:space-evenly">
              <el-button size="mini" @click="handleEidt(scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </div>
          </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paging.currentPage"
        :page-size="paging.pagesize"
        :page-sizes="[5, 10, 20, 30]"
        style="float: right;margin-top: 10px;"
        background
        layout="sizes, prev, pager, next"
        :total="tableData.length">
      </el-pagination>
    </el-row>
    <!-- 弹框 -->
    <el-dialog
      title="编辑"
      :modal="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :visible.sync="dialogVisible"
      :show-close="false"
      width="50%">
      <el-form label-width="80px" :inline="true" :rules="rules" ref="productList" :model="productList" class="demo-form-inline">
        <el-form-item label="产品名称" prop="proName">
          <el-input v-model="productList.proName" placeholder="产品名称"></el-input>
        </el-form-item>
        <el-form-item label="产品价格" prop="proPrice">
          <el-input v-model="productList.proPrice" placeholder="产品价格"></el-input>
        </el-form-item>
        <el-form-item label="产品标签" prop="proTag">
          <el-select v-model="productList.proTag" placeholder="请选择产品标签来源">
            <el-option label="新品" value="新品"></el-option>
            <el-option label="定制" value="定制"></el-option>
            <el-option label="库存" value="线上询价"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品状态" prop="proState">
          <el-select v-model="productList.proState" placeholder="请选择产品状态来源">
                          <el-option label="预售" value="预售"></el-option>
            <el-option label="在售" value="在售"></el-option>
            <el-option label="售罄" value="售罄"></el-option>
            <el-option label="下架" value="下架"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品类型" prop="proType">
          <el-select v-model="productList.proType" placeholder="请选择产品类型">
            <el-option v-for="option in productTypes" :key="option.value" :label="option.label" :value="option.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品单位" prop="proUnit">
          <el-input v-model="productList.proUnit" placeholder="产品单位"></el-input>
        </el-form-item>
        <el-form-item label="产品信息" prop="proInfo">
          <el-input 
          type="textarea" 
          resize="none" 
          :autosize="{ minRows: 4, maxRows: 4}" 
          v-model="productList.proInfo" 
          placeholder="产品信息"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="cancle">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //分页
      paging:{
        pagesize:8,
        currentPage:1,
      },
      //加载中
      loading:false,
      //双击信息
      dblclinckRow:{},
      //表格数组
      tableData: [],
      //搜索内容
      searchContent:'',
      //checkbox
      selection:[],
      dialogVisible:false,
      productList:
        {
          'proId': '',
          'proInfo': '这是产品1的信息',
          'proName': '产品1',
          'proPrice': 100,
          'proState': '在售',
          'proTag': '',
          'proType': '',
          'proUnit': 'XYZ传感器',
          'userId': ''
        },
      productTypes: [
        { label: '湿度', value: '湿度' },
      ],
      rules:{
        proInfo:[{ required: true, message: '产品信息必填', trigger: 'blur' }],
      }
    }
  },
  methods:{
    //选择所有
    selectAll(selection){
      this.selection = selection
    },
    //选择条目
    selectTable(selection,row){
      this.selection = selection
    },
    //换展示条数
    handleSizeChange(val) {
      this.paging.pagesize = val
      console.log(this.paging.pagesize);
    },
    //点击换页
    handleCurrentChange(currentPage){
      this.paging.currentPage = currentPage
    },
    //删除
    handleDelete(row){
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then()
    },
    //编辑事件
    handleEidt(row){
      this.dialogVisible = true
    },
    //搜索按钮事件
    subSearch(){
    },
    //取消弹窗
    cancle(){
        //置空表单
      this.$refs.productList.resetFields()
      this.dialogVisible = false
    },
    //确定弹窗
    submit(){
      this.$refs.productList.validate((valid) => {
        if (valid) {}})
    },
  },
  computed:{
  },
  created(){
  },
}
</script>

<style lang="less" scoped>
  .container{
    .first-row{
      margin-bottom: 20px;
      .el-col{
        float: right;
        .search{
          display: flex;
          justify-content: space-around;
          .el-input{
            width: 60%;
          }
          .el-button{
            width: 30%;
          }
        }
      }
    }
    .el-table{
        margin: 0 auto;
        width: auto;
    }
  }
</style>