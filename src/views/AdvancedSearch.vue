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
            <el-form-item prop="specialized" label="专业">
                <el-input v-model="conditions.specialized"></el-input>
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
  export default {
      data(){
          return{
            tableData:[{"school":"厦门理工学院","city":"厦门","academy":"机械学院","specialized":null,"title":"厦门理工学院机械工程学位点2024年硕士研究生招生计划","content":"1.机械工程(学术学位，专业代码：0802)\r\n\r\n涵盖本科毕业专业：机械设计制造及自动化、机械电子工程、机械设计及理论、智能制造工程、车辆工程、智能车辆工程、新能源汽车工程、汽车服务工程、过程装备与控制工程、测控技术与仪器、材料成型与控制工程、工程力学、交通运输、智慧交通、自动化、计算机科学与技术，或机械类相关工科专业。","date":"2023-09-18T16:00:00.000+00:00","type":"研究生","url":"https://yjs.xmut.edu.cn/info/1073/4060.htm","document_id":2}],
            conditions:{
                academy:'',
                city:'',
                school:'',
                specialized:'',
                title:'',
                type:'',
                content:'',
                date:'',
            },
            region:{
                province:'北京市',
                city:''
            }
        }
      },
      components:{ResultTable,VDistpicker},
      methods:{
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
            console.log(this.conditions,this.region);
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