<template>
    <div class="container">
        <div class="wrap">
            <div class="header">
                <div class="image"><img src="../assets/logo.jpg" alt="秃头"></div>
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
                        prefix-icon="el-icon-lock"
                        show-password>
                    </el-input>
                </div>
            </div>
            <div class="footer">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
        }
    }
};
</script>

<style scoped>
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
    margin-left: 15px;
}

.header > .image > img{
    width: 100%;
}

.header > .title{
    text-align: center;
    font-weight: bold;
    font-size: 20px;
}

.el-input{
    width: 80%;
    display: block;
    margin: 0 auto;
}

.inputUsername >>> .el-input__inner{
    color: #3D4059;
    background: #F6F6F6;
    
}
.inputUsername >>> .el-input__inner::placeholder {
    color: rgb(191,191,191);
}

.inputPassword >>> .el-input__inner{
    color: #3D4059;
    background: #F6F6F6;
    
}
.inputPassword >>> .el-input__inner::placeholder {
    color: rgb(191,191,191);
}

.el-input__icon{
    color: rgb(119,119,119);
    font-weight: bold;
}

</style>