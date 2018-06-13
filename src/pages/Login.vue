<template>
    <div class="login_page">
            <div class="logo">
                <img src="../assets/images/logo.png" alt="">
            </div>
            <div class="welcome">欢迎使用拍辅通！</div>
            <div class="login">
                <button class="login_btn" v-if="bind" @click="login">登录</button>
                <button class="bind_phone" v-else><router-link :to="{path: '/binding'}" tag="li">绑定手机</router-link> </button>
            </div>
            <div class="tip" v-if="!bind">
                <i class="alarm"></i><span>登录需要绑定手机号</span>
            </div>
    </div>
</template>

<script>
export default {
  data(){
      return{bind:true}
  },
  methods:{
      login(){
          this.bind = false;
      }
  }
}
</script>


<style lang="less" scoped>
.login_page{
    height: 100%;
    width: 100%;
    .logo{
        margin-top: 266px;
        height: 97px;
        img{
            width: 288px;
            height: 97px;
            margin: 0 auto;
        }
    }
    .welcome{
        margin-top: 51px;
        height: 36px;
        line-height: 36px;
        font-size: 38px;
        text-align: center;
        color: #000000;
        font-family: 'PingFang-SC-Regular';
    }
    .login{
        width: 403px;
        margin:  116px auto 0;
        button{
            width: 403px;
            height: 83px;
            border: 0;
            outline: 0;
            font-size: 36px;
            color: #fff;
        }
        .login_btn{
            background: #D80E1C;

        }
        .bind_phone{
            background: #fff;
            color: #333333;
        }
    }
    .tip{
        width: 300px;
        margin: 38px auto 0;
        line-height: 30px;
        font-size: 22px;
        color: #d80e1c;
        position: relative;
        i{
            position: absolute;
            display: inline-block;
            width: 30px;
            height: 30px;
            background: url('../assets/images/tip.png') no-repeat;
            background-size: 30px 30px;
        }
        span{
            padding-left: 39px;
        }

    }
}
</style>
