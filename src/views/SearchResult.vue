<template>
  <div class="container">
    <div class="top">
        <div class="searchInput">
            <el-select v-model="select" placeholder="请选择" class="selectInput">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-input
            placeholder="请输入内容"
            v-model="input"
            clearable>
            </el-input>
            <el-button icon="el-icon-search"></el-button>
        </div>
        <div class="advancedSearch">
            <el-button class="advanced"><a href="#/advancedSearch" target="_blank" style="text-decoration: none;color: inherit;">高级检索</a></el-button>
        </div>
    </div>
    <result-table :tableData="tableData"></result-table>
  </div>
</template>

<script>
import ResultTable from '@/components/ResultTable.vue'
export default {
    data(){
        return{
            input:'',
            select:'标题',
            options:[
                {
                    value:'标题',
                    label:'标题'
                },
                {
                    value:'全文',
                    label:'全文'
                }
                ,
                {
                    value:'地区',
                    label:'地区'
                },
                {
                    value:'学校',
                    label:'学校'
                },
                {
                    value:'专业',
                    label:'专业'
                },
                {
                    value:'学院',
                    label:'学院'
                }
            ],
            tableData:[{"school":"厦门理工学院","city":"厦门","academy":"机械学院","specialized":null,"title":"厦门理工学院机械工程学位点2024年硕士研究生招生计划","content":"1.机械工程(学术学位，专业代码：0802)\r\n\r\n涵盖本科毕业专业：机械设计制造及自动化、机械电子工程、机械设计及理论、智能制造工程、车辆工程、智能车辆工程、新能源汽车工程、汽车服务工程、过程装备与控制工程、测控技术与仪器、材料成型与控制工程、工程力学、交通运输、智慧交通、自动化、计算机科学与技术，或机械类相关工科专业。","date":"2023-09-18T16:00:00.000+00:00","type":"研究生","url":"https://yjs.xmut.edu.cn/info/1073/4060.htm","document_id":2},{"school":"厦门理工学院","city":"厦门","academy":"艺术学院","specialized":null,"title":"厦门理工学院机艺术学位点2024年硕士研究生招生计划","content":"涵盖本科毕业专业：不限专业","date":"2023-09-18T16:00:00.000+00:00","type":"研究生","url":"https://yjs.xmut.edu.cn/info/1073/4060.htm","document_id":3}]
        }
    },
    components:{ResultTable},
    methods:{
        
    }
}
</script>
<style lang="less" scoped>
    .container{
        width: 100%;
        height: 100%;
        .top{
            position: relative;
            width: 100%;
            height: 100px;
            display: flex;
            flex-direction: row;
            .el-button{
                border: none;
                font-size: 16px;
                &:hover{
                    background-color: #fff;
                }
            }
            .advancedSearch{
                position: absolute;
                top: 25px;
                left: calc(120px + 60%);
                .advanced{
                    background-color: #e1e1e1;
                    color: #333;
                    &:hover{
                        background-color: #0076dd;
                        color: #fff;
                    }
                }
            }
        }
        .searchInput{
            position: absolute;
            top: 15px;
            left: 100px;
            display: flex;
            width: 60%;
            box-shadow: 0 5px 20px 2px #b2b2b2;
            padding: 0.6em;
            border-radius: 1em;
            .selectInput{
                /deep/ .el-input__inner{
                    border: none !important;
                    width: 80px;
                    font-size: 16px;
                    border-radius: 0;
                }
            }
            .el-input{
                /deep/ .el-input__inner{
                    border: none !important;
                    font-size: 16px;
                    border-radius: 0;
                }
            }
        }
    }
</style>