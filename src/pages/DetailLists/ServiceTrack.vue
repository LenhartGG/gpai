<template>
  <!-- 服务轨迹 -->
  <div>
    <div class="servive_track">
      <div><b>信息到达时间：</b><span>2018-4-14 13:27:04</span></div>
      <div><b>发件机构：</b><span>上海市虹口区人民法院</span></div>
      <div><b>发件人：</b><span>法官 李海涛</span></div>
      <div><b>问题环节：</b><span>处置凭证</span></div>
      <div><b>问题详情：</b><span>处置凭证拍摄的照片不够清晰，请重新拍摄！处置凭 证拍摄的照片不够清晰，请重新拍摄！</span></div>
    </div>
    <!-- 保存弹框 -->
    <div class="section_confirm">
        <ul>
            <li class="confirm"></li>
            <li class="save" @click="read">已读</li>
        </ul>
    </div>
  </div>
</template>

<script>
import * as ReqUrl from '../../../config/ReqUrl'
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
  },
  methods:{
    SetData(val){
      var that = this;
      let url = `${ReqUrl.add}`
      let data = {
        type_code: "t01",
        userId: "123",
        applyPeople:"liuhuan", //申请人
        applyTel: "15029770724",  //申请人电话
        // prodId: "123", //第一次数据录入的时候没有id
        status: '0', //0保存 1完成
        data01: {
          entrust_no: "123",
          case_no: "123",
          prodname: "123",
          prodtype: "123",
          court: "123",
          office: "123",
          offece_no: "123",
          organ: "123",
          answer_no: "123",
          platform: "123",
          entrust_date: "123",
          judge: "123",
          judge_no: "123",
          apply_name: "123",
          apply_no: "123",
          entrust_txt: "123",
        }
      }
      that.$http.post(
              url,
              packup(data),
              {
                  headers:{openId: "1234567890"}
              }
          )
          .then(res => {
              console.log("res-----",res)
              // this.proId = res.data.data.proId
              // console.log(this.proid)
              // this.setUserInfo() //存储数据
          })
          .catch(error => {
              console.log(error);
          });
    },
    read(){
      this.SetData()
      this.back();
    },
    back(){
      this.$router.go(-1);
    },
    setlocal(){

    }
  }
}
</script>

<style lang="less" scoped>
.servive_track{
  background: #FFFFFF;
  padding: 31px 31px 0 30px;
  div{
    padding-bottom: 28px;
    b{
      font-size: 28px;
      color: #333333;
    }
    span{
      font-size: 26px;
      color: #666666;
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
        .save{
            background: #D80E1C;
            color: #FFFFFF;
        }
    }
}
</style>
