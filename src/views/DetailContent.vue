<template>
  <div class="container">
    <el-row class="top">
        <el-col :span="12"> <span class="back" style="user-select: none;" @click="goback">&lt; 返回</span> </el-col>
        <el-col :span="12" class="collect">
            <i style="font-size: 20px;" :class="{ 'el-icon-star-on': isCollect, 'el-icon-star-off': !isCollect }"  @click="collect"></i>
            <span  @click="collect" style="user-select: none;"> 收藏</span> </el-col>
    </el-row>
    <div class="article">
        <div class="title">
            <h2>{{ info.title }}</h2>
        </div>
        <div class="relate">
            <div><span>{{ info.date }}</span></div>
            <div>地区：<span>{{ `${info.province}` + `${info.city}` }}</span></div>
            <div>学校：<span class="red">{{ info.school }}</span></div>
            <div>学院：<span>{{ info.academy }}</span></div>
            <div>类型：<span class="red">{{ info.type }}</span></div>
            <div>来源：<a :href="info.url" target="_blank">{{ info.url }}</a></div>
        </div>
        <div class="content">
            <p>{{ info.content }}</p>
        </div>
    </div>
  </div>
</template>

<script>
import {addCollect} from '@/api'
import Cookies from 'js-cookie'
import {recruitInfoDetails} from '@/api'
import {formatDateTime} from '@/util/tools.js'
export default {
    data(){
        return{
            info:{},
            isCollect:false
        }
    },
    methods:{
        goback(){
            this.$router.go(-1)
        },
        collect(){
            const user_id = Cookies.get('userId')
            const obj = {
                document_id:this.info.document_id,
                user_id:user_id
            }
            addCollect(obj).then(res=>{
                if(res.data.code == '200'){
                    this.$notify.success({
                        title: '提示',
                        offset: 100,
                        duration:1000,
                        message: '收藏成功'
                    });
                }else if(res.data.code == '400'){
                    this.$notify.error({
                        title: '提示',
                        offset: 100,
                        duration:1000,
                        message: '已经收藏过了'
                    });
                }
            })
        },
    },
    mounted(){
        const info = JSON.parse(this.$route.query.info)
        recruitInfoDetails({document_id:info.document_id}).then(res=>{
            if(res.data.code == "200"){
                this.info = res.data.data
                this.info.date = formatDateTime(this.info.date)
            }
        })
    }
}
</script>
<style lang="less" scoped>
    .container{
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
            .collect{
                text-align: end;
                padding-right: 20px;
                &:hover{
                    cursor: pointer;
                }
            }
        }
        .article{
            margin-top: 20px;
            .title{
                h2 {
                    text-align: center;
                    font-size: 24px;
                    color: #333;
                }
            }
            .relate{
                font-size: 14px;
                text-align: center;
                margin-top: 15px;
                color: #5b5b5b;
                div{
                    display: inline-block;
                    text-align: center;
                    margin: 0 10px;
                    .red{
                        color: #e62e2e;
                    }
                    a {
                        text-decoration: none;
                        color: #007bff;
                        &:hover{
                            text-decoration: underline;
                            
                        }
                    }
                }
            }
            .content{
                font-size: 16px;
                color: #333333;
                padding: 40px 80px 0;
                font-weight: 500;
            }
        }
    }
</style>