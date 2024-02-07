<template>
  <div class="contain">
    <div class="search">
      <el-input placeholder="请输入内容" @keyup.enter.native="search" v-model="input" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <span  class="advanced-search" @click="toAdvancedSearch">高级检索></span>
    </div>
    <span  v-if="!isVisitor" class="rec-title">地区推荐</span>
    <div v-if="!isVisitor" class="recommandByRegion">
      <div v-for="(item,index) in recommandByRegionInfo" :key="index" class="every-item">
        <span @click="toDetail(item)">{{ item.title }}</span>
      </div>
    </div>
    <span  v-if="!isVisitor" class="rec-title">个性推荐</span>
    <div v-if="!isVisitor" id="recommand" class="recommand">
      <div v-for="(r,index) in recommandInfo" :key="index" class="card animate__animated animate__zoomIn" @click="toDetail(r)">
        <h3>{{ r.title}}</h3>
        <p class="content">{{ r.content }}</p>
        <el-row><el-col :span="6"><i class="iconfont icon-xuexiao_xuexiaoxinxi"></i><span>学校:</span></el-col><el-col :span="18"><span>{{r.school}}</span></el-col></el-row>
        <el-row><el-col :span="6"><i class="iconfont icon-xueyuan"></i><span>学院:</span></el-col><el-col :span="18"><span>{{r.academy}}</span></el-col></el-row>
        <el-row><el-col :span="6"><i class="iconfont icon-leixing"></i><span>类型:</span></el-col><el-col :span="18"><span>{{r.type}}</span></el-col></el-row>
        <span class="time">{{ r.date }}</span>
        <span class="city">{{ `${r.province}` + `${r.city}` }}</span>
      </div>
    </div>
    <div v-if="isVisitor" class="showVisitor">
      <div class="noLogined">
        <div class="toLogin">个性化推荐，请先<span @click="toLogin">登录</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { Loading } from 'element-ui';
import {getRecommandInfo,regionRecommend} from '@/api'
import {formatDateTime} from '@/util/tools.js'
export default {
  data(){
    return{
      input:'',
      select:'title',
      options:[
        {
          value:'title',
          label:'标题'
        },
        {
          value:'content',
          label:'全文'
        },
        {
          value:'province',
          label:'省份'
        },
        {
          value:'city',
          label:'城市'
        },
        {
          value:'school',
          label:'学校'
        },
        {
          value:'academy',
          label:'学院'
        }
      ],
      recommandInfo:[],
      recommandByRegionInfo:[],
      isVisitor:false
    }
  },
  methods:{
    //前往高级检索界面
    toAdvancedSearch(){
      this.$router.push('/advancedSearch')
    },
    //搜索事件
    search(){
      this.$router.push({path:'/searchResult',query:{input:this.input,select:this.select}})
    },
    //推荐点击
    toDetail(r){
      this.$router.push({path:'/detailContent',query:{info:JSON.stringify(r)}}).catch(err=>err)
    },
    //前往登录界面
    toLogin(){
      this.$router.push('login')
    }
  },
  async created(){
    const userId = Cookies.get('userId')
    const identity = Cookies.get('identity')
    if(identity != 'visitor'){
      this.isVisitor = false
      //获取推荐
      let loadingInstance = Loading.service(); //开始加载
      await getRecommandInfo({user_id:userId}).then((data)=>{
        if(data.data.code == '200'){
          this.recommandInfo = data.data.data
          this.recommandInfo.forEach(ele=>{
            ele.date = formatDateTime(ele.date)
          })
        }
      })
      //获取地区推荐
      await regionRecommend().then(res=>{
        console.log(res);
        if(res.data.code == '200'){
          this.recommandByRegionInfo = res.data.data
          console.log(this.recommandByRegionInfo);
        }
      })
      this.$nextTick(() => {
        loadingInstance.close();
      });
    }else{
      this.isVisitor = true
    }

  }
}
</script>

<style lang="less" scoped>
  .contain{
    width: 100%;
    height: 100%;
    margin-top: 40px;
  }
  .rec-title{
    left: 100px;
    margin: 20px 0;
    margin-left: 30px;
    display: block;
    color: #808080;
  }
  .recommand{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .card{
      position: relative;
      width: 20%;
      height: 250px;
      min-width: 215px;
      margin: 0 calc(20%/4/2) 20px calc(20%/4/2) ;
      user-select: none;
      background-color: #ffffff;
      border-radius: 5px;
      box-shadow: 0 0  15px rgba(0, 0, 0, .5);
      padding: 10px;
      &:hover{
        cursor: pointer;
        box-shadow: 8px 8px  20px rgba(0, 0, 0, .5);
      }
      h3{
        white-space: nowrap;        /* 防止文本换行 */
        overflow: hidden;           /* 隐藏超出范围的部分 */
        text-overflow: ellipsis;  /* 显示省略号 */
        text-align: center;
        padding: 10px;
        margin-bottom: 10px;
      }
      .content{
        display: -webkit-box;
        -webkit-line-clamp: 3;  /* 设置固定的行数 */
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-bottom: 10px;
      }
      .iconfont{
        color: #0470ce;
        margin-right: 5px;
      }
      .time{
        position: absolute;
        color: #3c3c3c;
        font-size: 12px;
        bottom: 10px;
        right: 10px;
      }
      .city{
        position: absolute;
        color: #0076dd;
        font-size: 12px;
        bottom: 10px;
        left: 10px;
      }
    }
  }
  .recommandByRegion{
    width: 95%;
    padding: 20px;
    box-shadow: 0 0  15px rgba(0, 0, 0, .5);
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    .every-item{
      width: 30%;
      margin:5px calc(10% / 3 / 2);
      border-bottom: 1px dotted #a0a0a0;
    }
    span{
      display: inline-block;
      width: 100%;
      overflow: hidden; 
      white-space: nowrap; 
      text-overflow: ellipsis;
      &:hover{
        color: #34a0ff;
        cursor: pointer;
      }
    }
  }
  .search{
    position: relative;
    width: 100%;
    padding: 40px 0 100px 0 ;
    --size: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background: #0470ce;
    background-size: var(--size) var(--size);
    .input-with-select{
      width: 60%;
      padding: 30px;
      background-color:rgba(00, 00, 00, 0.3);
      border-radius: 0.8em;
      .el-select{
        width: 80px;
      }
      .el-input {
        width: 100%;
        /deep/ .el-input-group__prepend{
          border-radius: 0;
        }
      }
      .input-with-select,.el-input-group__prepend {
        background-color: #fff;
      }
    }
    .advanced-search{
      position: absolute;
      display: block;
      right:200px;
      top: 86px;
      color:rgb(255, 255, 255);
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
        margin: 200px auto;
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