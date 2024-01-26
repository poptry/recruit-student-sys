<template>
      <el-menu 
      :default-active="'1'" 
      class="el-menu-vertical-demo" 
      background-color="#545c64" 
      text-color="#fff" 
      active-text-color="#eeeeee">
        <el-menu-item 
        @click="clickMenu(item)" 
        v-for="item in menu" 
        :key="item.name" 
        :index="`${item.name}`">
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    data(){
        return{
            menu:[
                {name:1,label:'用户管理',path:'userManage'},
                {name:2,label:'招生信息管理',path:'recruitManage'},
                {name:3,label:'个人信息',path:'pernalInfo'},
                {name:4,label:'收藏管理',path:'collectManage'},
            ]
        }
    },
    methods:{
        clickMenu(item){
            this.$router.push(`${item.path}`).catch(err=>err)
        }
    }
}
</script>

<style lang="less" scoped>
    .el-menu-vertical-demo{
        min-height: 600px;
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