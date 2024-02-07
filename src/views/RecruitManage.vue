<template>
  <div class="container">
    <!-- 首行 菜单 -->
    <el-row class="first-row">
      <el-col :span="12">
        <el-button type="primary" style="width: 130px;" @click="addInfo">添加</el-button>
      </el-col>
      <el-col :span="12">
        <div class="search">
          <el-input @keyup.enter.native="subSearch" placeholder="标题关键词" v-model="searchContent"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="subSearch">搜索</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="tableData.slice((paging.currentPage-1)*paging.pagesize,paging.currentPage*paging.pagesize)"
      stripe>
      <el-table-column
          label="标题"
          width="150"
          align="center">
          <template slot-scope="scope">
          <p class="title" @click="clickTitle(scope.row)" style="text-align: start;" v-html="scope.row.title"></p>
          </template>
      </el-table-column>
      <el-table-column
          label="内容"
          align="center">
          <template slot-scope="scope">
          <p class="content" style="text-align: start;" v-html="scope.row.content"></p>
          </template>
      </el-table-column>
      <el-table-column
          align="center"
          width="150"
          :show-overflow-tooltip="true"
          label="地区">
          <template slot-scope="scope">
          <p style="font-size: 12px;color: #8e8d8d;">{{ scope.row.city }}</p>
          </template>
      </el-table-column>
      <el-table-column
          align="center"
          label="学校">
          <template slot-scope="scope">
          <p style="font-size: 12px;color: #8e8d8d;">{{ scope.row.school }}</p>
          </template>
      </el-table-column>
      <el-table-column
          align="center"
          label="学院">
          <template slot-scope="scope">
          <p style="font-size: 12px;color: #8e8d8d;">{{ scope.row.academy }}</p>
          </template>
      </el-table-column>
      <el-table-column
          prop="date"
          :sortable="true"
          align="center"
          label="发布时间">
      </el-table-column>
      <el-table-column
          prop="type"
          align="center"
          width="80"    
          label="类型">
      </el-table-column>
      <el-table-column
        prop=""
        fixed="right"
        align="center"
        width="150"  
        label="操作">
          <template slot-scope="scope">
          <div style="display: flex; justify-content:space-evenly">
              <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
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
        :page-sizes="[5,10, 20, 30]"
        style="float: right;margin-top: 10px;"
        background
        layout="sizes, prev, pager, next"
        :total="tableData.length">
      </el-pagination>
    </el-row>
    <!-- 弹框 -->
    <el-dialog
      top="15%"
      :modal="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :visible.sync="dialogVisible"
      :show-close="false"
      width="50%">
      <el-form label-width="80px" :inline="true" :rules="rules" ref="recruitInfo" :model="recruitInfo" class="demo-form-inline">
        <el-form-item label="标题" prop="title">
          <el-input v-model="recruitInfo.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="来源" prop="url">
          <el-input v-model="recruitInfo.url" placeholder="来源"></el-input>
        </el-form-item>
        <el-form-item label="学校" prop="school">
          <el-input v-model="recruitInfo.school" placeholder="学校"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="academy">
          <el-input v-model="recruitInfo.academy" placeholder="学校"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="recruitInfo.type" placeholder="学院">
            <el-option label="本科生" value="本科生">本科生</el-option>
            <el-option label="研究生" value="研究生">研究生</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间" prop="date">
          <el-date-picker
            v-model="recruitInfo.date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input 
          type="textarea" 
          resize="none"
          :autosize="{ minRows: 6, maxRows: 8}" 
          v-model="recruitInfo.content" 
          placeholder="政策内容"></el-input>
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
import {getRecruitInfo,addRecruitInfo,deleteRecruitInfo,updateRecruitInfo,findRecruitInfo,normalSearch} from '@/api'
import VDistpicker from 'v-distpicker'
import {formatDateTime} from '@/util/tools.js'
import {highlight} from '@/util/highllight.js'
import jsCookie from 'js-cookie'
export default {
  data() {
    return {
      //分页
      paging:{
        pagesize:5,
        currentPage:1,
      },
      handleType:0,//0表示新增，1表示编辑
      //加载中
      loading:false,
      //表格数组
      tableData:[],
      //搜索内容
      searchContent:'',
      //checkbox
      selection:[],
      dialogVisible:false,
      recruitInfo:{
        'school': '',
        'city': '',
        'province':'',
        'academy': '',
        'title': '',
        'content': '',
        'date': '',
        'type':'',
        'url':''
      },
      region:{
        province:'',
        city:''
      },
      rules:{
        proInfo:[{ required: true, message: '产品信息必填', trigger: 'blur' }],
      }
    }
  },
  components:{VDistpicker},
  methods:{
    //点击标题事件
    clickTitle(row){
      this.$router.push({path:'/detailContent',query:{info:JSON.stringify(row)}}).catch(err=>err)
    },
    //换展示条数
    handleSizeChange(val) {
      this.paging.pagesize = val
    },
    //点击换页
    handleCurrentChange(currentPage){
      this.paging.currentPage = currentPage
    },
    //获取数据
    async getRecruitInfoList(){
      await getRecruitInfo().then(res=>{
        if(res.data.code == '200'){
          const tableList = res.data.data
          tableList.forEach(ele=>{
            ele.date = formatDateTime(ele.date)
          })
          this.tableData = JSON.parse(JSON.stringify(tableList))
        }
      })
    },
    //删除
    handleDelete(row){
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async ()=>{
        deleteRecruitInfo({document_id:row.document_id}).then((response)=>{
          if(response.data.code === "200"){
            this.getRecruitInfoList()
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
      this.handleType = 1
      this.dialogVisible = true
      this.$nextTick(()=>{
        this.region.province = row.province
        this.region.city = row.city
        this.recruitInfo = {...row}
      })
    },
    //添加事件
    addInfo(){
      this.handleType = 0
      this.dialogVisible = true
    },
    //地址选择
    onChange(data){
      if(data.province.value!="省"&&data.city.value!="市"){
        this.region.province = data.province.value
        this.region.city = data.city.value
      }
    },
    //搜索按钮事件
    async subSearch(){
      const user_id = jsCookie.get('userId')
      await normalSearch({
        name:'title',
        key:this.searchContent,
        user_id:user_id
      }).then(res=>{
        if(res.data.code == '200'){
          this.tableData = res.data.data.documentList
          this.tableData.forEach(ele=>{
            ele.date = formatDateTime(ele.date)
            ele.title = highlight(ele.title,this.searchContent)
          })
        }else if(res.data.code == '400'){
          this.tableData = []
        }
      })
    },
    //取消弹窗
    cancle(){
      //置空表单
      this.$refs.recruitInfo.resetFields();
      this.region = {
          province:'',
          city:''
      }
      this.dialogVisible = false
    },
    //确定弹窗
    submit(){
      const province  = this.region.province
      const city = this.region.city
      this.recruitInfo.province = province
      this.recruitInfo.city = city
      this.$refs.recruitInfo.validate((valid) => {
        if (valid) {
          if(this.handleType === 0){
            addRecruitInfo(this.recruitInfo).then((response)=>{
              if(response.status === 200){
                this.getRecruitInfoList()
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
              }
            })
          }else if(this.handleType === 1){
            updateRecruitInfo(this.recruitInfo).then((response)=>{
              if(response.status === 200){
                this.getRecruitInfoList()
                this.$message({
                  message: '更新成功',
                  type: 'success'
                });
              }
            })
          }
          this.$refs.recruitInfo.resetFields()
          this.dialogVisible = false
        }
      })
    },
  },
  computed:{
  },
  created(){
    this.getRecruitInfoList()
  },
}
</script>

<style lang="less" scoped>
    .container{
      .first-row{
        margin-bottom: 20px;
        .el-col{
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
      /deep/ .el-table__header{
        th{
          color:rgba(00, 00, 00, 0.8) !important;
          font-weight: 600;
        }
      }
      .el-table{
        margin: 0 auto;
        width: 100%;
        .title{
          &:hover{
          color: rgb(37, 115, 249);
          cursor: pointer;
          }
        }
        .content{
          display: -webkit-box;
          -webkit-line-clamp: 3;  /* 设置固定的行数 */
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 10px;
        }
      }
    }
  </style>