<template>
    <div class="main">
        <!-- <div class="header">
            <div class="back" @click="back">返回</div>
            用户回访
        </div> -->
        <!-- 有回访 -->
        <div v-if="data">
            <div class="list" >
                <div class="item">
                    <div class="fl">用户</div>
                    <div class="time fr" >
                        {{data.user_name}}
                    </div>
                </div>
                <div class="item">
                    <div class="fl">类型</div>
                    <div class="time fr">
                        {{data.user_type}}
                    </div>
                </div>
                <div class="item">
                    <div class="fl">用户评价</div>
                    <div class="time fr">
                        <img src="../../assets/images/star_red.png" v-for="i in star " :key="i">
                    </div>
                </div>
                <div class="item suggest">
                    <div class="fl">用户建议</div>
                    <div class="time fr">
                        {{data.user_opinion}}
                    </div>
                </div>
            </div>
            <p class="remark">回访由公拍网客服提供</p>
        </div>
        <!-- 无回访 -->
        <div class="null" v-show="!data">
            <img src="../../assets/images/null.png" alt="">
            <p>回访尚未进行</p>
        </div>
        <!-- 确认保存弹框 -->
        <!-- <div class="section_confirm" v-if="userType !=3">
            <ul>
                <li class="confirm" @click="confirm">确认完成</li>
                <li class="save" @click="save">保存</li>
            </ul>
        </div> -->
    </div>
</template>
<script>
import * as ReqUrl from '../../../config/ReqUrl'
import bus from '../../assets/eventBus'
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
            productId: '',
            openId: '',
            userId: '',
            userType: '',
            inputType:'',
            historyId: localStorage.getItem('productId'),
            textValue: '张三',
            text: '',
            data: {},
            star: null
        }
    },
    filters: {
        toInit:val=>{
            if(val) {
                return parseInt(val)
            }   
        }
    },
    mounted(){
        bus.$on('myevent', (val) => { 
            this.textValue = val
            // alert(this.textValue)
        })
    },
    methods: {
        SetData(val){
            var that = this;
            var that=this;
            let url = `${ReqUrl.add}`
            let data = {
                type_code: "t14",
                userId: that.userId,
                prodId: "20180522202706226594",
                status: '0', //0保存 1完成
                data14: {
                    user_name: "123",
                    user_type: "123", 
                    user_evaluate: "123",
                    user_opinion: "123",

                }
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
            })
            .catch(error => {
                console.log(error);
            });
        },
        //点击输入事件
        updateInput() {
            this.$router.push('/inputText')
        },
        getData() {
            var that=this
            let url = `${ReqUrl.queryDetail}`
            let data = {
                type_code: "t14",
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
                    console.log(res.data.data)
                    if(res.data.data.data ) {
                        this.data=res.data.data.data
                        // alert(this.data)
                        this.star = parseInt(this.data.user_evaluate)
                    }
                    
                    
                } else {
                    // alert(res.data.msg)
                    this.data= null
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
        this.productId = this.$route.params.id
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
                    .pic{
                        display: inline-block;
                        vertical-align: middle;
                        padding:20px 0;
                    }
                    img{
                        display: inline-block;
                        width: 20px;
                        margin-right:5px;
                    }
                }
            }
            .item:last-child{
                border-bottom:none;
                height:179px;
                line-height:179px;
                .time{
                    line-height:35px;
                    width:80%;
                    text-align:left;
                    margin:17px 0;
                }
            }
        }
        .remark{
            font-size:22px;
            color:#999;
            padding-left:30px;
        }
        .null{
            padding-top:180px;
            text-align:center;
            img{
                display: inline-block;
                width: 220px;
            }
            p{
                font-size: 30px;
                padding-top:79px;
                color: #656565;
            }
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
</style>
