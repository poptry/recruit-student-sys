<template>
  <div class="container">
    <el-table
      :data="tableData"
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
        width="80"
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
        prop="specialized"
        align="center"
        label="专业">
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
  </div>
</template>

<script>
import {removeCollect,getCollectInfo} from '@/api'
import Cookies from 'js-cookie'
export default {
    props:['collectList'],
    data(){
        return{
          tableData:[]
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
              //重新获取
              console.log(this);
              this.getAllCollectInfo()
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
        console.log("执行了");
        const user_id = Cookies.get('userId')
        await getCollectInfo({user_id}).then(res=>{
          console.log(res);
          if(res.data.code == '200'){
              this.tableData = []
              let collectList = res.data.data
              console.log(collectList);
              collectList.forEach(ele=>{
                ele.document.collectId = ele.collect_id
                this.tableData.push(ele.document)
              })
          }else if (res.data.code == '400'){
            this.tableData = []
          }
        })
      }
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