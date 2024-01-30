<template>
  <div class="container">
    <el-table
      :data="tableData.slice((paging.currentPage-1)*paging.pagesize,paging.currentPage*paging.pagesize)"
      stripe>
      <el-table-column
        label="标题"
        align="center">
        <template slot-scope="scope">
          <p class="title" @click="clickTitle(scope.row)" style="text-align: start;">{{ scope.row.title }}</p>
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
        label="学校">
        <template slot-scope="scope">
          <p style="font-size: 12px;color: #8e8d8d;">{{ scope.row.school }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="学院">
        <template slot-scope="scope">
          <p style="font-size: 12px;color: #8e8d8d;">{{ scope.row.academy }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
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
        align="center"
        width="80"  
        label="操作">
            <template slot-scope="scope">
            <div style="display: flex; justify-content:space-evenly">
                <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
            </div>
            </template>
        </el-table-column>
    </el-table>
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
  </div>
</template>

<script>
import {removeCollect,getCollectInfo} from '@/api'
import {formatDateTime} from '@/util/tools.js'
import Cookies from 'js-cookie'
export default {
  props:['collectList'],
  data(){
    return{
      tableData:[],
      //分页
      paging:{
        pagesize:5,
        currentPage:1,
      },
    }
  },
  methods:{
    handleDelete(row){
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async ()=>{
          await removeCollect({collect_id:row.collectId}).then(res=>{
          if(res.data.code == '200'){
            this.$message({
              type: 'success',
              message: res.data.msg
            }); 
            //重新获取表格数据
            this.getAllCollectInfo()
            //页面归到第一页
            this.paging.currentPage = 1
          }
        })
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: '已取消删除'
        });  
      })
    },
    clickTitle(row){
      this.$router.push({path:'/detailContent',query:{info:JSON.stringify(row)}}).catch(err=>err)
    },
    //获取收藏列表
    async getAllCollectInfo(){
      const user_id = Cookies.get('userId')
      await getCollectInfo({user_id}).then(res=>{
        if(res.data.code == '200'){
          //置空数组
          this.tableData = []
          let collectList = res.data.data
          console.log(collectList);
          collectList.forEach(ele=>{
            ele.document.collectId = ele.collect_id
            ele.document.date = formatDateTime(ele.document.date)
            this.tableData.push(ele.document)
          })
        }else if (res.data.code == '400'){
          this.tableData = []
        }
      })
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
  },
  created(){
    this.getAllCollectInfo()
  }
}
</script>

<style lang="less" scoped>
  .container{
    .el-table{
      margin: 0 auto;
      width: 100%;
      .title{
        &:hover{
          color: rgb(37, 115, 249);
          cursor: pointer;
        }
      }
    }
  }
</style>