<template>
    <!-- 权属调查 (土地) -->
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
<!-- **********土地********** -->
    <div>
      <section class="input">
          <ul>
              <li @click="ShowInput('TDDJJG')">
                  <div class="fl">登记机关</div>
                  <div class="fr"><span>{{TDDJJG | HideText}}</span><span class="arrow r_arrow"></span></div>
              </li>
              <li @click="ShowInput('CQZH')">
                  <div class="fl">产权证号</div>
                  <div class="fr"><span>{{CQZH | HideText}}</span><span class="arrow r_arrow"></span></div>
              </li>
          </ul>
      </section>

      <section class="input">
          <ul>
              <li @click="ShowInput('TDMJ')">
                  <div class="fl">土地面积</div>
                  <div class="fr"><span>{{TDMJ | HideText}}</span><span class="arrow r_arrow"></span></div>
              </li>
              <li @click="combo_QSLB">
                  <div class="fl">权属类别</div>
                  <div class="fr"><span>{{QSLB_value | HideText}}</span><span class="arrow r_arrow"></span></div>
              </li>
              <li  @click="ShowInput('GTZYDZ')">
                  <div class="fl">国土资源地址或权属说明</div>
                  <div class="fr"><span>{{GTZYDZ | HideText}}</span><span class="arrow r_arrow"></span></div>
              </li>
          </ul>
      </section>

      <!-- 选项 -->
      <div class="section_combobox" v-show="flag_QSLB">
        <div class="box">
          <div class="title">
            权属类别
          </div>
          <div class="content">
            <mt-radio
              align="right"
              v-model="QSLB_value"
              :options="options_QSLB" :value="QSLB_value">
            </mt-radio>
          </div>
          <div class="cancel" @click="flag_QSLB=false">确定</div>
        </div>
      </div>

      <!-- 登记时间 -->
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

      <section class="input">
          <ul>
              <li @click="combo_GYQK">
                  <div class="fl">共有情况</div>
                  <div class="fr"><span>{{TDGYQK_value}}</span><span class="arrow r_arrow"></span></div>
              </li>
              <li @click="ShowInput('FFBL')">
                  <div class="fl">份额比例</div>
                  <div class="fr"><span>{{FFBL | HideText}}</span><span class="arrow r_arrow"></span></div>
              </li>
              <li @click="ShowInput('DJJG1')">
                  <div class="fl">登记价格</div>
                  <div class="fr"><span>{{DJJG1 | HideText}}</span><span class="arrow r_arrow"></span></div>
              </li>
              <li @click="open('picker1')">
                  <div class="fl">登记时间</div>
                  <div class="fr"><span>{{DJSJ}}</span><span class="arrow r_arrow"></span></div>
              </li>
              <li @click="ShowInput('TDDH')">
                  <div class="fl">地号</div>
                  <div class="fr"><span>{{TDDH | HideText}}</span><span class="arrow r_arrow"></span></div>
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
              v-model="TDGYQK_value"
              :options="options_TDGYQK" :value="TDGYQK_value">
            </mt-radio>
          </div>
          <div class="cancel" @click="flag_GYQK=false">确定</div>
        </div>
      </div>

      <section class="input">
          <ul>
              <li @click="combo_SYQLX">
                  <div class="fl">使用权类型</div>
                  <div class="fr"><span>{{SYQLX_value}}</span><span class="arrow r_arrow"></span></div>
              </li>
              <li @click="ShowInput('SYQMJ')">
                  <div class="fl">使用权面积</div>
                  <div class="fr"><span>{{SYQMJ | HideText}}</span><span class="arrow r_arrow"></span></div>
              </li>
              <li @click="combo_YT">
                  <div class="fl">用途</div>
                  <div class="fr"><span>{{YT_value}}</span><span class="arrow r_arrow"></span></div>
              </li>
              <li @click="ShowInput('QLR')">
                  <div class="fl">权利人</div>
                  <div class="fr"><span>{{QLR | HideText}}</span><span class="arrow r_arrow"></span></div>
              </li>
          </ul>
      </section>

      <!-- 选项 -->
      <div class="section_combobox" v-show="flag_SYQLX">
        <div class="box">
          <div class="title">
            使用权类型
          </div>
          <div class="content">
            <mt-radio
              align="right"
              v-model="SYQLX_value"
              :options="options_SYQLX" :value="SYQLX_value">
            </mt-radio>
          </div>
          <div class="cancel" @click="flag_SYQLX=false">确定</div>
        </div>
      </div>
      <!-- 选项 -->
      <div class="section_combobox" v-show="flag_YT">
        <div class="box">
          <div class="title">
            用途
          </div>
          <div class="content">
            <mt-radio
              align="right"
              v-model="YT_value"
              :options="options_YT" :value="YT_value">
            </mt-radio>
          </div>
          <div class="cancel" @click="flag_YT=false">确定</div>
        </div>
      </div>

      <section class="input">
          <ul>
              <li @click="ShowInput('DYMJ')">
                  <div class="fl">独用面积</div>
                  <div class="fr"><span>{{DYMJ | HideText}}</span><span class="arrow r_arrow"></span></div>
              </li>
              <li @click="ShowInput('FTMJ')">
                  <div class="fl">分摊面积</div>
                  <div class="fr"><span>{{FTMJ | HideText}}</span><span class="arrow r_arrow"></span></div>
              </li>
              <li @click="open('picker2')">
                  <div class="fl">终止日期</div>
                  <div class="fr"><span>{{ZZRQ}}</span><span class="arrow r_arrow"></span></div>
              </li>
          </ul>
      </section>
    </div>

    <!-- 终止日期 -->
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
<!-- **********土地********** -->

<!-- **********公共部分************* -->
        <section class="mb120">
            <ul>
                <li @click="ShowInput('DYZK')">
                    <div class="fl">抵押状况</div>
                    <div class="fr"><span>{{DYZK | HideText}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="ShowInput('CFZK')">
                    <div class="fl">查封状况</div>
                    <div class="fr"><span>{{CFZK | HideText}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="open('picker3')">
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

        <!-- 终止日期 -->
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
          <div v-show="inputType === 'TDDJJG'" class="text">
            <mt-field v-model="TDDJJG" placeholder="请输入登记机关"></mt-field>
          </div>
          <div v-show="inputType === 'CQZH'" class="text">
            <mt-field v-model="CQZH" placeholder="请输入产权证号"></mt-field>
          </div>
          <div v-show="inputType === 'TDMJ'" class="text">
            <mt-field v-model="TDMJ" placeholder="请输入土地面积"></mt-field>
          </div>
          <div v-show="inputType === 'GTZYDZ'" class="text">
            <mt-field v-model="GTZYDZ" placeholder="请输入国土资源地址或权属说明"></mt-field>
          </div>
          <div v-show="inputType === 'FFBL'" class="text">
            <mt-field v-model="FFBL" placeholder="请输入份额比例"></mt-field>
          </div>
          <div v-show="inputType === 'DJJG1'" class="text">
            <mt-field v-model="DJJG1" placeholder="请输入登记价格"></mt-field>
          </div>
          <div v-show="inputType === 'TDDH'" class="text">
            <mt-field v-model="TDDH" placeholder="请输入地号"></mt-field>
          </div>
          <div v-show="inputType === 'SYQMJ'" class="text">
            <mt-field v-model="SYQMJ" placeholder="请输入使用权面积"></mt-field>
          </div>
          <div v-show="inputType === 'QLR'" class="text">
            <mt-field v-model="QLR" placeholder="请输入权利人"></mt-field>
          </div>
          <div v-show="inputType === 'DYMJ'" class="text">
            <mt-field v-model="DYMJ" placeholder="请输入独用面积"></mt-field>
          </div>
          <div v-show="inputType === 'FTMJ'" class="text">
            <mt-field v-model="FTMJ" placeholder="请输入分摊面积"></mt-field>
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

      CCZ_pic: [],//财产权证照片
      DYZK: '',//抵押状况
      CFZK: '',//查封状况
      CZFY_validDate: '',//处置法院查封预计结束时间
      SFFY: '',//首封法院

      // 土地
      TDDJJG: '',//登记机关
      CQZH: '',//产权证号
      TDMJ: '',//土地面积
      QSLB: '',//权属类别
      GTZYDZ: '',//国土资源地址或权属说明
      TDGYQK: '',//共有情况
      FFBL: '',//份额比例
      DJJG1: '',//登记价格
      DJSJ: '',//登记时间
      TDDH: '',//地号
      SYQLX: '',//使用权类型
      SYQMJ: '',//使用权面积
      YT: '',//用途
      QLR: '',//权利人
      DYMJ: '',//独用面积
      FTMJ: '',//分摊面积
      ZZRQ: '',//终止日期

      inputType: '', //区分输入框
      inputModel: '', //输入框

      options_QSLB: [
        {
          label: "国有土地",
          value: "国有土地",
          id: 1
        },
        {
          label: "集体所有",
          value: "集体所有",
          id: 2
        }
      ],//权属类别
      options_SYQLX: [
        {
          label: "划拨土地",
          value: "划拨土地",
          id: 1
        },
        {
          label: "出让土地",
          value: "出让土地",
          id: 2
        }
      ],//使用权类型
      options_TDGYQK: [
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
      options_YT: [
        {
          label: "农用地",
          value: "农用地",
          id: 1
        },
        {
          label: "建设用地",
          value: "建设用地",
          id: 2
        },
        {
          label: "未利用地",
          value: "未利用地",
          id: 3
        }
      ],//用途

      QSLB_value: '',
      SYQLX_value: '',
      TDGYQK_value: '',
      YT_value: '',

      flag_QSLB: false,
      flag_SYQLX: false,
      flag_GYQK: false,
      flag_YT: false,

      startDate: new Date('2010/1/1'),
      endDate: new Date('2040/12/31'),

      flag_court: false,
      court_value: '',
      flag_add: true,
    }
  },
  watch:{
    QSLB_value(){ //权属类别
      this.options_QSLB.forEach(ele => {
        if (this.QSLB_value == ele.value) {
          this.QSLB = ele.id;
        }
      });
    },
    QSLB(){
      this.options_QSLB.forEach(ele => {
        if (this.QSLB == ele.id) {
          this.QSLB_value = ele.value;
        }
      });
    },
    SYQLX_value(){ //使用权类型
      this.options_SYQLX.forEach(ele => {
        if (this.SYQLX_value == ele.value) {
          this.SYQLX = ele.id;
        }
      });
    },
    SYQLX(){
      this.options_SYQLX.forEach(ele => {
        if (this.SYQLX == ele.id) {
          this.SYQLX_value = ele.value;
        }
      });
    },
    TDGYQK_value(){ //共有情况
      this.options_TDGYQK.forEach(ele => {
        if (this.TDGYQK_value == ele.value) {
          this.TDGYQK = ele.id;
        }
      });
    },
    TDGYQK(){
      this.options_TDGYQK.forEach(ele => {
        if (this.TDGYQK == ele.id) {
          this.TDGYQK_value = ele.value;
        }
      });
    },
    YT_value(){ //用途
      this.options_YT.forEach(ele => {
        if (this.YT_value == ele.value) {
          this.YT = ele.id;
        }
      });
    },
    YT(){
      this.options_YT.forEach(ele => {
        if (this.YT == ele.id) {
          this.YT_value = ele.value;
        }
      });
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
      this.status = this.$route.query.status
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
    combo_QSLB(){
      this.flag_QSLB = true;
    },
    combo_GYQK(){
      this.flag_GYQK = true;
    },
    combo_SYQLX(){
      this.flag_SYQLX = true;
    },
    combo_YT(){
      this.flag_YT = true;
    },
    // 显示图片
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

          that.TDDJJG = data.TDDJJG //登记机关
          that.CQZH = data.CQZH //产权证号
          that.TDMJ = data.TDMJ //土地面积
          that.QSLB = data.QSLB //权属类别
          that.GTZYDZ = data.GTZYDZ //国土资源地址或权属说明
          that.TDGYQK = data.TDGYQK //共有情况
          that.FFBL = data.FFBL //份额比例
          that.DJJG1 = data.DJJG1 //登记价格
          that.DJSJ = data.DJSJ //登记时间
          that.TDDH = data.TDDH //地号
          that.SYQLX = data.SYQLX //使用权类型
          that.SYQMJ = data.SYQMJ //使用权面积
          that.YT = data.YT //用途
          that.QLR = data.QLR //权利人
          that.DYMJ = data.DYMJ //独用面积
          that.FTMJ = data.FTMJ //分摊面积
          that.ZZRQ = data.ZZRQ //终止日期
        }
      })
    },
    SetData(status){
      var CCZ_pic = this.CCZ_pic.toString()
      var that = this;
      let url = `${ReqUrl.add}`
      let data = {
        type_code: "t04",
        userId: localStorage.getItem('userId') || '',//用户id
        prodId: localStorage.getItem('productId') || '', //产品id
        status: status, //0保存 1完成
        data04: {
          CCZ_pic: CCZ_pic,//财产权证照片
          DYZK: that.DYZK,//抵押状况
          CFZK: that.CFZK,//查封状况
          CZFY_validDate: that.CZFY_validDate,//处置法院查封预计结束时间
          SFFY: that.SFFY,//首封法院

          TDDJJG: that.TDDJJG,//登记机关
          CQZH: that.CQZH,//产权证号
          TDMJ: that.TDMJ,//土地面积
          QSLB: that.QSLB,//权属类别
          GTZYDZ: that.GTZYDZ,//国土资源地址或权属说明
          TDGYQK: that.TDGYQK,//共有情况
          FFBL: that.FFBL,//份额比例
          DJJG1: that.DJJG1,//登记价格
          DJSJ: that.DJSJ,//登记时间
          TDDH: that.TDDH,//地号
          SYQLX: that.SYQLX,//使用权类型
          SYQMJ: that.SYQMJ,//使用权面积
          YT: that.YT, //用途
          QLR: that.QLR,//权利人
          DYMJ: that.DYMJ,//独用面积
          FTMJ: that.FTMJ,//分摊面积
          ZZRQ: that.ZZRQ,//终止日期
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
    confirm(){
      if(
        this.CCZ_pic.length != 0 &&
        this.DYZK &&
        this.CFZK &&
        this.CZFY_validDate &&
        this.SFFY &&
        this.TDDJJG &&
        this.CQZH &&
        this.TDMJ &&
        this.QSLB &&
        this.GTZYDZ &&
        this.TDGYQK &&
        this.FFBL &&
        this.DJJG1 &&
        this.DJSJ &&
        this.TDDH &&
        this.SYQLX &&
        this.SYQMJ &&
        this.YT &&
        this.QLR &&
        this.DYMJ &&
        this.FTMJ &&
        this.ZZRQ
      ){

      } else {
        alert('请输入完整信息。')
        return
      }
      let status = "1"
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
        this.CCZ_pic.length != 0 ||
        this.DYZK ||
        this.CFZK ||
        this.CZFY_validDate ||
        this.SFFY ||
        this.TDDJJG ||
        this.CQZH ||
        this.TDMJ ||
        this.QSLB ||
        this.GTZYDZ ||
        this.TDGYQK ||
        this.FFBL ||
        this.DJJG1 ||
        this.DJSJ ||
        this.TDDH ||
        this.SYQLX ||
        this.SYQMJ ||
        this.YT ||
        this.QLR ||
        this.DYMJ ||
        this.FTMJ ||
        this.ZZRQ
      ){
      } else {
        return
      }
      let status = '0'
      this.SetData(status)
    },
    setlocal(){

    },
    open(picker) { //开启时间组件
      this.$refs[picker].open();
    },
    handleConfirm1(value) {
      this.DJSJ = format(value,'yyyy-MM-dd');
    },
    handleConfirm2(value) {
      this.ZZRQ = format(value,'yyyy-MM-dd');
    },
    handleConfirm3(value) {
      this.CZFY_validDate = format(value,'yyyy-MM-dd');
    },
    ConfirmSave(){

    },
    init_flag(){
      if(this.status == '1' || this.userType != '1'){
        this.section_confirm = false
      }
    }
  },
  updated(){
    // this.ConfirmSave()
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
