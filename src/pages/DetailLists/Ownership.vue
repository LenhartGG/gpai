<template>
    <!-- 权属调查 (房地产) -->
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
<!-- **********房产********** -->
    <div>
      <section class="input">
            <ul>
                <li @click="ShowInput('FCZH')">
                    <div class="fl">房产证号</div>
                    <div class="fr"><span>{{FCZH}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="ShowInput('FCZLHMC')">
                    <div class="fl">房产坐落或名称</div>
                    <div class="fr"><span>{{FCZLHMC}}</span><span class="arrow r_arrow"></span></div>
                </li>
            </ul>
        </section>

        <section class="input">
            <ul>
                <li @click="combo_TYPE()">
                    <div class="fl">规划用途或房产类型</div>
                    <div class="fr"><span>{{type_value}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="combo_FWXZ()">
                    <div class="fl">房屋性质</div>
                    <div class="fr"><span>{{FWXZ_value}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="ShowInput('JZMJ')">
                    <div class="fl">建筑面积</div>
                    <div class="fr"><span>{{JZMJ}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="ShowInput('LYWZ')">
                    <div class="fl">楼宇位置</div>
                    <div class="fr"><span>{{LYWZ}}</span><span class="arrow r_arrow"></span></div>
                </li>
            </ul>
        </section>

        <!-- 选项 -->
        <div class="section_combobox" v-show="flag_type">
          <div class="box">
            <div class="title">
              规划用途或房产类型
            </div>
            <div class="content">
              <mt-radio
                align="right"
                v-model="type_value"
                :options="options_type" :value="type_value">
              </mt-radio>
            </div>
            <div class="cancel" @click="flag_type=false">确定</div>
          </div>
        </div>

        <!-- 选项 -->
        <div class="section_combobox" v-show="flag_FWXZ">
          <div class="box">
            <div class="title">
              房屋性质
            </div>
            <div class="content">
              <mt-radio
                align="right"
                v-model="FWXZ_value"
                :options="options_FWXZ" :value="FWXZ_value">
              </mt-radio>
            </div>
            <div class="cancel" @click="flag_FWXZ=false">确定</div>
          </div>
        </div>

        <section class="input">
            <ul>
                <li @click="combo_GYQK()">
                    <div class="fl">共有情况</div>
                    <div class="fr"><span>{{GYQK_value}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="ShowInput('FEBL')">
                    <div class="fl">份额比例</div>
                    <div class="fr"><span>{{FEBL}}</span><span class="arrow r_arrow"></span></div>
                </li>
            </ul>
        </section>

        <!-- 选项 -->
        <div class="section_combobox" v-show="flag_GYQK">
          <div class="box">
            <div class="title">
              共有情况
            </div>
            <div class="content">
              <mt-radio
                align="right"
                v-model="GYQK_value"
                :options="options_GYQK" :value="GYQK_value">
              </mt-radio>
            </div>
            <div class="cancel" @click="flag_GYQK=false">确定</div>
          </div>
        </div>

        <section class="input">
            <ul>
                <li @click="ShowInput('DJJG')">
                    <div class="fl">登记价格</div>
                    <div class="fr"><span>{{DJJG}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="ShowInput('FCDJJG')">
                    <div class="fl">房产登记机关</div>
                    <div class="fr"><span>{{FCDJJG}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="ShowInput('DH')">
                    <div class="fl">地号</div>
                    <div class="fr"><span>{{DH}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="ShowInput('FH')">
                    <div class="fl">房号</div>
                    <div class="fr"><span>{{FH}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="ShowInput('FWBH')">
                    <div class="fl">房屋编码</div>
                    <div class="fr"><span>{{FWBH}}</span><span class="arrow r_arrow"></span></div>
                </li>
            </ul>
        </section>
    </div>
<!-- **********房产********** -->

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
                <li @click="open('picker')">
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

        <div class="section_confirm">
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
          <div v-show="inputType === 'FCZH'" class="text">
            <mt-field v-model="FCZH" placeholder="请输入房产证号"></mt-field>
          </div>
          <div v-show="inputType === 'FCZLHMC'" class="text">
            <mt-field v-model="FCZLHMC" placeholder="请输入房产坐落或名称"></mt-field>
          </div>
          <div v-show="inputType === 'JZMJ'" class="text">
            <mt-field v-model="JZMJ" placeholder="请输入建筑面积"></mt-field>
          </div>
          <div v-show="inputType === 'LYWZ'" class="text">
            <mt-field v-model="LYWZ" placeholder="楼宇位置"></mt-field>
          </div>
          <div v-show="inputType === 'FEBL'" class="text">
            <mt-field v-model="FEBL" placeholder="份额比例"></mt-field>
          </div>
          <div v-show="inputType === 'DJJG'" class="text">
            <mt-field v-model="DJJG" placeholder="请输入登记价格"></mt-field>
          </div>
          <div v-show="inputType === 'FCDJJG'" class="text">
            <mt-field v-model="FCDJJG" placeholder="房产登记机关"></mt-field>
          </div>
          <div v-show="inputType === 'DH'" class="text">
            <mt-field v-model="DH" placeholder="请输入地号"></mt-field>
          </div>
          <div v-show="inputType === 'FH'" class="text">
            <mt-field v-model="FH" placeholder="请输入房号"></mt-field>
          </div>
          <div v-show="inputType === 'FWBH'" class="text">
            <mt-field v-model="FWBH" placeholder="请输入房屋编码"></mt-field>
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
<!-- **********公共部分************* -->
      <!-- 法院异议 -->
      <div class="otherSuggest" @click="otherSuggest()" v-show="userType==2">异议</div>
    </div>
</template>
<script>
import * as ReqUrl from '../../../config/ReqUrl'
import qs from 'qs'
import { Uploader } from 'vant';
import chooseCourt from './chooseCourt.vue'
import {format} from '../../assets/js/Util.js'
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
      value:'',
      section_input: false,
      secFlag:false, //照片下拉
      added: false,
      files: [], //要上传的图片
      startDate: new Date('2010/1/1'),
      endDate: new Date('2040/12/31'),
      data: '',

      CCZ_pic: [],//财产权证照片
      DYZK: '',//抵押状况
      CFZK: '',//查封状况
      CZFY_validDate: '',//处置法院查封预计结束时间
      SFFY: '',//首封法院
      //房产
      FCZH: '', //房产证号
      FCZLHMC: '', //房产坐落或名称
      TYPE: '', //规划用途或房产类型
      FWXZ: '', //房屋性质
      JZMJ: '', //建筑面积
      GYQK: '', //共有情况
      FEBL: '', //份额比例
      DJJG: '', //登记价格
      DH: '', //地号
      FH: '', //房号
      FWBH: '', //房屋编码：
      FCDJJG: '', //房产登记机关
      LYWZ: '', //楼宇位置

      options_type: [
        {
          label: "住宅",
          value: "住宅",
          id: 1
        },
        {
          label: "商业",
          value: "商业",
          id: 2
        },
        {
          label: "办公",
          value: "办公",
          id: 3
        },
        {
          label: "工业",
          value: "工业",
          id: 4
        },
        {
          label: "农业",
          value: "农业",
          id: 5
        },
        {
          label: "特殊用途",
          value: "特殊用途",
          id: 6
        }
      ],//规划用途或房产类型
      options_FWXZ: [
        {
          label: "国有",
          value: "国有",
          id: 1
        },
        {
          label: "集体所有",
          value: "集体所有",
          id: 2
        },
        {
          label: "私有",
          value: "私有",
          id: 3
        },
        {
          label: "联营企业",
          value: "联营企业",
          id: 4
        },
        {
          label: "股份制企业",
          value: "股份制企业",
          id: 5
        },
        {
          label: "港澳台胞",
          value: "港澳台胞",
          id: 6
        },
        {
          label: "涉外",
          value: "涉外",
          id: 7
        },
        {
          label: "其他",
          value: "其他",
          id: 8
        }
      ],//房屋性质
      options_GYQK: [
        {
          label: "单独所有",
          value: "单独所有",
          id: 1
        },
        {
          label: "共同共有",
          value: "共同共有",
          id: 2
        },
        {
          label: "按份所有",
          value: "按份所有",
          id: 3
        }
      ],//共有情况
      type_value: '',
      FWXZ_value: '',
      GYQK_value: '',
      flag_type: false,
      flag_FWXZ: false,
      flag_GYQK: false,


      prodtype: '', //区分权属调查
      inputType: '', //区分输入框
      inputModel: '', //输入框

      flag_court: false,
      court_value: '',
      flag_add: true,
    }
  },
  watch:{
    type_value(){
      this.options_type.forEach(ele =>{
        if(this.type_value == ele.value){
          this.TYPE = ele.id;
          // console.log('房产类型--', this.TYPE)
        }
      })
    },
    TYPE(){
      for(let key in this.options_type){
        if(this.TYPE == this.options_type[key].id){
          this.type_value = this.options_type[key].value;
        }
      }
    },
    FWXZ_value(){
      this.options_FWXZ.forEach(ele =>{
        if(this.FWXZ_value == ele.value){
          this.FWXZ = ele.id;
          // console.log('房屋性质--', this.FWXZ)
        }
      })
    },
    FWXZ(){
      this.options_FWXZ.forEach(ele => {
        if(this.FWXZ == ele.id){
          this.FWXZ_value = ele.value;
        }
      })
    },
    GYQK_value(){
      this.options_GYQK.forEach(ele => {
        if(this.GYQK_value == ele.value){
          this.GYQK = ele.id;
          // console.log('共有情况--', this.GYQK)
        }
      })
    },
    GYQK(){
      this.options_GYQK.forEach(ele => {
        if(this.GYQK == ele.id){
          this.GYQK_value = ele.value;
        }
      })
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
      this.status = this.$route.query.status
      // 权属调查类型
      this.getdata()
  },
  methods:{
    otherSuggest(){
      this.$router.push({path:'/detail/otherSuggest',query:{type:'t04'}})
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
    open(picker) { //开启时间组件
      this.$refs[picker].open();
    },
    handleConfirm(value) {
      this.CZFY_validDate = format(value,'yyyy-MM-dd');
    },
    combo_TYPE(){
        this.flag_type = true;
    },
    combo_FWXZ(){
        this.flag_FWXZ = true;
    },
    combo_GYQK(){
        this.flag_GYQK = true;
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
      if(this.userType != '1') return
      if(this.status == '1') return
      this.inputType = tab
      this.section_input = true
    },
    input_save(){
      this.section_input = false
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
          DYZK: this.DYZK, //抵押状况
          CFZK: this.CFZK, //查封状况
          CZFY_validDate: this.CZFY_validDate, //处置法院查封预计结束时间
          SFFY: this.SFFY, //首封法院

          FCZH: this.FCZH, //房产证号
          FCZLHMC: this.FCZLHMC, //房产坐落或名称
          TYPE: this.TYPE, //规划用途或房产类型
          FWXZ: this.FWXZ, //房屋性质
          JZMJ: this.JZMJ, //建筑面积
          GYQK: this.GYQK, //共有情况
          FEBL: this.FEBL, //份额比例
          DJJG: this.DJJG, //登记价格
          DH: this.DH, //地号
          FH: this.FH, //房号
          FWBH: this.FWBH, //房屋编码
          FCDJJG: this.FCDJJG, //房产登记机关
          LYWZ: this.LYWZ, //楼宇位置
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
                alert(res.data.msg)
              }else if(res.data.code == '-1'){
                that.$router.push('/binding')
              }
          })
          .catch(error => {
              console.log(error);
          });
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

          that.FCZH = data.FCZH //房产证号
          that.FCZLHMC = data.FCZLHMC //房产坐落或名称
          that.TYPE = data.TYPE //规划用途或房产类型
          that.FWXZ = data.FWXZ //房屋性质
          that.JZMJ = data.JZMJ //建筑面积
          that.GYQK = data.GYQK //共有情况
          that.FEBL = data.FEBL //份额比例
          that.DJJG = data.DJJG //登记价格
          that.DH = data.DH //地号
          that.FH = data.FH //房号
          that.FWBH = data.FWBH //房屋编码：
          that.FCDJJG = data.FCDJJG //房产登记机关
          that.LYWZ = data.LYWZ //楼宇位置
        }
      })
    },
    confirm(){
      if(
        this.CCZ_pic.length != 0 &&
        this.DYZK &&
        this.CFZK &&
        this.CZFY_validDate &&
        this.SFFY &&
        this.FCZH &&
        this.FCZLHMC &&
        this.TYPE &&
        this.FWXZ &&
        this.JZMJ &&
        this.GYQK &&
        this.FEBL &&
        this.DJJG &&
        this.DH &&
        this.FH &&
        this.FWBH &&
        this.FCDJJG &&
        this.LYWZ
      ){

      } else {
        alert('请输入完整信息')
        return
      }
      let status = '1'
      MessageBox.confirm('确认完成后将无法修改信息').then(action => {
          console.log(action)
          if(action=='confirm'){
            this.SetData(status)
          }
      })
    },
    save(){
      if(
        this.CCZ_pic.length != 0 ||
        this.DYZK ||
        this.CFZK ||
        this.CZFY_validDate ||
        this.SFFY ||
        this.FCZH ||
        this.FCZLHMC ||
        this.TYPE ||
        this.FWXZ ||
        this.JZMJ ||
        this.GYQK ||
        this.FEBL ||
        this.DJJG ||
        this.DH ||
        this.FH ||
        this.FWBH ||
        this.FCDJJG ||
        this.LYWZ
      ){

      } else {
        return
      }
      let status = '0'
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
    },
    showPicc(){
      if(this.CCZ_pic.length>5){
        this.flag_add = false
      }else{
        this.flag_add = true
      }
    },
  },
  updated(){
    this.showPicc()
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
.mb120{
  margin-bottom: 120px;
}
.section_input{
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
</style>
