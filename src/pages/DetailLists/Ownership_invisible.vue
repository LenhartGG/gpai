<template>
    <!-- 权属调查 (无形资产) -->
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
<!-- **********//无形资产/债权/林权/工程/其他财产/机械设备/矿权********** -->
    <div>
      <section class="input">
          <ul>
              <li @click="ShowInput('CFWZ')">
                  <div class="fl">存放位置</div>
                  <div class="fr"><span>{{CFWZ}}</span><span class="arrow r_arrow"></span></div>
              </li>
              <li @click="ShowInput('BH')">
                  <div class="fl">编号</div>
                  <div class="fr"><span>{{BH}}</span><span class="arrow r_arrow"></span></div>
              </li>
              <li @click="ShowInput('SL')">
                  <div class="fl">数量</div>
                  <div class="fr"><span>{{SL}}</span><span class="arrow r_arrow"></span></div>
              </li>
              <li @click="ShowInput('DW')">
                  <div class="fl">单位</div>
                  <div class="fr"><span>{{DW}}</span><span class="arrow r_arrow"></span></div>
              </li>
              <li @click="ShowInput('PP')">
                  <div class="fl">品牌</div>
                  <div class="fr"><span>{{PP}}</span><span class="arrow r_arrow"></span></div>
              </li>
          </ul>
      </section>
    </div>
<!-- **********//无形资产/债权/林权/工程/其他财产/机械设备/矿权********** -->

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
                <li @click="openPicker('picker')">
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
          ref="picker"
          type="date"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
          :startDate="startDate"
          :endDate="endDate"
          @confirm="handleConfirm"
          >
        </mt-datetime-picker>

        <div v-show="section_confirm" class="section_confirm">
            <ul>
                <li class="confirm" @click="confirm">确认完成</li>
                <li class="save" @click="save">保存</li>
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
          <div v-show="inputType === 'CFWZ'" class="text">
            <mt-field v-model="CFWZ" placeholder="请输入存放位置"></mt-field>
          </div>
          <div v-show="inputType === 'BH'" class="text">
            <mt-field v-model="BH" placeholder="请输入编号"></mt-field>
          </div>
          <div v-show="inputType === 'SL'" class="text">
            <mt-field v-model="SL" placeholder="请输入数量"></mt-field>
          </div>
          <div v-show="inputType === 'DW'" class="text">
            <mt-field v-model="DW" placeholder="请输单位"></mt-field>
          </div>
          <div v-show="inputType === 'PP'" class="text">
            <mt-field v-model="PP" placeholder="请输入品牌"></mt-field>
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
      userType: '',
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

	    //无形资产/债权/林权/工程/其他财产/机械设备/矿权
	    CFWZ: '', //存放位置
	    BH: '', //编号
	    SL: '', //数量
	    DW: '', //单位
      PP: '', //品牌

      inputType: '', //区分输入框
      inputModel: '', //输入框

      court_value: '',
      flag_court: false,

      startDate: new Date('2010/1/1'),
      endDate: new Date('2040/12/31'),
      section_confirm: true,
      flag_add: true
    }
  },
  created(){
      this.ut = localStorage.getItem('ut') || ''
      this.userType = localStorage.getItem('userType') || null
      console.log(this.userType)
      console.log(this.ut)
      this.$wx.ready(function(){
          console.log('111')
      })
      this.init_flag()
      this.getdata()
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
    openPicker(picker){
      this.$refs[picker].open()
    },
    handleConfirm(value){
      this.CZFY_validDate = format(value, 'yyyy-MM-dd')
    },
    OwnerShip(){
      if(!this.secFlag){
        this.secFlag = true
      }else{
        this.secFlag = false
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
          that.SFFY = data.SFFY //首封法院
          that.court_value = data.SFFY_label

          that.CFWZ = data.CFWZ //存放位置
          that.BH = data.BH //编号
          that.SL = data.SL //数量
          that.DW = data.DW //单位
          that.PP = data.PP //品牌
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
        prodId: localStorage.getItem('productId') || '', //产品id
        status: status, //0保存 1完成
        data04: {
          CCZ_pic: CCZ_pic, //财产权证照片
          DYZK: that.DYZK, //抵押状况
          CFZK: that.CFZK, //查封状况
          CZFY_validDate: that.CZFY_validDate, //处置法院查封预计结束时间
          SFFY: that.SFFY, //首封法院

          CFWZ: that.CFWZ, //存放位置
          BH: that.BH, //编号
          SL: that.SL, //数量
          DW: that.DW, //单位
          PP: that.PP, //品牌
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
              console.log("setdata-----",res)
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
    confirm(){
      if(
        that.CCZ_pic.length !=0 &&
        that.DYZK &&
        that.CFZK &&
        that.CZFY_validDate &&
        that.SFFY &&
        that.CFWZ &&
        that.BH &&
        that.SL &&
        that.DW &&
        that.PP
      ){

      } else {
        alert("请输入完整信息")
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
      if(
        this.CCZ_pic.length !=0 ||
        this.DYZK ||
        this.CFZK ||
        this.CZFY_validDate ||
        this.SFFY ||
        this.CFWZ ||
        this.BH ||
        this.SL ||
        this.DW ||
        this.PP
      ){
      } else {
        return
      }
      let status = '0';
      this.SetData(status)
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
    init_flag(){
      if(this.status == '1' || this.userType != '1') {
        this.section_confirm = false
      }
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
