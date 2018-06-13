<template>
<!-- 文本输入页面 -->
<div class="section_input">
  <!-- 输入框 -->
  <div class="text">
    <mt-field  v-model="value"></mt-field>
  </div>
  <!-- 保存弹框 -->
  <div class="input_confirm">
      <ul>
          <li class="confirm"></li>
          <li class="save" @click="save">保存</li>
      </ul>
  </div>
</div>
</template>

<script>
export default {
  data(){
    return {
      value:''
    }
  },
  mount(){

  },
  methods:{
    save(){
      console.log(this.$route.query.case);

      localStorage.setItem(this.$route.query.case, this.value);
      this.back();
    },
    back(){
      this.$router.go(-1);
    },
  }
}
</script>


<style lang="less" scoped>
.section_input{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f0f0f0;
  .text{
    height: 102px;
    line-height: 102px;
    background: #FFFFFF;
  }
}
.section_confirm{
    position: fixed;
    bottom: 0;
    width: 100%;
    ul{
        li{
            height: 82px;
            line-height: 82px;
            float: left;
            width: 50%;
            text-align: center;
            font-size: 34px;
        }
        .input_confirm{
            background: #FFFFFF;
            color: #FFFFFF;
        }
        .save{
            color: #333333;
            background: #D80E1C;
        }
    }
}
.input_confirm{
    position: fixed;
    bottom: 0;
    width: 100%;
    ul{
        li{
            height: 82px;
            line-height: 82px;
            float: left;
            width: 50%;
            text-align: center;
            font-size: 34px;
        }
        .confirm{
            background: #FFFFFF;
            color: #FFFFFF;
        }
        .save{
            color: #333333;
            background: #D80E1C;
        }
    }
}
.mint-cell:last-child{
  background: none;
}
</style>

