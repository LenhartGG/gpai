<template>
    <!-- 价格建议 -->
    <div class="main">
      <div class="mainTextarea">
        <div class="lable">{{title}}</div>
        <mt-field class="textarea"  placeholder="请输入问题详情" type="textarea" rows="6" v-model="text"></mt-field>
      </div>
      <div class="otherSuggest" @click="sendSuggestion()">发送</div>
    </div>
</template>
<script>
import * as ReqUrl from '../../../config/ReqUrl'
import { Field } from 'mint-ui';
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
      userType: null,
      text:'',
      title:'建议',
      typeId:''
    }
  },
  created(){
      this.ut = localStorage.getItem('ut') || ''
      this.userType = localStorage.getItem('userType')
      var type=this.$route.query.type
      this.typeId=this.$route.query.type
      console.log(type)
      if(type=='t01'){
        this.title='基本信息'
      }else if(type=='t02'){
        this.title='处置凭证'
      }else if(type=='t03'){
        this.title='评估报告'
      }else if(type=='t04'){
        this.title='权属调查'
      }else if(type=='t05'){
        this.title='实地勘察'
      }else if(type=='t07'){
        this.title='优先权人'
      }else if(type=='t08'){
        this.title='拍卖文案'
      }else if(type=='t10'){
        this.title='登记服务'
      }else if(type=='t12'){
        this.title='拍后服务'
      }
  },
  methods:{
    sendSuggestion(){
      var that=this;
      let url = `${ReqUrl.add}`
      let data = {
        status: '2',//0保存1完成
        type_code: that.typeId || sessionStorage.typeId,
        userId: localStorage.userId,
        prodId: localStorage.productId,
        data:{
          content:that.text
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
              that.$router.go(-1)
          }else{
              alert('发送失败')
          }
      })
      .catch(error => {
          console.log(error);
      });
    }
  }
}
</script>

<style lang="less" scoped>
.lable{
  font-size: 28px;
  color: #666;
  padding-left: 10px;
  border-bottom: 1px solid #999;
  line-height: 56px;
}
.mainTextarea{
  padding: 30px 30px;
}
.textarea{
  font-size: 24px !important;
  color: #666;
}
.otherSuggest{
  width: 50%;
  position: fixed;
  z-index: 10;
  right: 0;
  bottom: 0;
  background: #D80E1C;
  color: #fff;
  text-align: center;
  height: 82px;
  line-height: 82px;
  font-size: 34px;
}
.main{
  background: #fff;
}
</style>
