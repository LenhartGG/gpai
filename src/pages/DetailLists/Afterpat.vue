<template>
    <div class="main">
        <div class="list">
            <div class="item" @click="showBox('name')" >
                <div class="fl">买受人</div>
                <div class="time fr">
                    <span class="textOver">{{textName}} </span>
                    <span v-show="status !== '1' && userType == 1" >></span>
                </div>
            </div>
            <div class="item" @click="showBox('phone')">
                <div class="fl ">联系电话</div>
                <div class="time fr">
                    <span >{{textPhone}}</span>
                    <span v-show="status !== '1' && userType == 1" >></span>
                </div>
            </div>
        </div>
        <div class="list">
            <div class="item"  @click="showBox('price')" >
                <div class="fl">成交价</div>
                <div class="time fr">
                    <span v-if="textPrice" class="textOver">{{textPrice}}元</span>
                    <span v-show="status !== '1' && userType == 1">></span>
                </div>
            </div>
            <div class="item" @click="showBox('bond')">
                <div class="fl ">保证金</div>
                <div class="time fr">
                    <span v-if="textBond" class="textOver">{{textBond}}元</span>
                    <span v-show="status !== '1' && userType == 1" >></span>
                </div>
            </div>
            <div class="item" @click="showBox('balance')">
                <div class="fl ">成交余款</div>
                <div class="time fr">
                    <span v-if="textBalance" class="textOver">{{textBalance}}元</span>
                    <span v-show="status !== '1' && userType == 1"  >></span>
                </div>
            </div>
        </div>
        <div class="list">
            <div class="item" @click="showBox('courtAccount')">
                <div class="fl">法院账号</div>
                <div class="time fr">
                    <span class="textOver">{{courtAccount}} </span>
                    <span v-show="status !== '1' && userType == 1" >></span>
                </div>
            </div>
            <div class="item" @click="showBox('courtName')">
                <div class="fl ">户名</div>
                <div class="time fr">
                    <span class="textOver">{{courtName}}</span>
                    <span v-show="status !== '1' && userType == 1" >></span>
                </div>
            </div>
            <div class="item" @click="showBox('bankName')">
                <div class="fl ">开户行</div>
                <div class="time fr">
                    <span class="textOver">{{bankName}}</span>
                    <span v-show="status !== '1' && userType == 1" >></span>
                </div>
            </div>
        </div>
        <div class="list">
            <div class="item" >
                <van-uploader :after-read="transfer">
                    <div class="fl left" :style="transferVoucher?'padding-top:5%':''">保证金转款凭证</div>
                    <div class="time fr">
                        <div class="pic" v-if="transferVoucher" :style="transferVoucher| bgimg">
                            <!-- <img :src="transferVoucher" alt=""> -->
                        </div>
                        <span v-show="status !== '1' && userType == 1">></span>
                    </div>
                </van-uploader>
                
            </div>
            <div class="item" @click="openPicker('picker')">
                <div class="fl">日期</div>
                <div class="time fr">
                    <span>{{transferTime}} </span>
                    <span v-show="status !== '1' && userType == 1" >></span>
                </div>
            </div>
        </div>
        <div class="list">
            <div class="item" >
                <van-uploader :after-read="pay">
                    <div class="fl left" :style="paymentVoucher?'padding-top:5%':''">成交余额支付凭证</div>
                    <div class="time fr">
                        <div class="pic" v-if="paymentVoucher" :style="paymentVoucher| bgimg">
                            <!-- <img :src="paymentVoucher" alt=""> -->
                        </div>
                        <span v-show="status !== '1' && userType == 1">></span>
                    </div>
                </van-uploader>
                
            </div>
            <div class="item" @click="openPicker('picker2')">
                <div class="fl">日期</div>
                <div class="time fr">
                    <span>{{payTime}} </span>
                    <span v-show="status !== '1' && userType == 1" >></span>
                </div>
            </div>
        </div>
        <!-- 输入框 -->
        <div class="input-main" v-show="isShow" >
            <div class="input" v-show="type=='name'">
                <mt-field v-model="textName" type="text" placeholder="请输入姓名"></mt-field>
            </div>
            <div class="input" v-show="type=='phone'">
                <mt-field v-model="textPhone" type="number" maxlength ="11" placeholder="请输入手机号"></mt-field>
            </div>
            <div class="input" v-show="type=='price'">
                <mt-field v-model="textPrice" type="number"  placeholder="请输入成交价格"></mt-field>
            </div>
            <div class="input" v-show="type=='bond'">
                <mt-field v-model="textBond" type="number"  placeholder="请输入保证金"></mt-field>
            </div>
            <div class="input" v-show="type=='balance'">
                <mt-field v-model="textBalance" type="number"  placeholder="请输入成交余额"></mt-field>
            </div>
            <div class="input" v-show="type=='courtAccount'">
                <mt-field v-model="courtAccount" type="number"  placeholder="请输入法院账号"></mt-field>
            </div>
            <div class="input" v-show="type=='courtName'">
                <mt-field v-model="courtName" type="text"  placeholder="请输入户名 如：XX法院"></mt-field>
            </div>
            <div class="input" v-show="type=='bankName'">
                <mt-field v-model="bankName" type="text"  placeholder="请输入开户行 如：XX银行"></mt-field>
            </div>
            <div class="button">
                <div class="readBtn fl btn1" @click="isShow = false">取消</div>
                <div class="readBtn fr btn2" @click="updateInput">确定</div>
            </div>
            
        </div>
        <mt-datetime-picker
            ref="picker"
            type="datetime"
            :startDate = "startDate"
            :endDate = "endDate"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            @confirm="handleConfirm">
        </mt-datetime-picker>
        <mt-datetime-picker
            ref="picker2"
            type="datetime"
            :startDate = "startDate"
            :endDate = "endDate"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            @confirm="handleConfirm2">
        </mt-datetime-picker>
        <div class="bottom" v-if="status !=='1' && userType == 1">
            <div class="button fl confirm" @click="save('1')">确认完成</div>
            <div class="button fr save" @click="save('0')" >保存</div>
        </div>
        <!-- 异议 -->
        <div class="otherSuggest" @click="otherSuggest()" v-show="userType==2">异议</div>
    </div>
</template>
<script>
    import * as ReqUrl from '../../../config/ReqUrl'
    import bus from '../../assets/eventBus'
    import { Toast,DatetimePicker,MessageBox,Indicator } from 'mint-ui'
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
                openId: '',
                userId: '',
                userType: '',
                productId: '',
                status: '',
                textName: '',
                textPhone: '',
                textPrice:'',//成交价格
                textBond:'',//保证金
                textBalance:'',//成交余额
                courtAccount: '',//法院账号
                courtName: '',//法院名称
                bankName:'',//银行名称
                transferVoucher:'',//转款凭证
                paymentVoucher:'',//支付凭证
                isShow: false,
                type: '',
                text: '',
                number: '',
                startDate: new Date('2010/1/1'),
                endDate: new Date('2040/1/1'),
                pickerValue: '',
                transferTime: '',
                payTime: '',
                timeType: '',
                historyId: localStorage.getItem('productId'),
                hasUpdate: false,
                data: {},
                isSave: false
            }
        },
        watch:{
            textName(val) {
                if(this.data.buyer !== val) {
                    this.hasUpdate = true
                }
            },
            textPhone(val) {
                if(this.data.mobile != val) {
                    this.hasUpdate = true
                }
                if(val.length > 11) {
                    alert('请输入正确的手机格式')
                    this.textPhone=''
                }
            },
            textPrice(val) {
                if(this.data.winprice != val) {
                    this.hasUpdate = true
                }
            },
            textBond(val) {
                if(this.data.margin != val) {
                    this.hasUpdate = true
                } 
            },
            textBalance(val) {
                if(this.data.last_money != val) {
                    this.hasUpdate = true
                }
            },
            courtAccount(val) {
                if(this.data.court_bankno != val) {
                    this.hasUpdate = true
                }
            },
            transferVoucher(val) {
                if(this.data.margin_voucher != val) {
                    this.hasUpdate = true
                }
            },
            paymentVoucher(val){
                if(this.data.lastmoney_voucher != val) {
                    this.hasUpdate = true
                }
            },
            courtName(val) {
                if(this.data.bank_user != val) {
                    this.hasUpdate = true
                }
            },
            bankName(val) {
                if(this.data.bank_name != val) {
                    this.hasUpdate = true
                }
            },
            transferTime(val){
                if(this.data.margin_voucher_date != val) {
                    this.hasUpdate = true
                }
            },
            payTime(val){
                if(this.data.lastmoney_voucher_date != val) {
                    this.hasUpdate = true
                }
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
        methods: {
            transfer(file) {
                if(this.status == '1' || this.userType != 1) return
                this.uploadImg(file.content,'transfer')
            },
            pay(file){
                if(this.status == '1' || this.userType != 1) return
                this.uploadImg(file.content,'pay')
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
                    if(res.data.code=='0000'){
                        if(res.data.data) {
                            Indicator.close()
                        }
                        if(type=='transfer') {
                            this.transferVoucher = res.data.data
                        } else {
                            this.paymentVoucher = res.data.data
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            },
            showBox(type) {
                if(this.status == '1' || this.userType != 1) return
                this.isShow = true
                this.type = type
            },
            updateInput() {
                //保存验证
                if(this.type == 'name') {
                    if(!this.textName) {
                        alert('姓名不能为空，请输入姓名')
                    } else {
                        this.isShow = false
                    }
                }
                if(this.type == 'phone') {
                    var isPhone = /^((\+?86)|(\+86))?(13[0123456789][0-9]{8}|15[0123456789][0-9]{8}|17[0123456789][0-9]{8}|18[012356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/
                    if (isPhone.test(this.textPhone)) {
                        Toast('保存成功')
                        this.isShow = false
                    } else {
                        alert('手机格式不正确，请输入正确的手机号')
                        this.textPhone = ''
                    }
                }
                if(this.type== 'price'){
                    if(!this.textPrice) {
                        alert('成交额不能为空，请输入成交额')
                    } else {
                        this.isShow = false
                    }
                }
                if(this.type == 'bond') {
                    if(!this.textBond) {
                        alert('保证金不能为空，请输入保证金')
                    }else{
                        this.isShow = false
                    }
                }
                if(this.type == 'balance') {
                    if(!this.textBalance) {
                        alert('成交余额不能为空，请输入成交余额')
                    }else{
                        this.isShow = false
                    }
                }
                if(this.type == 'courtAccount') {
                    if(!this.courtAccount) {
                        alert('法院账号不能为空，请输入法院账号')
                    } else {
                        this.isShow = false
                    }
                }
                if(this.type == 'courtName') {
                    if(!this.courtName) {
                        alert('户名不能为空，请输入户名')
                    } else {
                        this.isShow = false
                    }
                }
                if(this.type == 'bankName') {
                    if(!this.bankName) {
                        alert('开户行不能为空，请输入开户行')
                    } else {
                        this.isShow = false
                    }
                }
                
            },
            formatDate(date) {
                const y = date.getFullYear()
                let m = date.getMonth() + 1
                m = m < 10 ? '0' + m : m
                let d = date.getDate()
                d = d < 10 ? ('0' + d) : d
                return y + '-' + m + '-' + d
            },
            openPicker(picker) {
                if(this.status == '1' || this.userType != 1) return
                this.$refs[picker].open();
                // this.timeType = type
            },
            handleConfirm(value){
                this.transferTime = this.formatDate(value)
            },
            handleConfirm2(value) {
                this.payTime = this.formatDate(value)
            },
            save(val){
                var that=this
                if(that.isSave) return
                if(val == '1') {
                    if(!that.textName) {
                        alert('请输入姓名')
                        return
                    }
                    if(!that.textPhone) {
                        alert('请输入手机号')
                        return
                    }
                    if(!that.textPrice) {
                        alert('请输入成交价格')
                        return
                    }
                    if(!that.textBond) {
                        alert('请输入保证金')
                        return
                    }
                    if(!that.textBalance) {
                        alert('请输入成交余额')
                        return
                    }   
                    if(!that.courtAccount) {
                        alert('请输入法院账号')
                        return
                    }
                    if(!that.transferVoucher) {
                        alert('请上传保证金转款凭证')
                        return
                    }   
                    if(!that.paymentVoucher) {
                        alert('请上传成交余额支付凭证')
                        return
                    }
                    if(!that.courtName) {
                        alert('请输入户名')
                        return
                    }
                    if(!that.bankName) {
                        alert('请输入开户行')
                        return
                    }
                    if(!that.transferTime) {
                        alert('请选择保证金转款凭证日期')
                        return
                    }
                    if(!that.payTime) {
                        alert('请选择成交余额支付凭证日期')
                        return
                    }
                }
                let url = `${ReqUrl.add}`
                let data = {
                    type_code: "t12",
                    userId: that.userId,
                    prodId: that.productId || that.historyId,
                    status: val, //0保存 1完成
                    data12: {
                        buyer: that.textName, //买受人
                        mobile: that.textPhone, // 手机号
                        winprice: that.textPrice,//成交价
                        margin: that.textBond,//保证金
                        last_money: that.textBalance,//成交余额
                        court_bankno: that.courtAccount,//法院账号
                        margin_voucher: that.transferVoucher,//保证金转款凭证
                        lastmoney_voucher: that.paymentVoucher,//成交余额支付凭证
                        bank_user: that.courtName,//开户行
                        bank_name: that.bankName,//户名
                        margin_voucher_date: that.transferTime ,
                        lastmoney_voucher_date: that.payTime 
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
                            })
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
            getData() {
                var that=this
                let url = `${ReqUrl.queryDetail}`
                let data = {
                    type_code: "t12",
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
                    if(res.data.code == '0000') {
                        var data = res.data.data.data
                        this.data = data
                        that.textName = data.buyer
                        that.textPhone = data.mobile
                        that.textPrice = data.winprice
                        that.textBond = data.margin
                        that.textBalance = data.last_money
                        that.courtAccount = data.court_bankno
                        that.transferVoucher = data.margin_voucher
                        that.paymentVoucher = data.lastmoney_voucher
                        that.courtName = data.bank_user
                        that.bankName = data.bank_name
                        that.transferTime = data.margin_voucher_date
                        that.payTime = data.lastmoney_voucher_date
                    } else{
                        // alert(res.data.msg)
                    }
                    
                })
                .catch(error => {
                    console.log(error)
                });
            },
            otherSuggest(){
                this.$router.push({path:'/detail/otherSuggest',query:{type:'t11'}})
            }
        },
        computed: {
        },
        created(){
            if(!this.textName||!this.textPhone||!this.textPrice||!this.textBond||!this.textBalance||
                !this.courtAccount||!this.transferVoucher||!this.paymentVoucher||!this.courtName||
                !this.bankName||!this.transferTime || !this.payTime){
                    this.hasUpdate = false
                }
            this.productId = this.$route.params.id
            this.status = this.$route.params.status
            this.openId = sessionStorage.getItem('openId')
            this.userId = localStorage.getItem('userId')
            this.userType = localStorage.getItem('userType')
            this.$wx.ready(function(){
                console.log('111')
            })
            this.getData()
            //alert(this.textValue)
        },
        components: {
          DatetimePicker
        }
    }
</script>
<style lang="less" scoped>
    .fl{
        float:left;
    }
    .fr{
        float:right;
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
                .van-uploader{
                    width:100%;

                }
                .left{
                    // padding-top:5%;
                    display: inline-block;
                    vertical-align: middle;
                }
                div:nth-of-type(1){
                    // width:35%;
                }
                div:nth-of-type(2){
                    // width:65%;
                }
                .time{
                    font-size:26px;
                    color:#666;
                    text-align: right;
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
                        text-align:center;
                        img{
                            width:123px;
                        }
                    }
                    span.textOver{
                        float:left;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        width: 500px;
                    }
                }
            }
            .item:last-child{
                border-bottom:none;
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
        .input-main{
            background:#F0F0F0;
            position: fixed;
            top:0;
            left:0;
            width:100vw;
            height:100vh;
            z-index: 999;
            .input{
                height:102px;
                background:#fff;
                line-height:102px;
                width:90%;
                margin-top:20px;
                padding-left:10%;
                .mint-cell:last-child{
                    background:none;
                }
                .mint-cell:first-child .mint-cell-wrapper{
                    background:none;
                }
            }
            .button{
                overflow: hidden;
                zoom:1;
                height:82px;
                position: fixed;
                bottom:0;
                left:0;
                z-index:9999;
                width:100%;
                .readBtn{
                    width: 50%;
                    height: 82px;
                    background: #D80E1C;
                    text-align: center;
                    color: #fff;
                    font-size: 34px;
                    line-height: 82px;
                    position: static;
                }
                .readBtn.btn1{
                    background:#fff;
                    color:#333;
                }
            }
            
        }
    }

</style>
