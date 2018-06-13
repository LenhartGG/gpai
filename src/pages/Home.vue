<template>
<div>
    <div keepAlive>
      <!-- 顶部 -->
      <div class="top">
          <!-- 头部 -->
          <div class="header">
              <div class="h_center clearfix">
                    <div class="title fl" :class="curTab === 'executing'?'tit_on':'' " @click="toggleTab('executing','0')">
                        <a href="#">执行中</a><p></p>
                        <div class="total"  :class="curTab === 'executing'?'cur':''">
                            <span v-show="userType == 1 || userType == 3">{{lotTotaling | total}}</span>
                            <span v-show="userType == 2">{{courtTotaling | total}}</span>
                        </div>
                    </div>
                    <div class="title fr" :class="curTab === 'execution'?'tit_on':''"  @click="toggleTab('execution','1')">
                        <a href="#">已完成</a><p></p>
                        <div class="total" :class="curTab === 'execution'?'cur':''">
                            <span v-show="userType == 1 || userType == 3">{{lotTotalend | total}}</span>
                            <span v-show="userType == 2">{{courtTotalend | total}}</span>
                        </div>
                    </div>
              </div>
          </div>
          <!-- 搜索 -->
          <div class="search" v-if="userType == 2">
              <button class="s_btn"></button>
              <input class="s_center" type="text" v-model="searchkey" name="searchcase" id="" placeholder="查找案件">     
          </div>
          <div class="search" v-if="userType != 2" @click="toSearch">
              <button class="s_btn"></button>
              <input class="s_center" type="text" v-model="searchkey" name="searchcase" id="" placeholder="查找案件">     
          </div>
          <!-- 法院列表 -->
          <div class="courtlist" v-show="userType == 2 && courtFlag" @click.self="courtFlag=false">
              <div
                @click="courtFlag=false,filterCourt(item.courtId)"
                v-for="item in courtList"
                :key="item.courtId"
                class="item"
                >
                  {{item.courtName}} <span>{{item.count}}件 <a href="javascript:void(0)" class="r_arrow"></a></span>
              </div>
              <div v-if="!courtList" class="null">暂无相关数据</div>
          </div>
          <!-- 添加案件 -->
          <div class="addcase" v-show="userType == 1">
              <router-link  :to="{path:'/detail/add'}" tag="a"><span>添加</span><br><span>案件</span></router-link>
          </div>
          <!-- 筛选 -->
          <div class="filter">
              <div class="f_title">
                  <ul class="clearfix">
                        <li @click="toggleFilter('date')"
                            :class="dateKey!=='' || endDate!==''?'cur':''">
                            <a href="javascript:void(0)" >
                                <template  v-if="listType && listType == '0'">委托日期</template>
                                <template  v-if="listType && listType == '1'">结案日期</template>
                                <i :class="dateKey!=='' || endDate!==''?'down1_h':'down1'" ></i>
                            </a>
                        </li>
                        <li @click="toggleFilter('auction')"
                            v-show="userType == 1 || userType == 3"
                            :class="courtKey !== ''?'cur':''">
                            <a href="#">法院
                                <i :class="courtKey !== ''?'down2_h':'down2'"></i>
                            </a>
                        </li>
                        <li @click="toggleFilter('dividingvalue')"
                            v-show="userType == 2 && listType == '1'"
                            :class="bonusPoints !== ''?'cur':''">
                            <a href="javascript:void(0)">分值
                                <i :class="bonusPoints !== ''?'down2_h':'down2'"></i>
                            </a>
                        </li>
                        <li @click="toggleFilter('type')"
                            :class="productKey !== ''?'cur':''" >
                            <a href="#">标的类型
                                <i :class="productKey !== ''?'down2_h':'down2'"></i>
                            </a>
                        </li>
                        <li @click="toggleFilter('state')"
                            v-show="listType == '0'"
                            :class="auctionKey!==''?'cur':''" >
                            <a href="#">进行状态
                                <i :class="auctionKey!==''?'down2_h':'down2'"></i>
                            </a>
                        </li>
                        <!-- 法院已完成 -->

                  </ul>
              </div>
          </div>
          <!-- 已筛选 -->
          <div class="Screening" >
              <div v-for="(item, index) in Screening" :key="index" @click="filterScreening(item.text,item.type)" v-show="Screening[0]">
                  {{item.text}}
                  <span  class="close">X</span>
              </div>
          </div>
          <!-- 筛选条件切换弹框 -->
          <!-- 标的类型 -->
          <div v-show="curFilter==='type'" class="f_type" @click.self="curFilter=''">
              <ul class="clearfix" v-if="productQuery">
                    <li v-for="(item,index) in productQuery.productClasss"
                        :key="item.key"
                        @click="productQueryChange(index,item)"
                        :class="productIndex===index?'cur':''">
                      <span>{{item.value}}</span>
                    </li>
              </ul>
          </div>
          <!-- 日期 -->
          <div v-show="curFilter === 'date'" class="f_date" @click.self="curFilter=''">
              <div class="main">
                  <div class="year">
                      <span class="left" @click="yearReduce"><img src="../assets/images/left.png" alt=""></span>
                      {{year}}年
                      <span class="right" @click="yearAdd"><img src="../assets/images/right.png" alt=""></span>
                  </div>
                  <div class="month">
                        <div>
                            <span
                                @click="getMonth(item.value,index)"
                                v-for="(item,index) in month"
                                :key="item.value"
                                :class="index === curMonthIndex?'cur':''">
                                {{item.value}}月
                            </span>
                        </div>
                  </div>
              </div>
          </div>
          <!-- 法院 -->
          <div v-show="curFilter==='auction'" class="f_auction clearfix" @click.self="curFilter=''">
              <!-- <div class="left fl">
                  <ul>
                      <li>上海</li>
                      <li>北京</li>
                      <li>天津</li>
                  </ul>
              </div> -->
              <div class="right ">
                  <ul v-if="productQuery">
                      <li v-for="(item,index) in productQuery.courts" :key="item.key" @click="filterCourt(item.key,item.value,index)">
                          {{item.value}}<span></span> 
                      </li>
                  </ul>
              </div>
          </div>
          <!-- 进行状态 -->
          <div v-show="curFilter ==='state'" class="f_state" @click.self="curFilter=''">
              <ul class="clearfix" v-if="productQuery">
                    <li v-for="(item, index) in productQuery.auctionStatuss"
                        :key="item.key"
                        @click="auctionChange(index,item)"
                        :class="auctionIndex === index?'cur':''">

                      <span>{{item.value}}</span>
                    </li>
              </ul>
          </div>
          <!-- 分值排序 -->
          <div v-show="curFilter === 'dividingvalue'" class="f_state" @click.self="curFilter=''">
              <ul class="clearfix" v-if="userType == 2">
                    <li
                        v-for="(item,index) in productQuery.bonusPoints"
                        :key="item"
                        @click="sortChange(index,item)"
                        :class="sortIndex === index?'cur':''">
                        <span class="star">
                          <img
                            :src="sortIndex === index? starWhite  : starRed "
                            alt=""
                            v-for="i in item"
                            width="20"
                            :key="i" >
                        </span>
                    </li>
              </ul>
          </div>

      </div>
      <!-- 标的展示 执行中 辅助机构 -->
      <div class="content" >
            <v-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                <ul class="items clearfix" v-show="LotList">
                    <router-link :to="{name:'detail',params:{id:item.id,type:listType}}" v-for="(item,index) in LotList" :key="index" tag="li">
                        <div class="left ">
                            <div class="label" v-if="item.workingDays != null">{{item.workingDays}}日</div>
                            <img :src="item.picUrl" alt="" v-show="item.picUrl">
                            <img src="../assets/images/error.png" alt="" v-show="!item.picUrl">
                        </div>
                        <div class="right ">
                            <p class="title">{{item.caseid}}</p>
                            <p class="address">{{item.name}}</p>
                            <template v-if="listType == '0'">
                                    <i class="state" v-show="item.auctionStatus === '0'">前期调查中</i>
                                    <i class="state color1" v-show="item.auctionStatus === '9'">已完成</i>
                                    <i class="state color1" v-show="item.auctionStatus === '10'">前期调查完成</i>
                                    <i class="state color2" v-show="item.auctionStatus === '3'">已结算</i>
                            </template>

                            <p v-show="listType == '1'" class="star">
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

            <div class="null" v-show="!LotList">暂无相关数据</div>

      </div>

      <!-- 当前用户 -->
      <div class="curuser" v-if="timeout3 && userType == 1">
          当前用户：<span>{{userData.organName}}</span>&nbsp;&nbsp;<span>{{userData.name}}</span>
      </div>
      <div class="curuser" v-if="timeout3 && userType == 2">
          当前用户：<span>{{userData.courtName}}</span>&nbsp;&nbsp;<span>{{userData.name}}</span>
      </div>
    </div>
    <Tab></Tab>
</div>
</template>

<script>
import Tab from '../components/Tab.vue' //tab切换
import { Indicator,Toast,MessageBox,DatetimePicker,Loadmore  } from 'mint-ui';
import starRed from '../assets/images/star_red.png'
import starWhite from '../assets/images/star-white.png'
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
            curTab: 'executing', //执行中和已完成
            curFilter: '', //筛选条件
            timeout3: true, //3秒后取消提示
            courtFlag: true, //法院列表切换
            year: 2018,
            curYear: new Date().getFullYear(),
            ut: '',
            openId: '',
            userId: '',
            userType: null, //1.辅助机构 2.法院 3.执行申请人 4.被执行人
            LotList: [],
            productQuery: {}, //拍品筛选条件列表
            auctionIndex: null,
            productIndex: null,
            sortIndex:null,
            courtIndex:null,
            auctionKey: '',//当前拍卖状态
            productKey: '',//标的类型当前分类
            courtKey: '',//当前法院分类
            sortKey:'',//分值排序
            month: [
                {value:'1'},
                {value:'2'},
                {value:'3'},
                {value:'4'},
                {value:'5'},
                {value:'6'},
                {value:'7'},
                {value:'8'},
                {value:'9'},
                {value:'10'},
                {value:'11'},
                {value:'12'}
            ],
            curMonthIndex: '',
            dateKey: '',
            endDate: '',
            listType: '0',
            courtList: [],
            searchkey: '',
            starRed: starRed,
            starWhite: starWhite,
            Screening: [],
            bonusPoints: '',
            oldType:'',
            name: '',
            courtTotaling: null,
            courtTotalend: null,
            lotTotaling: null,
            lotTotalend: null,
            timer: '',
            allLoaded: false,
            scrollMode:"auto",
            hasChange: false,
            currentPage: 1,
            userData:{}
        }
    },
    watch: {
        year:function(){
            this.getLotList()
        },
        listType: function(){
            this.hasChange = true
            if(this.userType == 2) {
                this.courtFlag = true
            }
        },
        searchkey:function(val) {
            this.hasChange = true
            if(this.userType == 2) {
                this.getCourtList()
                this.courtFlag = true
            }
            if(this.userType == 1 || this.userType == 3) {
                this.name = val
                this.getLotList()
            }


        },
        openId (val) {
            if(val) {
                if(this.userType != 2) {
                    this.getCourtData() //拍品列表筛选
                    this.getLotList() // 拍品列表
                } else {
                    this.getCourtList() //法院身份发法院列表
                }
                clearInterval(this.timer)
            }
        }
    },
    mounted() {
    },
    created(){
        this.base.getWxOpenid()
        var that = this
        this.timeout();
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
        if(this.openId) {
            // openId存在请求数据 

        }

        this.$wx.ready(function(){
            //alert('微信权限验证成功')

        })
        this.getUserData()
    },
    methods:{
        toSearch () {
            this.$router.push({
                name:'search',
                params:{
                    status:this.listType
                }
            })
        },
        loadBottom:function() {
            // 上拉加载
            // this.more();// 上拉触发的分页查询
            this.currentPage++
            //if(this.LotList.length<10) return
            this.getLotList()
            this.$refs.loadmore.onBottomLoaded();
        },
        toggleTab(tab,type){
            //执行中和已完成tab切换
            this.Screening = []
            var that = this
            this.curTab = tab
            this.listType = type
            this.curFilter = ''
            this.currentPage = 1
            if(this.userType == 1 || this.userType == 3) {
                this.getCourtData()
                this.getLotList()
            } else {
                this.getCourtList()
            }

        },
        toggleFilter(tab){
            if(this.curFilter === tab) {
                this.curFilter = ''
                return
            }
            this.curFilter = tab;
        },
        timeout(){
            setTimeout(()=>{
                this.timeout3 = false;
            },3000)
        },
        yearReduce () {
            this.year--
        },
        yearAdd () {
            if(this.year === this.curYear) {
                return
            }
            this.year++
        },
        getCourtData () {
            //获得拍品列表筛选分类
            var that = this
            let url = `${ReqUrl.productQueryParams}`
            // let url = 'http:192.168.199.195:9091/NAMS_mobile/product/productQueryParams.do'
                let data = {
                    "queryType": that.listType || '0',
                    "userId": that.userId,
                    "courtid": this.courtKey || ""
                }
                that.$http.post(
                        url,
                        packup(data),
                        {
                            headers:{openId : that.openId}
                        }
                    )
                    .then(res => {
                        if(res.data.code == '0000'){

                        } else {
                            alert(res.data.msg)
                        }
                        that.productQuery = res.data.data
                    })
                    .catch(error => {
                        console.log(error);
                    });
        },
        getLotList (val) {
            // 获得拍品列表
            var that=this
            let url = `${ReqUrl.list}`
            let data = {
                "queryType": that.listType || '0',
                "name": that.name || '',
                "entrustDate":that.dateKey || '',//委托日期
                "status": that.auctionKey || '', //进行状态
                "courtid": that.courtKey || '',//所属法院
                "auctionClass": '',//拍卖分类
                "productClass": that.productKey || '',//标的类型
                "closeDate":that.endDate || '',//结案日期
                "currentPage": that.currentPage,//开始条数
                "itemsPerPage": '10', //每页数据量
                "userId": that.userId,
                "bonusPoints": that.bonusPoints || ''
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
                    if(that.listType === '0') {
                        that.lotTotaling = res.data.data.total
                        that.lotTotalend = res.data.data.total_1
                    } else{
                        that.lotTotalend = res.data.data.total
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getCourtList () {
            // 法院列表
            var that=this
            let url = `${ReqUrl.listByCourt}`
                let data = {
                    "queryType": that.listType || '0',
                    "courtName": that.searchkey,
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
                        if(res.data.code == '0000'){
                            that.courtList = res.data.data.listObj
                            that.hasChange = true
                            if(that.hasChange){
                                that.getLotList()
                            }
                            this.getCourtData()
                            if(that.listType === '0') {
                                that.courtTotaling = res.data.data.total
                            } else{
                                that.courtTotalend = res.data.data.total
                            }
                         } else {
                             alert(res.data.msg)
                         }
                        
                    })
                    .catch(error => {
                        console.log(error);
                    });
        },
        auctionChange (index,item) {
            //进行状态
            this.curFilter = ''
            this.hasChange = true
            this.currentPage = 1
            if(this.auctionIndex === index) {
                //删除Screening数组中重复的数据
                this.filterScreening(item.value)
                this.auctionIndex = null
                this.auctionKey = ''
                this.getLotList()
                return
            }
            this.auctionIndex = index
            if(item.code == '-1') {
                this.auctionKey = ''
            }else if(item.code == 0) {
                this.auctionKey = '0'
            } else {
                this.auctionKey = item.code
            }
            this.getLotList()
            // this.Screening.push(item.value)
            this.mapScreening(item.value,'进行状态')
            
        },
        productQueryChange (index,item) {
            // 标的类型
            this.hasChange = true
            this.currentPage = 1
            this.curFilter = ''
            if (this.productIndex === index) {
                this.filterScreening(item.value)
                this.productIndex = null
                this.productKey = ''
                this.getLotList()
                return
            }
            this.productIndex=index
            if(item.key == '0') {
                this.productKey = ''
            } else {
                this.productKey = item.key
            }
            // this.Screening.push(item.value)
            this.mapScreening(item.value,'标的类型')
            this.getLotList()
        },
        getMonth (val,index) {
            // 日期筛选
            this.curFilter = ''
            var that = this
            this.hasChange = true
            this.currentPage = 1
            if(that.curMonthIndex === index) {
                that.curMonthIndex = null
                if(that.listType === '0') {
                    this.filterScreening(that.dateKey)
                    that.dateKey = ''
                } else {
                    this.filterScreening(that.endDate)
                    that.endDate = ''
                }
                this.getLotList()
                return
            }
            this.curMonthIndex = index
            var value = val
            if(val < 10) {
                value = '0' + val
            }
            if(that.listType === '0') {
                that.dateKey = that.year + '-' + value
                this.mapScreening(that.dateKey,'日期筛选')
                that.getLotList()
            }
            if(that.listType === '1') {
                that.endDate = that.year + '-' + value
                this.mapScreening(that.endDate,'日期筛选')
                that.getLotList()
            }

        },
        filterCourt (id,value,index) {
            this.curFilter = ''
            this.currentPage = 1
            var that = this
            if (this.userType == 2) {
                this.hasChange = true
                this.courtKey = id
                this.getCourtData()
                this.getLotList()
            }
            // 当身份为辅助机构时
            
            if(this.userType == 1 || this.userType == 3) {
                if(this.courtIndex === index) {
                    this.filterScreening(value)
                    this.courtIndex = null
                    this.hasChange = true
                    this.courtKey = ''
                    this.getLotList()
                } else {
                    this.courtIndex = index
                    this.courtKey = id
                    this.hasChange = true
                    this.mapScreening(value,'法院')
                    this.getLotList()
                }
                
            }
            // this.$router.push({name:'chooseCourt',params:{pagePath:'/home'}})
        },
        sortChange(index,item) {
            this.curFilter = ''
            //分值排序筛选
            this.hasChange = true
            this.currentPage = 1
            if(this.sortIndex === index) {
                // this.filterScreening(item)
                this.sortIndex = null
                this.bonusPoints = ''
                this.getLotList()
                return
            }
            this.sortIndex = index
            this.bonusPoints = item
            // this.Screening.push(this.sortKey)
            // this.mapScreening(item.value,'分值排序')
            this.getLotList()
        },
        filterScreening(val,type) {
            this.currentPage = 1
            // this.hasChange = true
            var that = this
            this.Screening.filter((item,index) => {
                if(item.text == val) {
                    this.hasChange = true
                    that.Screening.splice(index,1)
                }
            })
            if(type == '进行状态') {
                this.auctionIndex = null
                this.auctionKey = ''
                
                this.getLotList()
            }
            if(type == '标的类型') {
                this.productIndex = null
                this.productKey = ''
                this.getLotList()
            }
            if(type == '法院') {
                this.courtIndex = null
                this.courtKey = ''
                this.getLotList()
            }
            if(type == '日期筛选') {
                this.curMonthIndex = null
                if(this.listType == '0') {
                    
                    this.dateKey = ''
                    this.getLotList()
                } else {
                    this.endDate = ''
                    this.getLotList()
                }
            }
            // if(type== '分值排序') {
            //     this.bonusPoints = ''
            //     this.getLotList()
            // }
        },
        mapScreening (value,type) {
            this.Screening.filter((item,index) => {
                if(item.type === type) {
                    this.Screening.splice(index,1)
                }
            })
            this.oldType = type
            var data = {
                text:value,
                type:type
            }
            this.Screening.push(data)
            
            console.log(this.Screening)

            // this.Screening = this.Screening.map(item=>{
            //     return {
            //         text: value,
            //         type: type
            //     }
            // })
        },
        getUserData(){
            var that = this
            let url = `${ReqUrl.userInfo}`
            let data = {

            }
            that.$http.post(
                url,
                packup(data),
                {
                    headers:{openId : sessionStorage.openId}
                }
            )
            .then(res => {
                console.log(res)
                this.userData=res.data.data
                this.userType = userData.type
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
    filters: {
        total:val=>{
            if(val > 99) {
                return '99'+ '+'
            } else {
                return val
            }
        }
    },
    components:{
        Tab,
        DatetimePicker,
        'v-loadmore':Loadmore
    }
}
</script>


<style lang="less" scoped>
.mint-loadmore{
    // overflow-x: hidden;
    // overflow-y:auto;
}
.top{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    .header{
        height: 91px;
        font-size: 36px;
        background: #fff;
        .h_center{
            width: 400px;
            margin: 0 auto;
            .title{
                height: 91px;
                width: 153px;
                line-height: 110px;
                // background: green;
                position:relative;
                a{
                    text-align: center;
                    display: block;
                    height: 82px;
                    font-family: 'PingFang-SC-Medium';
                }
                p{
                    height: 9px;
                    border-radius: 2px;
                }
                .total{
                    position:absolute;
                    top:-10px;
                    right:-10px;
                    color:#666;
                    font-size:17px;
                }
                .total.cur{
                    color:#D80E1C;
                }
            }
            .tit_on{
                a{
                    color:RGB(216,14,28);
                }
                p{
                    background: #D80E1C;
                }
            }
            .star{
                img{
                    display: inline;
                    width: 20px;
                }
            }
        }
    }
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
    .filter{
        background: #fff;
        border-bottom: 1px solid #f0f0f0;
        .f_title{
            line-height: 83px;
            text-align: center;
            ul{
                li{
                    height: 83px;
                    float: left;
                    width: 25%;
                    color: #666666;
                    a{
                        display: inline-block;
                        width: 100%;
                        font-size: 28px;
                        i{
                            display: inline-block;
                            width: 17px;
                            height: 10px;
                            margin: 5px 0 0 10px;
                            // background: url('../assets/images/ios_down.png') no-repeat;
                        }
                        .down1 {
                            background: url('../assets/images/ios_down.png') no-repeat;
                            background-size: contain;
                        }
                        .down2 {
                            background: url('../assets/images/ios_down2.png') no-repeat;
                            background-size: contain;
                        }
                        .down1_h {
                            background: url('../assets/images/down1_h.png') no-repeat;
                            background-size: contain;
                        }
                        .down2_h {
                            background: url('../assets/images/down2_h.png') no-repeat;
                            background-size: contain;
                        }
                    }
                }
                li.cur{
                    a{
                        color:#D80E1C;
                    }
                    .down1_h {
                        background: url('../assets/images/down1_h.png') no-repeat;
                        background-size: contain;
                    }
                    .down2_h {
                        background: url('../assets/images/down2_h.png') no-repeat;
                        background-size: contain;
                    }
                }
            }
        }
    }
}
.Screening{
    padding:17px;
    background:#fff;
    div{
        display:inline-block;
        position:relative;
        margin-right:40px;
        span{
            position: absolute;
            top:-3px;
            right:-30px;
            font-size:16px;
            display:inline-block;
            width:24px;
            height:24px;
            border-radius:50%;
            background:#D80E1C;
            text-align:center;
            line-height: 24px;
            color:#fff;
        }

    }
}
.f_type{
    position: fixed;
    top: 272px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    ul{
        background: #fff;
        color: #333;
        padding: 20px 0 0 29px;
        li{
            float: left;
            width: 21%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 62px;
            line-height: 62px;
            text-align: center;
            color: #333333;
            background: #DDDDDD;
            margin-right: 28px;
            margin-bottom: 18px;
            span{
                display: inline-block;
            }
        }
        li.cur{
            background:#D80E1C;
            color:#fff;
        }
    }
}
.f_auction{
    position: fixed;
    top: 272px;
    left: 0;
    right: 0;
    bottom: 0;
    .left{
        width: 25%;
        height: 100%;
        background: #A2A2A2;
        overflow: auto;
        ul{
            li{
                height: 92px;
                line-height: 92px;
                font-size: 28px;
                color: #333;
                text-indent: 30px;
            }
        }
    }
    .right{
        // width: 75%;
        width: 100%;
        background: #fff;
        height: 100%;
        overflow: auto;
        ul{
            padding-left: 20px;
            li{
                height: 92px;
                line-height: 92px;
                border-bottom: 1px solid #c7c5c5;
                text-indent: 20px;
                span{
                    float: right;
                    margin-right: 30px;
                }
            }
        }
    }
}
.f_date{
    position: fixed;
    top: 272px;
    left: 0;
    right: 0;
    bottom: 0;
    background:rgba(0, 0, 0, 0.2);
    .main{
        height:303px;
        background:#fff;
        color:#333;
        font-weight:bold;
        .year{
            line-height:80px;
            text-align:center;
            margin-bottom:20px;
            font-size: 32px;
            margin:0 28px;
            position:relative;
            .left{
                float:left;
            }
            .right{
                float:right;
            }
            img{
                display: inline-block;
                margin-top:10px;
                width:20px;
            }
        }
        .month{
            div{
                width:100%;
                span{
                    display:inline-block;
                    width:25%;
                    text-align:center;
                    font-size:28px;
                    line-height:60px;
                }
                span.cur{
                    color:#D80E1C;
                }
            }
        }
    }
}
.f_state{
    position: fixed;
    top: 272px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    ul{
        background: #fff;
        color: #333;
        padding: 20px 0 0 29px;
        li{
            float: left;
            width: 21%;
            height: 62px;
            line-height: 62px;
            text-align: center;
            color: #333333;
            background: #DDDDDD;
            margin-right: 28px;
            margin-bottom: 18px;
            span{
                display: inline-block;
                img{
                    width:20px;
                    display:inline;
                    margin-right:1px;
                }
            }
        }
        li.cur{
            background:#D80E1C;
            color:#fff;
        }
    }
}
.content{
    position: fixed;
    z-index: 99;
    top: 310px;
    left: 0;
    right: 0;
    bottom: 101px;
    overflow: auto;
    padding-top:15px;
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
                    min-height:76px;
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
.addcase{
    position: fixed;
    z-index: 100;
    right: 29px;
    bottom: 167px;
    width: 99px;
    height: 99px;
    border-radius: 50%;
    background: #D80E1C;
    overflow: hidden;
    text-align:center;
    a{
        display: inline-block;
        width: 99px;
        height: 99px;
        font-size: 24px;
        color: #fff;
        padding-top: 10px;
        span{
            line-height: 40px;
            display: inline-block;
        }
    }
}
.curuser{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 100px;
    z-index: 100;
    text-align: center;
    height: 53px;
    line-height: 53px;
    background: rgba(50,46,46,0.9019607843137255);
    color: #ffffff;
}
</style>

