<template>
    <!-- 权属调查 (机动车) -->
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
<!-- **********机动车/其他交通工具********** -->
    <div>
      <section class="input">
            <ul>
                <li @click="ShowInput('ZZDEJG')">
                    <div class="fl">注册登记机关</div>
                    <div class="fr"><span>{{ZZDEJG}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="ShowInput('JDCDJBH')">
                    <div class="fl">机动车登记编号</div>
                    <div class="fr"><span>{{JDCDJBH}}</span><span class="arrow r_arrow"></span></div>
                </li>
            </ul>
        </section>

        <section class="input">
            <ul>
                <li @click="combo_HPZL">
                    <div class="fl">号牌种类</div>
                    <div class="fr"><span>{{HPZL_value}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="ShowInput('CLPP')">
                    <div class="fl">车辆品牌</div>
                    <div class="fr"><span>{{CLPP}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="combo_CLLX">
                    <div class="fl">车辆类型</div>
                    <div class="fr"><span>{{CLLX_value}}</span><span class="arrow r_arrow"></span></div>
                </li>
            </ul>
        </section>

        <!-- 选项 -->
        <div class="section_combobox" v-show="flag_HPZL">
          <div class="box">
            <div class="title">
              号牌种类
            </div>
            <div class="content">
              <mt-radio
                align="right"
                v-model="HPZL_value"
                :options="options_HPZL" :value="HPZL_value">
              </mt-radio>
            </div>
            <div class="cancel" @click="flag_HPZL=false">确定</div>
          </div>
        </div>

        <!-- 选项 -->
        <div class="section_combobox" v-show="flag_CLLX">
          <div class="box">
            <div class="title">
              车辆类型
            </div>
            <div class="content">
              <mt-radio
                align="right"
                v-model="CLLX_value"
                :options="options_CLLX" :value="CLLX_value">
              </mt-radio>
            </div>
            <div class="cancel" @click="flag_CLLX=false">确定</div>
          </div>
        </div>

        <section class="input">
            <ul>
                <li @click="ShowInput('CLSBH')">
                    <div class="fl">车辆识别号</div>
                    <div class="fr"><span>{{CLSBH}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="ShowInput('FDJH')">
                    <div class="fl">发动机号</div>
                    <div class="fr"><span>{{FDJH}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="ShowInput('CPH')">
                    <div class="fl">车牌号</div>
                    <div class="fr"><span>{{CPH}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="ShowInput('CLXH')">
                    <div class="fl">车辆型号</div>
                    <div class="fr"><span>{{CLXH}}</span><span class="arrow r_arrow"></span></div>
                </li>
            </ul>
        </section>

        <section class="input">
            <ul>
                <li @click="open('picker1')">
                    <div class="fl">注册登记日期</div>
                    <div class="fr"><span>{{ZCDJRQ}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="open('picker2')">
                    <div class="fl">车辆出厂日期</div>
                    <div class="fr"><span>{{CLCCRQ}}</span><span class="arrow r_arrow"></span></div>
                </li>
            </ul>
        </section>

        <!-- 注册登记日期 -->
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

        <!-- 车辆出厂日期 -->
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
                <li @click="combo_CLSYXZ">
                    <div class="fl">车辆使用性质</div>
                    <div class="fr"><span>{{CLSYXZ_value}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="ShowInput('CSYS')">
                    <div class="fl">车身颜色</div>
                    <div class="fr"><span>{{CSYS}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="ShowInput('JDCZT')">
                    <div class="fl">机动车状态</div>
                    <div class="fr"><span>{{JDCZT}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="combo_SFNS">
                    <div class="fl">是否年审</div>
                    <div class="fr"><span>{{SFNS_value}}</span><span class="arrow r_arrow"></span></div>
                </li>
            </ul>
        </section>

        <!-- 选项 -->
        <div class="section_combobox" v-show="flag_CLSYXZ">
          <div class="box">
            <div class="title">
              车辆使用性质
            </div>
            <div class="content">
              <mt-radio
                align="right"
                v-model="CLSYXZ_value"
                :options="options_CLSYXZ" :value="CLSYXZ_value">
              </mt-radio>
            </div>
            <div class="cancel" @click="flag_CLSYXZ=false">确定</div>
          </div>
        </div>
        <!-- 选项 -->
        <div class="section_combobox" v-show="flag_SFNS">
          <div class="box">
            <div class="title">
              是否年审
            </div>
            <div class="content">
              <mt-radio
                align="right"
                v-model="SFNS_value"
                :options="options_SFNS" :value="SFNS_value">
              </mt-radio>
            </div>
            <div class="cancel" @click="flag_SFNS=false">确定</div>
          </div>
        </div>

    </div>
<!-- **********机动车/其他交通工具********** -->

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
                <li  @click="open('picker3')">
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
          <div v-show="inputType === 'ZZDEJG'" class="text">
            <mt-field v-model="ZZDEJG" placeholder="请输入注册登记机关"></mt-field>
          </div>
          <div v-show="inputType === 'JDCDJBH'" class="text">
            <mt-field v-model="JDCDJBH" placeholder="请输入机动车登记编号"></mt-field>
          </div>
          <div v-show="inputType === 'CLPP'" class="text">
            <mt-field v-model="CLPP" placeholder="请输入车辆品牌"></mt-field>
          </div>
          <div v-show="inputType === 'CLSBH'" class="text">
            <mt-field v-model="CLSBH" placeholder="请输车辆识别号"></mt-field>
          </div>
          <div v-show="inputType === 'FDJH'" class="text">
            <mt-field v-model="FDJH" placeholder="请输入发动机号"></mt-field>
          </div>
          <div v-show="inputType === 'CPH'" class="text">
            <mt-field v-model="CPH" placeholder="请输入车牌号"></mt-field>
          </div>
          <div v-show="inputType === 'CLXH'" class="text">
            <mt-field v-model="CLXH" placeholder="请输入车辆型号"></mt-field>
          </div>
          <div v-show="inputType === 'CSYS'" class="text">
            <mt-field v-model="CSYS" placeholder="请输入车身颜色"></mt-field>
          </div>
          <div v-show="inputType === 'JDCZT'" class="text">
            <mt-field v-model="JDCZT" placeholder="请输入机动车状态"></mt-field>
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
import { format } from '../../assets/js/Util.js'
import chooseCourt from './chooseCourt.vue'
import { Uploader } from 'vant';
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
      section_confirm: true,
      status: '', //01状态码
      value:'',
      section_input: false,
      secFlag:false, //照片下拉
      added: false,
      files: [], //要上传的图片

      CCZ_pic: [],//财产权证照片
      DYZK: '',//抵押状况
      CFZK: '',//查封状况
      CZFY_validDate: '',//处置法院查封预计结束时间
      SFFY: '',//首封法院

      //机动车/其他交通工具:
	    ZZDEJG: '', //注册登记机关
	    JDCDJBH: '', //机动车登记编号
	    HPZL: '', //号牌种类
	    CLPP: '', //车辆品牌
	    CLLX: '', //车辆类型
	    CLSBH: '', //车辆识别号
	    FDJH: '', //发动机号
	    CPH: '', //车牌号
	    CLXH: '', //车辆型号
	    ZCDJRQ: '', //注册登记日期
	    CLCCRQ: '', //车辆出厂日期
	    CLSYXZ: '', //车辆使用性质
	    CSYS: '', //车身颜色
	    JDCZT: '', //机动车状态
      SFNS: '', //是否年审

      inputType: '', //区分输入框
      inputModel: '', //输入框

      options_HPZL:[
        {
          label: "普通小型车",
          value: "普通小型车",
          id:1
        },
        {
          label: "大型车辆",
          value: "大型车辆",
          id:2
        },
        {
          label: "摩托车",
          value: "摩托车",
          id:3
        },
        {
          label: "驾校教练车",
          value: "驾校教练车",
          id:4
        },
        {
          label: "涉外车辆",
          value: "涉外车辆",
          id:5
        },
        {
          label: "政法部门",
          value: "政法部门",
          id:6
        },
        {
          label: "警车",
          value: "警车",
          id:7
        },
        {
          label: "武警车辆",
          value: "武警车辆",
          id:8
        },
        {
          label: "军车",
          value: "军车",
          id:9
        }
      ],//号牌种类
      options_CLLX: [
        {
          label: "小型轿车",
          value: "小型轿车",
          id:1
        },
        {
          label: "中型车",
          value: "中型车",
          id:2
        },
        {
          label: "大型车",
          value: "大型车",
          id:3
        },
        {
          label: "微型车",
          value: "微型车",
          id:4
        }
      ],//车辆类型
      options_CLSYXZ: [
        {
          label: "非营运",
          value: "非营运",
          id: 1
        },
        {
          label: "营运",
          value: "营运",
          id: 2
        }
      ],//车辆使用性质
      options_SFNS: [
        {
          label: "过期",
          value: "过期",
          id: 1
        },
        {
          label: "没过期",
          value: "没过期",
          id: 2
        }
      ],//是否年审
      HPZL_value: '',
      CLLX_value: '',
      CLSYXZ_value: '',
      SFNS_value: '',
      flag_HPZL: false,
      flag_CLLX: false,
      flag_CLSYXZ: false,
      flag_SFNS: false,


      startDate: new Date('2010/1/1'),
      endDate: new Date('2040/12/31'),

      court_value: '',
      flag_court: false,
      flag_add: true,
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
  methods:{
    showPicc(){
      if(this.CCZ_pic.length>5){
        this.flag_add = false
      }else{
        this.flag_add = true
      }
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
    open(picker) { //开启时间组件
      if(this.status == '1') return
      if(this.userType != '1') return
      this.$refs[picker].open();
    },
    handleConfirm1(value) {
      this.ZCDJRQ = format(value,'yyyy-MM-dd');
    },
    handleConfirm2(value) {
      this.CLCCRQ = format(value,'yyyy-MM-dd');
    },
    handleConfirm3(value) {
      this.CZFY_validDate = format(value,'yyyy-MM-dd');
    },
    combo_HPZL(){
      if(this.userType != '1') return
      if(this.status == 1) return
      this.flag_HPZL = true
    },
    combo_CLLX(){
      if(this.userType != '1') return
      if(this.status == 1) return
      this.flag_CLLX = true
    },
    combo_CLSYXZ(){
      if(this.userType != '1') return
      if(this.status == 1) return
      this.flag_CLSYXZ = true
    },
    combo_SFNS(){
      if(this.userType != '1') return
      if(this.status == 1) return
      this.flag_SFNS = true
    },
    // 输入框事件
    ShowInput(tab){
      if(this.status == '1') return
      if(this.userType != '1') return
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
        userId: localStorage.getItem('userId') || '',
        prodId: localStorage.getItem('productId'), //产品id
        status: status, //0保存 1完成
        data04: {
            CCZ_pic: CCZ_pic, //财产权证照片
            DYZK: this.DYZK, //抵押状况
            CFZK: this.CFZK, //查封状况
            CZFY_validDate: this.CZFY_validDate, //处置法院查封预计结束时间
            SFFY: this.SFFY, //首封法院

            ZZDEJG: this.ZZDEJG, //注册登记机关
            JDCDJBH: this.JDCDJBH, //机动车登记编号
            HPZL: this.HPZL, //号牌种类
            CLPP: this.CLPP, //车辆品牌
            CLLX: this.CLLX, //车辆类型
            CLSBH: this.CLSBH, //车辆识别号
            FDJH: this.FDJH, //发动机号
            CPH: this.CPH, //车牌号
            CLXH: this.CLXH, //车辆型号
            ZCDJRQ: this.ZCDJRQ, //注册登记日期
            CLCCRQ: this.CLCCRQ, //车辆出厂日期
            CLSYXZ: this.CLSYXZ, //车辆使用性质
            CSYS: this.CSYS, //车身颜色
            JDCZT: this.JDCZT, //机动车状态
            SFNS: this.SFNS, //是否年审
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
        prodId: localStorage.getItem('productId'),
        userId: localStorage.getItem('userId') || '',
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

          that.ZZDEJG = data.ZZDEJG //注册登记机关
          that.JDCDJBH = data.JDCDJBH //机动车登记编号
          that.HPZL = data.HPZL //号牌种类
          that.CLPP = data.CLPP //车辆品牌
          that.CLLX = data.CLLX //车辆类型
          that.CLSBH = data.CLSBH //车辆识别号
          that.FDJH = data.FDJH //发动机号
          that.CPH = data.CPH //车牌号
          that.CLXH = data.CLXH //车辆型号
          that.ZCDJRQ = data.ZCDJRQ //注册登记日期
          that.CLCCRQ = data.CLCCRQ //车辆出厂日期
          that.CLSYXZ = data.CLSYXZ //车辆使用性质
          that.CSYS = data.CSYS //车身颜色
          that.JDCZT = data.JDCZT //机动车状态
          that.SFNS = data.SFNS //是否年审
        }
      })
    },
    confirm(){
      if(
        this.CCZ_pic &&
        this.DYZK &&
        this.CFZK &&
        this.CZFY_validDate &&
        this.SFFY &&
        this.ZZDEJG &&
        this.JDCDJBH &&
        this.HPZL &&
        this.CLPP &&
        this.CLLX &&
        this.CLSBH &&
        this.FDJH &&
        this.CPH &&
        this.CLXH &&
        this.ZCDJRQ &&
        this.CLCCRQ &&
        this.CLSYXZ &&
        this.CSYS &&
        this.JDCZT &&
        this.SFNS
      ){

      } else {
        this.section_confirm = false
      }
      let status = '1'
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
        this.CCZ_pic ||
        this.DYZK ||
        this.CFZK ||
        this.CZFY_validDate ||
        this.SFFY ||

        this.ZZDEJG ||
        this.JDCDJBH ||
        this.HPZL ||
        this.CLPP ||
        this.CLLX ||
        this.CLSBH ||
        this.FDJH ||
        this.CPH ||
        this.CLXH ||
        this.ZCDJRQ ||
        this.CLCCRQ ||
        this.CLSYXZ ||
        this.CSYS ||
        this.JDCZT ||
        this.SFNS
      ){
      let status = '0'
      this.SetData(status)
      } else {
        return
      }
    },
    back(){
      this.$router.go(-1);
    },
    setlocal(){

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
    ConfirmSave(){
        console.log(this.CCZ_pic)
        console.log(this.DYZK)
        console.log(this.CFZK)
        console.log(this.CZFY_validDate)
        console.log(this.SFFY)
        console.log(this.ZZDEJG)
        console.log(this.JDCDJBH)
        console.log(this.HPZL)
        console.log(this.CLPP)
        console.log(this.CLLX)
        console.log(this.CLSBH)
        console.log(this.FDJH)
        console.log(this.CPH)
        console.log(this.CLXH)
        console.log(this.ZCDJRQ)
        console.log(this.CLCCRQ)
        console.log(this.CLSYXZ)
        console.log(this.CSYS)
        console.log(this.JDCZT)
        console.log(this.SFNS)

      if(this.userType != '1') return
      if(this.status == '1') return
      if(
        this.CCZ_pic.length!=0 &&
        this.DYZK &&
        this.CFZK &&
        // this.CZFY_validDate &&
        this.SFFY &&
        this.ZZDEJG &&
        this.JDCDJBH &&
        this.HPZL &&
        this.CLPP &&
        this.CLLX &&
        this.CLSBH &&
        this.FDJH &&
        this.CPH &&
        this.CLXH &&
        // this.ZCDJRQ &&
        // this.CLCCRQ &&
        this.CLSYXZ &&
        this.CSYS &&
        this.JDCZT &&
        this.SFNS
      ){
        this.section_confirm = true
      }else{
        this.section_confirm = false
      }
    },
    init_flag(){
      if(this.status == '1' || this.userType != '1'){
        this.section_confirm = false
      }
    }
  },
  watch:{
    HPZL_value(){ //号牌种类
      this.options_HPZL.forEach((ele) => {
        if(this.HPZL_value == ele.value) {
          this.HPZL = ele.id;
        }
      })
    },
    HPZL(){
      this.options_HPZL.forEach((ele) => {
        if(this.HPZL == ele.id) {
          this.HPZL_value = ele.value;
        }
      })
    },
    CLLX_value(){ //车辆类型
      this.options_CLLX.forEach(ele => {
        if(this.CLLX_value == ele.value){
          this.CLLX = ele.id;
        }
      });
    },
    CLLX(){
      this.options_CLLX.forEach(ele => {
        if(this.CLLX == ele.id){
          this.CLLX_value = ele.value;
        }
      });
    },
    CLSYXZ_value(){ //车辆使用性质
      this.options_CLSYXZ.forEach(ele => {
        if(this.CLSYXZ_value == ele.value){
          this.CLSYXZ = ele.id;
        }
      });
    },
    CLSYXZ(){
      this.options_CLSYXZ.forEach(ele => {
        if(this.CLSYXZ == ele.id){
          this.CLSYXZ_value = ele.value;
        }
      });
    },
    SFNS_value(){
      this.options_SFNS.forEach(ele => {
        if(this.SFNS_value == ele.value){
          this.SFNS = ele.id;
        }
      });
    },
    SFNS(){
      this.options_SFNS.forEach(ele => {
        if(this.SFNS == ele.id){
          this.SFNS_value = ele.value;
        }
      });
    },

  },
  components:{
    chooseCourt
  },
  updated(){
    // this.ConfirmSave()
    this.showPicc()
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
  margin-bottom: 120px!important;
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
