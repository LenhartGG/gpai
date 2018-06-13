<template>
  <div class="footer">
    <router-link to="/home">
        <i class="iconfont icon-shouye"></i>
        <span>案例</span>
    </router-link>
    <router-link to="/service" v-show="userType == 1&&show">
        <i class="iconfont icon-service"></i>
        <span>客服</span>
    </router-link>
    <router-link to="/service" v-show="userType == 2&&show">
        <i class="iconfont icon-data"></i>
        <span>数据</span>
    </router-link>
    <router-link to="/message">
        <i class="iconfont icon-message"></i>
        <span>消息</span>
    </router-link>
    <router-link to="/user">
        <i class="iconfont icon-user"></i>
        <span>我的</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    data(){
        return {
            msg: 'hello',
            userType: null,
            show:false
        }
    },
    created(){
        this.userType = localStorage.getItem('userType') || null
        // alert(this.userType)
    },
    methods: {},
    computed: {},
    components:{}
  }
</script>

<!--
    display:flex;
    flex-direction:row / column;
    justify-content: center; 垂直居中
    align-item: center; 横向居中
    flex: 1; 每份占1
-->
<style lang="less" scoped>
.footer{
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100px;
    display: flex;
    border-top: 1px solid #ccc;
    background: #fff;
    a{
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: pink;
    }
    a.router-link-active{
        color: red;
    }
    a.router-link-active .icon-shouye{
      background: url('../assets/images/ios_home.png');
    }
    a.router-link-active .icon-service{
      background: url('../assets/images/service_active.png');
    }
    a.router-link-active .icon-message{
      background: url('../assets/images/msg_active.png');
    }
    a.router-link-active .icon-user{
      background: url('../assets/images/user_active.png');
    }
    a.router-link-active .icon-data{
        background: url('../assets/images/data_active.png')
    }
}
.iconfont{
    display: block;
    width: 50px;
    height: 45px;
    background-size: 50px 45px!important;
    background-repeat: no-repeat!important;
}
.icon-shouye{
    background: url('../assets/images/home.png');
}
.icon-service{
    background: url('../assets/images/ios_service.png')
}
.icon-message{
    background: url('../assets/images/ios_message.png')
}
.icon-user{
    background: url('../assets/images/ios_user.png')
}
.icon-data{
    background: url('../assets/images/icon-data.png')
}

</style>
