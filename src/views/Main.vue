<template>
    <div class="container">
        <el-container>
            <el-header>
                <common-header />
            </el-header>
            <el-main>
                <!-- 路由出口 路由匹配到的组件渲染到这里-->
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import CommonHeader from '../components/CommonHeader.vue';
import CommonTag from '../components/CommonTag.vue';

export default {
    data() {
        return {
        }
    },
    components: {
        CommonHeader,
        CommonTag
    }
}
</script>
<style scoped>
.container{
    width: 100%;
    height: 100%;
}
.el-container{
    width: 100%;
    height: 100%;
    min-height: 100vh;
}
.el-header {
    padding: 0;
    margin-bottom: 40px;
    height: 20%;
}
.el-main{
    padding: 0;
    width: 100%;
    height: 80%;
}
</style>