import { Indicator } from 'mint-ui';
exports.install = function(Vue, options) {
    Vue.prototype.base = {
        //公用的微信权限配置方法
        //url接口请求地址，data传输的json格式数据
        wxinit() {
            //微信授权获取code
            var appid = 'wx5d1df462035953a3'
            var href = 'http://192.168.199.126:8080/loading' //微信授权重定向地址
                // var appid = 'wxaee47cc58ee122fb' //测试环境appid
                // var href = 'https://pft.gpai.net/loading' //测试环境微信授权重定向地址
            let redirect_uri = encodeURI(href.split("#")[0]);
            redirect_uri = redirect_uri.replace(/&/g, '%26');
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
        },
        getWxOpenid() {
            if (!sessionStorage.openId || sessionStorage.openId == 'undefined' || sessionStorage.openId == 'null') {
                var code = Vue.prototype.base.getUrlStr("code")
                var data1 = JSON.stringify({
                    code: code
                })
                var postData1 = Vue.prototype.$qs.stringify({
                    info: data1
                });
                Vue.prototype.$http({
                        url: '/NAMS_mobile/openid/getOpenid.do',
                        method: 'post',
                        data: postData1
                    })
                    .then(function(res) {
                        console.log(res)
                        sessionStorage.openId = res.data.data.openId
                            // alert(res.data.data.user.id)
                        if (res.data.data.user) {

                            localStorage.setItem('userType', res.data.data.user.type)
                            localStorage.setItem('userId', res.data.data.user.id)

                        } else {
                            localStorage.setItem('userId', -1)
                        }

                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
            Vue.prototype.base.wxconfig(Vue.prototype.$wx)
        },
        wxconfig(wx) {
            // var let_url = window.location.origin + to.fullPath
            // var url = window.location.href.split('#')[0]
            var href = window.location.href
            var data = JSON.stringify({
                url: href
            })
            var postData = Vue.prototype.$qs.stringify({
                info: data
            });
            //Indicator.open();
            Vue.prototype.$http({
                    url: '/NAMS_mobile/wechat/getWechatConfig.do',
                    method: 'post',
                    data: postData
                })
                .then(function(res) {
                    var data = res.data.data
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: data.appId, // 必填，公众号的唯一标识
                        timestamp: data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: data.nonceStr, // 必填，生成签名的随机串
                        signature: data.signature, // 必填，签名
                        jsApiList: ['chooseImage', 'getLocalImgData', 'uploadImage', 'downloadImage', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'chooseWXPay'] // 必填，需要使用的JS接口列表
                    });
                    //Indicator.close();

                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        //获取地址栏参数
        getUrlStr: function(name) {
            /**
             * 获取地址栏参数
             *
             *
             */
            let reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
            if (reg.test(window.location.href)) {
                return unescape(RegExp.$2.replace(/\+/g, " "))
            }
            return undefined
        },
        //ajax调用
        ajax() {

        },
        //这是有设定过期时间的使用示例：setCookie("name","hayden","s20");
        //s20是代表20秒
        //h是指小时，如12小时则是：h12
        //d是天数，30天则：d30
        setCookie(name, value, time) {
            if (time) {
                var strsec = Vue.prototype.base.getsec(time);
                var exp = new Date();
                exp.setTime(exp.getTime() + strsec * 1);
                document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
            } else {
                document.cookie = name + "=" + escape(value);
            }
        },
        getsec(str) {
            var str1 = str.substring(1, str.length) * 1;
            var str2 = str.substring(0, 1);
            if (str2 == "s") {
                return str1 * 1000;
            } else if (str2 == "h") {
                return str1 * 60 * 60 * 1000;
            } else if (str2 == "d") {
                return str1 * 24 * 60 * 60 * 1000;
            }
        },
        //手动删除cookie
        //使用实例delCookie("name");
        delCookie(name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = Vue.prototype.base.getCookie(name);
            if (cval != null) {
                document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
            }
        },
        //获取cookie
        getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        },
        uploadImg(baseCode) {
            var data = JSON.stringify({
                baseCode: baseCode
            })
            var postData = Vue.prototype.$qs.stringify({
                info: data
            });
            Vue.prototype.$http({
                    url: '/NAMS_mobile/file/uploadBase64Image.do',
                    method: 'post',
                    data: postData
                })
                .then(function(res) {
                    console.log(res)
                    if (res.data.code == '0000') {
                        let url = res.data.data
                        return url
                    } else {
                        console.log("图片上传失败")
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
}
