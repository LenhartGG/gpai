<template>
  <div class="login_page">
    <div class="logo">
        <img src="../assets/images/logo.png" alt="">
    </div>
    <div class="welcome">欢迎使用拍辅通！</div>
    <div class="loading">
      <img src="../assets/images/loding.gif" alt="">
      <p>加载中，请稍等...</p>
    </div>
  </div>
</template>

<script>
import * as ReqUrl from '../../config/ReqUrl'
import qs from 'qs'
const parseForm = qs.stringify
function packup (data = {}) {
    return parseForm({
        info: JSON.stringify(data)
    })
}
export default {
  name: 'loading',
  data () {
    return {
      check:'',
      userId:''
     
    }
  },
  computed:{
    
  },
  methods:{
  },
  created(){
    var that=this
    that.base.getWxOpenid()
    that.check=setInterval(function(){
      var userId=localStorage.getItem('userId')
      if (sessionStorage.openId && sessionStorage.openId != 'undefined' && sessionStorage.openId != 'null'){
        clearInterval(that.check)//清除定时器
        if(userId==-1){    
          that.$router.push({path: '/login'})
        }else{
           that.$router.push({path: '/home'})
        }
      }
    },1000)
  }
}
</script>

<style lang="less" scoped>
.loading{
  overflow: hidden;
  width: 320px;
  margin: 100px auto;
}
.loading img{
  width: 60px;
  height: 60px;
  float: left;
}
.loading p{
  font-size: 28px;
  float: left;
  line-height: 60px;
  margin-left: 10px;
  color: #D80E1C;
}
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