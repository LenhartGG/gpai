<template>
  <!--判定ajax结束后，且有消息列表存在才开始渲染组件，防止报错-->
  <div class="detailMain">
    <div class="msgDetail">
    <ul>
        <li>
          <span class="listTitle">信息到达时间：</span>
          <span class="listText">{{time}}</span>
        </li>
        <li>
          <span class="listTitle">发件人：</span>
          <span class="listText">{{from}}</span>
        </li>
        <li v-show="organName">
          <span class="listTitle">发件机构：</span>
          <span class="listText">{{organName}}</span>
        </li>
        <li v-show="courtName">
          <span class="listTitle">法院名称：</span>
          <span class="listText">{{courtName}}</span>
        </li>
        <li>
          <span class="listTitle">问题环节：</span>
          <span class="listText">{{eventName}}</span>
        </li>
        <li>
          <span class="listTitle">问题详情：</span>
          <span class="listText">{{content}}</span>
        </li>
      </ul>     
    </div>
    <!-- <div class="readBtn">已读</div> -->
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
// import swipeDelete from './swipeDelete'
export default {
  name: 'message',
  data() {
    return {
      id:'',//案件id
      time:'',
      organName:'',
      from:'',
      eventName:'',
      content:'',
      courtName:''

    }
  },
  computed: {
  },
  methods: {
    initMsgDetail(id){
      var that = this
      let url = `${ReqUrl.msgDetail}`
      // let url = 'http:192.168.199.195:9091/NAMS_mobile/product/productQueryParams.do'
      let data = {
          "userId": localStorage.userId,
          "id":id
      }
      that.$http.post(
          url,
          packup(data),
          {
              headers:{openId : sessionStorage.openId}
          }
      )
      .then(res => {
          console.log(res)
          var data=res.data.data
          that.time=data.createTime
          that.organName=data.organName
          that.courtName=data.courtName
          that.from=data.judgeName
          that.eventName=data.eventName
          that.content=data.content
      })
      .catch(error => {
          console.log(error);
      });
    }
  },
  created() {
    this.id=this.$route.query.id
    this.initMsgDetail(this.id)
  }
}
</script>
<style>
.detailMain{
  position: relative;
  height: 100%;
  width: 100%;
}
.msgDetail{
  background: #fff;
  padding: 32px 30px;
}
.listTitle{
  color: #333;
  font-size: 28px;

}
.listText{
  color: #666;
  font-size: 24px;
}
.msgDetail li{
  margin-bottom: 20px;
}
.readBtn{
  width: 376px;
  height: 82px;
  background: #D80E1C;
  text-align: center;
  color: #fff;
  font-size: 34px;
  line-height: 82px;
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
