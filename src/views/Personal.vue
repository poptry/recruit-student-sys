<template>
  <div class="container">
    <el-container>
        <el-aside width="200px">
            <common-aside></common-aside>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue';
export default {
    data(){
        return {

        }
    },
    components:{
        CommonAside
    }
}
</script>

<style lang="less" scoped>
    .container{
        width: 100%;
        height: 100%;

        .el-container{
            width: 100%;
            height: 100%;
            
            ::v-deep .el-aside,.el-main{
                padding: 0;
                .el-menu{
                    height: 100%;
                    width: 100%;
                    padding: 0;
                    background-color: #ffffff !important;
                }
            }
            ::v-deep .el-main{
                padding: 20px;
            }
        }
    }
</style>