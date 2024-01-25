<template>
  <div class="box">
    <h1 class="error">招 生 信 息 检 索 系 统</h1>
	<!---728x90--->
    <div class="w3layouts-two-grids">
	<!---728x90--->
        <div class="mid-class">
            <div class="img-right-side">
                <img src="@/assets/images/login.jpg" class="img-fluid" alt="">
            </div>
            <!-- 登录 -->
            <div v-show="!registerState" class="txt-left-side" style="height: 50%;">
                <h2> 登录</h2>
                <el-form  ref="form"  inline label-width="70px" :model="form" :rules="rules" label-position="left">
                  <el-form-item  label="用户名" prop="username">
                      <el-input v-model="form.username" placeholder="请输入账号"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                      <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-radio-group v-model="form.identity">
                      <el-radio label="游客"></el-radio>
                      <el-radio label="用户"></el-radio>
                      <el-radio label="管理员"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item>
                      <el-button  type="primary" class="login" @click="submit">登录</el-button>
                  </el-form-item>
                </el-form>
                <div class="w3layouts_more-buttn">
                    <h3 style="color: rgb(71, 135, 247);cursor: pointer;" @click="toRegister">注册账号</h3>
                </div>
                <div class="clear"></div>
            </div>
            <!-- 注册 -->
            <div v-show="registerState" class="txt-left-side" style="height: 50%;">
                <h2>注册</h2>
                <el-form  ref="registerInfo"  inline label-width="70px" :model="registerInfo" :rules="rules" label-position="left">
                  <el-form-item  label="用户名" prop="username">
                      <el-input @blur="checkUserName"  v-model="registerInfo.username" placeholder="请输入账号"></el-input>
                  </el-form-item>
                  <el-form-item  label="手机号" prop="userphone">
                      <el-input v-model="registerInfo.userphone" placeholder="请输入手机号"></el-input>
                  </el-form-item>
                  <el-form-item  label="验证码" prop="usercode">
                      <el-input v-model="registerInfo.usercode" placeholder="请输入验证码"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                      <el-input type="password" v-model="registerInfo.password" placeholder="请输入密码"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="repassword">
                      <el-input type="password" v-model="registerInfo.repassword" placeholder="请再次输入密码"></el-input>
                  </el-form-item>
                  <el-form-item>
                      <el-button  type="primary" class="login" @click="submitRegister">注册</el-button>
                  </el-form-item>
                </el-form>
                <div class="w3layouts_more-buttn">
                    <h3 style="color: rgb(71, 135, 247);cursor: pointer;" @click="toLogin">登录账号</h3>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import '@/assets/css/login.css'
import {userLogin,userRegister,check} from '@/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    var checkPassword = (rule, value, callback) => {
      if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerInfo.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
    };
      return {
        form:{
            username:'',
            password:'',
            identity:'用户'
          }, 
          rules:{
              username:[{required:true,message: '请输入用户名', trigger: 'blur' }],
              password:[{required:true,message: '请输入密码', trigger: 'blur' }],
              userphone:[{required:true,message: '请输入手机号', trigger: 'blur' }],
              usercode:[{required:true,message: '请输入验证码', trigger: 'blur' }],
              repassword:[{validator: checkPassword, trigger: 'blur'}],
          },
          registerInfo:{
              username: '',
              password: '',
              userphone: '',
              usercode: '',
              repassword:''
          },
          btndisabled:false,
          time:'获取',
          registerState:false,
          hasRegister:false
      }
    },
    methods:{
      ...mapMutations('user',['getIsVisitor']),
      randomNum(){
        return Math.floor(10000 + Math.random() * 90000);
      },
      submit(){
        let num = this.randomNum()
        if(this.form.identity === '游客'){
          Cookie.set('identity',"visitor")
          Cookie.set('username',`游客${num}`)
          //存储在Vuex
          this.getIsVisitor(true)
          this.$router.push('home')
        }
        //校验通过
        this.$refs.form.validate((valid)=>{
          //校验通过
          if(valid){
            userLogin(this.form).then(({data})=>{
              console.log(data);
              // 判断code是不是20000
              if(data.code == '200'){
                  Cookie.set('token',data.data.token)
                  Cookie.set('username',this.form.username)
                  Cookie.set('userId',data.data.userId)
                  //如果有游客cookie清楚掉
                  Cookie.remove('identity')
                  //获取菜单的数据，存入store
                  // this.$store.commit('setMenu',data.data.menu)
                  // this.$store.commit('addMenu',this.$router)
                    //跳转到首页
                    this.$router.push('/home')
              }else {
                  this.$message.error(data.msg);
              }
            })
          }
        })       
      },
      submitRegister(){
        if(this.hasRegister){
          this.$notify.error({
            title: '错误',
            message: '该用户名已经存在'
          });
          return false;
        }
        this.$refs.registerInfo.validate((valid)=>{
          //校验通过
          if(valid){
            userRegister(this.registerInfo).then(({data})=>{
              console.log(data);
            })
          }
        })
      },
      checkUserName(){
        check({user_name:this.registerInfo.username}).then(res=>{
          if(res.data.code == '400'){
            this.hasRegister = true
            this.$notify.error({
              title: '错误',
              message: '该用户名已经存在'
            });
          }else{
            this.hasRegister = false
          }
        })
      },
      toRegister(){
        this.registerState = true
      },
      toLogin(){
        this.registerState = false
      }
    }
}
</script>

<style lang="less" scoped>
  .box{
    width: 100%;
    height: 100%;
    .txt-left-sid{
      .el-form{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .el-form-item{
          width: 100%;
        }
      }
    }
  }
</style>