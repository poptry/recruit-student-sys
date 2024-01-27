<template>
    <div class="resultList">
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
        </el-table>
    </div>
</template>

<script>
export default {
    props:['tableData'],
    data(){
        return{
            
        }
    },
    methods:{
        clickTitle(row){
            this.$router.push({path:'/detailContent',query:{info:JSON.stringify(row)}}).catch(err=>err)
        },
    }
}
</script>
<style lang="less" scoped>
    .container{
        width: 100%;
        height: 100%;
    }
    .resultList{
        width: 80%;
        padding: 20px;
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
        }
    }
</style>