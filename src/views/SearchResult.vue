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
            @keyup.enter.native="$router.replace({path:'/searchResult',query:{input:input,select:select}}).catch(err=>err)" 
            clearable>
            </el-input>
            <el-button icon="el-icon-search" @click="$router.replace({path:'/searchResult',query:{input:input,select:select}}).catch(err=>err)"></el-button>
        </div>
        <div class="advancedSearch">
            <a href="#/advancedSearch" target="_blank" style="text-decoration: none;" class="advanced">高级检索</a>
        </div>
    </div>
    <result-table :tableData="tableData"></result-table>
  </div>
</template>

<script>
import ResultTable from '@/components/ResultTable.vue'
import {formatDateTime} from '@/util/tools.js'
import {normalSearch} from '@/api'
export default {
    data(){
        return{
            input:'',
            select:'title',
            options:[
                {
                    value:'title',
                    label:'标题'
                },
                {
                    value:'content',
                    label:'全文'
                }
                ,
                {
                    value:'city',
                    label:'地区'
                },
                {
                    value:'school',
                    label:'学校'
                },
                {
                    value:'specialized',
                    label:'专业'
                },
                {
                    value:'academy',
                    label:'学院'
                }
            ],
            tableData:[]
        }
    },
    components:{ResultTable},
    watch: {
        '$route.query': {
            handler(newQuery, oldQuery) {
                this.input = newQuery.input;
                this.select = newQuery.select;
                console.log(this.input,this.select);
                // 参数变化时的逻辑处理 执行一次数据重载
                this.searchMethod()
            },
            immediate: true, // 立即执行一次，以处理初始参数
        },
    },
    methods:{
        async searchMethod(){
            await normalSearch({
                name:this.select,
                key:this.input
            }).then(res=>{
                if(res.data.code == '200'){
                    this.tableData = res.data.data
                    this.tableData.forEach(ele=>{
                        ele.date = formatDateTime(ele.date)
                    })
                }else if(res.data.code == '400'){
                    this.tableData = []
                }
            })
        }
    },
    created(){
        // //使用this.$route.query来获取传递过来的参数
        // this.input = this.$route.query.input;
        // this.select = this.$route.query.select;
        // // console.log(this.input,this.select);
        // this.searchMethod()
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
                top: 32px;
                left: calc(120px + 60%);
                .advanced{
                    color: #333;
                    &:hover{
                        color: #3da1f8;
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