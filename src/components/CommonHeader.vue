<template>
  <div class="container">
    <div class="sysName">
        <span style="cursor: pointer;" @click="toHome">招生信息检索系统</span>
    </div>
    <div class="user">
        <span v-if="isVisitor" class="toLogin" @click="toLogin">登录</span>
        <span> 欢迎 </span>
        <el-dropdown @command="handleCommand">
            <span class="dropdown">{{username}}<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="um in userMenu" :key="um.id" :command="um.id">{{ um.name }}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
    data(){
        return{
            circleUrl:'',
            isVisitor:false,
            username:'',
            userMenu:[
                {
                    id:1,
                    name:'个人中心'
                },
                {
                    id:2,
                    name:'退出登录'
                }
            ]
        }
    },
    methods:{
        toLogin(){
            this.$router.push('login')
        },
        //下拉菜单事件
        handleCommand(command){
            if(command == 1){
                this.$router.push('personal')
            }else if(command == 2){
                Cookie.remove('username')
                Cookie.remove('token')
                this.$router.push('login')
            }
        },
        toHome(){
            this.$router.push('/home').catch(err=>err)
        }
    },
    created(){
        this.username = Cookie.get('username')
        const identity = Cookie.get('identity')
        if(identity == 'visitor'){
            this.isVisitor = true
        }
    }
}
</script>

<style lang="less" scoped>
    .container{
        width: 100%;
        height: 60px;
        background-color: #0470ce;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        .sysName{
            margin-left: 50px;
            font-size: 20px;
        }
        .toLogin{
            margin-right: 20px;
            cursor: pointer;
            user-select: none;
        }
        .user{
            margin-right: 20px;
            user-select: none;
            .dropdown{
                cursor: pointer;
                color: #fff;
            }
        }
    }
</style>