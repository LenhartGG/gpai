<template>
    <div class="main">
        <!-- <div class="header">
            <div class="back" @click="back">返回</div>
            添加联合竞买人
        </div> -->
        <div class="list">
            <div class="item" inputRefs="name" @click="inputShow($event)">
                <div class="fl" inputRefs="name">竞买人姓名</div>
                <div class="time fr" inputRefs="name">
                    {{name}} <span>></span>
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
                    <span class="close" @click="delImg('idcardImg',index)">X</span>
                </div>
                <van-uploader :after-read="idcardUpload">
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
                <div class="img" v-for="(value,index) in idcardImgTwo" :key="index">
                    <img :src="value" alt="">
                    <span class="close" @click="delImg('idcardImgTwo',index)">X</span>
                </div>
                <van-uploader :after-read="idcardUploadTwo">
                    <div class="img">
                        <img class="addImg" src="../../assets/images/add.png" alt="">
                    </div>
                </van-uploader>
                
            </div>
            </div>
        <div class="bottom">
            <div class="button fr" @click="saveInfo()">保存</div>
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
                    <li class="save"  @click="inputSave()">保存</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import { Uploader } from 'vant';
    import * as ReqUrl from '../../../config/ReqUrl'
    import qs from 'qs'
    const parseForm = qs.stringify
    function packup (data = {}) {
        return parseForm({
            info: JSON.stringify(data)
        })
    }
    export default {
        name: "Addbidders",
        data () {
            return {
                inputState:false,
                inputData:'',
                thisInput:'',
                name:'',
                idcardImg:[],
                idcardImgTwo:[],
                lastName:''
            }
        },
        methods: {
            idcardUpload(file) {
                this.uploadImg(file.content,'idcardImg')                
            },
            idcardUploadTwo(file) {
                this.uploadImg(file.content,'idcardImgTwo')              
            },
            delImg(arrObj,index){
                if(arrObj=='idcardImg'){
                    this.idcardImg.splice(index, 1);
                }else if(arrObj=='idcardImgTwo'){
                    this.idcardImgTwo.splice(index, 1);
                }
            },
            inputShow(e){
                this.thisInput=e.target.getAttribute('inputRefs')
                if(this.thisInput=='name'){
                    this.inputState=true
                    this.inputData=this.name
                }
            },
            inputSave(){
                this.inputState=false
            },
            back () {
                this.$router.go(-1);
            },
            uploadImg(baseCode,type){
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
                        if(type=='idcardImg'){
                            var arr=that.idcardImg
                            arr.push(url)
                            that.idcardImg=arr
                        }else if(type=='idcardImgTwo'){
                            var arr=that.idcardImgTwo
                            arr.push(url)
                            that.idcardImgTwo=arr
                        }
                    }else{
                        alert("图片上传失败")
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            },
            saveInfo(){
                if(!this.name){
                    alert('请输入竞买人姓名')
                }else{
                    this.postSave()
                }
            },
            postSave(){
            var cardPic=this.idcardImg.toString()
            var bothPic=this.idcardImgTwo.toString()
            var that=this;
            let url = `${ReqUrl.unionAdd}`
            let data = {
                prodId: localStorage.productId,
                userId: localStorage.userId,
                union:{
                    cardPic: cardPic,
                    bothPic: bothPic,
                    name:that.name,
                    bookName:that.lastName
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
                    that.$router.go(-1);
                }
            })
            .catch(error => {
                console.log(error);
            });
            },
        },
        created: function () {
            this.lastName=this.$route.query.name
            sessionStorage.from='addbidders'
            sessionStorage.queryName=this.lastName
        },
        watch:{
            inputData(){
                if(this.thisInput=='name'){
                    this.name=this.inputData
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .van-uploader{
        float: left;
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
        .list{
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
                    padding-top:5%;
                }
                .time{
                    font-size:26px;
                    color:#666;
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
                overflow: hidden;
                .img{
                    display:inline-block;
                    width:183px;
                    height:123px;
                    margin-right:42px;
                    border:#ddd solid 1px;
                    position: relative;
                    float: left;
                    .close{
                        position: absolute;
                        top:0;
                        right:10px;
                    }
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
    .pic-list{
        background:#fff;
        margin-bottom:18px;
        .title{
            line-height:90px;
            padding-left:30px;
            font-size:28px;
            border-bottom:#DCDCDC solid 1px;
        }
        .pic-main{
            padding:17px 0;
            padding-left:50px;
            img{
                height:123px;
                display: block;
                margin: 0 auto;
                width:auto;
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
</style>
