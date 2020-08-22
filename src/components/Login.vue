<template>
    <div class="container particles"> 
        <div id="particles"></div>
        <div class="wrap">
            <div class="header">
                <div class="image"><img src="../assets/logo.png"></div>
                <div class="title">
                    <span>军事理论</span><br>
                    <span>在线考试系统</span>
                </div>
            </div>
            <div class="main">
                <div class="username">
                    <el-input
                        class="inputUsername"
                        placeholder="请输入账号"
                        v-model="username"
                        clearable>
                        <i slot="prefix" class="el-input__icon el-icon-user"></i>
                    </el-input>
                </div>
                <div class="password">
                    <el-input 
                        class="inputPassword"
                        placeholder="请输入密码"
                        v-model="password"
                        show-password>
                        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                    </el-input>
                </div>
                <div class="veriCode">
                    <div class="veriCodeImg">
                        <img style="cursor:pointer;" id="code_" @click="changeCode" src="http://172.81.235.232:8080/militaryTheoryTestSystem_Web/captcha" alt="看不清？换一张">
                    </div>
                    <el-input
                        class="inputVeriCode"
                        placeholder="输入验证码"
                        v-model="veriCode">
                        <i slot="prefix" class="el-input__icon el-icon-key"></i>
                    </el-input>
                </div>
                <button class="loginBtn" @click="login">
                    登 录
                    <span></span>
                </button>
                <div class="remeberAndForget">
                    <label class="remeberPwd" >
                        <input type="checkbox" v-model="remeber">
                        记住我
                        <img :src="remeber?remeberImg1:remeberImg2" alt="">
                    </label>
                    <a href="mailto:850839565@qq.com?subject=忘记密码&body=邮件内容">忘记密码</a>
                </div>
                
            </div>
            <div class="footer">
                <div class="shareLine">
                    <span>分享到</span>
                </div>
                <div class="shareIcon">
                    <img src="../assets/qqIcon.png" alt="" @click="share('qq')">
                    <img src="../assets/qZone.png" alt="" @click="share('qq')">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import particles from 'particles.js'
import particlesJson from '../assets/particles.json'
export default {
    data() {
        return {
            username: '',
            password: '',
            veriCode: '',
            remeber: false, //判断此时用户是否选择记住密码
            remeberImg1: require('../assets/focus.png'), //记住密码图片
            remeberImg2: require('../assets/onblur.png')
        }
    },
    methods:{
        //页面一加载，判断用户曾经是否选择记住密码
        getStorageRemember(){
            this.remeber=localStorage.getItem('remeber')=='true'?true:false;
            // this.remeberImg=this.remeber?require('../assets/focus.png')
            // :require('../assets/onblur.png');
        },
        changeRemeber(){},
        //分享到QQ或空间
        share(type){
            //部署到线上可以，本地不行
            if(type=='qzone'){
                window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='
                +window.location.href+'?sharesource=qzone&title=军事理论考试系统&pics=图片地址&summary=快来考试吧');
            }else if(type=='qq'){
                window.open('http://connect.qq.com/widget/shareqq/index.html?url='
                +window.location.href+'?sharesource=qzone&title=军事理论考试系统&pics=图片地址&summary=快来考试吧')
            }
        },
        login(){
            ///
            $.ajax({
                type: "POST", //POST?
                url: "http://172.81.235.232:8080/militaryTheoryTestSystem_Web/login",//接口
                data: "id="+this.username+"&pwd="+this.password+"&code="+this.veriCode,
                cache: false,    
                processData: false,
                contentType: false, 
                success: function(data){
                    console.log(data);
                    // let obj=eval("("+data+")");
                    // // let obj=JSON.parse(data);
                    // if(obj["code"]!=200){
                    //     this.message.error('用户名或密码不正确！');
                    // }else if(obj["code"]==200){
                    //     this.message.success('登录成功！');
                    //     //登录成功后保存token
                    //     window.localStorage.setItem('token',obj["token"]);
                    //     if(obj.add=='teacher'){
                    //         this.$router.push('/teacher');
                    //     }else if(obj.add=='student'){
                    //         this.$router.push('/student');
                    //     }else if(obj.add=='admin'){
                    //         this.$router.push('/admin');
                    //     }
                    // }
                },
                error: function(xhr){
                    console.log(xhr.status);
                }
            })
        },
        changeCode(){
            console.log(1);
            document.getElementById("code_").src="http://172.81.235.232:8080/militaryTheoryTestSystem_Web/captcha?"+Math.random();
        }
    },
    mounted(){
        //加载粒子效果
        particlesJS('particles',particlesJson,function() {
            console.log('callback - particles.js config loaded');
        });
        this.getStorageRemember();
    }
};
</script>

<style scoped>
#particles{
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #fff;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50% 50%;
}

* {
  margin: 0;
  padding: 0;
  font-family: Helvetica, sans-serif;
  box-sizing: border-box;
}

.container{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.wrap{
    z-index: 20;
    height: 80vh;
    width: 28vw;
    background-color: #ffffff;
    box-shadow: 0 0 10px 0 rgba(0,33,79,0.11);
}

.header{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 13vh;
    padding: 3vh;
    border-bottom: 1px solid #ededed;
}

.header > .image{
    width: 12vh;
}

.header > .image > img{
    width: 100%;
}

.header > .title{
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    margin-left: 15px;
}

.el-input{
    width: 80%;
    display: block;
    margin: 30px auto;
}

.inputUsername >>> .el-input__inner 
,.inputPassword >>> .el-input__inner
,.inputVeriCode >>> .el-input__inner{
    height: 45px;
    font-size: 16px;
    color: #3D4059;
    background: #F6F6F6;
    outline: none;
}
.inputUsername >>> .el-input__inner::placeholder
,.inputPassword >>> .el-input__inner::placeholder 
,.inputVeriCode >>> .el-input__inner::placeholder{
    color: rgb(191,191,191);
}

.el-input__icon{
    color: rgb(119,119,119);
    font-weight: bold;
    font-size: 16px;
}

.veriCode{
    position: relative;
}

.veriCodeImg{
    z-index: 10;
    position: absolute;
    right: calc(10% + 2px);
    top: 2px;
    width: 25%;
    height: calc(100% - 4px);

}

.veriCodeImg > img{
    height: 100%;
    width: 100%;
}

.loginBtn{
    display: block;
    position: relative;
    width: 80%;
    font-size: 16px;
    font-weight: bold;
    margin: 0 auto 8px;
    padding: .6em 2.2em;
    border: none;
    cursor: pointer;
    user-select: none;
    background-color: transparent;
    overflow: hidden;
}

.loginBtn span{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: transparent;
    border: 3px solid royalblue;
}

.loginBtn span::before{
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4%;
    height: 1500%;
    transform: translate(-50%,-50%) rotate(-70deg);
    background-color: white;
    transition: .3s all;
}

.loginBtn:hover span::before , .loginBtn:focus span::before{
    transform: translate(-50%,-50%) rotate(-90deg);
    width: 100%;
    background:  royalblue;
}

.loginBtn:hover{
    color: white;
}

.remeberAndForget{
    position: relative;
    color: #777;
}

.remeberAndForget > label{
    position: relative;
    margin-left: 10%;
    cursor: pointer;
    user-select: none;
}

.remeberAndForget > label input{
    margin-right: 5px;
}

.remeberAndForget > label img{
    position: absolute;
    left: 0;
    top: 0;
}

.remeberAndForget > a{
    position: absolute;
    right: 10%;
    top: 0;
    color: rgb(119,119,119);
    text-decoration: none;
    cursor: pointer;
    user-select: none;
}

.remeberAndForget > a:hover{
    color: rgb(146,146,146);
}

.footer{
    position: relative;
}

.footer > .shareLine{
    position: relative;
    width: 80%;
    border-bottom: 1px solid #ededed;
    margin: 40px auto 25px;
}

.footer > .shareLine > span{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background: white;
}

.footer > .shareIcon{
    width: 80%;
    margin: 0 auto;
    text-align: center;
}

.footer > .shareIcon > img{
    cursor: pointer;
    padding: 10px 20px;
}

.footer > .shareIcon > img:hover{
    opacity: .7;
}
</style>