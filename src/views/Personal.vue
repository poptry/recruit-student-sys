<template>
  <div class="container">
    <el-row class="top">
        <el-col :span="24"> <span class="back" style="user-select: none;" @click="goback">&lt; 返回</span> </el-col>
    </el-row>
    <el-container v-if="!isVisitor">
        <el-aside width="200px">
            <common-aside></common-aside>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
    <div v-if="isVisitor" class="showVisitor">
      <div class="noLogined">
        <div class="toLogin">个性化推荐，请先<span @click="toLogin">登录</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import CommonAside from '@/components/CommonAside.vue';
export default {
    data(){
        return {
            isVisitor:false
        }
    },
    components:{
        CommonAside
    },
    methods:{
        //前往登录界面
        toLogin(){
            this.$router.push('login')
        },
        goback(){
            this.$router.go(-1)
        },
    },
    created(){
        const identity = Cookies.get('identity')
        if(identity == 'visitor'){
            this.isVisitor = true
        }
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
                height: 100%;
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
        .top{
            margin-top: 8px;
            padding: 10px;
            border-bottom: 1px solid #e3e3e3;
            .back{
                color: #333;
                &:hover{
                    color: #007bff;
 
                    cursor: pointer;
                }
            }
        }
    }
    .showVisitor{
        width: 100%;
        height: 100%;
        .noLogined{
        width: 100%;
        height: 100%;
        .toLogin{
            display: block;
            width: 30%;
            text-align: center;
            border: 0;
            background-color: #fff;
            height: 60px;
            margin: 300px auto;
            color: rgba(00, 00, 00, 0.6);
            span{
            text-decoration: underline;
            color: #0076dd;
            &:hover{
                cursor: pointer;
            }
            }
        }
        }
    }
</style>