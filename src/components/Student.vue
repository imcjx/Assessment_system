<template>
    <div>
        <div class="header">
            <div class="header-left">
                <div class="image"><img src="../assets/logo.png"></div>
                <div class="title">
                    <span>军事理论</span><br>
                    <span>在线考试系统</span>
                </div>
            </div>
            <div class="header-right">
                <div class="welUser">
                    欢迎你，曹鑫
                </div>
            </div>
        </div>
        <div class="left">
            123
        </div>
        <div class="right">456</div>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: Helvetica, sans-serif;
  box-sizing: border-box;
}

.header{
    position: relative;
    height: 10vh;
    margin-bottom: 3vh;
    background-color: #ffffff;
    box-shadow: 0 0 10px 0 rgba(0,33,79,0.11);
}

.header-left{
    display: table;
    height: 100%;
}

.header-left .image{
    float: left;
    height: 8vh;
    margin-left: 5vw;
    margin-top: 1vh;
    margin-right: 15px;
}

.header-left .image img{
    height: 100%;
}

.header-left .title{
    display: table-cell; 
    vertical-align:middle;
    font-weight: bold;
    font-size: 18px;
    text-align: center;
}

.header-right{
    position: absolute;
    right: 3%;
    top: 50%;
    transform: translateY(-50%);
    font-weight: bold;
    font-size: 20px;
}

.left{
    float: left;
    width: 14vw;
    height: 87vh;
    border-radius: 5px;
    box-shadow: 0 0 12px 0 rgba(0,33,79,0.11);
}

.right{
    float: right;
    width: 84vw;
    height: 87vh;
    border-radius: 5px;
    box-shadow: 0 0 12px 0 rgba(0,33,79,0.11);
}
</style>