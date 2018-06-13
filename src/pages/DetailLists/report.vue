<template>
    <!-- 评估报告 -->
    <div>
      <!-- 评估机构 -->
      <section class="input">
            <ul>
                <li @click="showInput('evaluate_agency')">
                    <div class="fl">评估机构</div>
                    <div class="fr"><span class="overHidden">{{evaluate_agency}}</span><span class="arrow r_arrow"></span></div>
                </li>
            </ul>
      </section>

      <!-- 评估报告 -->
      <div class="pic-list">
        <h1 class="title">
            评估报告
        </h1>
        <div class="pic-main">
            <div class="img" v-for="(value,index) in docImg" :key="index">
                <img :src="value" alt="">
                <span class="close" @click="delImg('docImg',index)" v-show="status!='1' && userType=='1'">X</span>
            </div>
            <van-uploader :after-read="docUpload" v-show="status!='1' && userType=='1' && flag_add">
                <div class="img">
                    <img class="addImg" src="../../assets/images/add.png" alt="">
                </div>
            </van-uploader>
          </div>
      </div>

      <!-- 评估价 -->
      <section class="input">
            <ul>
                <li @click="showInput('evaluate_price')">
                    <div class="fl">评估价</div>
                    <div class="fr"><span class="overHidden">{{evaluate_price}}</span><span class="arrow r_arrow"></span></div>
                </li>
            </ul>
      </section>

      <!-- 输入框界面 -->
      <div v-show="section_input" class="section_input">
        <!-- 输入框text -->
        <div v-show="inputType === 'evaluate_agency'" class="text">
          <mt-field v-model="evaluate_agency" placeholder="请输入评估机构名称"></mt-field>
        </div>
        <div v-show="inputType === 'evaluate_price'" class="text">
          <mt-field type="tel" v-model="evaluate_price" placeholder="请输入评估价（元）"></mt-field>
        </div>
        <!-- 保存弹框 -->
        <div class="input_confirm">
            <ul class="clearfix">
                <li class="confirm"></li>
                <li class="save" @click="input_save">确认</li>
            </ul>
        </div>
      </div>

      <!-- 评估基准日期 -->
      <section class="input">
            <ul>
                <li @click="open('picker1')">
                    <div class="fl">评估基准日</div>
                    <div class="fr"><span>{{evaluate_date}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="open('picker2')">
                    <div class="fl">评估有效期</div>
                    <div class="fr"><span>{{evaluation_validdate}}</span><span class="arrow r_arrow"></span></div>
                </li>
            </ul>
      </section>
      <!--评估基准日-->
      <mt-datetime-picker
        ref="picker1"
        type="date"
        v-model="evaluate_date_value"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        :startDate="startDate"
        :endDate="endDate"
        @confirm="handleChange1">
      </mt-datetime-picker>
      <!--评估有效期-->
      <mt-datetime-picker
        ref="picker2"
        type="date"
        v-model="evaluation_validdate_value"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        :startDate="startDate"
        :endDate="endDate"
        @confirm="handleChange2">
      </mt-datetime-picker>
      <!-- 保存弹框 -->
      <div v-show="section_confirm" class="section_confirm">
          <ul>
              <li class="confirm" @click="confirm">确认完成</li>
              <li class="save" @click="save">保存</li>
          </ul>
      </div>

      <!-- 法院异议 -->
      <div class="otherSuggest" @click="otherSuggest()" v-show="userType==2">异议</div>
    </div>
</template>

<script>
import * as ReqUrl from '../../../config/ReqUrl'
import qs from 'qs'
import { Toast } from 'mint-ui';
import {format} from '../../assets/js/Util.js'
import { MessageBox } from 'mint-ui';
const parseForm = qs.stringify
function packup (data = {}) {
    return parseForm({
        info: JSON.stringify(data)
    })
}
export default {
  filters:{
    yuan(value){
      if (!value) return ''
      value = value.toString()
      return value + '元';
    }
  },
  components:{
  },
  data(){
    return{
      startDate: new Date('2010/1/1'),
      endDate: new Date('2040/12/31'),
      secFlag:false, //照片下拉
      section_confirm: true, //确认完成
      options_evaluate:[
        {
          label: '北京华胜天成科技',
          value: '北京华胜天成科技',
        },
        {
          label: '上海公拍',
          value: '上海公拍',
        },
        {
          label: '国拍',
          value: '国拍',
        },
        {
          label: '淘宝',
          value: '淘宝',
        },
      ], //评估机构
      section_input:false, //评估机构
      value: '',

      evaluate_agency: '', //评估机构
      evaluate_agency_value: '', //评估机构
      comboflag: false, //评估机构
      evaluate_report: [], //评估报告
      evaluate_price: '', //评估价
      evaluate_date: '', //评估基准日
      evaluate_date_value: '', //评估基准日
      evaluation_validdate: '', //评估有效期
      evaluation_validdate_value: '', //评估有效期

      added: false, //新加图片
      docImg: [],
      inputType: '',
      status: '',
      isOk: '',
      flag_add: true
    }
  },
  updated(){
    // this.ConfirmSave()
    this.showPicc()
  },
  created(){
    this.ut = localStorage.getItem('ut') || ''
    this.userType = localStorage.getItem('userType') || null
    // this.userType = 2
    console.log(this.userType)
    console.log(this.ut)
    this.$wx.ready(function(){
        console.log('111')
    })
    this.status = this.$route.query.status
    this.init_flag()
    this.getData()
  },
  methods:{
    showPicc(){
      if(this.docImg.length>5){
        this.flag_add = false
      }else{
        this.flag_add = true
      }
    },
    otherSuggest(){
        this.$router.push({path:'/detail/otherSuggest',query:{type:'t03'}})
    },
    ConfirmSave(){
      if (this.userType != '1') return
      if (this.status == '1')  return
      console.log(this.evaluate_agency)
      console.log(this.docImg)
      console.log(this.evaluate_price)
      console.log(this.evaluate_date)
      console.log(this.evaluation_validdate)
      if(this.evaluate_agency &&
         this.docImg.length!=0 &&
         this.evaluate_price &&
         this.evaluate_date &&
         this.evaluation_validdate
         ){
           this.section_confirm = true
      } else {
        this.section_confirm = false
      }
    },
    // 评估公司
    showInput(tab){
      if(this.status == '1') return
      if(this.userType != '1') return
      this.inputType = tab;
      this.section_input = true
    },
    input_save(){
      this.section_input = false
    },
    secFlagFunc(){
      if(this.secFlag){
        this.secFlag = false;
      } else {
        this.secFlag = true;
      }
    },
    docUpload(file){
      if(this.status == '1') return
      if(this.userType != '1') return
      this.uploadImg(file.content,'docImg')
    },
    delImg(arrObj,index){
        console.log(index)
        if(arrObj=='docImg'){
            this.docImg.splice(index, 1);
        }else if(arrObj=='pzImg'){
            this.pzImg.splice(index, 1);
        }
    },
    uploadImg(baseCode,type){
        if(baseCode) {
            var that=this;
            let url = `${ReqUrl.upload64Img}`
            let data = {
                baseCode: baseCode,
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
                    let url=res.data.data
                    if(type=='docImg'){
                        var arr=that.docImg
                        arr.push(url)
                        that.docImg=arr
                    }else if(type=='pzImg'){
                        var arr=that.pzImg
                        arr.push(url)
                        that.pzImg=arr
                    }
                }else{
                    alert("图片上传失败")
                }
            })
            .catch(error => {
                console.log(error);
            });
        }

    },
    open(picker) { //开启时间组件
      if(this.status == '1') return
      if(this.userType != '1') return
        this.$refs[picker].open();
      },
    handleChange1(value) {
      this.evaluate_date = format(value,'yyyy-MM-dd');
    },
    handleChange2(value) {
      this.evaluation_validdate = format(value,'yyyy-MM-dd');
    },
    //新增数据
    SetData(status){
      var evaluate_report = this.docImg.toString()
      var that = this;
      let url = `${ReqUrl.add}`
      let data = {
        type_code: "t03",
        userId: localStorage.getItem('userId') || '',
        prodId: localStorage.getItem('productId') || '',
        status: status, //0保存 1完成
        data03: {
          evaluate_agency: that.evaluate_agency,
          evaluate_report: that.docImg.toString(),
          evaluate_price: that.evaluate_price,
          evaluate_date: that.evaluate_date,
          evaluation_validdate: that.evaluation_validdate,
        }
      }
      that.$http.post(
              url,
              packup(data),
              {
                  headers:{openId: sessionStorage.getItem('openId')}
              }
          )
          .then(res => {
              console.log("res-----",res)
              if(res.data.code == '0000'){
                that.$router.go(-1)
              }else if(res.data.code == '9999'){
                alert(res.data.msg)
              }else if(res.data.code == '-1'){
                that.$router.push('/binding')
              }
          })
          .catch(error => {
              console.log(error);
          });
    },
    //查询数据
    getData(){
      var that = this
      let data = {
        userId: localStorage.getItem('userId') || '',
        prodId: localStorage.getItem('productId') || '',
        type_code: "t03",
      }
      let url = `${ReqUrl.baseinfoQuery}`;
      let headers = {openId: sessionStorage.getItem('openId')};
      that.$http.post(
          url,
          packup(data),
          {
              headers:headers
          }
      )
      .then(res => {
          console.log("getData-----",res)
          if(res.data.code = '0000'){
            let  data = res.data.data.data
            var report = data.evaluate_report
            that.evaluate_agency = data.evaluate_agency;
            that.docImg = data.evaluate_report?data.evaluate_report.split(','):[];
            console.log('doc', that.docImg)
            that.evaluate_date = data.evaluate_date?format(data.evaluate_date, 'yyyy-MM-dd'):null
            that.evaluation_validdate = data.evaluation_validdate?format(data.evaluation_validdate, 'yyyy-MM-dd'):null
            that.evaluate_price = data.evaluate_price;
            that.secFlag = true
            that.added = true
          }
      })
      .catch(error => {
          console.log(error);
      });
    },
    confirm(){
      if(
        this.evaluate_agency &&
        this.docImg.length !=0 &&
        this.evaluate_price &&
        this.evaluate_date &&
        this.evaluation_validdate
      ){

      } else {
        alert('请输入完整信息！')
        return
      }
      let status = 1;
      MessageBox.confirm('确认完成后将无法修改信息').then(action => {
          console.log(action)
          if(action=='confirm'){
            this.SetData(status)
            this.section_input=false;
          }
      })

    },
    save(){
      if(true){

      } else {
        alert('请输入完整信息！')
        return
      }
      let status = 0;
      this.SetData(status)
      this.section_input=false;
    },
    init_flag(){
      if(this.status == '1' || this.userType != '1'){
        this.section_confirm = false
      }
    }
  },
}
</script>

<style lang="less" scoped>
.section_confirm{
    position: fixed;
    z-index: 1;
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
            background: #D80E1C;
            color: #FFFFFF;
        }
        .save{
            background: #FFFFFF;
            color: #333333;
        }
    }
}
.section_img{
    margin-bottom: 17px;
    .title{
        height: 90px;
        line-height: 90px;
        text-indent: 31px;
        font-size: 28px;
        color: #333333;
        background: #fff;
        margin-bottom: 2px;
        .r_arrow{
          margin-right: 20px;
        }
    }
    .content{
        background: #fff;
        margin: 0 auto;
        padding: 4px 36px;
        li{
            float: left;
            width: 33%;
            margin-top: 13px;
            margin-bottom: 13px;
            div{
                width: 183px;
                height: 260px;
                background:#ccc;
                margin: 0 auto;
                position: relative;
                overflow: hidden;
                span{
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 40px;
                    height: 40px;
                    background: #666;
                    border-radius: 20px;
                    background: url('../../assets/images/close.png') no-repeat center;
                }
            }
        }
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

.pic-list{
    background:#fff;
    margin-bottom:18px;
    .title{
        line-height:90px;
        padding-left:30px;
        font-size:28px;
        color:#333;
        border-bottom:#DCDCDC solid 1px;
    }
    .pic-main{
        padding:17px 0;
        padding-left:50px;
        img{
            height:123px;
            display: block;
            margin: 0 auto;
            max-width:183px;
        }
        .img{
            display:inline-block;
            width:183px;
            height:123px;
            margin-right:42px;
            border:#ddd solid 1px;
            position: relative;
            background: #ccc;
            .close{
                position: absolute;
                right: 0;
                top: 0;
                width: 40px;
                height: 40px;
                background: #666;
                border-radius: 20px;
                color:#fff;
                line-height:40px;
                text-align: center;
            }
            .addImg{
                display: block;
                margin-top:25px;
                width:73px;
                height: auto;
            }
        }
    }
}
.close{
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
    height: 40px;
    background: #666;
    border-radius: 20px;
    color:#fff;
    line-height:40px;
    text-align: center;
}
</style>
