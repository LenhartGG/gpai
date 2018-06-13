<template>
    <!-- 1基本信息 -->
    <div>
        <section>
            <ul>
                <li inputRefs="name" @click="toInput($event)">
                    <div inputRefs="name" class="fl">姓名</div>
                    <div inputRefs="name" class="fr"><span inputRefs="name">{{name}}</span><span inputRefs="name" class="arrow r_arrow"></span></div>
                </li>
                <li inputRefs="yxqType" @click="yxqrTypeChoose($event)">
                    <div inputRefs="yxqType" class="fl">优先权类型</div>
                    <div inputRefs="yxqType" class="fr">
                      <span inputRefs="yxqType" v-show="yxqType=='1'">承租人</span>
                      <span inputRefs="yxqType" v-show="yxqType=='2'">共有人</span>
                      <span inputRefs="yxqType" v-show="yxqType=='3'">股东</span>
                      <span inputRefs="yxqType" class="arrow r_arrow"></span>
                    </div>
                </li>
                <li inputRefs="seChoose" @click="swChoose($event)">
                    <div inputRefs="seChoose" class="fl">顺位选择</div>
                    <div inputRefs="seChoose" class="fr"><span inputRefs="seChoose">{{seChoose}}</span><span inputRefs="naseChooseme" class="arrow r_arrow"></span></div>
                </li>
                <li  inputRefs="mobile" @click="toInput($event)">
                    <div inputRefs="mobile" class="fl">联系电话</div>
                    <div inputRefs="mobile" class="fr"><span inputRefs="mobile">{{mobile}}</span><span inputRefs="mobile" class="arrow r_arrow"></span></div>
                </li>
            </ul>
        </section>


        <!-- 标的物类型 -->
        <section>
            <ul>
                <li  inputRefs="idCardChoose" @click="zjlxTypeChoose($event)">
                    <div inputRefs="idCardChoose" class="fl">证件类型</div>
                    <div inputRefs="idCardChoose" class="fr">
                      <span inputRefs="idCardChoose" v-show="idCardChoose=='1'">居民身份证</span>
                      <span inputRefs="idCardChoose" v-show="idCardChoose=='2'">中国公民护照</span>
                      <span inputRefs="idCardChoose" v-show="idCardChoose=='3'">台湾居民来往大陆通行证</span>
                      <span inputRefs="idCardChoose" v-show="idCardChoose=='4'">港澳居民来往内地通行证</span>
                      <span inputRefs="idCardChoose" v-show="idCardChoose=='5'">外国公民护照</span>
                      <span inputRefs="idCardChoose" v-show="idCardChoose=='6'">户口薄</span>
                      <span inputRefs="idCardChoose" v-show="idCardChoose=='7'">营业执照</span>
                      <span inputRefs="idCardChoose" v-show="idCardChoose=='8'">组织机构代码证</span>
                      <span inputRefs="idCardChoose" v-show="idCardChoose=='9'">事业法人登记证</span>
                      <span inputRefs="idCardChoose" v-show="idCardChoose=='10'">社会统一信用代码证</span>
                      <span inputRefs="idCardChoose" v-show="idCardChoose=='11'">军官证</span>
                      <span inputRefs="idCardChoose" class="arrow r_arrow"></span>
                    </div>
                </li>
                <li inputRefs="idCard" @click="toInput($event)">
                    <div inputRefs="idCard" class="fl">证件号码</div>
                    <div inputRefs="idCard" class="fr"><span inputRefs="idCard">{{idCard}}</span><span inputRefs="idCard" class="arrow r_arrow"></span></div>
                </li>
                <li  inputRefs="reIdCard" @click="toInput($event)">
                    <div inputRefs="reIdCard" class="fl">确认号码</div>
                    <div inputRefs="reIdCard" class="fr"><span inputRefs="reIdCard">{{reIdCard}}</span><span inputRefs="reIdCard" class="arrow r_arrow"></span></div>
                </li>
            </ul>
        </section>
        <section>
            <ul>
                <li inputRefs="address" @click="toInput($event)">
                    <div inputRefs="address" class="fl">送达地址</div>
                    <div inputRefs="address" class="fr"><span inputRefs="address" class="overHidden">{{address}}</span><span inputRefs="address" class="arrow r_arrow"></span></div>
                </li>
                <li inputRefs="otherText" @click="toInput($event)" class="meanText">
                    <div inputRefs="otherText" class="fl">说明</div>
                    <div inputRefs="otherText" class="fr"><div class="text" inputRefs="otherText"><p inputRefs="otherText" class="mainText">{{otherText}}</p></div><span inputRefs="otherText" class="arrow r_arrow"></span></div>
                </li>
            </ul>
        </section>
        <!-- 下拉框 -->
        <div class="section_combobox" v-show="chooseListState">
          <div class="box">
            <div class="title">
              请选择
            </div>
            <div class="content">
              <mt-radio
                align="right"
                v-model="chooseValue"
                :options="options_type" 
                :value="chooseValue" >
              </mt-radio>
            </div>
            <div class="cancel" @click="closeChooseList()">确认</div>
          </div>
        </div>

        

        <!-- 保存弹框 -->
        <div class="section_confirm" v-show="userType==1&&addyxqPersonState!=1">
            <ul>
                <!-- <li class="confirm">确认完成</li> -->
                <li class="save" @click="saveInfo()">保存</li>
            </ul>
        </div>

        <!-- 直接退出 -->
        <div class="section_quit">
            <div class="box">
                <p>直接退出可能会造成数据丢失</p>
                <button class="cancel">取消</button>
                <button class="confirm">确认</button>
            </div>
        </div>
        <!-- 输入框界面 -->
        <div class="section_input" v-show="inputState">
          <!-- 输入框text -->
          <div class="text">
            <mt-field v-model="inputContent"></mt-field>
            <!-- <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="inputModel"></mt-field> -->
          </div>
          <!-- 保存弹框 -->
          <div class="input_confirm">
              <ul class="clearfix">
                  <li class="confirm"></li>
                  <li class="save" @click="inputOk()">确定</li>
              </ul>
          </div>
        </div>
        <!-- 异议 -->
    <div class="otherSuggest" @click="otherSuggest()" v-show="userType==2">异议</div>
    </div>
</template>

<script>
import * as ReqUrl from '../../../config/ReqUrl'
import qs from 'qs'
import { Radio } from 'mint-ui';
const parseForm = qs.stringify
function packup (data = {}) {
    return parseForm({
        info: JSON.stringify(data)
    })
}
export default {
  data(){
    return{
      prodtype_value:'',
      options_type:[
        {
          label: '房地产',
          value: '房地产',
          disabled: false
        }
      ],
      inputState:false,
      name:'',
      yxqType:'1',
      seChoose:'1',
      mobile:'',
      idCard:'',
      reIdCard:'',
      address:'',
      otherText:'',
      idCardChoose:'1',
      inputContent:'',
      from:'',
      chooseListState:false,
      chooseValue:'',
      openListType:'',
      yxqrType:[],
      zjlxType:[],
      fromId:'',
      userType:'',
      addyxqPersonState:'',
      isSave: false
    }
  },
  updated(){
    
  },
  created(){
      this.userType = localStorage.getItem('userType')
      this.type("3")
      this.type("4")
      this.addyxqPersonState=sessionStorage.addyxqPersonState
      this.fromId=this.$route.query.id
      console.log(this.$route.query.id)
      if(this.fromId){
          //点击详情进入的编辑页面
          this.queryDetail(this.fromId)
      }else{
          //点击添加优先权人进入的编辑页面
      }
  },
  computed:{
  },
  methods:{
      otherSuggest(){
      this.$router.push({path:'/detail/otherSuggest',query:{type:'t07'}})
    },
    toInput(e){
        if(this.addyxqPersonState!=1&&this.userType==1){
            this.inputState=true
        }
      let from = e.target.getAttribute('inputRefs')
      console.log(from)
      this.from=e.target.getAttribute('inputRefs')
      if(this.from=='name'){
        this.inputContent=this.name
      }else if(this.from=='yxqType'){
        this.inputContent=this.yxqType
      }else if(this.from=='seChoose'){
        this.inputContent=this.seChoose
      }else if(this.from=='mobile'){
        this.inputContent=this.mobile
      }else if(this.from=='idCardChoose'){
        this.inputContent=this.idCardChoose
      }else if(this.from=='idCard'){
        this.inputContent=this.idCard
      }else if(this.from=='reIdCard'){
        this.inputContent=this.reIdCard
      }else if(this.from=='address'){
        this.inputContent=this.address
      }else if(this.from=='otherText'){
        this.inputContent=this.otherText
      }
    },
    inputOk(){
      this.inputState=false
    },
    closeChooseList(){
      this.chooseListState=false
      if(this.chooseValue){
            if(this.openListType=='seChoose'){//顺位选择
                this.seChoose=this.chooseValue     
            }else if(this.openListType=='idCardChoose'){//证件类型
                this.idCardChoose=this.chooseValue
            }else if(this.openListType=='yxqType'){
                this.yxqType=this.chooseValue
            }
      }else{//不选择时设置默认值
            this.seChoose='1'
      }
      
    },
    saveInfo(){
        var reg = new RegExp("^[0-9]*$");
        if(!this.name){
            alert('请输入姓名')
        }else if(!(/^1[34578][0-9]{9}$/.test(this.mobile))&&this.mobile){
            alert('请输入正确的手机号码')
        }else if(!/^[\u9fa5_a-zA-Z0-9]+$/.test(this.idCard)&&this.idCard){
            alert('证件号码格式有误')
        }else if(this.idCard!=this.reIdCard&&this.idCard){
            alert('两次输入的证件号码不一致')
        }else{
            this.postSave()
        }
      
    },
    type(type){
      var that=this;
      let url = `${ReqUrl.querySelectParam}`
      let data = {
        paramType:type     
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
            var data=res.data.data
            var arr=[]
            for(var i=0;i<data.length;i++){
                arr.push({label: data[i].value,value:(i+1).toString(),disabled: false})
            }
            if(type=='3'){
                that.yxqrType=arr
            }else if(type=='4'){
                that.zjlxType=arr
            }
          }
      })
      .catch(error => {
          console.log(error);
      });
    },
    swChoose(e){
      this.openListType=e.target.getAttribute('inputRefs')
      if(this.addyxqPersonState!=1&&this.userType==1){
          this.chooseListState=true
      }
      
      var arr=[]
      for(var i=1;i<100;i++){
        var value={label: i.toString(),value: i.toString(),disabled: false}
        arr.push(value)
      }
      this.options_type=arr
    },
    yxqrTypeChoose(e){
      this.openListType=e.target.getAttribute('inputRefs')
      if(this.addyxqPersonState!=1&&this.userType==1){
          this.chooseListState=true
      }
      
      this.options_type=this.yxqrType
    },
    zjlxTypeChoose(e){
      this.openListType=e.target.getAttribute('inputRefs')
      if(this.addyxqPersonState!=1&&this.userType==1){
          this.chooseListState=true
      }
      
      this.options_type=this.zjlxType
    },
    postSave(){
      var that=this;
      that.isSave = true
      let url = `${ReqUrl.preemtionAdd}`
      let data = {
        prodId: localStorage.productId,
        userId: localStorage.userId,
        id:that.fromId,
        data07:{
          name: that.name,
          order: that.seChoose,
          mobile: that.mobile,
          ensure_no: that.reIdCard,
          card_type: that.idCardChoose,
          card_no: that.idCard,
          preempt_type: that.yxqType,
          add: that.address,
          remark: that.otherText
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
          }
      })
      .catch(error => {
          console.log(error);
      });
    },
    queryDetail(id){
      var that=this;
      let url = `${ReqUrl.preemtionDetail}`
      let data = {
        id: id   
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
              this.name=res.data.data.name
              this.yxqType=res.data.data.preemptType
              this.seChoose=res.data.data.order
              this.mobile=res.data.data.mobile
              this.idCardChoose=res.data.data.cardType
              this.idCard=res.data.data.cardNo
              this.reIdCard=res.data.data.ensureNo
              this.address=res.data.data.add
              this.otherText=res.data.data.remark
            
          }
      })
      .catch(error => {
          console.log(error);
      });
    }
  },
  watch: {
    inputContent(){
      if(this.from=='name'){
        this.name=this.inputContent
      }else if(this.from=='yxqType'){
        this.yxqType=this.inputContent
      }else if(this.from=='seChoose'){
        this.seChoose=this.inputContent
      }else if(this.from=='mobile'){
        this.mobile=this.inputContent
      }else if(this.from=='idCardChoose'){
        this.idCardChoose=this.inputContent
      }else if(this.from=='idCard'){
        this.idCard=this.inputContent
      }else if(this.from=='reIdCard'){
        this.reIdCard=this.inputContent
      }else if(this.from=='address'){
        this.address=this.inputContent
      }else if(this.from=='otherText'){
        this.otherText=this.inputContent
      }
    },
    chooseValue(newVal,oldVal){
      console.log(newVal)
    }
  },
  components:{
    Radio
  }
}
</script>


<style lang="less" scoped>
section{
    margin-bottom: 17px;
    ul{
        background: #fff;
        li{
            line-height: 90px;
            height: 90px;
            margin-left: 30px;
            border-bottom: 1px solid#C6C2C3;
            div:nth-of-type(1){
                color:#333333;
                font-size: 28px;
                // background: red;
            }
            div:nth-of-type(2){
                color: #666;
                font-size: 26px;
            }
            .arrow{
                float: right;
                line-height: 40px;
                width: 22px;
                height: 90px;
                margin-right: 28px;
                margin-left: 17px;
            }
        }
        li:nth-last-of-type(1){
            border-bottom:0;
        }
    }
}
.section2{
    height: 163px;
    background: #FFFFFF;
    margin-bottom: 150px;
    .fl{
        line-height: 163px;
        font-size: 30px;
        color: #333333;
        text-indent: 31px;
    }
    .fr{
        margin: 20px 20px;
        ul{
            li{
                float: left;
                margin-right: 17px;
                position: relative;
                img{
                    width: 83px;
                    height: 123px;
                    // background: red
                }
                span{
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 34px;
                    height: 34px;
                    // background: blue;
                }
            }
        }
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
            float: right;
            width: 50%;
            text-align: center;
            font-size: 34px;
        }
        .confirm{
            background: #D80E1C;
            color: #FFFFFF;
        }
        .save{
            background: #FFFFFF;
            color: #333333;
        }
    }
}
.section_quit{
    display: none;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    .box{
        width: 603px;
        height: 343px;
        background: #ffffff;
        border-radius: 8px;
        margin: 336px auto;
        font-size: 28px;
        color: #333333;
        text-align: center;
        position: relative;
        p{
            line-height: 200px;
        }
        button{
            position: absolute;
            width: 223px;
            height: 73px;
            bottom: 30px;
            outline: 0;
            border: 0;
        }
        .cancel{
            left: 60px;
            border: 1px solid #000000;
            background: #ffffff;
        }
        .confirm{
            right: 60px;
            background: #d80e1c;
            color: #ffffff;
        }
    }
}
.section_input{
  // display: none;
  position: fixed;
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
            color: #FFFFFF;
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
.section_combobox{
}
.meanText{
  height: 180px;
}
.meanText .fr{
}
.meanText .fl{
  line-height: 180px;
}
.meanText .arrow{
  margin-top:45px;
}
.meanText .text{
  width:450px;
  height: 180px;
  float: left;
  box-sizing: border-box;
  padding: 30px 0;
  overflow: hidden;
}
.meanText .mainText{
  line-height: 30px;
  width: 450px;
  overflow: hidden;
  height: 120px;
  word-wrap:break-word;
}
</style>
