<template>
    <div class="binding">
        <div class="bid cellphone">
            <label>手机号</label><input type="number" placeholder="请输入您的手机号" v-model="phone" @blur="checkPhone" @keyup.enter="sendVerification">
        </div>
        <div class="bid vcode">
            <label>验证码</label><input type="number" v-model="smsVerifyCode"  placeholder="请输入您的验证码" @blur="checkVerification" @keyup.enter="checkVerification" >
            <button class="getcode" @click="sendVerification" :class="sendVerificationCode==='获取验证码' || sendVerificationCode ==='重新获取'?'default':''">{{sendVerificationCode}}</button>
        </div>
        <div class="login" @click="checkVerification" >
            确认提交
        </div>
        <div class="tip">
            <i v-show="errorMsg"></i>
            <span v-show="!isSend && errorMsg">{{errorMsg}}1</span>
            <span v-show="isSend">验证码已发送至您的手机，有效时长5分钟</span>
            <!-- <span v-show="isSuccess">恭喜你注册成功</span> -->
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import * as ReqUrl from '../../config/ReqUrl'
    import qs from 'qs'
    const parseForm = qs.stringify
    function packup (data = {}) {
        return parseForm({
            info: JSON.stringify(data)
        })
    }
    export default {
        name: "Uservisit",
        data () {
            return {
                lists: "",
                phone: "",
                isPhone:  false,
                sendVerificationCode: "获取验证码",
                isRunning: false,
                count: 59,
                smsVerifyCode: '',
                isSend: false,
                isSuccess: false,
                errorMsg: '',
                hasSend: false
            }
        },
        watch: {
            phone :function(val) {
                if(val.length > 11) {
                    alert('请输入正确的手机格式')
                    this.phone=''
                }
            },
            smsVerifyCode: function(val) {
            }
        },
        methods: {
            back () {
                this.$router.go(-1);
            },
            getOpenId () {
                var that = this
                let url = `${ReqUrl.getCode}`
                axios.post(
                        url,)
                        .then(res => {
                            console.log(res)
                            localStorage.setItem('openId', res.data.data.openId)
                        })
                        .catch(error => {
                            console.log(error);
                        });
            },
            sendVerification () {
                //发送验证码的时候首先验证手机格式是否正确
                if(this.hasSend) return
                this.checkPhone()
                var that = this
                let url = `${ReqUrl.sendCaptchas}`
                // let url = 'http:192.168.199.195:9091/NAMS_mobile/user/sendCaptchas.do'
                let data = {"mobile":this.phone}

                if (this.isPhone) {
                    axios.post(
                        url,
                        packup(data))
                        .then(res => {
                            if(res.data.code=='0000'){
                                that.setTime()
                                that.isSend = true
                                this.hasSend = true
                            } else {
                                this.errorMsg = res.data.msg
                            }

                        })
                        .catch(error => {
                            console.log(error);
                        });
                }

            },
            checkVerification () {
                // 验证验证码是否正确
                var that = this
                let url = `${ReqUrl.checkCaptchas}`
                // let url = 'http:192.168.199.195:9091/NAMS_mobile/user/checkCaptchas.do'
                let data = {
                    "mobile":this.phone,
                    "smsVerifyCode":this.smsVerifyCode
                }
                if (this.smsVerifyCode.length === 6) {
                    axios.post(
                        url,
                        packup(data))
                        .then(res => {
                            console.log(res)
                            if (res.data.msg === "输入验证码错误") {
                                alert("输入验证码错误,请重新输入")
                                this.smsVerifyCode = ''
                                // that.isSuccess = true
                                that.isSend = false
                            }
                            if (res.data.code === "0000")
                            {
                                that.binding()
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }

            },
            binding () {
                let url = `${ReqUrl.binding}`
                // let url = 'http:192.168.199.195:9091/NAMS_mobile/user/binding.do'
                let data = {
                    "mobile":this.phone,
                    "openId": sessionStorage.openId,
                }
                if (this.isPhone) {
                    axios.post(
                        url,
                        packup(data),
                        {
                            headers:{openId : sessionStorage.openId}
                        }
                    )
                        .then(res => {
                            console.log(res)
                            if(res.data.code == '0000') {
                                this.$router.push({
                                    path: '/home',
                                })
                                sessionStorage.setItem('ut', res.data.data.ut)
                                localStorage.setItem('userType',res.data.data.user.type)
                                localStorage.setItem('userId', res.data.data.user.id)
                            } else{
                                alert(res.data.msg)
                            }

                        })
                        .catch(error => {
                            console.log(error);
                        });
                }

            },
            checkPhone () {
                // 当input失去焦点的时候验证手机格式是否正确
                console.log(this.phone)
                //验证手机格式是否正确
                var isPhone = /^((\+?86)|(\+86))?(13[0123456789][0-9]{8}|15[0123456789][0-9]{8}|17[0123456789][0-9]{8}|18[012356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/
                if (isPhone.test(this.phone)) {
                    this.isPhone = true
                } else {
                    this.isPhone = false
                    this.errorMsg = '手机格式不正确，请输入正确的手机号'
                }
            },
            setTime () {
                // 60s倒计时
                var that = this
                that.sendVerificationCode = that.count + 's'
                if (that.sendVerificationCode !== '获取验证码') {
                    that.count--
                    if (that.count === -1) {
                    that.sendVerificationCode = '重新获取'
                    that.isRunning = false
                    that.count = 59
                    return
                    }
                }
                setTimeout(function () {
                    that.setTime()
                }, 1000)
            },
        },
        computed: {
        },
        created: function () {
            this.getOpenId()
        }
    }
</script>
<style lang="less" scoped>
.binding{
    margin-top: 61px;
    .bid{
        label{
            margin-left: 60px;
            width: 87px;
            font-size: 30px;
        }
        input{
            width: 423px;
            height: 60px;
            border:0;
            outline: 0;
            background: #f0f0f0;
            border-bottom: 4px solid #939191;
            text-indent: 17px;
            margin-left: 24px;
            margin-bottom: 32px;
            font-size:24px;
        }
    }
    .vcode{
        position: relative;
        .getcode{
            margin-left: -160px;
            width: 150px;
            height: 47px;
            line-height: 47px;
            border: none;
            outline: none;
            background: #939191;
            font-size: 22px;
            color: #fff;
        }
        .getcode.default{
            background:#f00;
            color:#fff;
        }
    }
    .login{
        width:692px;
        height:82px;
        background:#D80E1C;
        color:#fff;
        margin:0 auto;
        text-align:center;
        line-height:82px;
    }
    .tip{
        width: 650px;
        margin: 38px auto 0;
        line-height: 30px;
        color: #d80e1c;
        position: relative;
        i{
            position: absolute;
            display: inline-block;
            width: 30px;
            height: 30px;
            background: url('../assets/images/tip.png') no-repeat;
            background-size: 30px 30px;
        }
        span{
            padding-left: 39px;
            font-size: 22px;
        }

    }
}
</style>
