<template>
    <div class="main">
        <!-- <div class="header">
            <div class="back" @click="back">返回</div>
            费用结算
        </div> -->
        <div class="list" v-if="data">
            <div class="item" >
                <van-uploader :after-read="invoice" v-show="status == '0' && userType == 1">
                    <div>
                        <div class="fl left" :style="hasCur1?'padding-top:5%':''">辅助费发票</div>
                        <div class="time fr" >
                            <div class="pic" v-show="invoiceUrl" :style="invoiceUrl| bgimg">
                                <!-- <img :src="invoiceUrl" alt=""> -->
                            </div>
                            <span v-show="status == '0' && userType == 1">></span>
                        </div>
                    </div>
                </van-uploader>
                <div v-show="status == '1'">
                    <div class="fl left" :style="hasCur1?'padding-top:5%':''">辅助费发票</div>
                    <div class="time fr" >
                        <div class="pic" v-show="invoiceUrl" :style="invoiceUrl| bgimg">
                            <!-- <img :src="invoiceUrl" alt=""> -->
                        </div>
                       
                    </div>
                </div>
            </div>
            <div class="item">
                <van-uploader :after-read="settlement"  v-show="status == '0' && userType == 1">
                    <div class="fl left" :style="hasCur2?'padding-top:5%':''">辅助费结算凭证</div>
                    <div class="time fr">
                        <div class="pic" v-show="settlementUrl" :style="settlementUrl| bgimg">
                            <!-- <img :src="settlementUrl" alt=""> -->
                        </div>
                        <span @click="uploadImg('settlement')">></span>
                    </div>
                </van-uploader>
                <div v-show="status == '1'">
                    <div class="fl left" :style="hasCur2?'padding-top:5%':''">辅助费结算凭证</div>
                    <div class="time fr">
                        <div class="pic" v-show="settlementUrl" :style="settlementUrl| bgimg">
                            <!-- <img :src="settlementUrl" alt=""> -->
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="item" @click="selectChange">
                <div class="fl" >辅助费用状态</div>
                <div class="time fr" >
                    {{selectValue}}
                    <span v-show="status == '0' && userType == 1" >></span>

                </div>
            </div>
        </div>
        <!-- 下拉框 -->
        <div class="section_combobox" v-show="selectShow" >
          <div class="box">
            <div class="title">
              辅助费用状态
            </div>
            <div class="content">
              <mt-radio
                align="right"
                v-model="selectValue"
                :options="options" :value="selectValue">
              </mt-radio>
            </div>
            <div class="cancel" @click="selectShow=false" v-show="!confire">取消</div>
            <div class="cancel-cur" @click="selectShow=false" v-show="confire">确定</div>
          </div>
        </div>
        <div class="bottom" v-if="status == '0' && userType == 1" >
            <div class="button fl confirm" @click="save('1')">确认完成</div>
            <div class="button fr save" @click="save('0')" v-if="hasUpdate">保存</div>
        </div>
        
    </div>
</template>
<script>
    import * as ReqUrl from '../../../config/ReqUrl'
    import { Picker,Toast,MessageBox,Indicator } from 'mint-ui'
    import qs from 'qs'
    const parseForm = qs.stringify
    function packup (data = {}) {
        return parseForm({
            info: JSON.stringify(data)
        })
    }
    export default {
        name: "Afterpat",
        data () {
            return {
                lists: '',
                openId: '',
                userId: '',
                userType: null,
                status: '',
                invoiceUrl: '',
                settlementUrl: '',
                options: [
                    {
                      label: '未支付',
                      value: '未支付',
                      disabled: false
                    },
                    {
                      label: '部分支付',
                      value: '部分支付',
                      disabled: false
                    },
                    {
                      label: '已全额支付',
                      value: '已全额支付',
                      disabled: false
                    }
                ],
                selectValue: '未支付',
                selectShow: false,
                confire: false,
                payType: '1',
                hasCur1: false,
                hasCur2: false,
                isOperation: false, //是否可操作
                productId: '',
                data: {},
                historyId: localStorage.getItem('productId'),
                historyType: '',
                hasUpdate: false,
                isSave: false
            }
        },
        mounted(){
        },
        filters: {
            bgimg: url => {
                return {
                    backgroundImage: `url(${url})`
                }
            },
        },
        watch: {
            selectValue:function(val){
                if(this.historyType != val) {
                    this.hasUpdate = true
                }
                this.confire = true
                if(this.selectValue == '未支付') {
                    this.payType = '1'
                }
                if(this.selectValue == '部分支付') {
                    this.payType = '2'
                }
                if(this.selectValue == '已全额支付') {
                    this.payType = '3'
                }
            },
            invoiceUrl (val) {
                if(this.data.invoice_file) {
                    if(this.data.invoice_file != val) {
                        this.hasUpdate = true
                    }
                }
            },
            settlementUrl(val) {
                if(this.data.settlement_file) {
                    if(this.data.settlement_file != val) {
                        this.hasUpdate = true
                    }
                }
                
            }
        },
        methods: {
            invoice(file){
                if(this.status == '1' ||  this.userType != 1) return
                this.uploadImg(file.content,'invoice')
            },
            settlement(file) {
                if(this.status == '1' || this.userType != 1) return
                this.uploadImg(file.content,'settlement')
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
                    if(res.data.code=='0000'){
                        if(res.data.data) {
                            Indicator.close()
                        }
                        if(type=='invoice') {
                            this.invoiceUrl = res.data.data
                            this.hasCur1 = true
                        } else {
                            this.settlementUrl = res.data.data
                            this.hasCur2 = true
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            },
            // uploadImg(type) {
            //     var that = this
            //     that.$wx.chooseImage({
            //         count: 1, // 默认9
            //         sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            //         sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            //         success: function (res) {
            //             var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            //             that.$wx.uploadImage({
            //                 localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
            //                 isShowProgressTips: 1, // 默认为1，显示进度提示
            //                 success: function (res) {
            //                     var serverId = res.serverId; // 返回图片的服务器端ID
            //                     that.updateImg(serverId,type)
            //                 }
            //             })
            //         }
            //     })
            // },
            updateImg(val,type) {
                let url = `${ReqUrl.uploadimg}`
                let data = {
                    "media_id": val,
                    userId: this.userId || ''
                }
                this.$http.post(
                    url,
                    packup(data),
                    {
                        headers:{openId: this.openId}
                    }
                )
                .then(res => {
                    console.log(res)
                    if(type=='invoice') {
                        this.invoiceUrl = res.data.data
                        this.hasCur1 = true
                    } else {
                        this.settlementUrl = res.data.data
                        this.hasCur2 = true
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            },
            save(status){
                var that=this
                if(that.isSave) return
                if(status == '1') {
                    if(!that.settlementUrl) {
                        alert('请上传辅助费发票')
                        return
                    }
                    if(!that.invoiceUrl) {
                        alert('请上传辅助费结算凭证')
                        return
                    }
                }
                
                let url = `${ReqUrl.add}`
                let data = {
                    type_code: "t15",
                    userId: that.userId || '',
                    prodId: this.productId || this.historyId,
                    status: status, //0保存 1完成
                    data15: {
                        settlement_file: that.settlementUrl, //结算凭证
                        invoice_file: that.invoiceUrl,//辅助费发票
                        pay_type: that.payType //1：未支付  2：部分支付 3：已全额支付
                    }
                }
                if(status == '1') {
                    MessageBox.confirm('确认完成后将无法修改信息!').then(action => {
                        that.$http.post(
                            url,
                            packup(data),
                            {
                                headers:{openId: that.openId}
                            }
                        )
                        .then(res => {
                            if(res.data.code == '0000') {
                                that.isSave = true
                                // this.$router.push({name:'detail',params: {id:that.productId,type:that.status}})
                                this.$router.go(-1)
                                
                            } else {
                                alert(res.data.msg)
                            }
                            

                        })
                        .catch(error => {
                            console.log(error)
                        })
                    })
                } else {
                    that.$http.post(
                            url,
                            packup(data),
                            {
                                headers:{openId: that.openId}
                            }
                        )
                        .then(res => {
                            if(res.data.code == '0000') {
                                that.isSave = true
                                console.log(res)
                                Toast('保存成功')
                                this.$router.go(-1)
                            } else {
                                alert(res.data.msg)
                            }
                            

                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
                
                
            },
            getData () {
                var that=this
                let url = `${ReqUrl.queryDetail}`
                let data = {
                    type_code: "t15",
                    userId: that.userId || '',
                    prodId: that.productId || that.historyId
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
                        that.data = res.data.data.data
                        that.payType = res.data.data.data.pay_type
                        that.invoiceUrl = res.data.data.data.invoice_file
                        that.settlementUrl = res.data.data.data.settlement_file
                        if(that.data.pay_type == '1') {
                            this.historyType = '未支付'
                            that.selectValue = '未支付'
                        }
                        if(that.data.pay_type == '2') {
                            this.historyType = '部分支付'
                            that.selectValue = '部分支付'
                        }
                        if(that.data.pay_type == '3') {
                            this.historyType = '已全额支付'
                            that.selectValue = '已全额支付'
                        }
                    } else {
                        // alert(res.data.msg)
                    }
                    
                })
                .catch(error => {
                    console.log(error)
                });
            },
            selectChange() {
                if(this.status == '1' || this.userType != 1) return
                this.selectShow = true
            },
            back () {
                this.$router.go(-1)
            }
        },
        computed: {
        },
        created(){
            if(!this.settlementUrl || ! this.invoiceUrl || !this.payType) {
                this.hasUpdate = true
            }
            // alert(this.hasUpdate)
            this.productId = this.$route.params.id
            this.status = this.$route.params.status
            this.openId = sessionStorage.getItem('openId')
            this.userId = localStorage.getItem('userId')
            this.userType = localStorage.getItem('userType')
            this.getData()
        },
    }
</script>
<style lang="less" scoped>
    .fl{
        float:left;
    }
    .fr{
        float:right;
    }
    .form{
        width:200px;
        height:200px;
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
                padding-top:20px;
                .left{
                    // padding-top:5%;
                }
                .van-uploader{
                    width:100%;
                }
                .time{
                    font-size:26px;
                    color:#666;
                    .pic{
                        display: inline-block;
                        vertical-align: middle;
                        padding:20px 0;
                        width:123px;
                        height:83px;
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: cover;
                        position:relative;
                        overflow: hidden;
                        zoom: 1;
                        img{
                            width: 123px;
                        }
                    }
                }
            }
            .item:last-child{
                border-bottom:none;
            }
        }
        .section_combobox{
            .mint-radiolist-label{
                font-size:26px;
            }
            .cancel-cur{
                background:#d80e1c;
                color:#fff;
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 1.106667rem;
                line-height: 1.106667rem;
                text-align: center;
                font-size: 34px;
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
            .confirm{
                background: #D80E1C;
                color:#fff;
                float:left;
            }
            .save{
                background: #fff;
                color:#333;
                float:right;
            }
        }
    }

</style>
