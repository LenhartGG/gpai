<template>
    <div>
        <div class="title">
            <p>全部&nbsp;<span>{{count}}</span>未读&nbsp;<span>{{countWeiDu}}</span></p>
        </div>
        <div class="content">
          <div class="noMsg" v-show="!listState">暂无数据</div>
          <div v-show="listState" class="s_con">
            <ul>
              <li :class="{'active':value.eventStatus=='0'}" v-for="(value, key, index) in list"  :key="index" @click="toDetail(value.id)">
                <span class="w35p">{{value.createTime}}</span><span class="w41p">{{value.eventName}}</span><span class="w19p">{{value.judgeName}}</span>
              </li>
            </ul>
          </div>
        </div>
        <Tab></Tab>
    </div>
</template>

<script>
import Tab from '../components/Tab.vue' //tab切换
import * as ReqUrl from '../../config/ReqUrl'
import qs from 'qs'
const parseForm = qs.stringify
function packup (data = {}) {
    return parseForm({
        info: JSON.stringify(data)
    })
}
export default {
    data(){
        return {
          listState:false,//列表状态
          list:[],
          countWeiDu:0,
          count:0
        }
    },
    created(){
      // this.base.getWxOpenid()
      this.initMsgData()
    }, 
    methods:{
      initMsgData(){
        var that = this
        let url = `${ReqUrl.msgList}`
        // let url = 'http:192.168.199.195:9091/NAMS_mobile/product/productQueryParams.do'
        let data = {
            "userId": localStorage.userId
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
            that.list=res.data.data
            that.countWeiDu=res.data.countWeiDu
            that.count=res.data.count
            console.log(res.data.data.length)
            if(res.data.data.length!='0'){
              that.listState=true
            }else{
              that.listState=false
            }
        })
        .catch(error => {
            console.log(error);
        });
      },
      toDetail(id){
        this.$router.push({path: '/detail/msgDetail',query:{id:id}})
      }
    },
    computed:{

    },
    components:{
      Tab
    }
}
</script>


<style lang="less" scoped>
.title{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 83px;
    line-height: 83px;
    background: #fff;
    margin-bottom: 1px;
    p{
        font-size: 30px;
        color: #000000;
        text-indent: 30px;
        span{
          margin-right: 30px;
        }
    }
}
.active{
  color: red;
}
.content{
  position: fixed;
  left: 0;
  right: 0;
  top: 84px;
  bottom: 100px;
  background:#FFFFFF;
    .s_con{
      padding: 20px 26px 20px 25px;
      overflow: auto;
      height: 94%;
      ul{
        li{
          display: flex;
          padding-top: 0;
          padding-bottom: 0;
          margin-bottom: 0;
          span{
            height: 63px;
            line-height: 63px;
            margin: 2px;
            background: #f0f0f0;
            text-align: center;
          }
          span:nth-of-type(1){
            flex: 2.5;
          }
          span:nth-of-type(2){
            flex: 3;
          }
          span:nth-of-type(3){
            flex: 1;
          }
        }
      }
    }
}
.noMsg{
  text-align: center;
  padding: 100px 0;
}
</style>

