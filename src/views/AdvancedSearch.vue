<template>
    <div class="container">
      <div class="top">
        <span class="tableTitle">检索条件</span>
        <el-form ref="conditions" :model="conditions" label-width="60px">
            <el-form-item   label="地区">
                <v-distpicker :province="region.province" :city="region.city"  @change="onChange" hide-area></v-distpicker>
            </el-form-item>
            <el-form-item prop="school" label="学校">
                <el-input v-model="conditions.school"></el-input>
            </el-form-item>
            <el-form-item prop="academy"  label="学院">
                <el-input v-model="conditions.academy"></el-input>
            </el-form-item>
            <el-form-item prop="type" label="类型">
                <el-select v-model="conditions.type" placeholder="请选择类型">
                    <el-option label="本科生" value="本科生"></el-option>
                    <el-option label="研究生" value="研究生"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="title" label="标题">
                <el-input v-model="conditions.title" placeholder="请输入标题关键词"></el-input>
            </el-form-item>
            <el-form-item prop="content" label="全文">
                <el-input v-model="conditions.content" placeholder="请输入全文关键词"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit" type="primary" >搜索</el-button>
                <el-button @click="resetForm('conditions')" type="primary" >重置</el-button>
            </el-form-item>
        </el-form>
      </div>
      <result-table :tableData="tableData" ></result-table>
    </div>
  </template>
  
  <script>
import ResultTable from '@/components/ResultTable.vue'
import VDistpicker from 'v-distpicker'
import {formatDateTime} from '@/util/tools.js'
import {highlight} from '@/util/highllight.js'
import {advancedSearch} from '@/api'
import { mapMutations } from 'vuex'
export default {
    data(){
        return{
        tableData:[],
        conditions:{
            academy:'',
            city:'',
            school:'',
            title:'',
            type:'',
            content:'',
            province:''
        },
        region:{
            province:'',
            city:''
        }
    }
    },
components:{ResultTable,VDistpicker},
methods:{
    ...mapMutations('table',['isLoading']),
    //重置表单
    resetForm(formName) {
        this.$refs[formName].resetFields();
        this.select = {
            province:'',
            city:''
        }
    },
    //地址选择
    onChange(data){
        if(data.province.value!="省"&&data.city.value!="市"){
            this.region.province = data.province.value
            this.region.city = data.city.value
        }
    },
    //搜索
    submit(){
        this.isLoading(true)
        this.conditions.city  = this.region.city
        this.conditions.province = this.region.province
        advancedSearch({searchMap:this.conditions}).then(res=>{
            if(res.data.code == '200'){
                this.tableData = res.data.data
                this.tableData.forEach(ele=>{
                    ele.date = formatDateTime(ele.date)
                    ele.title = highlight(ele.title,this.conditions.title)
                })
            }else if(res.data.code == '400'){
                this.tableData = []
            }
            this.isLoading(false)
        })
    },
    }
}
  </script>
  <style lang="less" scoped>
      .container{
          width: 100%;
          height: 100%;
          .top{
              position: relative;
              width: 60%;
              margin: 20px auto 0 auto;
              padding: 20px;
              height: auto;
              box-shadow: 0 0 2px  #adadad;
              .tableTitle{
                position: absolute;
                top: 10px;
                left: 20px;
                font-size: 14px;
                color: rgba(00, 00, 00, 0.8);
                font-weight: 600;
              }
              .el-form {
                margin-top: 20px;
                padding: 20px;
                .el-form-item{
                    margin-bottom: 10px !important;
                }
              }
          }

      }
  </style>