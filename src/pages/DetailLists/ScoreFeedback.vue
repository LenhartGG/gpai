<template>
  <!-- 评分反馈 -->
  <div>
    <section>
        <ul>
            <li>
                <div class="fl">结案时间</div>
                <div class="fr"><span class="mr29">{{data.close_time}}天</span></div>
            </li>
            <li>
                <div class="fl">标的物溢价率</div>
                <div class="fr"><span class="mr29">{{data.premium_rate}}</span></div>
            </li>
            <li>
                <div class="fl">报名人数</div>
                <div class="fr"><span class="mr29">{{data.enrolment}}人</span></div>
            </li>
            <li>
                <div class="fl">竞价次数</div>
                <div class="fr"><span class="mr29">{{data.bidno}}</span></div>
            </li>
            <li class="itemHeight" @click="showBox">
                <div class="fl">改进建议</div>
                <div class="fr">
                    <span>{{suggest}}</span>
                    <span class="arrow r_arrow" v-if="status != '1' && userType == 1"></span>
                </div>
            </li>
            <li>
                <div class="fl">用户反馈</div>
                <div class="fr">
                    <!-- <img src="../../assets/images/star_red.png" alt="" v-for="i in parseInt(data.score)" :key="i">
                    <img src="../../assets/images/star_gray.png" alt="" v-for="i in 5-parseInt(data.score)" :key="i"> -->
                    <img :src="i <= parseInt(data.feedback) ? starRed : starGray"
                      alt="" v-for="i in 5" :key="i"/>
                </div>
            </li>
            <li>
                <div class="fl">综合打分</div>
                <div class="fr">
                    <span class="mr29" v-for="(i, index) in 5" :key="i" @click="changeStar(index)">
                        <img :src="i <= currentIndex ? starRed : starGray"
                      alt="" />
                        <!-- <img src="../../assets/images/star_gray.png" alt="" v-show ="isGray">
                        <img src="../../assets/images/star_red.png" alt="" v-show="isRed"> -->
                    </span>
                </div>
            </li>
        </ul>
        
    </section>
    <div class="input-main" v-show="isShow" >
        <input type="text" value="" placeholder="请留下您的宝贵意见" v-model="suggest" >
       
        <div class="button">
            <div class="readBtn fl" @click="updateInput">保存</div>
            <div class="readBtn fr" @click="isShow = false">取消</div>
        </div>
    </div>
    <!-- 确认按钮 -->
    <div class="section_confirm">
        <ul>
            <li class="confirm"></li>
            <li class="save" @click="save('0')">评分</li>
        </ul>
    </div>
  </div>
</template>

<script>
import * as ReqUrl from '../../../config/ReqUrl'
import qs from 'qs'
import starGray from '../../assets/images/star_gray.png'
import starRed from '../../assets/images/star_red.png'
const parseForm = qs.stringify
function packup (data = {}) {
    return parseForm({
        info: JSON.stringify(data)
    })
}
export default {
    data(){
        return{
            productId: '',
            status: '',
            openId: '',
            userId: '',
            openId: '',
            historyId: localStorage.getItem('productId'),
            isShow: false,
            suggest: '',
            data: {},
            currentIndex: null,
            isRed: false,
            starGray: starGray,
            starRed: starRed,
            isGray: true,
            score: null,
            userType: ''
        }
    },
    created(){

        this.$wx.ready(function(){
            console.log('111')
        })
    },
    methods:{
        save(val){ //添加新增
            var that = this;
            let url = `${ReqUrl.add}`
            let data = {
                type_code: "t17",
                userId: that.userId,
                // applyPeople:"liuhuan", //申请人
                // applyTel: "15029770724",  //申请人电话
                prodId: that.productId, //第一次数据录入的时候没有id
                status: val,
                status: '0', //0保存 1完成
                data17: {
                    improve_tips: that.suggest,
                    score: that.score 
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
                if(res.data.code=='0000'){
                    this.$router.go(-1)
                } else {
                    alert(res.data.msg)
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        getData() {
            var that=this
            let url = `${ReqUrl.queryDetail}`
            let data = {
                type_code: "t17",
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
                if(res.data.code=='0000'){
                    this.data = res.data.data.data
                    this.suggest = res.data.data.data.improve_tips
                    this.currentIndex = res.data.data.data.score
                } else {
                }
                
            })
            .catch(error => {
                console.log(error)
            });
        },
        updateInput () {
            if(!this.suggest) {
                alert('请输入您的建议')
                return
            } else {
                this.isShow = false
            }
        },
        changeStar (index) {
            this.score = index+1
            if(index <= this.currentIndex) {
                this.currentIndex=index+1
            } if(index > this.currentIndex){
                this.currentIndex = index
            }
            
            this.isRed = true
        },
        showBox(){
            if(this.status == '1' || this.userType != 1)
            this.isShow = true
        }
    },
    created () {
        this.productId = this.$route.params.id
        // alert(this.productId)
        this.userType = localStorage.getItem('userType')
        this.status = this.$route.params.status
        this.userId = localStorage.getItem('userId')
        this.openId = sessionStorage.getItem('openId')
        this.getData()
    }
}
</script>

<style lang="less" scoped>
section{
    margin-bottom: 17px;
    ul{
        background: #fff;
        li{
            line-height: 90px;
            height: 90px;
            margin-left: 30px;
            border-bottom: 1px solid#C6C2C3;
            padding-right:29px;
            div:nth-of-type(1){
                color:#333333;
                font-size: 28px;
                // background: red;
            }
            div:nth-of-type(2){
                color: #666;
                font-size: 26px;
            }
            .arrow{
                float: right;
                line-height: 40px;
                width: 40px;
                height: 90px;
            }
            img{
                display: inline-block;
                width:50px;
                vertical-align: middle;
                margin-right:10px;
            }
        }
        li.itemHeight{
            height:117px;
        }
        li:nth-last-of-type(1){
            border-bottom:0;
        }
    }
}
.input-main{
    background:#F0F0F0;
    position: fixed;
    top:0;
    left:0;
    height:100vh;
    width:100vw;
    z-index: 999;
        input{
            height:102px;
            background:#fff;
            line-height:102px;
            width:90%;
            margin-top:20px;
            padding-left:10%;
        }
        .button{
            overflow: hidden;
            zoom:1;
            .readBtn{
                width: 50%;
                height: 82px;
                background: #D80E1C;
                text-align: center;
                color: #fff;
                font-size: 34px;
                line-height: 82px;
            }
            .readBtn:last-child{
                background:#ccc;
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
        .save{
            background: #D80E1C;
            color: #FFFFFF;
        }
    }
}
.mr29{
//   margin-right: 29px;
}
.stu_bgstar{
    width: 250px;
    height: 50px;
    float: left;
    margin-left:500px;
    /*background: url(../image/star.png);*/
    background-size: 50px 50px;
}
.stu_bgstar1{
    width: 50px;
    height: 50px;
    float: left;
    background: url('../../assets/images/star_gray.png');
    background-size: 50px 50px;
    margin-left: 0px;
}
.stu_bgstar3{
    background: url('../../assets/images/star_red.png');
    background-size: 50px 50px;
}
</style>
