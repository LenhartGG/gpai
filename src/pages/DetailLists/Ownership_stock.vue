<template>
    <!-- 权属调查 (股权) -->
    <div>
      <!-- 财产权证照片 -->
      <div class="pic-list">
        <h1 class="title">
            财产权证照片
        </h1>
        <div class="pic-main">
            <div class="img" v-for="(value,index) in CCZ_pic" :key="index">
                <img :src="value" alt="">
                <span class="close" @click="remove('CCZ_pic',index)" v-show="status!='1' && userType == '1'" >X</span>
            </div>
            <van-uploader :after-read="docUpload" v-show="status!='1' && userType == '1' && flag_add">
                <div class="img">
                    <img class="addImg" src="../../assets/images/add.png" alt="">
                </div>
            </van-uploader>
          </div>
      </div>
<!-- **********股权********** -->
    <div>
      <section class="input">
          <ul>
              <li @click="ShowInput('ZCH')">
                  <div class="fl">注册号</div>
                  <div class="fr"><span>{{ZCH}}</span><span class="arrow r_arrow"></span></div>
              </li>
          </ul>
      </section>

      <section class="input">
          <ul>
              <li @click="ShowInput('CGGSMC')">
                  <div class="fl">持股公司名称</div>
                  <div class="fr"><span>{{CGGSMC}}</span><span class="arrow r_arrow"></span></div>
              </li>
              <li @click="ShowInput('ZS')">
                  <div class="fl">住所</div>
                  <div class="fr"><span>{{ZS}}</span><span class="arrow r_arrow"></span></div>
              </li>
              <li @click="ShowInput('ZCZB')">
                  <div class="fl">注册资本</div>
                  <div class="fr"><span>{{ZCZB}}</span><span class="arrow r_arrow"></span></div>
              </li>
          </ul>
      </section>

      <section class="input">
          <ul>
              <li @click="combo_GSLX">
                  <div class="fl">公司类型</div>
                  <div class="fr"><span>{{GSLX_value}}</span><span class="arrow r_arrow"></span></div>
              </li>
              <li @click="ShowInput('JYFW')">
                  <div class="fl">经营范围</div>
                  <div class="fr"><span>{{JYFW}}</span><span class="arrow r_arrow"></span></div>
              </li>
              <li @click="openPicker('picker1')">
                  <div class="fl">成立时间</div>
                  <div class="fr"><span>{{CLSJ}}</span><span class="arrow r_arrow"></span></div>
              </li>
              <li @click="openPicker('picker2')">
                  <div class="fl">营业期限</div>
                  <div class="fr"><span>{{YYQX}}</span><span class="arrow r_arrow"></span></div>
              </li>
          </ul>
      </section>
      <!-- 下拉框 -->
      <div class="section_combobox" v-if="flag_GSLX">
        <div class="box">
          <div class="title">
            公司类型
          </div>
          <div class="content">
            <mt-radio
              align="right"
              v-model="GSLX_value"
              :options="options_GSLX" :value="GSLX_value">
            </mt-radio>
          </div>
          <div class="cancel" @click="flag_GSLX=false">确定</div>
        </div>
      </div>
      <!-- 成立时间 -->
      <mt-datetime-picker
        ref="picker1"
        type="date"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        :startDate="startDate"
        :endDate="endDate"
        @confirm="handleConfirm1"
        >
      </mt-datetime-picker>
      <!-- 营业期限 -->
      <mt-datetime-picker
        ref="picker2"
        type="date"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        :startDate="startDate"
        :endDate="endDate"
        @confirm="handleConfirm2"
        >
      </mt-datetime-picker>

      <section class="input">
          <ul>
              <li @click="ShowInput('CZE')">
                  <div class="fl">出资额</div>
                  <div class="fr"><span>{{CZE}}</span><span class="arrow r_arrow"></span></div>
              </li>
              <li @click="ShowInput('CZBL')">
                  <div class="fl">出资比例</div>
                  <div class="fr"><span>{{CZBL}}</span><span class="arrow r_arrow"></span></div>
              </li>
          </ul>
      </section>

      <section class="input">
          <ul>
              <li @click="ShowInput('ZZJGDM')">
                  <div class="fl">组织机构代码</div>
                  <div class="fr"><span>{{ZZJGDM}}</span><span class="arrow r_arrow"></span></div>
              </li>
              <li @click="ShowInput('ZW')">
                  <div class="fl">职务</div>
                  <div class="fr"><span>{{ZW}}</span><span class="arrow r_arrow"></span></div>
              </li>
              <li @click="ShowInput('NJQK')">
                  <div class="fl">年检情况</div>
                  <div class="fr"><span>{{NJQK}}</span><span class="arrow r_arrow"></span></div>
              </li>
          </ul>
      </section>
    </div>
<!-- **********股权********** -->

<!-- **********公共部分************* -->
        <section class="input mb120">
            <ul>
                <li @click="ShowInput('DYZK')">
                    <div class="fl">抵押状况</div>
                    <div class="fr"><span>{{DYZK}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="ShowInput('CFZK')">
                    <div class="fl">查封状况</div>
                    <div class="fr"><span>{{CFZK}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="openPicker('picker3')">
                    <div class="fl">处置法院查封预计结束时间</div>
                    <div class="fr"><span class="w300">{{CZFY_validDate}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="courtFunc">
                    <div class="fl">首封法院</div>
                    <div class="fr"><span>{{court_value}}</span><span class="arrow r_arrow"></span></div>
                </li>
            </ul>
        </section>
        <chooseCourt @courtEvent="courtEvent" v-show="flag_court"></chooseCourt>
        <!-- 处置法院查封预计结束时间 -->
        <mt-datetime-picker
          ref="picker3"
          type="date"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
          :startDate="startDate"
          :endDate="endDate"
          @confirm="handleConfirm3"
          >
        </mt-datetime-picker>

        <div class="section_confirm">
            <ul>
                <li class="confirm" @click="noflag && confirm">确认完成</li>
                <li class="save" @click="noflag && save">保存</li>
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
        <div v-show="section_input" class="section_input">
          <!-- 输入框text -->
          <div v-show="inputType === 'ZCH'" class="text">
            <mt-field v-model="ZCH" placeholder="请输入注册号"></mt-field>
          </div>
          <div v-show="inputType === 'CGGSMC'" class="text">
            <mt-field v-model="CGGSMC" placeholder="请输入持股公司名称"></mt-field>
          </div>
          <div v-show="inputType === 'ZS'" class="text">
            <mt-field v-model="ZS" placeholder="请输入住所"></mt-field>
          </div>
          <div v-show="inputType === 'ZCZB'" class="text">
            <mt-field v-model="ZCZB" placeholder="请输注册资本"></mt-field>
          </div>
          <div v-show="inputType === 'JYFW'" class="text">
            <mt-field v-model="JYFW" placeholder="请输入经营范围"></mt-field>
          </div>
          <div v-show="inputType === 'CZE'" class="text">
            <mt-field v-model="CZE" placeholder="请输入出资额"></mt-field>
          </div>
          <div v-show="inputType === 'CZBL'" class="text">
            <mt-field v-model="CZBL" placeholder="请输入出资比例"></mt-field>
          </div>
          <div v-show="inputType === 'ZZJGDM'" class="text">
            <mt-field v-model="ZZJGDM" placeholder="请输入组织机构代码"></mt-field>
          </div>
          <div v-show="inputType === 'ZW'" class="text">
            <mt-field v-model="ZW" placeholder="请输入职务"></mt-field>
          </div>
          <div v-show="inputType === 'NJQK'" class="text">
            <mt-field v-model="NJQK" placeholder="请输入年检情况"></mt-field>
          </div>

          <div v-show="inputType === 'DYZK'" class="text">
            <mt-field v-model="DYZK" placeholder="请输入抵押状况"></mt-field>
          </div>
          <div v-show="inputType === 'CFZK'" class="text">
            <mt-field v-model="CFZK" placeholder="请输入查封状况"></mt-field>
          </div>
          <!-- 保存弹框 -->
          <div class="input_confirm">
              <ul class="clearfix">
                  <li class="confirm"></li>
                  <li class="save" @click="input_save">确认</li>
              </ul>
          </div>
        </div>

        <!-- 下拉框 -->
        <div class="section_combobox" v-if="comboflag">
          <div class="box">
            <div class="title">
              标的物类型
            </div>
            <div class="content">
              <mt-radio
                align="right"
                v-model="prodtype"
                :options="options" :value="prodtype">
              </mt-radio>
            </div>
            <div class="cancel" @click="comboflag=false">取消</div>
          </div>
        </div>
<!-- **********公共部分************* -->
      <!-- 法院异议 -->
      <div class="otherSuggest" @click="otherSuggest()" v-show="userType==2">异议</div>
    </div>
</template>
<script>
import * as ReqUrl from '../../../config/ReqUrl'
import qs from 'qs'
import {format} from '../../assets/js/Util.js'
import chooseCourt from './chooseCourt.vue'
import { MessageBox } from 'mint-ui';
const parseForm = qs.stringify
function packup (data = {}) {
    return parseForm({
        info: JSON.stringify(data)
    })
}
export default {
  data(){
    return{
      status: '',
      comboflag: false,
      value:'',
      section_input: false,
      secFlag:false, //照片下拉
      added: false,
      files: [], //要上传的图片

      CCZ_pic: [], //财产权证照片
      DYZK: '', //抵押状况
      CFZK: '', //查封状况
      CZFY_validDate: '', //处置法院查封预计结束时间
      SFFY: '', //首封法院

	    //股权：
	    ZCH: '', //注册号
	    CGGSMC: '', //持股公司名称
	    ZS: '', //住所
	    ZCZB: '', //注册资本
	    GSLX: '', //公司类型
	    JYFW: '', //经营范围
	    CLSJ: '', //成立时间
	    YYQX: '', //营业期限
	    CZE: '', //出资额
	    CZBL: '', //出资比例
	    ZZJGDM: '', //组织机构代码
	    ZW: '', //职务
	    NJQK: '', //年检情况

      inputType: '', //区分输入框
      inputModel: '', //输入框

      options_GSLX: [
        {
          label: "有限责任公司",
          value: "有限责任公司",
          id: 1
        },
        {
          label: "股份有限公司",
          value: "股份有限公司",
          id: 2
        },
        {
          label: "无限公司",
          value: "无限公司",
          id: 3
        },
        {
          label: "两合公司",
          value: "两合公司",
          id: 4
        },
        {
          label: "股份两合公司",
          value: "股份两合公司",
          id: 5
        }
      ], //公司类型
      GSLX_value: '',
      flag_GSLX: false,

      court_value: '',
      flag_court: false,

      startDate: new Date('2010/1/1'),
      endDate: new Date('2040/12/31'),

      section_confirm: false,
      flag_add: true,
      noflag: true,
    }
  },
  created(){
      this.ut = localStorage.getItem('ut') || ''
      this.userType = localStorage.getItem('userType') || null
      // this.userType = 2
      console.log(this.userType)
      console.log(this.ut)
      this.status = this.$route.query.status
      this.$wx.ready(function(){
          console.log('111')
      })
      this.init_flag()
      this.getdata()
  },
  watch:{
    GSLX_value(){ //公司类型
      this.options_GSLX.forEach(ele => {
        if (this.GSLX_value == ele.value) {
          this.GSLX = ele.id;
        }
      });
    },
    GSLX(){
      this.options_GSLX.forEach(ele => {
        if (this.GSLX == ele.id) {
          this.GSLX_value = ele.value;
        }
      });
    }
  },
  updated(){
    this.showPicc()
  },
  methods:{
    showPicc(){
      if(this.CCZ_pic.length>5){
        this.flag_add = false
      }else{
        this.flag_add = true
      }
    },
    init_flag(){
      if(this.status == '1' || this.userType != '1'){
        this.section_confirm = false
      }
    },
    courtFunc(){
      if(this.status == '1') return
      if(this.userType != '1') return
      this.flag_court = true;
    },
    courtEvent(data){
      this.flag_court = data.flag_court
      this.court_value = data.chooseCourtName
      this.SFFY = data.chooseCourtKey
    },
    otherSuggest(){
      this.$router.push({path:'/detail/otherSuggest',query:{type:'t04'}})
    },
    docUpload(file){
      if(this.status == '1') return
      if(this.userType != '1') return
      this.uploadImg(file.content,'CCZ_pic')
    },
    remove(arrObj,index){
      if(arrObj=='CCZ_pic'){
        this.CCZ_pic.splice(index, 1);
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
                console.log('uploadImg', res)
                if(res.data.code=='0000'){
                    let url=res.data.data
                    if(type=='CCZ_pic'){
                        var arr=that.CCZ_pic
                        arr.push(url)
                        that.CCZ_pic=arr
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
    openPicker(picker){
      this.$refs[picker].open()
    },
    handleConfirm1(value){
      this.CLSJ = format(value, 'yyyy-MM-dd')
    },
    handleConfirm2(value){
      this.YYQX = format(value, 'yyyy-MM-dd')
    },
    handleConfirm3(value){
      this.CZFY_validDate = format(value, 'yyyy-MM-dd')
    },
    combo_GSLX(){
      this.flag_GSLX = true;
    },
    OwnerShip(){
      if(!this.secFlag){
        this.secFlag = true
      }else{
        this.secFlag=false
      }
    },
    // 输入框事件
    ShowInput(tab){
      this.inputType = tab
      this.section_input = true
    },
    input_save(){
      this.section_input = false
    },
    getdata(){
      let that = this;
      let url = `${ReqUrl.queryDetail}`;
      let data = {
        prodId: localStorage.getItem('productId') || '',
        userId: localStorage.getItem('userId') || '',//用户id
        type_code: 't04'
      }
      let headers = {openId: sessionStorage.getItem('openId')};
      that.$http.post(
        url, packup(data), { headers: headers }
      )
      .then(res => {
        console.log("getData---", res)
        if(res.data.code === "0000"){
          let data = res.data.data.data
          that.CCZ_pic = data.CCZ_pic?data.CCZ_pic.split(','):[] //财产权证照片
          that.DYZK = data.DYZK //抵押状况
          that.CFZK = data.CFZK //查封状况
          that.CZFY_validDate = data.CZFY_validDate //处置法院查封预计结束时间
          that.ZCH = data.ZCH //注册号
          that.SFFY = data.SFFY //首封法院
          that.court_value = data.SFFY_label

          that.CGGSMC = data.CGGSMC //持股公司名称
          that.ZS = data.ZS //住所
          that.ZCZB = data.ZCZB //注册资本
          that.GSLX = data.GSLX //公司类型
          that.JYFW = data.JYFW //经营范围
          that.CLSJ = data.CLSJ //成立时间
          that.YYQX = data.YYQX //营业期限
          that.CZE = data.CZE //出资额
          that.CZBL = data.CZBL //出资比例
          that.ZZJGDM = data.ZZJGDM //组织机构代码
          that.ZW = data.ZW //职务
          that.NJQK = data.NJQK //年检情况

        }
      })
    },
    SetData(status){
      var CCZ_pic = this.CCZ_pic.toString();
      var that = this;
      let url = `${ReqUrl.add}`
      let data = {
        type_code: "t04",
        userId: localStorage.getItem('userId') || '',//用户id
        prodId: localStorage.getItem('productId'), //产品id
        status: status, //0保存 1完成
        data04: {
          CCZ_pic: CCZ_pic, //财产权证照片
          DYZK: that.DYZK, //抵押状况
          CFZK: that.CFZK, //查封状况
          CZFY_validDate: that.CZFY_validDate, //处置法院查封预计结束时间
          SFFY: that.SFFY, //首封法院

          ZCH: that.ZCH, //注册号
          CGGSMC: that.CGGSMC, //持股公司名称
          ZS: that.ZS, //住所
          ZCZB: that.ZCZB, //注册资本
          GSLX: that.GSLX, //公司类型
          JYFW: that.JYFW, //经营范围
          CLSJ: that.CLSJ, //成立时间
          YYQX: that.YYQX, //营业期限
          CZE: that.CZE, //出资额
          CZBL: that.CZBL, //出资比例
          ZZJGDM: that.ZZJGDM, //组织机构代码
          ZW: that.ZW, //职务
          NJQK: that.NJQK, //年检情况
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
              console.log("setdata-----",res)
              if(res.data.code == '0000'){
                that.$router.go(-1)
              }else if(res.data.code == '9999'){
                that.noflag = true
                alert(res.data.msg)
              }else if(res.data.code == '-1'){
                that.$router.push('/binding')
              }
          })
          .catch(error => {
              console.log(error);
          });
    },
    confirm(){
      if(
        this.CCZ_pic.length!=0 &&
        this.DYZK &&
        this.CFZK &&
        this.CZFY_validDate &&
        this.SFFY &&
        this.ZCH &&
        this.CGGSMC &&
        this.ZS &&
        this.ZCZB &&
        this.GSLX &&
        this.JYFW &&
        this.CLSJ &&
        this.YYQX &&
        this.CZE &&
        this.CZBL &&
        this.ZZJGDM &&
        this.ZW &&
        this.NJQK
      ){

      } else {
        alert('请输入完整信息。')
        return
      }
      let status = '1';
      MessageBox.confirm('确认完成后将无法修改信息').then(action => {
          console.log(action)
          if(action=='confirm'){
            this.SetData(status)
            this.section_input=false;
          }
      })
    },
    save(){
      this.noflag = false; // 防止重复点击
      if(
        this.CCZ_pic.length!=0 ||
        this.DYZK ||
        this.CFZK ||
        this.CZFY_validDate ||
        this.SFFY ||
        this.ZCH ||
        this.CGGSMC ||
        this.ZS ||
        this.ZCZB ||
        this.GSLX ||
        this.JYFW ||
        this.CLSJ ||
        this.YYQX ||
        this.CZE ||
        this.CZBL ||
        this.ZZJGDM ||
        this.ZW ||
        this.NJQK
      ){
      } else {
        return
      }
      let status = '0';
      this.SetData(status)
    }
  },
  components:{
    chooseCourt
  }
}
</script>

<style lang="less" scoped>
.section2{
    height: 163px;
    background: #FFFFFF;
    margin-bottom: 15px;
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
                    background: red
                }
                span{
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 34px;
                    height: 34px;
                    background: blue;
                }
            }
        }
    }
}
.section_confirm{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 82px;
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
.mint-cell:last-child{
  background: none;
}
.mb120{
  margin-bottom: 120px;
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

</style>
