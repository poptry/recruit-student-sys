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
    <div class="bottom">
        <div class="result">
            <result-table :tableData="tableData"></result-table>
        </div>
        <div class="relate">
            <div class="recommend">
                <span class="title"><i class="el-icon-search"></i>相关搜索</span>
                <div class="itemUrl" v-for="(item,index) in relatedList" :key="index" @click="clickRelateLink(item)">
                    <span style="margin-right: 10px;">{{ item.label }}</span>
                    <span>{{ item.search_key }}</span>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import ResultTable from '@/components/ResultTable.vue'
import {formatDateTime} from '@/util/tools.js'
import jsCookie from 'js-cookie'
import {normalSearch} from '@/api'
import {highlight} from '@/util/highllight.js'
import { mapMutations } from 'vuex'
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
                },
                {
                    value:'province',
                    label:'省份'
                },
                {
                    value:'city',
                    label:'城市'
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
            tableData:[],
            relatedList:[]
        }
    },
    components:{ResultTable},
    watch: {
        '$route.query': {
            handler(newQuery, oldQuery) {
                this.input = newQuery.input;
                this.select = newQuery.select;
                // 参数变化时的逻辑处理 执行一次数据重载
                this.searchMethod()
            },
            immediate: true, // 立即执行一次，以处理初始参数
        },
    },
    methods:{
        ...mapMutations('table',['isLoading']),
        async searchMethod(){
            const user_id = jsCookie.get('userId')
            this.isLoading(true)
            await normalSearch({
                name:this.select,
                key:this.input,
                user_id:user_id
            }).then(res=>{
                if(res.data.code == '200'){
                    this.tableData = res.data.data.documentList
                    this.tableData.forEach(ele=>{
                        ele.date = formatDateTime(ele.date)
                        ele[this.select] = highlight(ele[this.select],this.input)
                    })
                    this.relatedList = res.data.data.searchRecordList
                    for(let i = 0 ; i < this.relatedList.length ; i++){
                        for(let j = 0; j<this.options.length ; j++){
                            if(this.options[j].value == this.relatedList[i].search_type){
                                this.relatedList[i].label = this.options[j].label
                            }
                        }
                    }
                    console.log(this.relatedList);
                }else if(res.data.code == '400'){
                    this.tableData = []
                }
                this.isLoading(false)
            })
        },
        clickRelateLink(item){
            this.$router.replace({path:'/searchResult',query:{input:item.search_key,select:item.search_type}}).catch(err=>err)
        }
    },
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
        .bottom{
            width: 100%;
            display: flex;
            .result{
                width: 80%;
            }
            .relate{
                width: 20%;
                .recommend{
                    position: fixed;
                    top: 45%;
                    right: 0;
                    width: 20%;
                    box-shadow: 0 0 3px rgb(191, 191, 191);
                    padding: 10px;
                    .title{
                        font-size: 18px;
                        font-weight: 600;
                        color: #333;
                    }
                    .itemUrl{
                        color: rgba(00, 00, 00, 0.8);
                        padding: 5px;
                        border-bottom: 1px solid #c0c0c0;
                        text-align: center;
                        &:hover{
                            text-decoration: underline;
                            cursor: pointer;
                            color: blue;
                        }
                    }
                }
            }
        }
    }
</style>