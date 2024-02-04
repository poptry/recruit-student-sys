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
          prop="user_id"
          align="center"
          label="用户ID">
      </el-table-column>
      <el-table-column
          prop="username"
          align="center"
          label="用户名">
      </el-table-column>
      <el-table-column
          prop="city"
          align="center"
          label="城市">
      </el-table-column>
      <el-table-column
          prop="phonenum"
          align="center"
          label="手机">
      </el-table-column>
      <el-table-column
          prop="auth"
          align="center"
          label="权限">
      </el-table-column>
      <el-table-column
      prop=""
      align="center"
      label="操作">
          <template slot-scope="scope">
          <div style="display: flex; justify-content:space-evenly">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
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
      <el-form label-width="80px" :inline="true" :rules="rules" ref="userList" :model="userList" class="demo-form-inline">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="userList.username" placeholder="用户名称"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="userList.password" placeholder="产品价格"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phonenum">
          <el-input v-model="userList.phonenum" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="auth">
          <el-select v-model="userList.auth" placeholder="权限选择">
            <el-option label="用户" value="用户">用户</el-option>
            <el-option label="管理员" value="管理员">管理员</el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="" label="地区">
          <v-distpicker :province="region.province" :city="region.city"  @change="onChange" hide-area></v-distpicker>
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
import {getUserList,updateUser,deleteUser} from '@/api'
import VDistpicker from 'v-distpicker'
export default {
  data() {
    return {
      //分页
      paging:{
        pagesize:5,
        currentPage:1,
      },
      region:{
        province:'',
        city:''
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
      userList:{
        "user_id":'',
        "username":"",
        "password":"",
        "phonenum":'',
        "city":'',
        province:'',
        "auth":""
      },
      rules:{
        proInfo:[{ required: true, message: '产品信息必填', trigger: 'blur' }],
      }
    }
  },
  components:{VDistpicker},
  methods:{
    //获取用户
    async getUsers(){
      await getUserList().then(res=>{
        if(res.data.code == "200"){
          this.tableData = res.data.data
          console.log(JSON.stringify(this.tableData));
        }
      })
    },
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
      }).then(async ()=>{
        deleteUser({user_id:row.user_id}).then(res=>{
          if(res.data.code === "200"){
            this.getUsers()
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          }else{
            this.$message({
              message: '删除失败',
              type: 'info'
            });
          }
        })
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: '已取消删除'
        });  
      })
    },
    //编辑事件
    handleEdit(row){
      this.dialogVisible = true
      this.$nextTick(()=>{
        this.region.province = row.province
        this.region.city = row.city
        this.userList = {...row}
      })
    },
    //搜索按钮事件
    subSearch(){
    },
    //取消弹窗
    cancle(){
        //置空表单
      this.$refs.userList.resetFields()
      this.dialogVisible = false
    },
    //地址选择
    onChange(data){
      if(data.province.value!="省"&&data.city.value!="市"){
        this.region.province = data.province.value
        this.region.city = data.city.value
      }
    },
    //确定弹窗
    submit(){
      this.$refs.userList.validate((valid) => {
        if (valid) {
          updateUser(this.userList).then((response)=>{
              if(response.data.code == "200"){
                this.getUsers()
                this.$message({
                  message: '更新成功',
                  type: 'success'
                });
              }
            })
          this.$refs.userList.resetFields()
          this.dialogVisible = false
        }
      })
    },
  },
  computed:{
  },
  created(){
    this.getUsers()
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