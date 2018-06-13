<template>
    <!-- 价格建议 -->
    <div>
      <!-- 评估价 -->
      <div class="report" inputRefs="pgj" @click="inputShow($event)">
        <div class="tit clearfix" inputRefs="pgj">
          <div class="left fl" inputRefs="pgj">评估价</div>
          <div class="right fr" inputRefs="pgj">
            <span class="arrow " inputRefs="pgj"><span class="r_arrow" inputRefs="pgj" v-show="userType ==1"></span></span>
          </div>
          <div class="center fr" inputRefs="pgj" v-show="pgj">{{pgj}}元</div>
        </div>
      </div>
      <!-- 建议起拍价 -->
      <div class="report" inputRefs="jyqpj" @click="inputShow($event)">
        <div class="tit clearfix" inputRefs="jyqpj">
          <div class="left fl" inputRefs="jyqpj">建议起拍价</div>
          <div class="right fr" inputRefs="jyqpj">
            <span class="arrow " inputRefs="jyqpj"><span class="r_arrow" inputRefs="jyqpj" v-show="userType ==1"></span></span>
          </div>
          <div class="center fr" inputRefs="jyqpj" v-show="jyqpj">{{jyqpj}}元</div>
        </div>
      </div>
      <!-- 建议加价幅度 -->
      <div class="report" inputRefs="jyjjfd" @click="inputShow($event)">
        <div class="tit clearfix" inputRefs="jyjjfd">
          <div class="left fl" inputRefs="jyjjfd">建议加价幅度</div>
          <div class="right fr" inputRefs="jyjjfd">
            <span class="arrow " inputRefs="jyjjfd"><span class="r_arrow" inputRefs="jyjjfd" v-show="userType ==1"></span></span>
          </div>
          <div class="center fr" inputRefs="jyjjfd" v-show="jyjjfd">{{jyjjfd}}元</div>
        </div>
      </div>
      <!-- 输入框界面 -->
      <div class="section_input" v-show="showInput">
        <!-- 输入框text -->
        <div class="text">
          <mt-field  v-model="inputData" type="number"></mt-field>
        </div>
        <!-- 保存弹框 -->
        <div class="input_confirm">
            <ul>
                <li class="confirm"></li>
                <li class="save" @click="input_save()">确定</li>
            </ul>
        </div>
      </div>
      <!-- 确认完成 -->
      <section class="sec_confirm" v-show="addyxqPersonState!='1' && userType ==1">
        <div class="left fl" @click="saveInfo('1')">确认完成</div>
        <div class="right fr" @click="saveInfo('0')">保存</div>
      </section>
      
    </div>
</template>
<script>
import * as ReqUrl from '../../../config/ReqUrl'
import { MessageBox } from 'mint-ui';
import qs from 'qs'
const parseForm = qs.stringify
function packup (data = {}) {
    return parseForm({
        info: JSON.stringify(data)
    })
}
export default {
  data(){
    return{
      typeId:'',
      showInput:false,
      thisInput:'',
      inputData:'',
      pgj:'',
      jyqpj:'',
      jyjjfd:'',
      userType: null,
      isSave: false

    }
  },
  created(){
      this.ut = localStorage.getItem('ut') || ''
      this.userType = localStorage.getItem('userType')
      console.log(this.userType)
      console.log(this.ut)
      this.$wx.ready(function(){
          console.log('111')
      })
      this.typeId=this.$route.query.typeId
      this.addyxqPersonState=sessionStorage.addyxqPersonState
      // 查询数据
      this.getData()
  },
  methods:{
    inputShow(e){
      if(this.addyxqPersonState!='1'&&this.userType=='1'){
        this.showInput=true
      }
      this.thisInput=e.target.getAttribute('inputRefs')
      if(this.thisInput=='pgj'){
        this.inputData=this.pgj
      }else if(this.thisInput=='jyqpj'){
        this.inputData=this.jyqpj
      }else if(this.thisInput=='jyjjfd'){
        this.inputData=this.jyjjfd
      }
    },
    input_save(){
      this.showInput=false
    },
    //查询数据
    getData(){
      console.log(this.typeId)
      var that = this
      let data = {
          type_code: that.typeId || sessionStorage.typeId,
          userId: localStorage.userId,
          prodId: localStorage.productId
      }
      let url = `${ReqUrl.baseinfoQuery}`;
      that.$http.post(
          url,
          packup(data),
          {
              headers:{openId: sessionStorage.openId}
          }
      )
      .then(res => {
          console.log(res)
          that.pgj=res.data.data.data.evaluate_price
          that.jyqpj=res.data.data.data.start_price
          that.jyjjfd=res.data.data.data.step_price
      })
      .catch(error => {
          console.log(error);
      });
    },
    saveInfo(val){
      if(!this.pgj){
        alert('请输入评估价')
      }else if(!/^\d+(\.\d+)?$/.test(this.pgj)){
        alert('评估价格式不正确')
      }else if(!this.jyqpj){
        alert('请输入建议起拍价')
      }else if(!/^\d+(\.\d+)?$/.test(this.jyqpj)){
        alert('建议起拍价格式不正确')
      }else if(!this.jyjjfd){
        alert('请输入建议加价幅度')
      }else if(!/^\d+(\.\d+)?$/.test(this.jyjjfd)){
        alert('建议加价幅度格式不正确')
      }else{
        if(val=='1'){
          MessageBox.confirm('确认完成后将无法修改信息').then(action => {
            console.log(action)
            if(action=='confirm'){
              this.postSave(val)
            }
          })
        }else{
          this.postSave(val)
        }
        
        
      }
    },
    postSave(status){
      var that=this;
      if(that.isSave) return
      let url = `${ReqUrl.add}`
      let data = {
        status: status,//0保存1完成
        type_code: that.typeId || sessionStorage.typeId,
        userId: localStorage.userId,
        prodId: localStorage.productId,
        data06:{
          evaluate_price:that.pgj,
          start_price:that.jyqpj,
          step_price:that.jyjjfd
        } 
      }
      that.$http.post(
          url,
          packup(data),
          {
              headers:{openId: sessionStorage.openId}
          }
      )
      .then(res => {
          console.log(res)
          if(res.data.code=='0000'){
            that.isSave = true
              that.$router.go(-1)
          }else{
              alert('操作失败')
          }
      })
      .catch(error => {
          console.log(error);
      });
    }
  },
  watch:{
    inputData(){
      if(this.thisInput=='pgj'){
        this.pgj=this.inputData
      }else if(this.thisInput=='jyqpj'){
        this.jyqpj=this.inputData
      }else if(this.thisInput=='jyjjfd'){
        this.jyjjfd=this.inputData
      }
    }
  }
}
</script>

<style lang="less" scoped>
.otherSuggest{
  width: 50%;
  position: fixed;
  z-index: 10;
  right: 0;
  bottom: 0;
  background: #D80E1C;
  color: #fff;
  text-align: center;
  height: 82px;
  line-height: 82px;
  font-size: 34px;
}
.report{
  background: #fff;
  margin-bottom: 17px;
  .tit{
    height: 93px;
    line-height: 93px;
    text-indent: 30px;
    .left{
      margin-left: 30px;
      color: #333333;
      font-size: 28px;
    }
    .center{
      font-size: 26px;
      color: #666;
    }
    .right{
      margin-right: 28px;
    }
  }
}
.sec_confirm{
  position: fixed;
  bottom: 0;
  width: 100%;
  div{
    height: 82px;
    line-height: 82px;
    font-size: 34px;
    text-align: center;
    width: 50%;
  }
  .left{
    background: #D80E1C;
    color: #fff;
  }
  .right{
    background: #fff;
    color: #333333;
  }
}

.section_input{
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f0f0f0;
  .input_confirm{
    position: fixed;
    z-index: 2;
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
        }
        .save{
            color: #333333;
            background: #FFFFFF;
        }
    }
  }
  .text{
    height: 102px;
    line-height: 102px;
    background: #FFFFFF;
  }
}

.mint-cell:last-child{
  background: none;
}
</style>
