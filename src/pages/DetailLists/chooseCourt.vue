<template>
<div class="position">
  <div class="main" :style="style">
    <div class="chooseOne" :style="style">
      <ul>
        <li v-for="(value,index) in provinceList" :class="{'oneActive':ind===index}" :key="index" @click="chooseProvince(value.areaCode,index)">{{value.areaName}}</li>
      </ul>
    </div>
    <div class="chooseTwo" :style="style">
      <ul>
        <li v-for="(value,index) in cityCodeList" :class="{'twoActive':indTwo===index}" :key="index" @click="chooseCity(value.areaCode,index)">{{value.areaName}}</li>
      </ul>
    </div>
    <div class="chooseThree" :style="style">
      <ul>
        <li v-for="(value,index) in courtList" :key="index" @click="chooseCourt(value.courtName,value.id)">{{value.courtName}}</li>
      </ul>
    </div>
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
// import swipeDelete from './swipeDelete'
export default {
  name: 'message',
  data() {
    return {
      style:{
        height:''
      },
      provinceList:[],
      cityCodeList:[],
      courtList:[],
      ind:'',
      indTwo:'',
      courtName:'',
      pagePath:''

    }
  },
  computed: {
  },
  methods: {
    initData(paramType,provinceAreaCode,cityAreaCode){
      var that = this
      let url = `${ReqUrl.chooseCourt}`
      let data = {
          "paramType": paramType,
          "provinceAreaCode":provinceAreaCode,
          "cityAreaCode":cityAreaCode
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
          if(paramType&&!provinceAreaCode&&!cityAreaCode){
            that.provinceList=res.data.data
          }else if(paramType&&provinceAreaCode&&!cityAreaCode){
             that.cityCodeList=res.data.data
          }else if(paramType&&!provinceAreaCode&&cityAreaCode){
            that.courtList=res.data.data
          }
      })
      .catch(error => {
          console.log(error);
      });
    },
    initHeight(){
      this.style.height=document.body.offsetHeight+'px'

    },
    chooseProvince(areaCode,index){
      this.courtList=""
      this.indTwo=""
      this.initData("2",areaCode)
      this.ind=index
    },
    chooseCity(areaCode,index){
      this.initData("3","",areaCode)
      this.indTwo=index
    },
    chooseCourt(name,key){
      let data = {
        flag_court: false,
        chooseCourtName: name,
        chooseCourtKey: key
      }
      this.$emit('courtEvent', data)
    }
  },
  created() {
    this.initHeight()
    this.initData("1")
    this.pagePath=sessionStorage.pagePath
  }
}
</script>
<style>
.position{position: fixed; z-index: 100; left: 0;right: 0;top: 0;bottom: 0;}
.main{
  overflow: hidden;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  /*解决ios上滑动不流畅*/
  -webkit-overflow-scrolling: touch;
}
.main li{font-size: 26px;color: #333;height: 100%;padding-right:2px;overflow-x: hidden;text-overflow:ellipsis;white-space: nowrap;}
.chooseOne{float: left;width: 24%;background: #cacaca;overflow-y: auto;}
.chooseOne li{text-align: center;height: 92px;line-height: 92px;}
.chooseTwo{float: left;width: 24%;background: #f5f5f5;overflow-y: auto;}
.chooseTwo li{text-align: center;margin:0 20px;border-bottom: 2px solid #c7c5c5;height: 90px;line-height: 92px;}
.chooseThree{float: right;width: 52%;background: #fff;overflow-y: auto;}
.chooseThree li{margin-left: 40px;border-bottom: 2px solid #c7c5c5;padding-left: 20px;height: 90px;line-height: 92px;}
.oneActive{color: #D80E1C !important;background: #F0F0F0;}
.twoActive{color: #D80E1C !important; }
</style>
