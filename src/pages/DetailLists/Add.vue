<template>
    <!-- 1基本信息 -->
    <div>
        <section class="input">
            <ul>
                <li @click="showInput('entrust_no')">
                    <div class="fl">委托号</div>
                    <div class="fr"><span class="overHidden">{{entrust_no}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li inputType="case_no" @click="showInput('case_no')">
                    <div class="fl">案号</div>
                    <div class="fr"><span class="overHidden">{{case_no}}</span><span class="arrow r_arrow"></span></div>
                </li>
            </ul>
        </section>


        <!-- 标的物类型 -->
        <section class="input">
            <ul>
                <li @click="showInput('prodname')">
                    <div class="fl">标的物名称</div>
                    <div class="fr"><span class="overHidden">{{prodname}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="typeFunc">
                    <div class="fl">标的物类型</div>
                    <div class="fr"><span>{{prodtype_value}}</span><span class="arrow r_arrow"></span></div>
                </li>
            </ul>
        </section>
        <!-- 下拉框 -->
        <div class="section_combobox" v-show="comboflag_type">
          <div class="box">
            <div class="title">
              标的物类型
            </div>
            <div class="content">
              <mt-radio
                align="right"
                v-model="prodtype_value"
                :options="options_type" :value="prodtype_value">
              </mt-radio>
            </div>
            <div class="cancel" @click="comboflag_type=false">确定</div>
          </div>
        </div>

        <!-- 承办法院 -->
        <section class="input">
            <ul>
                <li @click="courtFunc">
                    <div class="fl">承办法院</div>
                    <div class="fr"><span>{{court_value}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li inputType="office" @click="OfficeFunc">
                    <div class="fl">网拍办联系人</div>
                    <div class="fr"><span>{{office_value}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li inputType="offece_no">
                    <div class="fl">网拍办联系电话</div>
                    <div class="fr">
                      <span><span>{{offece_no}}</span></span><span class="arrow r_arrow"></span>
                    </div>
                </li>
            </ul>
        </section>
        <chooseCourt @courtEvent="courtEvent" v-show="flag_court"></chooseCourt>
        <!-- 下拉框 -->
        <div class="section_combobox" v-show="comboflag_office">
          <div class="box">
            <div class="title">
              网拍办联系人
            </div>
            <div class="content">
              <mt-radio
                align="right"
                v-model="office_value"
                :options="options_office"
                :value="office_value"
                >
              </mt-radio>
            </div>
            <div class="cancel" @click="comboflag_office=false">确定</div>
          </div>
        </div>

        <!-- 辅助机构案件负责人 -->
        <section class="input">
            <ul>
                <li inputType="organ" @click="organFunc">
                    <div class="fl">辅助机构案件负责人</div>
                    <div class="fr"><span>{{organ_value}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li inputType="answer_no">
                    <div class="fl">业务咨询电话</div>
                    <div class="fr"><span>{{answer_no}}</span><span class="arrow r_arrow"></span></div>
                </li>
            </ul>
        </section>
        <!-- 下拉框 -->
        <div class="section_combobox" v-show="comboflag_organ">
          <div class="box">
            <div class="title">
              辅助机构案件负责人
            </div>
            <div class="content">
              <mt-radio
                align="right"
                v-model="organ_value"
                :options="options_organ">
              </mt-radio>
            </div>
            <div class="cancel" @click="comboflag_organ=false">确定</div>
          </div>
        </div>

        <!-- 拍卖平台 -->
        <section class="input">
            <ul>
                <li @click="comboflag_platform=true">
                    <div class="fl">拍卖平台</div>
                    <div class="fr"><span>{{platform_value}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="open('picker')">
                    <div class="fl">委托日期</div>
                    <div class="fr"><span>{{entrust_date}}</span><span class="arrow r_arrow"></span></div>
                </li>
            </ul>
        </section>
        <!-- 下拉框 -->
        <div class="section_combobox" v-show="comboflag_platform">
          <div class="box">
            <div class="title">
              拍卖平台
            </div>
            <div class="content">
              <mt-radio
                align="right"
                v-model="platform_value"
                :options="options_platform" :value="platform_value">
              </mt-radio>
            </div>
            <div class="cancel" @click="comboflag_platform=false">确定</div>
          </div>
        </div>
        <!-- 委托日期 -->
        <mt-datetime-picker
          ref="picker"
          type="date"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
          :value="defaultDate"
          @confirm="handleConfirm"
          >
        </mt-datetime-picker>

        <!-- 承办法官 -->
        <section class="input">
            <ul>
                <li inputType="judge" @click="judgeFunc">
                    <div class="fl">承办法官</div>
                    <div class="fr"><span>{{judge_value}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li inputType="judge_no">
                    <div class="fl">法官电话</div>
                    <div class="fr"><span>{{judge_no}}</span><span class="arrow r_arrow"></span></div>
                </li>
            </ul>
        </section>
        <!-- 下拉框 -->
        <div class="section_combobox" v-show="comboflag_judge">
          <div class="box">
            <div class="title">
              承办法官
            </div>
            <div class="content">
              <mt-radio
                align="right"
                v-model="judge_value"
                :options="options_judge">
              </mt-radio>
            </div>
            <div class="cancel" @click="comboflag_judge=false">确定</div>
          </div>
        </div>


        <!-- 申请执行人 -->
        <section class="input">
            <ul>
                <li @click="showInput('apply_id')">
                    <div class="fl">申请执行人</div>
                    <div class="fr"><span>{{apply_id}}</span><span class="arrow r_arrow"></span></div>
                </li>
                <li @click="showInput('apply_no')">
                    <div class="fl">申请执行人电话</div>
                    <div class="fr"><span>{{apply_no}}</span><span class="arrow r_arrow"></span></div>
                </li>
            </ul>
        </section>


        <!-- 委托辅助机构函 -->
        <div class="section2 mb120 clearfix">
            <div class="fl">
                委托辅助机构函
            </div>
            <div class="fr">
                <ul class="clearfix">
                    <li v-show="flag_added" class="added">
                      <img :src="settlementUrl" alt="">
                      <span></span>
                    </li>
                    <li class="adding">
                      <van-uploader :after-read="docUpload">
                        <img src="../../assets/images/1526903776(1).jpg" alt="">
                      </van-uploader >
                    </li>
                </ul>
            </div>
        </div>
        <div class="div"></div>

        <!-- 保存弹框 -->
        <div v-show="section_confirm" class="section_confirm">
            <ul>
                <li class="confirm" @click="noflag && confirm()">确认完成</li>
                <li class="save" @click="noflag && save()">保存</li>
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
          <div v-show="inputType === 'entrust_no'" class="text">
            <mt-field v-model="entrust_no" placeholder="请输入委托号"></mt-field>
          </div>
          <div v-show="inputType === 'case_no'" class="text">
            <mt-field v-model="case_no" placeholder="请输入案号"></mt-field>
          </div>
          <div v-show="inputType === 'prodname'" class="text">
            <mt-field v-model="prodname" placeholder="请输入标的物名称"></mt-field>
          </div>
          <div v-show="inputType === 'apply_id'" class="text">
            <mt-field v-model="apply_id" placeholder="请输申请执行人"></mt-field>
          </div>
          <div v-show="inputType === 'apply_no'" class="text">
            <mt-field type="tel" v-model="apply_no" placeholder="请输入申请执行人电话"></mt-field>
          </div>
          <!-- 保存弹框 -->
          <div class="input_confirm">
              <ul class="clearfix">
                  <li class="confirm"></li>
                  <li class="save" @click="input_save">确认</li>
              </ul>
          </div>
        </div>

    </div>
</template>

<script>
import * as ReqUrl from '../../../config/ReqUrl'
import qs from 'qs'
import {format} from '../../assets/js/Util.js'
import chooseCourt from './chooseCourt.vue'
import { Popup } from 'mint-ui';
const parseForm = qs.stringify
function packup (data = {}) {
    return parseForm({
        info: JSON.stringify(data)
    })
}
export default {
  data(){
    return{
      startDate: new Date('2010/1/1'),
      endDate: new Date('2040/12/31'),
      defaultDate: new Date(),
      status:'', //状态码

      proid:'',
      value:'', //单选默认
      ut:'',
      userType: null,
      entrust_no: '', //委托号
      case_no: '', //案号
      prodname: '', //标的物名称
      prodtype: '', //标的物类型
      court: '', //承办法院
      office: '', //网拍办联系人
      offece_no: '', //网拍办联系电话
      organ: '', //辅助机构案件负责人
      answer_no: '', //业务咨询电话
      platform: '', //拍卖平台
      entrust_date: '', //委托日期
      judge: '', //承办法官
      judge_no: '', //法官电话
      apply_id: '', //申请执行人
      apply_no: '', //申请执行人电话
      entrust_txt: '', //委托辅助机构函
      section_confirm: true, //确认完成弹框
      section_input: false, //输入框显示
      inputType: '',
      inputModel:'',

      // 承办法院
      court_value: '',
      flag_court: false,

      paramType: '', //查询类型
      courtId: '', //法院ID
      provinceAreaCode: '', //省区域code
      cityAreaCode: '', //市区域code

      typeData:'', //标的物类型列表
      province: '', //省
      city: '', //市

      // 标的物类型选项
      comboflag_type: false, //单选框
      options_type: [
        // {
        //   label: '房地产',
        //   value: '房地产',
        //   disabled: false
        // }
      ],
      prodtype_value: '机动车',

      // 拍卖平台
      comboflag_platform: false,
      platform_value: '公拍网',
      options_platform: [],
      data:'',

      // 网拍办联系人
      comboflag_office: false,
      office_value: '',
      options_office: [],

      // 辅助机构案件负责人
      comboflag_organ: false,
      organ_value: '',
      options_organ: [],

      // 法官
      comboflag_judge: false,
      judge_value: '',
      options_judge: [],

      phoneList1:[],
      phoneList2:[],
      phoneList3:[],

      settlementUrl:[],
      flag_added: false,

      noflag: true
    }
  },
  updated(){
    // 数据更新时保存数据
    // this.ConfirmSave()
  },
  created(){
      this.ut = localStorage.getItem('ut') || ''
      this.userType = localStorage.getItem('userType') || null
      console.log(this.userType)
      console.log(this.ut)
      this.$wx.ready(function(){
          console.log('111')
      })
      this.initData()
      this.querytype()
      this.court=sessionStorage.chooseCourtName
  },
  components:{
    chooseCourt
  },
  watch: {
    prodtype_value(){
      this.options_type.forEach(ele => {
        if (this.prodtype_value == ele.value) {
          this.prodtype = ele.key
        }
      });
    },
    platform_value(){
      this.options_platform.forEach(ele => {
        if(this.platform_value == ele.value){
          this.platform = ele.id
        }
      });
    },
    platform(){
      this.options_platform.forEach(ele => {
        if(this.platform == ele.id){
          this.platform_value = ele.value
        }
      });
    },
    office_value(){ //网拍办联系人
      this.options_office.forEach(ele => {
        if(this.office_value == ele.value){
          this.office = ele.id
          this.offece_no = ele.mobile
        }
      });
    },
    organ_value(){ //辅助机构案件负责人
      this.options_organ.forEach(ele => {
        if (this.organ_value == ele.value) {
          this.organ = ele.id;
          this.answer_no = ele.mobile;
        }
      });
    },
    judge_value(){ //承办法官
      this.options_judge.forEach(ele => {
        if (this.judge_value == ele.value) {
          this.judge = ele.id;
          this.judge_no = ele.mobile;
        }
      });
    }
  },
  methods:{
    initData(){
      this.entrust_no = ''
      this.case_no = ''
      this.prodname = ''
      this.prodtype = '1'
      this.court = ''
      this.office = ''
      this.offece_no = ''
      this.organ = ''
      this.answer_no = ''
      this.platform = '1'
      this.entrust_date = format(this.defaultDate, 'yyyy-MM-dd')
      this.judge = ''
      this.judge_no = ''
      this.apply_id = ''
      this.apply_no = ''
      this.settlementUrl = ''
      this.queryPlatform();
    },
    // 标的物类型查询
    typeFunc(){
      this.comboflag_type = true
    },
    querytype(){
      var data = {
        paramType: 0,
      }
      let url = `${ReqUrl.querySelectedParam}`;
      var tab = 'type'
      this.querySelectData(data, tab, url)
    },
    // 承办法院
    courtFunc(){
      this.flag_court = true;
    },
    courtEvent(data){
      this.flag_court = data.flag_court
      this.court_value = data.chooseCourtName
      this.court = data.chooseCourtKey
      this.queryOffice()
      this.queryOrgan()
      this.queryJudge()
    },
    // 网拍办联系人
    OfficeFunc(){
      if (!this.court) {
        return
      }
      this.comboflag_office = true
    },
    queryOffice(){
      var data = {
        paramType: 4,
        courtId: this.court,
      }
      let url = `${ReqUrl.querySelectedParam}`;
      var tab = 'office'
      this.options_office = []
      this.querySelectData(data, tab, url);
    },
    // 辅助机构案件负责人
    organFunc(){
      if (!this.court) {
        return
      }
      this.comboflag_organ = true
    },
    queryOrgan(){
      var data = {
        paramType: 5,
      }
      let url = `${ReqUrl.querySelectedParam}`;
      var tab = 'organ'
      this.options_organ = []
      this.querySelectData(data, tab, url);
    },
    // 承办法官
    judgeFunc(){
      if (!this.court) {
        return
      }
      this.comboflag_judge = true
    },
    queryJudge(){
      var data = {
        paramType: 6,
        courtId: this.court
      }
      let url = `${ReqUrl.querySelectedParam}`;
      var tab = 'judge'
      this.options_judge = []
      this.querySelectData(data, tab, url);
    },
    // 拍卖平台
    queryPlatform(){
      var data = {
        paramType: 2
      }
      let url = `${ReqUrl.querySelectParam}`;
      var tab = 'platform'
      this.options_platform = []
      this.querySelectData(data, tab, url)
    },
    querySelectData(data, tab, url){
      var that = this
      let headers = {openId: sessionStorage.getItem('openId')};
      that.$http.post(
          url,
          packup(data),
          {
              headers:headers
          }
      )
      .then(function(res) {
        console.log("select--",res.data.data)
        if(res.data.code === '0000' && tab === 'type'){//标的物类型
          var data_type = res.data.data;
          data_type.forEach(function(ele, index) {
            that.options_type.push({
              label: ele.value,
              value: ele.value,
              key: ele.key
            })
          });
        }
        if(res.data.code === '0000' && tab === 'office'){//网拍办联系人
          var data_office = res.data.data;
          data_office.forEach(function(ele, index) {
            that.options_office.push({
              label: ele.name,
              value: ele.name,
              mobile: ele.mobile,
              id: ele.id
            })
          });
        }
        if(res.data.code === '0000' && tab === 'organ'){ //辅助机构案件负责人
          var data_organ = res.data.data;
          data_organ.forEach(function(ele, index) {
            that.options_organ.push({
              label: ele.username,
              value: ele.username,
              mobile: ele.mobile,
              id: ele.id
            })
          });
        }
        if(res.data.code === '0000' && tab === 'platform'){ //拍卖平台
          let data_platform = res.data.data;
          console.log('data_platform', data_platform)
          data_platform.forEach(ele => {
            that.options_platform.push({
              label: ele.value,
              value: ele.value,
              id: ele.code
            })
          });

        }
        if(res.data.code === '0000' && tab === 'judge'){ //承办法官
          var data_judge = res.data.data;
          data_judge.forEach(function(ele, index) {
            that.options_judge.push({
              label: ele.username,
              value: ele.username,
              mobile: ele.mobile,
              id: ele.id
            })
          });
        }
      })
      .catch(error => {
          console.log(error);
      });
    },
    docUpload(file){
      this.uploadImg(file.content,'settlementUrl')
    },
    delImg(){
        this.settlementUrl = ''
        this.section_confirm = true
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
                    if(type=='settlementUrl'){
                       that.settlementUrl = url
                        that.section_confirm = true
                        that.flag_added = true
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
      this.$refs[picker].open();
    },
    handleConfirm(value) {
      this.entrust_date = format(value,'yyyy-MM-dd');
    },
    // 点击输入事件
    showInput(tab){
      if (this.status == '1') return;
      this.inputType = tab;
      this.section_input = true

    },
    input_save(){
      this.section_input = false
    },
    SetData(status){
      var that = this;
      let url = `${ReqUrl.add}`
      let data = {
        type_code: "t01",
        userId: localStorage.getItem('userId') || '',
        status: status, //0保存 1完成
        // prodId: "123", //第一次数据录入的时候没有id
        data01: {
          entrust_no: this.entrust_no,
          case_no: this.case_no,
          prodname: this.prodname,
          prodtype: this.prodtype,
          court: this.court,
          office: this.office,
          offece_no: this.offece_no,
          organ: this.organ,
          answer_no: this.answer_no,
          platform: this.platform,
          entrust_date: this.entrust_date,
          judge: this.judge,
          judge_no: this.judge_no,
          apply_people: this.apply_id,
          apply_tel: this.apply_no,
          entrust_txt: this.settlementUrl,
        }
      }
      console.log(data)
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
                that.noflag = true;
                alert(res.data.msg)
              }else if(res.data.code == '-1'){
                that.$router.push('/binding')
              }
          })
          .catch(error => {
              console.log(error);
          });
    },
    ConfirmSave(){
      // console.log(this.entrust_no)
      // console.log(this.case_no)
      // console.log(this.prodname)
      // console.log(this.prodtype)
      // console.log(this.court)
      // console.log(this.office)
      // console.log(this.offece_no)
      // console.log(this.organ)
      // console.log(this.answer_no)
      // console.log(this.platform)
      // console.log(this.entrust_date)
      // console.log(this.judge)
      // console.log(this.judge_no)
      // console.log(this.apply_id)
      // console.log(this.apply_no)
      if(
          this.entrust_no &&
          this.case_no &&
          this.prodname &&
          this.prodtype &&
          this.court &&
          this.office &&
          this.offece_no &&
          this.organ &&
          this.answer_no &&
          this.platform &&
          this.entrust_date &&
          this.judge &&
          this.judge_no &&
          this.apply_id &&
          this.apply_no &&
          this.settlementUrl
          ){
            this.section_confirm = true
      } else {
        this.section_confirm = false
      }

    },
    confirm(){
      this.noflag = false
      if(
          this.entrust_no &&
          this.case_no &&
          this.prodname &&
          this.prodtype &&
          this.court &&
          this.office &&
          this.offece_no &&
          this.organ &&
          this.answer_no &&
          this.platform &&
          // this.entrust_date &&
          this.judge &&
          this.judge_no &&
          this.apply_id &&
          this.apply_no &&
          this.settlementUrl
          ){
            this.SetData('1')
      } else {
        this.noflag = true
        alert('请输入完整信息')
        return
      }
    },
    save(){
      this.noflag = false
        if(this.entrust_no || this.case_no || this.prodname || this.prodtype || this.court || this.office || this.offece_no ||
          this.organ || this.answer_no || this.platform || this.entrust_date || this.judge || this.judge_no || this.apply_id ||
          this.apply_no || this.settlementUrl){
            if(
              this.case_no && this.prodname
            ){
              this.SetData('0')
            }
            else{
              alert('请输入案号和标的物名称')
              this.noflag = true
            }
        } else {
          this.noflag = true
          return
        }

    },
    setlocal(){

    }
  }
}
</script>


<style lang="less" scoped>
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
.div{
  width: 100%;
  height: 10px;
}
</style>
