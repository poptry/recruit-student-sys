<template>
      <el-menu 
      :default-active="$route.name"
      class="el-menu-vertical-demo" 
      background-color="#545c64" 
      text-color="#fff" 
      active-text-color="#eeeeee">
        <el-menu-item 
        v-for="item in menu" 
        :key="item.name"
        @click="clickMenu(item)"
        :index="item.path">
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    data(){
        return{
            menu:[
                {label:'用户管理',path:'userManage'},
                {label:'招生信息管理',path:'recruitManage'},
                {label:'个人信息',path:'pernalInfo'},
                {label:'收藏管理',path:'collectManage'},
            ]
        }
    },
    methods:{
        clickMenu(item){
            this.$router.push(`${item.path}`).catch(err=>err)
        },
    },
    created(){

    }
}
</script>

<style lang="less" scoped>
    .el-menu-vertical-demo{
        min-height: 600px;
        user-select: none;
        .el-menu-item{
            background-color: #ffffff !important;
            color: rgba(00, 00, 00, 1) !important;
            &:hover{
                background-color: rgba(41, 118, 190, 0.5) !important;
            }
        }
        .is-active{
          border-radius: 0px;
          background-color: rgba(41, 118, 190, 0.5) !important;
          color: #ffffff !important;
        }
    }
</style>