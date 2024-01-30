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
                align="center"
                label="发布时间">
            </el-table-column>
            <el-table-column
                prop="type"
                align="center"
                width="80"    
                label="类型">
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
    </div>
</template>

<script>

export default {
    props:['tableData'],
    data(){
        return{
            //分页
            paging:{
                pagesize:8,
                currentPage:1,
            },
        }
    },
    methods:{
        clickTitle(row){
            this.$router.push({path:'/detailContent',query:{info:JSON.stringify(row)}}).catch(err=>err)
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
}
</script>
<style lang="less" scoped>
    .container{
        width: 80%;
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