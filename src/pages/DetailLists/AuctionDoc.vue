<template>
    <!-- 拍卖文案 -->
    <div>
      <!-- 竞买公告 -->
      <section class="notice">
        <ul>
          <li class="clearfix">
            <div class="left">竞买公告</div>
            <div class="right">
              <!-- <span class="edit" inputRefs="jmgg" @click="inputShow($event)" v-show="userType ==1">编辑</span> -->
              <!-- <span class="build">生成</span> -->
              <span class="arrow r_arrow"  inputRefs="jmgg" @click="inputShow($event)" v-show="userType ==1"></span>
            </div>
          </li>
          <li class="clearfix">
            <div class="left">特别规定</div>
            <div class="right">
              <!-- <span class="edit" inputRefs="tbgd" @click="inputShow($event)" v-show="userType ==1">编辑</span> -->
              <!-- <span class="build">生成</span> -->
              <span class="arrow r_arrow " inputRefs="tbgd" @click="inputShow($event)" v-show="userType ==1"></span>
            </div>
          </li>
          <li class="clearfix">
            <div class="left">标的情况表</div>
            <div class="right">
              <!-- <span class="edit" inputRefs="bdwqkb" @click="inputShow($event)" v-show="userType ==1">编辑</span> -->
              <!-- <span class="build">生成</span> -->
              <span class="arrow r_arrow" inputRefs="bdwqkb" @click="inputShow($event)" v-show="userType ==1"></span>
            </div>
          </li>
        </ul>
      </section>
    <div class="pic-list">
        <h1 class="title">
            公告张贴现场
        </h1>
        <div class="pic-main">
            <div class="img" v-for="(value,index) in docImg" :key="index">
                <img :src="value" alt="">
                <span class="close" @click="delImg('docImg',index)" v-show="isOk!='1' && userType ==1" >X</span>
            </div>
            <van-uploader :after-read="docUpload" v-show="isOk!='1'  && userType ==1">
                <div class="img">
                    <img class="addImg" src="../../assets/images/add.png" alt="">
                </div>
            </van-uploader>
            
        </div>
    </div>
      <!-- 拍卖告知凭证 -->
    <div class="pic-list">
        <h1 class="title">
            拍卖告知凭证
        </h1>
        <div class="pic-main">
            <div class="img" v-for="(value,index) in pzImg" :key="index">
                <img :src="value" alt="">
                <span class="close" @click="delImg('pzImg',index)" v-show="isOk!='1'  && userType == 1">X</span>
            </div>
            <van-uploader :after-read="pzUpload" v-show="isOk!='1'  && userType == 1">
                <div class="img">
                    <img class="addImg" src="../../assets/images/add.png" alt="">
                </div>
            </van-uploader>           
        </div>
    </div>
    <div class="list">
        <div class="item" inputRefs="postNo" @click="inputShow($event)">
            <div class="fl" inputRefs="postNo">快递单号</div>
            <div class="time fr overHidden" inputRefs="postNo">
                {{postNo}}<span inputRefs="postNo" v-show="userType ==1">></span>
            </div>
        </div>
    </div>
    <!-- 输入框界面 -->
    <div class="section_input zindex" v-show="inputState">
        <!-- 输入框text -->
        <div class="text">
            <mt-field  v-model="inputData"></mt-field>
        </div>
        <!-- 保存弹框 -->
        <div class="input_confirm">
            <ul>
                <li class="areasave" @click="inputSave()">保存</li>
            </ul>
        </div>
    </div>
    <!-- 文案编辑界面 -->
    <div class="section_input" v-show="inputStateTwo">
        <!-- 输入框text -->
        <div style="background:#fff;width:100%;">
            <mt-field  v-model="inputDataTwo" type="textarea" rows="18" class="textarea"></mt-field>
        </div>
        <!-- 保存弹框 -->
        <div class="input_confirm">
            <ul>
                
                <li class="areasave" @click="inputSaveTwo()">保存</li>
            </ul>
        </div>
    </div>
    <!-- 快递单号列表页面 -->
    <div class="section_input section" v-show="inputStateThree">
        <li v-for="(value,index) in postList" :key="index">
            <div class="fl addClass"><span></span>
                <span class="person"> {{value.expressNo}}</span>
            </div>
            <p class="remove" @click.stop="delePostlist(value.id)" v-show="isOk!='1'&&userType==1">删除</p>
        </li>
        <div class="bottom" v-show="isOk!='1'&&userType==1">
            <div class="button" inputRefs="postNoAdd" @click="inputShow($event)">添加</div>
            <div class="button" @click="savePostno()">保存</div>
        </div>
        <div class="otherSuggest" @click="otherSuggest()" v-show="userType==2">异议</div>
    </div>
    <div class="bottom" v-show="isOk!='1' && userType ==1">
        <div class="button" @click="saveInfo('1')">确认完成</div>
        <div class="button" @click="saveInfo('0')">保存</div>
    </div>
    <!-- 异议 -->
    <div class="otherSuggest" @click="otherSuggest()" v-show="userType==2">异议</div>
</div>
</template>
<script>
import { Uploader } from 'vant';
import * as ReqUrl from '../../../config/ReqUrl'
import { MessageBox,Indicator } from 'mint-ui';
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
        userType:null,
        docImg:[],
        pzImg:[],
        isOk:'',
        fromId:'',
        inputState:false,
        postNo:'',
        inputData:'',
        inputDataTwo:'',
        inputStateTwo:false,
        bdwqkb:'',
        jmgg:'',
        tbgd:'',
        thisInput:'',
        inputStateThree:false,
        postList:[],
        typeId:'',
        isSave: false
    }
  },
  created(){
    this.isOk=sessionStorage.isOk
    this.typeId=this.$route.query.typeId
    this.userType = localStorage.getItem('userType')
    this.queryPostno()
    this.queryData()
  },
  methods:{
    docUpload(file){
        this.uploadImg(file.content,'docImg') 
    },
    pzUpload(file){
        this.uploadImg(file.content,'pzImg')
    },
    delImg(arrObj,index){
        console.log(index)
        if(arrObj=='docImg'){
            this.docImg.splice(index, 1);
        }else if(arrObj=='pzImg'){
            this.pzImg.splice(index, 1);
        }
    },
    uploadImg(baseCode,type){
        if(baseCode) {
            var that=this;
            let url = `${ReqUrl.upload64Img}`
            Indicator.open('正在上传图片...')
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
                    Indicator.close()
                    if(type=='docImg'){
                        var arr=that.docImg
                        arr.push(url)
                        that.docImg=arr
                    }else if(type=='pzImg'){
                        var arr=that.pzImg
                        arr.push(url)
                        that.pzImg=arr
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
    inputShow(e){
        if(this.userType == 3) return
        this.thisInput=e.target.getAttribute('inputRefs')
        if(this.isOk!='1'){//案件未完成时执行
            if(this.thisInput=='jmgg'){
                this.inputStateTwo=true
                this.inputDataTwo=this.jmgg
            }else if(this.thisInput=='tbgd'){
                this.inputStateTwo=true
                this.inputDataTwo=this.tbgd
            }else if(this.thisInput=='bdwqkb'){
                this.inputStateTwo=true
                this.inputDataTwo=this.bdwqkb
            }else if(this.thisInput=='postNoAdd'){
                this.inputState=true
                this.inputData=''
            } 
        }     
        if(this.thisInput=='postNo'){
            this.inputStateThree=true
            
        } 
    },
    inputSave(){
        if(this.inputData){
            var express={expressNo:this.inputData}
            var that=this;
            let url = `${ReqUrl.expressadd}`
            let data = {
                prodId: localStorage.productId,
                userId: localStorage.userId,
                express:express
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
                    this.inputState=false
                    that.queryPostno()
                }
            })
            .catch(error => {
                console.log(error);
            })
        }else{
            this.inputState=false
        }
        
    },
    inputSaveTwo(){
        this.inputStateTwo=false
    },
    savePostno(){
        this.inputStateThree=false      
    },
    queryPostno(){
        var that=this;
        let url = `${ReqUrl.expressquery}`
        let data = {
            prodId: localStorage.productId,
            userId: localStorage.userId,
            id:that.fromId
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
                that.postNo=res.data.data[0].expressNo               
                that.postList=res.data.data
            }
        })
        .catch(error => {
            console.log(error);
        });
    },
    delePostlist(id){
        var that=this;
        let url = `${ReqUrl.expressdelete}`
        let data = {
            id:id
        }
        MessageBox.confirm('确认删除当前快递单号？').then(action => {
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
                    that.queryPostno()
                }
            })
            .catch(error => {
                console.log(error);
            });
        })
        
    },
    saveInfo(type){
        if(type=='1'){
          MessageBox.confirm('确认完成后将无法修改信息').then(action => {
            console.log(action)
            if(action=='confirm'){
              this.postSave(type)
            }
          })
        }else{
          this.postSave(type)
        }
        
    },
    postSave(type){
        if(this.isSave) return
        var GGZTXC=this.docImg.toString()
        var PMGZPZ=this.pzImg.toString()
        var that=this;
        let url = `${ReqUrl.add}`
        let data = {
            status: type,//0保存1完成
            type_code: that.typeId || sessionStorage.typeId,
            userId: localStorage.userId,
            prodId: localStorage.productId,
            data08:{
                JMGG:that.jmgg,
                TBGD:that.tbgd,
                BDQK:that.bdwqkb,
                GGZTXC:GGZTXC,
                PMGZPZ:PMGZPZ,
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
                that.isSave = true
                that.$router.go(-1)
            }else{
                alert('操作失败')
            }
        })
        .catch(error => {
            console.log(error);
        });
    },
    queryData(val){
        var that = this;
        let url = `${ReqUrl.baseinfoQuery}`
        let data = {
            type_code: that.typeId || sessionStorage.typeId,
            userId: localStorage.userId,
            prodId: localStorage.productId
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
            var data=res.data.data.data
            that.jmgg=data.JMGG
            that.tbgd=data.TBGD
            that.bdwqkb=data.BDQK
            if(data.GGZTXC){
                that.docImg=data.GGZTXC.split(',')
            }
            if(data.PMGZPZ){
                that.pzImg=data.PMGZPZ.split(',')
            }           
            //that.lists=res.data.data
        })
        .catch(error => {
            console.log(error);
        });
    },
    actionSheet: function(){
      <span style="white-space:pre;"></span>// 打开action sheet
        this.sheetVisible = true;
    },
    getCamera: function(){
      console.log("打开照相机")
      this.voucher = true;
      this.confirmSave = true;
    },
    getLibrary: function(){
      console.log("打开相册")
    },
    save(){
      this.back();
    },
    back(){
      this.$router.go(-1)
    },
    otherSuggest(){
      this.$router.push({path:'/detail/otherSuggest',query:{type:'t08'}})
    }
  },
  mounted () {
  },
  watch:{
    inputDataTwo(){
        if(this.thisInput=='jmgg'){
            this.jmgg=this.inputDataTwo
        }else if(this.thisInput=='tbgd'){
            this.tbgd=this.inputDataTwo
        }else if(this.thisInput=='bdwqkb'){
            this.bdwqkb=this.inputDataTwo
        }
    }
},
}
</script>

<style lang="less" scoped>

.zindex{
    z-index: 999 !important;
}
.textarea{
    width: 100%;
}
.areasave{
    background: #fff;
    float: right !important;
}
.postNoList{
    margin:0 !important;
    padding-right: 30px;
    
}
.postNoList .item{
    border-bottom: 1px solid #dececf !important;
}
.section{
    li{
        height: 90px;
        border-bottom: 1px solid#C6C2C3;
        background: #fff;
        line-height: 90px;
        font-size: 26px;
        padding: 0 30px;
        .remove{
            background: #D80E1C;
            color: #fff;
            font-size: 26px;
            //padding: 0 13px;
            float: right;
            display: block;
            width: 102px;
            height: 52px;
            text-align: center;
            line-height: 52px;
            margin-top: 19px;
        }
    }
}

.bottom{
    height:82px;
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    .button{
        width:50%;
        line-height:82px;
        text-align:center;
        font-weight:bold;
        font-size:34px;
    }
    .button:first-child{
        background: #D80E1C;
        color:#fff;
        float:left;
    }
    .button:last-child{
        background: #fff;
        color:#333;
        float:right;
    }
}

.list.list{
    background:#fff;
    padding-left:28px;
    margin-bottom:18px;
    .item{
        border-bottom:#C6C2C3 solid 1px;
        min-height:86px;
        overflow: hidden;
        zoom:1;
        line-height:86px;
        padding-right:28px;
        font-size: 28px;
        color:#333;
        .left{
            margin-top: 50px;
        }
        .time{
            font-size:26px;
            color:#666;
            .pic{
                display: inline-block;
                vertical-align: middle;
                padding:20px 0;
            }
        }
    }
    .item:last-child{
        border-bottom:none;
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
.notice{
    margin-bottom: 17px;
    ul{
        background: #fff;
        padding: 0 19px 0 18px;
        li{
          border-bottom: 1px solid #CDCBCB;
            line-height: 90px;
            height: 90px;
            padding-left: 10px;
            .left{
              float: left;
              width: 50%;
              font-size: 28px;
              color: #333;
            }
            .right{
              float: right;
              width: 50%;
              span{
                display: inline-block;
                float: right;
                // width: 130px;
                font-size: 24px;
                color:#D80E1C;
                text-align: center;
                text-decoration: underline;
                text-underline-position: 10px
              }
            }
        }
        li:nth-last-of-type(1){
            border-bottom:0;
        }
    }
}
.section_img{
    margin-bottom: 17px;
    .title{
        height: 90px;
        line-height: 90px;
        text-indent: 31px;
        font-size: 28px;
        color: #333333;
        background: #fff;
        margin-bottom: 2px;
        .left{

        }
        .right{

        }
    }
    .content{
        background: #fff;
        margin: 0 auto;
        padding: 4px 36px;
        li{
            float: left;
            width: 33%;
            margin-top: 13px;
            margin-bottom: 13px;
            div{
                width: 183px;
                background:#ccc;
                margin: 0 auto;
                position: relative;
                span{
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 40px;
                    height: 40px;
                    background: #666;
                    border-radius: 20px;
                }
                img{
                    margin: 0 auto;
                }
            }
        }
    }
}
.section_confirm{
    position: fixed;
    z-index: 1;
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

.section_input{
  position: fixed;
  z-index: 100;
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
            background: #FFFFFF;
            color: #FFFFFF;
        }
        .save{
            color: #fff;
            background: #D80E1C;
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
