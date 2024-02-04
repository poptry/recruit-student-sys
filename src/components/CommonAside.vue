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
import Cookie from 'js-cookie'
import { mapState } from 'vuex'
export default {
    data(){
        return{
        }
    },
    computed:{
        ...mapState('table',['menu']),
        menu(){
            //如果缓存中没有，从store中获取
            return Cookie.get('menu') ? JSON.parse(Cookie.get('menu')) : this.menu
        },
    },
    methods:{
        clickMenu(item){
            this.$router.push(`/personal/${item.path}`).catch(err=>err)
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