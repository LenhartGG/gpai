<template>
    <div class="main">
        <!-- <div class="header">
            <div class="back" @click="back">返回</div>
            添加登记
        </div> -->
        <!-- 添加联合竞买人之后 -->
        <div>
            <div class="list">
                <div class="item" inputRefs="name" @click="inputShow($event)">
                    <div class="fl" inputRefs="name">竞买人姓名</div>
                    <div class="time fr" inputRefs="name">
                        {{name}} <span inputRefs="name">></span>
                    </div>
                </div>
                <div class="item" inputRefs="djType" @click="inputShow($event)">
                    <div class="fl" inputRefs="djType">登记类型</div>
                    <div class="time fr" inputRefs="djType">
                        委托代理<span inputRefs="name">></span>
                    </div>
                </div>
                <div class="item" inputRefs="wtName" @click="inputShow($event)">
                    <div class="fl" inputRefs="wtName">委托人</div>
                    <div class="time fr" inputRefs="wtName">
                        {{wtName}} <span inputRefs="wtName">></span>
                    </div>
                </div>
            </div>
            <van-uploader class="list" :after-read="wthUpload" style="display:block;" v-show="isOk!='1'&& userType ==1">
                <div class="item">
                    <div class="fl left">委托函</div>
                    <div class="time fr">
                        <img class="showImg" :src="wthImg" alt="">
                       
                        <span class="icon_right">></span>
                    </div>
                </div> 
            </van-uploader>
            <div class="list" style="display:block;" v-show="isOk=='1'&& userType ==1">
                <div class="item">
                    <div class="fl left">委托函</div>
                    <div class="time fr">
                        <img class="showImg" :src="wthImg" alt="">                      
                        <span class="icon_right">></span>
                    </div>
                </div> 
            </div>
            <div class="pic-list">
                <h1 class="title">
                    身份证照片
                </h1>
                <div class="pic-main">
                    <div class="img" v-for="(value,index) in idcardImg" :key="index">
                        <img :src="value" alt="">
                        <span class="close" @click="delImg('idcardImg',index)" v-show="isOk!='1' && userType ==1">X</span>
                    </div>
                    <van-uploader :after-read="idCardUpload" v-show="isOk!='1' && userType ==1">
                        <div class="img">
                            <img class="addImg" src="../../assets/images/add.png" alt="">
                        </div>
                    </van-uploader>
                    
                </div>
            </div>
            <div class="pic-list">
                <h1 class="title">
                    双方持证照片
                </h1>
                <div class="pic-main">
                    <div class="img" v-for="(value,index) in bothcardImg" :key="index">
                        <img :src="value" alt="">
                        <span class="close" @click="delImg('bothcardImg',index)" v-show="isOk!='1' && userType ==1">X</span> 
                    </div>
                    <van-uploader :after-read="bothCardUpload" v-show="isOk!='1' && userType ==1">
                        <div class="img">
                            <img class="addImg" src="../../assets/images/add.png" alt="">
                        </div>
                    </van-uploader>
                    
                </div>
            </div>
        </div>
        <!-- 下拉框 -->
        <div class="section_combobox" v-show="chooseListState">
          <div class="box">
            <div class="title">
              请选择
            </div>
            <div class="content">
              <mt-radio
                align="right"
                v-model="chooseValue"
                :options="options_type" 
                :value="chooseValue" >
              </mt-radio>
            </div>
            <div class="cancel" @click="closeChooseList()">确认</div>
          </div>
        </div>
        <!-- 输入框界面 -->
        <div class="section_input" v-show="inputState">
            <!-- 输入框text -->
            <div class="text">
                <mt-field  v-model="inputData"></mt-field>
            </div>
            <!-- 保存弹框 -->
            <div class="input_confirm">
                <ul>
                    <li class="confirm"></li>
                    <li class="save" @click="inputSave()">确定</li>
                </ul>
            </div>
        </div>
        <!-- <div class="addtime">
            <router-link :to="{path: '/detail/addbidders'}" tag="li"> 添加<br>联合竞买人</router-link>
        </div> -->
        <div class="bottom" v-show="isOk!='1'&&userType==1">
            <div class="button fr" @click="saveInfo()">保存</div>
        </div>
        <!-- 异议 -->
    <div class="otherSuggest" @click="otherSuggest()" v-show="userType==2">异议</div>
    </div>
</template>
<script>
    import { Uploader } from 'vant';
    import * as ReqUrl from '../../../config/ReqUrl'
    import qs from 'qs'
    import { Radio,Indicator } from 'mint-ui';
    const parseForm = qs.stringify
    function packup (data = {}) {
        return parseForm({
            info: JSON.stringify(data)
        })
    }
    export default {
        name: "Addregister",
        data () {
            return {
                lists: '',
                inputState:false,
                inputData:'',
                thisInput:'',
                name:'',
                djType:'0',
                wtName:'',
                chooseValue:'1',
                options_type:[{label:'委托代理',value:'1'},{label:'联合竞买',value:'2'}],
                chooseListState:false,
                wthImg:'',
                idcardImg:[],
                bothcardImg:[],
                isOk:'',
                fromId:'',
                userType:'',
                isSave: false
            }
        },
        methods: {
            otherSuggest(){
                this.$router.push({path:'/detail/otherSuggest',query:{type:'t10'}})
            },
            wthUpload(file) {
                console.log(file)
                if(this.isOk!='1'){
                    this.uploadImg(file.content,'wthImg')
                }
                //this.wthImg=file.content
                
            },
            idCardUpload(file){
                this.uploadImg(file.content,'idcardImg')
            },
            bothCardUpload(file){
                this.uploadImg(file.content,'bothcardImg')
            },
            delImg(arrObj,index){
                console.log(index)
                if(arrObj=='idcardImg'){
                    this.idcardImg.splice(index, 1);
                }else if(arrObj=='bothcardImg'){
                    this.bothcardImg.splice(index, 1);
                }
            },
            inputShow(e){
                if(this.isOk!='1'&&this.userType=='1'){//案件未完成时执行
                    this.thisInput=e.target.getAttribute('inputRefs')
                    if(this.thisInput=='name'){
                        this.inputState=true
                        this.inputData=this.name
                    }else if(this.thisInput=='djType'){
                        this.chooseListState=true
                        this.djType=this.chooseValue
                        
                    }else if(this.thisInput=='wtName'){
                        this.inputState=true
                        this.inputData=this.wtName
                    }
                }
                
            },
            inputSave(){
                this.inputState=false
            },
            closeChooseList(){
                this.chooseListState=false
                if(this.chooseValue=='2'){
                    this.$router.push({path:'/detail/addregistertwo',query:{fromId:this.fromId}})
                }
            },
            addImg(){
                
            },
            saveInfo(){
                if(!this.name){
                    alert('请输入竞买人姓名')
                }else if(!this.wtName){
                    alert('请输入委托人姓名')
                }else{
                    this.postSave()
                }
            },
            postSave(){
                var bothPic=this.bothcardImg.toString()
                var cardPic=this.idcardImg.toString()
                var ensurePic=this.wthImg.toString()
                var that=this;
                if(that.isSave) return
                let url = `${ReqUrl.bookAdd}`
                let data = {
                    prodId: localStorage.productId,
                    userId: localStorage.userId,
                    id:that.fromId,
                    data10:{
                    cardPic: cardPic,
                    bookType: that.chooseValue,
                    ensurePic: ensurePic,
                    bothPic: bothPic,
                    thirdParty:that.wtName,
                    name:that.name
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
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            },
            uploadImg(baseCode,type){
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
                    if(res.data.code=='0000'){
                        if(res.data.data) {
                            Indicator.open('正在上传图片...')
                        }
                        let url=res.data.data
                        if(type=='wthImg'){
                            that.wthImg=url
                        }else if(type=='idcardImg'){
                            var arr=that.idcardImg
                            arr.push(url)
                            that.idcardImg=arr
                        }else if(type=='bothcardImg'){
                            var arr=that.bothcardImg
                            arr.push(url)
                            that.bothcardImg=arr
                        }
                    }else{
                        alert("图片上传失败")
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            },
            detail(){
                var that=this;
                let url = `${ReqUrl.bookDetail}`
                let data = {
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
                    var data=res.data.data
                    if(res.data.code=='0000'){
                        that.name=data.name
                        that.wtName=data.thirdParty
                        that.wthImg=data.ensurePic
                        if(data.cardPic){
                            that.idcardImg=data.cardPic.split(',')
                        }
                        if(data.bothPic){
                            that.bothcardImg=data.bothPic.split(',')
                        }
                        
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            }
        },
        computed: {
        },
        created: function () {
            this.isOk=sessionStorage.isOk
            this.fromId=this.$route.query.fromId
            this.userType = localStorage.getItem('userType')
            console.log(this.fromId)
            if(this.fromId){
                this.detail()
            }
            
        },
        watch:{
            inputData(){
                if(this.thisInput=='name'){
                    this.name=this.inputData
                }else if(this.thisInput=='djType'){
                    this.djType=this.inputData
                }else if(this.thisInput=='wtName'){
                    this.wtName=this.inputData
                }
            }
        },
        components:{
            Radio
        }
    }
</script>
<style lang="less" scoped>
.icon_right{
    margin-top: 50px;
    display: block;
    float: left;
}
.showImg{
    float: left;
    height: 124px;
    width: auto;
    padding: 30px 30px 30px 0;

}
    .fl{
        float:left;
    }
    .fr{
        float:right;
    }
    .main{
        padding-bottom:82px;
        .header{
            height:91px;
            background: #fff;
            text-align:center;
            font-size:36px;
            color:#000;
            line-height:91px;
            position: relative;
            border-bottom:#ccc solid 1px;
            font-weight:bold;
            .back{
                position: absolute;
                left:39px;
                font-weight:normal;
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
        .addtime{
            width:93px;
            height:93px;
            background:#D80E1C;
            font-size:18px;
            color:#fff;
            border-radius:50%;
            overflow:hidden;
            zoom:1;
            text-align:center;
            font-size:18px;
            position:fixed;
            right:29px;
            bottom:100px;
            // bottom:50px;
            span{
                font-size:16px;
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
                        padding:0 !important;
                    }
                    .confirm{
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
    }

</style>
