<template>
    <div class="main">
        <!-- <div class="header">
            <div class="back" @click="back">返回</div>
            结案入档
        </div> -->
        <div class="text" v-show="isFinshed == '1'">
            本案已全部完成，可以结案<br>用时{{date}}个工作日
        </div>
        <div class="text" v-show="isFinshed == '0'">本案待完成</div>
        <!-- 确认保存弹框 -->
        <div class="section_confirm" v-show="status != '1'">
            <ul>
                <li class="confirm fr" @click="save(1)">确认完成</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import * as ReqUrl from '../../../config/ReqUrl'
    import qs from 'qs'
    import { Picker,Toast,MessageBox } from 'mint-ui'
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
                date: '',
                openId: '',
                userId: '',
                productId: '',
                status: '',
                isFinshed: '',
                isSave: false
            }
        },
        methods: {
            save(val){
                var that = this
                if(that.isSave) return
                let url = `${ReqUrl.add}`
                let data = {
                    type_code: "t16",
                    userId: this.userId,
                    prodId: this.productId || this.historyId,
                    status: val, //0保存 1完成
                }
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
                                this.isSave = true
                                this.$router.go(-1)
                            } else{
                                alert(res.data.msg)
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                });
                
            },
            getData() {
                var that=this
                let url = `${ReqUrl.queryDetail}`
                let data = {
                    type_code: "t16",
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
                    if(res.data.code=='0000'){
                        this.isFinshed = res.data.data.sign
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
            this.date = this.$route.params.date
            this.productId = this.$route.params.id
            console.log(this.$route.params)
            this.status = this.$route.params.status
            this.openId = sessionStorage.getItem('openId')
            this.userId = localStorage.getItem('userId')
            this.$wx.ready(function(){
                console.log('111')
            })
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
        .text{
            font-size:30px;
            color:#333;
            text-align:center;
            line-height:40px;
            padding-top:348px;
        }
    }
.section_confirm{
    position: fixed;
    bottom: 0;
    width: 100%;
    ul{
        li{
            height: 82px;
            line-height: 82px;
            // float: left;
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
</style>
