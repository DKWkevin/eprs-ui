<template>
  <div>
  <img src="@/assets/logo.png">
  <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <span class="tool-bar">
    </span>
    <h2 class="title" style="padding-left:22px;" >系统登录</h2>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item >
      <el-col :span="12" style="height:40px">
        <el-form-item prop="captcha">
          <el-input type="test" v-model="loginForm.captcha" auto-complete="off" placeholder="验证码, 单击图片刷新"
            style="width: 100%;"  @keyup.enter.native="login">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="1">&nbsp;</el-col>
      <el-col :span="11" style="height:40px">
        <el-form-item>
            <img style="width: 100%;" class="pointer" :src="loginForm.src" @click="refreshCaptcha">
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item >
      <el-col :span="11">
        <el-checkbox v-model="saveAll" label="记住密码"></el-checkbox>
      </el-col>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:48%;" @click.native.prevent="reset">重 置</el-button>
      <el-button type="primary" style="width:48%;" @click.native.prevent="login" :loading="loading">登 录</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import Cookies from "js-cookie"
export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      loginForm: {
        account: '',
        password: '',
        captcha:'',
        src: ''
      },
      fieldRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      checked: true,
      saveAll:false
    }
  },
  methods: {
    login() {
      if(this.loginForm.password.trim().length<6){
        this.$message({message:"密码不能小于六位,请修改密码",type:'warning'});
      }
      if(this.loginForm.password.trim() === "123456"){
        this.$message({message:"密码不能为初始密码,请修改密码",type:'warning'});
      }
      this.loading = true;
      let userInfo = { account:this.loginForm.account, password:this.loginForm.password,
        captcha:this.loginForm.captcha };
      this.$api.login.login(userInfo).then((res) => {  // 调用登录接口
          if(res.msg != null) {
            this.$message({ message: res.msg, type: 'error' });
            this.refreshCaptcha();
            this.loading = false;
          } else {
            //Cookies.set('token', res.data.token);
            // 保存用户到本地会话
            if(this.saveAll===true){
              this.addCookies('account', this.loginForm.account);
              this.addCookies('password', this.loginForm.password);
              this.addCookies('saveAll', this.saveAll);
            }else{
              if(Cookies.get('account')!==undefined){
                Cookies.remove('account');
              }
              if(Cookies.get('password')!==undefined){
                Cookies.remove('password');
              }
              if(Cookies.get('saveAll')!==undefined){
                Cookies.remove('saveAll');
              }
            }
            sessionStorage.setItem('token', res.data.token); // token
            sessionStorage.setItem('userid', res.data.user.employeeid); // 人员id
            sessionStorage.setItem('username', res.data.user.employeename); // 人员名称
            sessionStorage.setItem('useropcode', res.data.user.employeeopcode); // 人员操作码
            sessionStorage.setItem('deptid', res.data.user.deptid); // 部门id
            sessionStorage.setItem('deptname', res.data.user.deptname); // 部门名称
            sessionStorage.setItem('companyid', res.data.user.companyid); // 公司id
            sessionStorage.setItem('companyname',res.data.user.companyname);//公司名称
            this.$store.commit('menuRouteLoaded', false); // 要求重新加载导航菜单
            this.$router.push('/');  // 登录成功，跳转到主页
          }
          this.loading = false
        }).catch((res) => {
          this.$message({ message: res.message, type: 'error' });
          this.refreshCaptcha();
          this.loading = false;
        })
    },
    refreshCaptcha: function(){
      this.loginForm.src = this.global.baseUrl + "/captcha.jpg?t=" + new Date().getTime();
    },
    reset() {
      this.$refs.loginForm.resetFields();
    },
    addCookies(name,value){
      let str=name+"="+value+"; expires=Fri, 31 Dec 9999 23:59:59 GMT";
      document.cookie = str;
    }
  },
  created(){
    if(Cookies.get('account')!==undefined){
      this.loginForm.account=Cookies.get('account');
    }
    if(Cookies.get('password')!==undefined){
      this.loginForm.password=Cookies.get('password');
    }
    if(Cookies.get('saveAll')!==undefined){
      this.saveAll = Cookies.get('saveAll') === "true";
    }
  },
  mounted() {
    this.refreshCaptcha();
  }
}
</script>

<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 30px auto;
      text-align: center;
      color: #505458;
    }
  }
</style>
