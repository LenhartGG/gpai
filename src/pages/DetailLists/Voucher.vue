<template>
    <div>
        <div class="section2 clearfix">
            <div class="fl">
                执行裁定书
            </div>
            <div class="fr">
                <ul class="clearfix">
                    <li v-show="flag_added" class="added">
                      <img :src="settlementUrl" alt="">
                      <!-- <span v-show="flag_added" @click="delImg"></span> -->
                    </li>
                    <li v-show="status!='1' && userType == '1'" class="adding"><van-uploader :after-read="docUpload"><img src="../../assets/images/1526903776(1).jpg" alt=""></van-uploader ></li>
                </ul>
                <div></div>
            </div>
        </div>
        <div class="div"></div>
        <!-- 保存弹框 -->
        <div v-show="section_confirm" class="section_confirm">
            <ul>
                <li class="confirm"  @click="confirm">确认完成</li>
                <li class="save" @click="save">保存</li>
            </ul>
        </div>
      <!-- 法院异议 -->
      <div class="otherSuggest" @click="otherSuggest()" v-show="userType==2">异议</div>
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
  updated(){
    this.ConfirmSave()
  },
  data(){
    return{
      voucher:false, //裁定书
      // action sheet 选项内容
      sheetVisible: false, //sheetVisible可以控制显示与隐藏
      ut:'',
      userType: null,
      settlementUrl:'',
      status:'',
      flag_added: false,
      section_confirm: true,
    }
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
    otherSuggest(){
        this.$router.push({path:'/detail/otherSuggest',query:{type:'t02'}})
    },
    ConfirmSave(){
      if(this.status == '1') return
      if(this.userType != '1') return
      if(this.settlementUrl) {
        this.section_confirm = true
      }
    },
    docUpload(file){
      this.uploadImg(file.content,'settlementUrl')
    },
    delImg(arrObj,index){
        console.log(index)
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
                  that.section_confirm = true
                  this.flag_added = true
                  that.settlementUrl = res.data.data

                }else{
                    alert("图片上传失败")
                }
            })
            .catch(error => {
                console.log(error);
            });
        }

    },
    SetData(status){
      var that = this;
      let url = `${ReqUrl.add}`
      let data = {
        type_code: "t02",
        userId: localStorage.getItem('userId') || '',
        prodId: localStorage.getItem('productId') || '',
        status: status, //0保存 1完成
        data02: {
          judge_file: that.settlementUrl
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
    getData(){
      var that = this
      let data = {
        prodId: localStorage.getItem('productId') || '',
        userId: localStorage.getItem('userId') || '',
        type_code: "t02",
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
          if(res.data.code === '0000'){
            that.flag_added = true
            let data = res.data.data.data
            that.settlementUrl = data.judge_file
          }
      })
      .catch(error => {
          console.log(error);
      });
    },
    confirm(){
      if(this.settlementUrl){

      } else {
        alert('请输入完整信息。')
      }
      MessageBox.confirm('确认完成后将无法修改信息').then(action => {
          console.log(action)
          if(action=='confirm'){
            this.SetData('1')
          }
      })

    },
    save(){
      if(this.settlementUrl){

      } else {
        alert('请输入完整信息。')
      }
      this.SetData('0')
    },
    back(){
      this.$router.go(-1)
    },
    init_flag(){
      if(this.status == '1' || this.userType !='1'){
        this.section_confirm = false
      }
    }
  },
  mounted () {
  }
}
</script>


<style lang="less" scoped>
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
.section2{
    background: #FFFFFF;
    margin-bottom: 150px;
    position: relative;
    .fl{
        position: absolute;
        top: 50%;
        margin-top: -81px;
        height: 163px;
        line-height: 163px;
        vertical-align: center;
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
                    width: 200px;
                    height: 300px;
                    // background: red
                }
                span{
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: url('../../assets/images/close.png') no-repeat;
                    background-size: 40px 40px;
                    // background: blue;
                }
            }
        }
    }
}
</style>
