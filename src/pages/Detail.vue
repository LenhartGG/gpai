<template>
    <div class="detail" v-show="detailData">
        <div class="top">
            <li v-if="detailData.product">
                <div class="left ">
                    <div class="label" v-if="detailData.product.workingDays">{{detailData.product.workingDays}}日</div>
                    <img :src="imgUrl[0]" alt="" v-show="detailData.product.picUrl">
                    <img src="../assets/images/error.png" alt="" v-show="!detailData.product.picUrl">
                </div>
                <div class="right">
                    <p class="title">{{detailData.product.caseid}}</p>
                    <p class="address">{{detailData.product.name}}</p>
                    <i class="state" v-show="detailData.product.auctionStatus === '0'">前期调查中</i>
                    <i class="state color1" v-show="detailData.product.auctionStatus === '9'">前期调查完成</i>
                    <i class="state color2" v-show="detailData.product.auctionStatus === '3'">已结算</i>
                    <p class="court">{{detailData.product.courtName}}</p>
                </div>
            </li>
        </div>
        <div class="center">
            <ul class="clearfix" v-if="detailData.productTypes">
                <div  v-for="item in detailData.productTypes" :key="item.id" @click="toDetail(item.typeCode,item.status)">
                    <img :src="item.icon" alt="">
                    <span>{{item.name}}</span>
                </div>
            </ul>
        </div>
        <div class="server">
            <div class="s_tit">服务轨迹</div>
            <div class="s_con">
                <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                    <table>
                        <tr
                            v-for="item in messageData"
                            :key="item.id"
                            @click="toMessageDetail(item.id)"
                            :style="item.eventType == '2'?'color:#D80E1C':''">
                            <td>{{item.createTime}}</td>
                            <td>{{item.eventName}} {{item.content}}</td>
                            <td>{{item.createUserName}}</td>
                        </tr>
                    </table>
                </mt-loadmore>
                
            </div>
            <!-- <div class="s_tip">上滑可加载更多</div> -->
        </div>
    </div>
</template>
<script>
import Tab from '../components/Tab.vue' //tab切换
import * as ReqUrl from '../../config/ReqUrl'
import { Toast,DatetimePicker,MessageBox,Loadmore } from 'mint-ui'
import qs from 'qs'
const parseForm = qs.stringify
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y+M+D+h+m+s;
}
function packup (data = {}) {
    return parseForm({
        info: JSON.stringify(data)
    })
}
    export default {
        name: "Detail",
        data () {
            return {
                productId: '',
                openId: '',
                userId: '',
                detailData: {},
                messageData: [],
                listType:'',
                historyId: localStorage.getItem('productId') || '',
                historyType: localStorage.getItem('listType') || '',
                imgUrl : [],
                currentPage: 1,
                allLoaded: false,
                scrollMode:"auto",
            }
        },
        filters: {
            Time:val=>{
                return timestampToTime(val)
            }
        },
        methods: {
            loadBottom:function() {
                // 上拉加载
                this.currentPage++
                this.getMessage()
                // this.$refs.loadmore.onBottomLoaded();/
            },
            getDetailData () {
                // 获取详情信息
                var that=this
                let url = `${ReqUrl.productDetail}`
                    let data = {
                        "prodId": that.productId || that.historyId,
                        "userId": that.userId,
                        "queryType": that.listType || that.historyType
                    }
                    that.$http.post(
                            url,
                            packup(data),
                            {
                                headers:{openId : that.openId}
                            }
                        )
                        .then(res => {
                            this.detailData = res.data.data
                            if(res.data.data.product.picUrl) {
                                this.imgUrl = res.data.data.product.picUrl.split(',')
                                console.log(this.imgUrl)
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
            },
            getMessage () {
                //消息服务轨迹
                var that=this
                let url = `${ReqUrl.messageQuery}`
                    let data = {
                        "prodId": that.productId ||  that.historyId,
                        "currentPage":that.currentPage,
                        "itemsPerPage":5,
                        "userId": that.userId
                    }
                    that.$http.post(
                            url,
                            packup(data),
                            {
                                headers:{openId : that.openId}
                            }
                        )
                        .then(res => {
                            if(res.data.code == '0000') {
                                if(data.length<5) {
                                    this.allLoaded = true
                                } else {
                                    this.allLoaded = false
                                }
                            }
                            this.messageData = this.messageData.concat(res.data.data)
                            console.log(this.messageData)
                        })
                        .catch(error => {
                            console.log(error);
                        });
            },
            toDetail (id,type) {
                var that = this
                //十六项详情跳转
                if (id === 't01') {
                    //基本信息
                    this.$router.push({path: '/detail/info', query: {typeId: 't01', status: type}})
                }
                if (id === 't02') {
                    //处置凭证
                    this.$router.push({path: '/detail/voucher', query: {typeId: 't02', status: type}})
                }
                if (id === 't03') {
                    //评估报告
                    this.$router.push({path: '/detail/report', query: {typeId: 't03', status: type}})
                }
                if (id === 't04') {
                    let productClass = that.detailData.product.productClass;
                    // alert(productClass)
                    //权属调查
                    if(productClass == 1 || this.productClass == 13){// 1  机动车 13   其他交通工具
                      this.$router.push({path: '/detail/ownership_car', query: {typeId: 't04', status: type}})
                    }
                    if(productClass == 2){// 房地产
                      this.$router.push({path: '/detail/ownership', query: {typeId: 't04', status: type}})
                    }
                    if(productClass == 3){// 3  股权
                      this.$router.push({path: '/detail/ownership_stock', query: {typeId: 't04', status: type}})
                    }
                    if(productClass == 5){// 5  土地
                      this.$router.push({path: '/detail/ownership_ground', query: {typeId: 't04', status: type}})
                    }
                    if(productClass == 9){ // 9船舶
                      this.$router.push({path: '/detail/ownership_ship', query: {typeId: 't04', status: type}})
                    }
                    if(productClass == 6 ||
                      productClass == 4 ||
                      productClass == 10 ||
                      productClass == 12 ||
                      productClass == 11 ||
                      productClass == 8 ||
                      productClass == 6
                    ) {
                      // 10 无形资产/ 4 债权/ 6 林权/ 12 工程/ 11 其他财产/ 8 机械设备/ 7 矿权
                      this.$router.push({path: '/detail/ownership_invisible', query: {typeId: 't04', status: type}})
                    }
                }
                if (id === 't05') {
                    //实地勘察
                    this.$router.push({
                        name:'fieldinvestigation',
                        params:{
                            id: that.productId || that.historyId,
                            status:type,
                            productType:that.detailData.product.productClass
                        }
                    })
                }
                if (id === 't06') {
                    //价格建议
                    this.$router.push({path:'/detail/pricesuggestion',query:{typeId:'t06'}})
                    sessionStorage.addyxqPersonState=type
                }
                if (id === 't07') {
                    //优先权人
                    this.$router.push({path:'/detail/priorityperson',query:{typeId:'t07'}})
                    sessionStorage.addyxqPersonState=type
                }
                if (id === 't08') {
                    //拍卖文案
                    this.$router.push({path:'/detail/auctiondoc',query:{typeId:'t08'}})
                    sessionStorage.isOk=type
                }
                if (id === 't09') {
                    //看样服务
                    this.$router.push({
                        name:'sampleservice',
                        params:{
                            id: that.productId || that.historyId,
                            status:type
                        }
                    })
                }
                if (id === 't10') {
                    //登记服务
                    this.$router.push({path:'/detail/registrationservices',query:{typeId:'t10'}})
                    sessionStorage.isOk=type
                }
                if (id === 't11') {
                    //网拍纪录
                    this.$router.push({
                        name:'racketrecord',
                        params:{
                            id: that.productId || that.historyId,
                            status:type
                        }
                    })
                }
                if (id === 't12') {
                    //拍后续结款
                    this.$router.push({
                        name:'afterpat',
                        params:{
                            id: that.productId || that.historyId,
                            status:type
                        }
                    })
                }
                if (id === 't13') {
                    //财产交割
                    this.$router.push({
                        name:'propertydelivery',
                        params:{
                            id: that.productId || that.historyId,
                            status:type
                        }
                    })
                }
                if (id === 't14') {
                    //用户回访
                    this.$router.push('/detail/uservisit')
                }
                if (id === 't15') {
                    //费用结算
                    this.$router.push({
                        name:'costsettlement',
                        params:{
                            id: that.productId || that.historyId,
                            status:type
                        }
                    })
                }
                if (id === 't16') {
                    //结案入档
                    var count = 0
                    that.detailData.productTypes.forEach(item => {
                        if(item.typeCode != 't16' && item.status == '1')  {
                            count++
                        }
                       
                        return
                    })
                    console.log(count)
                    if(count == 15) {
                        that.$router.push({
                            name:'finishedfile',
                            params:{
                                id: that.productId || that.historyId,
                                date:that.detailData.product.workingDays,
                                status:type
                            }
                        })
                    } else {
                        Toast('请完善前十五项信息')
                    }
                    
                    
                }
                if (id === 't17') {
                    //评分反馈
                    this.$router.push({
                        name: 'scorefeedback',
                        params:{
                            id: that.productId || that.historyId,
                            status:type
                        }
                    })
                }

            },
            toMessageDetail(id){
                this.$router.push({path: '/detail/msgDetail',query:{id:id}})
            }
        },
        computed: {
        },
        created: function () {
            this.productId = this.$route.params.id
            this.listType = this.$route.params.type
            if(this.productId) {
                localStorage.setItem('productId',this.productId)
            }
            if(this.listType) {
                localStorage.setItem('listType',this.listType)
            }
            console.log(this.productId)
            this.userId = localStorage.getItem('userId')
            this.openId = sessionStorage.getItem('openId')
            if ((this.productId && this.openId && this.listType)||(this.historyId &&  this.openId && this.historyType)) {
                this.getDetailData()
                this.getMessage()
            }

        },
        components:{
            'v-loadmore':Loadmore
        }
    }
</script>
<style lang="less" scoped>
.detail{
    // position: fixed;
    // top: 0;
    // left: 0;
    // right: 0;
    // bottom: 0;
    .top{
        margin-bottom: 7px;
        li{
            display: flex;
            padding: 30px 31px 30px 28px;
            background: #fff;
            margin-bottom: 17px;
            overflow: hidden;
            zoom:1;
            .left{
                position: relative;
                background: #ccc;
                img{
                    width: 283px;
                    height: 203px;
                }
                .label{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 103px;
                    height: 43px;
                    line-height: 43px;
                    background: #D80E1C;
                    font-size: 24px;
                    text-align: center;
                    color: #fff;
                }
            }
            .right{
                margin-left: 29px;
                // width: 379px;
                height: 203px;
                // overflow: hidden;
                .title{
                    // height: 27px;
                    // line-height: 27px;
                    font-size: 28px;
                    color: #333333;
                    margin-bottom: 10px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    width: 61%;
                    min-width: 400px;
                }
                .address{
                    // height: 63px;
                    // line-height: 33px;
                    font-size: 26px;
                    color: #666;
                    margin-bottom: 10px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;  //这里是在第二行有省略号
                    overflow: hidden;
                    min-height:76px;
                    width: 61%;
                    min-width: 400px;
                }
                .state{
                    display: inline-block;
                    width: 153px;
                    height: 33px;
                    line-height: 33px;
                    text-align: center;
                    border: 1px solid #16BE16;
                    color: #16BE16;
                    margin-bottom: 18px;
                    font-size: 20px;
                }
                .state.color1{
                    color:#F46212;
                    border:#F46212 solid 1px;
                }
                .state.color2{
                    color:#333333;
                    border:#333333 solid 1px;
                }
                .court{
                    height: 22px;
                    line-height: 22px;
                    font-size: 22px;
                    color: #999;
                }
            }
        }
    }
    .center{
        background: #fff;
        margin-bottom: 7px;
        padding-top: 30px;
        ul{
            div{
                float: left;
                width: 25%;
                text-align: center;
                img{
                    margin-top: 30px;
                    width: 55px;
                    height: 55px;
                    margin: 0 auto;
                    margin-bottom: 19px;
                }
                span{
                    display: block;
                    margin-bottom: 30px;
                }
            }
        }
    }
    .server{
        position: relative;
        .s_tit{
            background: #FFFFFF;
            height: 83px;
            line-height: 83px;
            color: #000000;
            font-size: 30px;
            text-indent: 30px;
            border-bottom: 1px solid #f0f0f0;
        }
        .s_con{
            // height: 300px;
            background:#FFFFFF;
            padding: 20px 29px 20px 28px;
            // overflow: auto;
            table{
                width:100%;
                tr{
                    td{
                        height: 63px;
                        line-height: 63px;
                        margin-right: 2px;
                        margin-bottom: 2px;
                        background: #f0f0f0;
                        text-align: center;
                    }
                }
            }
        }
        .s_tip{
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 52px;
            line-height: 52px;
            font-size: 24px;
            text-align: center;
            color:#FFFFFF;
            background: rgb(50, 45, 46);
            opacity:0.9019607843137255;
        }
    }
}
</style>
