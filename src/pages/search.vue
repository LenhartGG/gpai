<template>
<div>
    <div keepAlive>
      <!-- 顶部 -->
      <div class="top">
          <!-- 搜索 -->
          <div class="search">
              <button class="s_btn"></button>
              <input class="s_center" type="text" v-model="searchkey" name="searchcase" id="" placeholder="查找案件">     
          </div>

      </div>
      <!-- 标的展示 执行中 辅助机构 -->
      <div class="content" >
            <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                <ul class="items clearfix" v-show="LotList && name != ''">
                    <router-link :to="{name:'detail',params:{id:item.id,type:listType}}" v-for="(item,index) in LotList" :key="index" tag="li">
                        <div class="left ">
                            <div class="label" v-if="item.workingDays ">{{item.workingDays}}日</div>
                            <img :src="item.picUrl" alt="" v-show="item.picUrl">
                            <img src="../assets/images/error.png" alt="" v-show="!item.picUrl">
                        </div>
                        <div class="right ">
                            <p class="title">{{item.caseid}}</p>
                            <p class="address">{{item.name}}</p>
                            <template v-if="userType == 2 && listType == '0' || userType == 1">
                                    <i class="state" v-show="item.auctionStatus === '0'">前期调查中</i>
                                    <i class="state color1" v-show="item.auctionStatus === '9'">已完成</i>
                                    <i class="state color1" v-show="item.auctionStatus === '10'">前期调查完成</i>
                                    <i class="state color2" v-show="item.auctionStatus === '3'">已结算</i>
                            </template>

                            <p v-show="userType == 2 && listType == '1'" class="star">
                                <img
                                    :src="starRed"
                                    alt=""
                                    v-for="i in item.bonusPoints"
                                    :key="i" >
                            </p>
                            <p class="court">{{item.courtName}}</p>
                        </div>
                    </router-link>
                </ul>
            </v-loadmore>

            <div class="null" v-show="!LotList && name">暂无相关数据</div>

      </div>

    </div>
    <Tab></Tab>
</div>
</template>

<script>
import Tab from '../components/Tab.vue' //tab切换
import { Indicator,Toast,MessageBox,DatetimePicker,Loadmore  } from 'mint-ui'
import * as ReqUrl from '../../config/ReqUrl'
import qs from 'qs'
const parseForm = qs.stringify
function packup (data = {}) {
    return parseForm({
        info: JSON.stringify(data)
    })
}
export default {
    data(){
        return {
            timeout3: true, //3秒后取消提示
            courtFlag: true, //法院列表切换
            ut: '',
            openId: '',
            userId: '',
            userType: null, //1.辅助机构 2.法院 3.执行申请人 4.被执行人
            LotList: [],
            allLoaded: false,
            scrollMode:"auto",
            hasChange: false,
            currentPage: 1,
            listType: '',
            name: '',
            searchkey: '',
            historyType: ''
        }
    },
    watch: {
        listType: function(val){
            this.historyType = localStorage.setItem('status',val)
            this.hasChange = true
        },
        searchkey:function(val) {
            this.hasChange = true
            if(this.userType == 2) {
                // this.getCourtList()
                // this.courtFlag = true
            }
            if(this.userType == 1 || this.userType == 3) {
                if(!val) {
                    this.LotList = []
                    this.name = ''
                } else {
                    this.name = val
                }
                this.getLotList()
            }
            
        },
    },
    mounted() {
    },
    created(){
        var that = this
        this.listType = this.$route.params.status

        this.openId = sessionStorage.getItem('openId')
        this.timer = setInterval(
            function(){
                if(!that.openId) {
                    this.openId = sessionStorage.getItem('openId')
                }
            },1000
        )
        this.userId = localStorage.getItem('userId')
        this.userType = localStorage.getItem('userType')

        this.$wx.ready(function(){
            //alert('微信权限验证成功')

        })
    },
    methods:{
        loadTop:function() {
            //下拉加载
            // alert('下拉加载')
            this.$refs.loadmore.onTopLoaded();
        },
        loadBottom:function() {
            // 上拉加载
            // this.more();// 上拉触发的分页查询
            this.currentPage++
            //if(this.LotList.length<10) return
            this.getLotList()
            // this.$refs.loadmore.onBottomLoaded();
        },
        getLotList (val) {
            // 获得拍品列表
            var that=this
            let url = `${ReqUrl.list}`
            let data = {
                "queryType": that.listType || that.historyType,
                "name": that.name || '',
                "entrustDate": '',//委托日期
                "status":  '', //进行状态
                "courtid":'',//所属法院
                "auctionClass": '',//拍卖分类
                "productClass": '',//标的类型
                "closeDate":'',//结案日期
                "currentPage": that.currentPage,//开始条数
                "itemsPerPage": '10', //每页数据量
                "userId": that.userId,
                "bonusPoints":''
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
                        var data = res.data.data.listObj
                        if(data && data[0]) {
                            if(that.hasChange) {
                                that.LotList = data
                                that.hasChange = false
                            } else {
                                that.LotList = that.LotList.concat(data)
                                
                            }

                            if(data.length<10) {
                                this.allLoaded = true
                            } else {
                                this.allLoaded = false
                            }
                        } else {
                            that.LotList = null
                        }
                    } else {
                        alert(res.data.msg)
                    }
                    
                   
                    this.$nextTick(function () {
                        this.scrollMode = "touch"
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        },
        showKeyBorad(){//点击键盘搜索按钮事件
            this.$refs.showKeyBorad.blur();
        }


    },
    computed:{

    },
    components:{
        Tab,
        DatetimePicker,
        'v-loadmore':Loadmore
    }
}
</script>


<style lang="less" scoped>
.top{
    .search{
        .s_center{
            margin: 17px 28px;
            width: 90%;
            height: 63px;
            border-radius: 30px;
            background: #fff;
            text-indent: 81px;
            outline: 0;
            font-size: 30px;
            font-family: 'PingFang-SC-Regular';
            color: #999999;
        }
        .s_btn{
            height: 97px;
            width: 30px;
            position: absolute;
            left: 68px;
            background: url('../assets/images/ios_search.png') no-repeat  center center;
            background-size: 30px 28px;
            outline: 0;
            border: 0;
        }
    }
    .courtlist{
        position: fixed;
        top: 190px;
        bottom: 164px;
        overflow: auto;
        z-index: 120;
        width: 100%;
        height:77vh;
        background:#fff;
        .item{
            line-height:93px;
            border-bottom:#ccc solid 1px;
            color:#333;
            font-size:28px;
            padding-left:30px;
            padding-right:27px;
            span{
                font-size:26px;
                color:#676767;
                float:right;
            }
        }
        .null{
            text-align:center;
            line-height:100px;
            padding-bottom:20px;
            padding:40px 0;
        }
    }
}
.content{
    padding-top:15px;
    padding-bottom:200px;
    ul{
        li{
            display: flex;
            padding: 30px 31px 30px 28px;
            background: #fff;
            margin-bottom: 17px;
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
                    margin-bottom: 8px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    width: 61%;
                    min-width: 400px;
                }
                .address{
                    overflow: hidden;
                    // height: 63px;
                    // line-height: 33px;
                    font-size: 24px;
                    color: #666;
                    margin-bottom: 10px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;  //这里是在第二行有省略号
                    overflow: hidden;
                    width: 61%;
                    min-width:400px;
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
                .star{
                    img{
                        display: inline;
                        width:20px;
                    }
                }
            }
        }
    }
    .null{
        background:#fff;
        text-align:center;
        line-height:30px;
        padding:40px;
    }
}
</style>

