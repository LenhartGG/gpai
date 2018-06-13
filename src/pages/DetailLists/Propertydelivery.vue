<template>
    <!-- 财产交割 -->
    <div>
        <section class="section_img">
            <div class="title">
                法律文书签收
            </div>
            <div class="content clearfix">
                <li v-for="item in lawList" :key="item">
                    <div :style="item| bgimg">
                        <!-- <img :src="item" alt=""> -->
                        <span @click="removeUrl(item,'law')" v-show="status !== '1' && userType == 1">X</span>
                    </div>
                </li>

                <li  class="add" v-show="status !== '1' && userType == 1">
                    <van-uploader :after-read="law" v-if="lawList.length != 3" >
                        <div><img src="../../assets/images/add.png" alt=""></div>
                    </van-uploader>
                    <div v-if="lawList.length ==3" @click="prompt(3)" ><img src="../../assets/images/add.png" alt="" ></div>
                </li> 
            </div>
        </section>
        <section class="section_img">
            <div class="title">
                成交确认书
            </div>
            <div class="content clearfix">
                <li v-for="item in confirmationList" :key="item" >
                    <div :style="item| bgimg">
                        <span @click="removeUrl(item,'confirmation')" v-show="status !== '1' && userType == 1">X</span>
                    </div>
                </li>
                <li class="add"  v-show="status !== '1' && userType == 1"> 
                    <van-uploader :after-read="confirmation" v-if="confirmationList.length != 3">
                        <div><img src="../../assets/images/add.png" alt=""></div>
                    </van-uploader>
                    <div v-if="confirmationList.length ==3" @click="prompt(3)"><img src="../../assets/images/add.png" alt=""></div>
                </li>
            </div>
        </section>
        <section class="section_img">
            <div class="title">
                执行裁定书
            </div>
            <div class="content clearfix">
                <li v-for="item in judgeList" :key="item">
                    <div :style="item| bgimg">
                        <span @click="removeUrl(item,'judge')" v-show="status !== '1' && userType == 1">X</span>
                    </div>
                </li>
                <li class="add"  v-show="status !== '1' && userType == 1">
                    <van-uploader :after-read="judge" v-if="judgeList.length != 3">
                        <div><img src="../../assets/images/add.png" alt=""></div>
                    </van-uploader>
                    <div v-if="judgeList.length ==3" @click="prompt(3)"><img src="../../assets/images/add.png" alt=""></div>
                </li>
            </div>
        </section>
        <section class="section_img">
            <div class="title">
                协助执行通知书
            </div>
            <div class="content clearfix">
                <li v-for="item in noticeList" :key="item">
                    <div :style="item| bgimg">
                        <span @click="removeUrl(item,'notice')" v-show="status !== '1' && userType == 1">X</span>
                    </div>
                </li>
                <li class="add" v-show="status !== '1' && userType == 1">
                    <van-uploader :after-read="notice" v-if="noticeList.length != 3">
                        <div><img src="../../assets/images/add.png" alt=""></div>
                    </van-uploader>
                    <div v-if="noticeList.length ==3" @click="prompt(3)"><img src="../../assets/images/add.png" alt=""></div>
                </li>
            </div>
        </section>
        <section class="section_img">
            <div class="title">
                实物交接凭证
            </div>
            <div class="content clearfix">
                <li v-for="item in handoverList" :key="item">
                    <div :style="item| bgimg">
                        <span @click="removeUrl(item,'handover')" v-show="status !== '1' && userType == 1">X</span>
                    </div>
                </li>
                <li class="add"  v-show="status !== '1' && userType == 1">
                    <van-uploader :after-read="handover" v-if="handoverList.length != 6">
                        <div><img src="../../assets/images/add.png" alt=""></div>
                    </van-uploader>
                    <div v-if="handoverList.length ==6" @click="prompt(6)"><img src="../../assets/images/add.png" alt=""></div>
                </li>
            </div>
        </section>
        <section class="section_img">
            <div class="title">
                交易凭证
            </div>
            <div class="content clearfix">
                <li v-for="item in transcationList" :key="item">
                    <div :style="item| bgimg">
                        <span @click="removeUrl(item,'transcation')" v-show="status !== '1' && userType == 1">X</span>
                    </div>
                </li>
                <li class="add"  v-show="status !== '1' && userType == 1">
                    <van-uploader :after-read="transcation">
                        <div><img src="../../assets/images/add.png" alt=""></div>
                    </van-uploader>
                    
                </li>
            </div>
        </section>
        <!-- 保存弹框 -->
        <div class="section_confirm" v-show="status !== '1' && userType == 1">
            <ul>
                <li class="confirm" @click="save('1')">确认完成</li>
                <li class="save" @click="save('0')" >保存</li>
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

    </div>
</template>
<script>
import * as ReqUrl from '../../../config/ReqUrl'
import qs from 'qs'
import { Toast,DatetimePicker,MessageBox,Indicator } from 'mint-ui'
const parseForm = qs.stringify
function packup (data = {}) {
    return parseForm({
        info: JSON.stringify(data)
    })
}
export default {
    data () {
        return {
            openId: '',
            userId: '',
            userType:'',
            productId: '',
            status: '',
            lawList: [],//法律文书签收
            confirmationList: [],// 成交确认书
            judgeList: [],//执行裁定书
            noticeList: [],//协助执行通知书
            handoverList: [],//实物交接凭证
            transcationList:[] ,//交易凭证
            data: {},
            historyId: localStorage.getItem('productId'),
            historyStatus: localStorage.getItem('status'),
            hasUpdate:false,
            historyLaw: [],
            historyConfirm: [],
            historyJudge: [],
            historyNotice:[],
            historyHandover: [],
            historyTransca:[],
            isSave: false
        }
    },
    filters: {
        bgimg: url => {
            return {
                backgroundImage: `url(${url})`
            }
        },
    },
    watch:{
        lawList(val){
            if(this.historyLaw != val) {
                this.hasUpdate = true
            } else{
                this.hasUpdate = false
            }
        },
        confirmationList(val) {
            if(this.historyConfirm != val) {
                this.hasUpdate = true
            }
        },
        judgeList(val) {
            if(this.historyJudge != val) {
                this.hasUpdate = true
            }
        },
        noticeList(val) {
            if(this.historyNotice != val) {
                this.hasUpdate = true
            }
        },
        handoverList(val) {
            if(this.historyHandover != val) {
                this.hasUpdate = true
            }
        },
        transcationList(val) {
            if(this.historyTransca != val) {
                this.hasUpdate = true
            }
        }
    },
    methods: {
        prompt(val){
            if(val == 3) {
                alert('最多只能上传三张')
            } else {
                alert('最多只能上传六张')
            }
        },
        law(file){
            if(this.status == '1' || this.userType != 1) return
            this.uploadImg(file.content,'law')
        },
        confirmation(file){
            if(this.status == '1' || this.userType != 1) return
            this.uploadImg(file.content,'confirmation')
        },
        judge(file){
            if(this.status == '1' || this.userType != 1) return
            this.uploadImg(file.content,'judge')
        },
        notice(file){
            if(this.status == '1' || this.userType != 1) return
            this.uploadImg(file.content,'notice')
        },
        handover(file){
            if(this.status == '1' || this.userType != 1) return
            this.uploadImg(file.content,'handover')
        },
        transcation(file){
            if(this.status == '1' || this.userType != 1) return
            this.uploadImg(file.content,'transcation')
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
                    headers:{openId: that.openId}
                }
            )
            .then(res => {
                console.log(res)
                var url = res.data.data
                if(res.data.code=='0000'){
                    if(res.data.data) {
                        Indicator.close()
                    }
                    if(type=='law') {
                        //法律文书签收
                        if(this.lawList.length == 3) {
                            alert('最多只能传三张图片')
                            return
                        }
                        this.lawList = this.lawList.concat(url)
                        
                    }
                    if(type=='confirmation'){
                        //成交确认书
                        if(this.confirmationList.length == 3) {
                            alert('最多只能传三张图片')
                            return
                        }
                        this.confirmationList = this.confirmationList.concat(url)
                    }
                    if(type== 'judge') {
                        //执行裁定书
                        if(this.judgeList.length == 3) {
                            alert('最多只能传三张图片')
                            return
                        }
                        this.judgeList = this.judgeList.concat(url)
                    }
                    if(type=='notice') {
                        //协助执行通知书
                        if(this.noticeList.length == 3) {
                            alert('最多只能传三张图片')
                            return
                        }
                        this.noticeList = this.noticeList.concat(url)
                    }
                    if(type=='handover') {
                        //实物交接凭证
                        if(this.handoverList.length == 3) {
                            alert('最多只能传三张图片')
                            return
                        }
                        this.handoverList = this.handoverList.concat(url)
                    }
                    if(type=='transcation') {
                        //交易凭证
                        if(this.handoverList.length == 6) {
                            alert('最多只能传六张张图片')
                            return
                        }
                        this.transcationList = this.transcationList.concat(url)
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        save(val){
            var that = this
            if(that.isSave) return
            if(val == '1') {
                if(!that.lawList[0]) {
                    alert('请上传法律文书签收')
                    return
                }
                if(!that.confirmationList[0]) {
                    alert('请上传成交确认书')
                    return
                }
                if(!that.judgeList[0]) {
                    alert('请上传执行裁定书')
                    return
                }
                if(!that.noticeList[0]) {
                    alert('请上传协助执行通知书')
                    return
                }
                if(!that.handoverList[0]) {
                    alert('请上传实物交接凭证')
                    return
                }
                if(!that.transcationList[0]) {
                    alert('交易凭证')
                    return
                }
            }
            let url = `${ReqUrl.add}`
            let data = {
                type_code: "t13",
                userId: this.userId,
                prodId: this.productId || this.historyId,
                status: val, //0保存 1完成
                data13: {
                    law_file: that.lawList.join(','), // 法律文书签收
                    confirmation_file: that.confirmationList.join(','), //成交确认书
                    judge_file: that.judgeList.join(','),// 执行裁定书
                    notice_file:that.noticeList.join(',') ,//协助执行通知书
                    handover_file: that.handoverList.join(','),//实物交接凭证
                    transcation_file: that.transcationList.join(','),//交易凭证
                }
            }
            if(val == '1') {
                MessageBox.confirm('确认完成后将无法修改信息!').then(action => {
                    that.$http.post(
                        url,
                        packup(data),
                        {
                            headers:{openId: that.openId}
                        })
                        .then(res => {
                            console.log(res)
                            if(res.data.code == '0000') {
                                that.isSave = true
                                this.$router.go(-1)
                            } else{
                                alert(res.data.msg)
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
            } else {
                that.$http.post(
                    url,
                    packup(data),
                    {
                        headers:{openId: that.openId}
                    })
                    .then(res => {
                        console.log(res)
                        if(res.data.code == '0000') {
                            that.isSave = true
                            Toast('保存成功')
                            this.$router.go(-1)
                        } else{
                            alert(res.data.msg)
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
            
        },
        removeUrl(url,type) {
            if(type=='law') {
                //法律文书签收
                this.lawList.filter((item,index) => {
                    if(item === url) {
                        this.lawList.splice(index,1)
                        console.log(item)
                    }
                })
            }
            if(type=='confirmation'){
                //成交确认书
                this.confirmationList.filter((item,index) => {
                    if(item === url) {
                        this.confirmationList.splice(index,1)
                        console.log(item)
                    }
                })
            }
            if(type== 'judge') {
                //执行裁定书
                this.judgeList.filter((item,index) => {
                    if(item === url) {
                        this.judgeList.splice(index,1)
                        console.log(item)
                    }
                })
            }
            if(type=='notice') {
                //协助执行通知书
                this.noticeList.filter((item,index) => {
                    if(item === url) {
                        this.noticeList.splice(index,1)
                        console.log(item)
                    }
                })
            }
            if(type=='handover') {
                //实物交接凭证
                this.handoverList.filter((item,index) => {
                    if(item === url) {
                        this.handoverList.splice(index,1)
                        console.log(item)
                    }
                })
            }
            if(type=='transcation') {
                //交易凭证
                this.transcationList.filter((item,index) => {
                    if(item === url) {
                        this.transcationList.splice(index,1)
                        console.log(item)
                    }
                })
            }
        },
        getData() {
            var that=this
            let url = `${ReqUrl.queryDetail}`
            let data = {
                type_code: "t13",
                userId: that.userId || '',
                prodId: this.productId || this.historyId
            }
            that.$http.post(
                url,
                packup(data),
                {
                    headers:{openId: that.openId}
                }
            )
            .then(res => {
                console.log(res)
                if(res.data.code == '0000') {
                    this.data=res.data
                    var data = res.data.data.data
                    if(data.law_file) {
                        that.lawList = data.law_file.split(',')
                        that.historyLaw = data.law_file.split(',')
                    }
                    if (data.confirmation_file) {
                        that.confirmationList = data.confirmation_file.split(',')
                        that.historyConfirm = data.confirmation_file.split(',')
                    }
                    if(data.judge_file) {
                        that.judgeList = data.judge_file.split(',')
                        this.historyJudge = data.judge_file.split(',')
                    }
                    if(data.notice_file) {
                        that.noticeList = data.notice_file.split(',')
                        that.historyNotice = data.notice_file.split(',')
                    }
                    if(data.handover_file) {
                        that.handoverList = data.handover_file.split(',')
                        that.historyHandover = data.handover_file.split(',')
                    }
                    if(data.transcation_file) {
                        that.transcationList = data.transcation_file.split(',')
                        that.historyTransca  = data.transcation_file.split(',')
                    }
                } else {
                    // alert(res.data.msg)
                }
            })
            .catch(error => {
                console.log(error)
            });
        }
  },
  computed: {
  },
  created(){
        if(!this.lawList[0] || !this.confirmationList[0] ||!this.judgeList[0] || !this.noticeList[0] || !this.handoverList[0] || !this.transcationList[0] ) {
            this.hasUpdate = false
        }
        this.productId = this.$route.params.id
        this.status = this.$route.params.status
        if(this.status) {
            localStorage.setItem('status',this.status)
        }
        this.openId = sessionStorage.getItem('openId')
        this.userId = localStorage.getItem('userId')
        this.userType = localStorage.getItem('userType')
        this.getData()
        this.$wx.ready(function(){
        })
  },
}
</script>

<style lang="less" scoped>
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
    }
    .content{
        background: #fff;
        margin: 0 auto;
        padding: 4px 36px;
        li{
            float: left;
            width: 183px;
            height:123px;
            margin-top: 13px;
            margin-bottom: 13px;
            vertical-align: middle;
            margin-right:42px;
            div{
                width: 183px;
                height: 123px;
                background:#ccc;
                margin: 0 auto;
                position: relative;
                text-align:center;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                position:relative;
                overflow: hidden;
                zoom: 1;
                text-align:center;
                span{
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 40px;
                    height: 40px;
                    background: #666;
                    border-radius: 20px;
                    color:#fff;
                    line-height:40px;
                }
                img{
                    width:73px;
                    display: inline-block;
                    width:100%;
                }
            }
        }
        li.add{
            div{
                img{
                    width:80px;
                    display: inline-block;
                    margin-top:25px;
                }
            }
        }
    }
}
.section_confirm{
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
</style>
