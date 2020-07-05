<template>
    <div class="container particles"> 
        <div id="particles"></div>
        <div class="wrap">
            <div class="header">
                <div class="image"><img src="../assets/logo.png" alt="秃头"></div>
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
                        <img src="../assets/test.png" alt="看不清？换一张">
                    </div>
                    <el-input
                        class="inputVeriCode"
                        placeholder="输入验证码"
                        v-model="veriCode">
                        <i slot="prefix" class="el-input__icon el-icon-key"></i>
                    </el-input>
                </div>
                
            </div>
            <div class="footer">

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
        }
    },
    mounted(){
        //加载例子效果
        particlesJS('particles',particlesJson,function() {
            console.log('callback - particles.js config loaded');
        });
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
    height: 15vh;
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

</style>