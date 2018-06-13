<template>
    <div class="main">
        <div class="list">
            <div class="item" @click="selectChange($event,'auction')">
                <div class="fl">拍卖次数</div>
                <div class="time fr">
                    {{auctionSelect}} 
                    <span  v-if="status !== '1' && userType == 1">></span>
                </div>
            </div>
            <div class="item" @click="selectChange($event,'state')">
                <div class="fl">拍卖状态</div>
                <div class="time fr">
                    {{stateSelect}} 
                    <span  v-if="status !== '1' && userType == 1">></span>
                </div>
            </div>
            <div class="item" @click="showBox('price')">
                <div class="fl">成交价格</div>
                <div class="time fr">
                    <span v-if="textPrice" class="textOver">{{textPrice}}元</span>
                    <span  v-if="status !== '1' && userType == 1">></span>
                </div>
            </div>
        </div>
        <div class="list">
            <div class="item" @click="openPicker('picker')">
                <div class="fl">开始时间</div>
                <div class="time fr">
                    {{startTime}}
                    <span  v-if="status !== '1' && userType == 1">></span>
                </div>
            </div>
            <div class="item" @click="openPicker('picker2')">
                <div class="fl">结束时间</div>
                <div class="time fr">
                    {{endTime}}
                    <span  v-if="status !== '1' && userType == 1">></span>
                </div>
            </div>
            <div class="item" @click="showBox('people')">
                <div class="fl">竞买人数</div>
                <div class="time fr">
                    <span class="textOver">{{textPeople}}</span>
                    <span  v-if="status !== '1' && userType == 1">></span>
                </div>
            </div>
            <div class="item" @click="detail">
                <div class="fl">竞买纪录</div>
                <div class="time fr" >
                      >
                </div>
            </div>
        </div>
        <div class="list">
            <div class="item" @click="showBox('name')">
                <div class="fl">买受人</div>
                <div class="time fr">
                    <span class="textOver">{{textName}}</span>
                    <span  v-if="status !== '1' && userType == 1">></span>
                </div>
            </div>
            <div class="item" @click="showBox('bidders')">
                <div class="fl">竞买号</div>
                <div class="time fr">
                    <span class="textOver">{{textBidders}}</span>
                    <span  v-if="status !== '1' && userType == 1">></span>
                </div>
            </div>
            <div class="item" @click="showBox('platform')">
                <div class="fl">拍卖平台</div>
                <div class="time fr">
                    <span class="textOver">{{textPlatform}} </span>
                    <span  v-if="status !== '1' && userType == 1">></span>
                </div>
            </div>
        </div>
        <div class="list">
            <div class="item" @click="textLink?link:showBox('link')">
                <div class="fl">标的链接</div>
                <div class="time link fr"  v-if="textLink">
                    <a :href='textLink'>点击前往</a>
                </div>
                <div class="time fr"  v-if="!textLink && status !== '1' && userType == 1">
                    <template v-if="!textLink">></template>
                </div>
            </div>
        </div>
        <!-- 文本输入 -->
        <div class="input-main" v-show="isShow" >
            <div class="input" v-show="type == 'price'">
                <mt-field v-model="textPrice" type="number" placeholder="请输入成交价格"></mt-field>
            </div>
            <div class="input" v-show="type == 'people'">
                <mt-field v-model="textPeople" type="number" placeholder="请输入竞买人数"></mt-field>
            </div>
            <div class="input" v-show="type == 'name'">
                <mt-field v-model="textName"  type="text" placeholder="请输入竞买人姓名"></mt-field>
            </div>
            <div class="input" v-show="type == 'bidders'">
                <mt-field v-model="textBidders" type="text" placeholder="请输入竞买号"></mt-field>
            </div>
            <div class="input" v-show="type == 'platform'">
                <mt-field v-model="textPlatform" type="text" placeholder="请输入拍卖平台"></mt-field>
            </div>
            <div class="input" v-show="type == 'link'">
                <mt-field v-model="textLink" type="tetxt" placeholder="请输入标的链接"></mt-field>
            </div>
            <div class="button">
                <div class="readBtn fl btn1" @click="isShow = false">取消</div>
                <div class="readBtn fr btn2" @click="updateInput">确定</div>
            </div>
            
        </div>
        <!-- 下拉框 -->
        <div class="section_combobox" v-show="selectShow" >
          <div class="box">
            <div class="title">
                <template v-if="selectType == 'auction'">拍卖次数</template>
                <template v-if="selectType == 'state'">拍卖状态</template>
            </div>
            <div class="content">
              <mt-radio
                align="right"
                v-model="selectValue"
                :options="options" :value="selectValue"
                v-if="options[0]">
              </mt-radio>
            </div>
            <div class="cancel" @click="selectShow=false" v-show="!confire">取消</div>
            <div class="cancel-cur" @click="selectShow=false" v-show="confire">确定</div>
          </div>
        </div>
        <!-- 时间选择 -->
        <div class="pickerTime">
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
        </div>
        <div class="bottom" v-if="status !== '1' && userType == 1">
            <div class="button fl confirm" @click="save('1')">确认完成</div>
            <div class="button fr save" @click="save('0')">保存</div>
        </div>
    </div>
</template>
<script>
    import * as ReqUrl from '../../../config/ReqUrl'
    import qs from 'qs'
    import { Toast,DatetimePicker,MessageBox } from 'mint-ui'
    const parseForm = qs.stringify
    function packup (data = {}) {
        return parseForm({
            info: JSON.stringify(data)
        })
    }
    export default {
        name: "Racketrecord",
        data () {
            return {
                openId: '',
                userId: '',
                userType: '',
                productId:'',
                status: '',
                isShow:false,
                type: '',
                selectShow: false,
                confire: false,
                options:[],
                selectValue:'',
                auctionSelect: '第一次拍卖',//拍卖次数
                stateSelect:'前期调查中',//拍卖状态
                auctionKey:'1',
                stateKey:'0',
                selectType: '',
                textPrice: '',
                textLink: '',
                textPeople:'',//竞买人数
                textName: '',//买受人
                textBidders: '',//竞买号
                textPlatform:'', // 拍卖平台
                startDate: new Date('1998/1/1'),
                endDate: new Date('2038/1/1'),
                pickerValue: '',
                startTime: '',
                endTime: '',
                data: {},
                historyId: localStorage.getItem('productId'),
                hasUpdate: false,
                isSave:false
            }
        },
        watch:{
            selectValue(value) {
                if(value) {
                    this.confire = true
                }
                if(this.selectType == 'auction') {
                    this.auctionKey = value
                } else {
                    this.stateKey = value
                    
                }
            },
            auctionKey (val) {
                if(this.data.auction_no != val) {
                    this.hasUpdate = true
                }
                if(val == 1) {
                    this.auctionSelect = '第一次拍卖'
                }
                if(val == 2) {
                    this.auctionSelect = '第二次拍卖'
                } 
                if(val == 3) {
                    this.auctionSelect = '重新拍卖'
                }
                if(val == 4) {
                    this.auctionSelect = '变卖'
                }
            },
            stateKey(val) {
                if(this.data.auction_type != val) {
                    this.hasUpdate = true
                }
                if(val == 0) {
                    this.stateSelect = '前期调查中'
                }
                if (val == 1) {
                    this.stateSelect = '拍卖中'
                }
                if (val == 2) {
                    this.stateSelect = '已成交'
                }
                if (val == 3) {
                    this.stateSelect = '已结算'
                }
                if (val == 4) {
                    this.stateSelect = '流拍'
                }
                if (val == 5) {
                    this.stateSelect = '撤拍'
                }
                if (val == 6) {
                    this.stateSelect = '缓拍'
                }
                if (val == 7) {
                    this.stateSelect = '中止'
                }
                if (val == 8) {
                    this.stateSelect = '变卖中'
                }
                if (val == 11) {
                    this.stateSelect = '毁拍'
                }
            },
            textPrice(val) {
                if(this.data.winprice != val) {
                    this.hasUpdate = false
                }
            },
            startTime(val) {
                if(this.data.starttime != val) {
                    this.hasUpdate = true
                }
            },
            endTime(val) {
                if(this.data.endtime != val) {
                    this.hasUpdate = true
                }
            },
            textPeople(val) {
                if(this.data.attend_time != val) {
                    this.hasUpdate = true
                }
            },
            textName(val) {
                if(this.data.buyer != val) {
                    this.hasUpdate = true
                }
            },
            textBidders(val) {
                if(this.data.attend_no != val) {
                    this.hasUpdate = true
                }
            },
            textPlatform(val) {
                if(this.data.platform != val) {
                    this.hasUpdate = true
                }
            },
            textLink(val){
                if(this.data.textLink != val) {
                    this.hasUpdate = true
                }
            }
        },
        methods:{
            querySelect(type) {
                //获得拍卖次数分类
                var that=this
                let url = `${ReqUrl.querySelect}`
                let data = {
                    paramType: type,
                    userId: that.userId || ''
                }
                that.$http.post(
                    url,
                    packup(data),
                    {
                        headers:{openId: that.openId}
                    }
                )
                .then(res => {
                    console.log(res.data.data)
                    if(res.data.code=='0000'){
                        var data=res.data.data
                        var arr=[]
                        for(var i=0;i<data.length;i++){
                            arr.push({
                                label: data[i].value.toString(),
                                value:data[i].code.toString(),
                                disabled: false
                            })
                        }
                        this.options = arr
                    } else {
                        // alert(res.data.msg)
                    }
                })
                .catch(error => {
                    console.log(error)
                });
            },
            showBox(type){
                if(this.status == '1' || this.userType != 1) return
                this.isShow= true
                this.type=type
            },
            updateInput(){
                if(this.type=='price') {
                    if(!this.textPrice){
                        alert('请输入成交价格')
                        return 
                    } else{
                        this.isShow = false
                    }
                }
                if(this.type=='people') {
                    if(!this.textPeople) {
                        alert('请输入竞买人数')
                        return
                    } else {
                        this.isShow = false
                    }
                }
                if(this.type == 'name') {
                    if(!this.textName) {
                        alert('请输入竞买人姓名')
                    } else {
                        this.isShow = false
                    }
                }
                if(this.type=='bidders') {
                    if(!this.textBidders) {
                        alert('请输入竞买号')
                        return
                    } else {
                        this.isShow = false
                    }
                }
                if(this.type=='platform') {
                    if(!this.textPlatform) {
                        alert('请输入拍卖平台')
                        return 
                    } else {
                        this.isShow = false
                    }
                }
                if(this.type=='link') {
                    if(!this.textLink) {
                        alert('请输入标的链接')
                        return 
                    } else {
                        this.isShow = false
                    }
                }
                this.isShow = false
            },
            selectChange(e,type) {
                if(this.status == '1' || this.userType != 1) return
                this.selectShow = true
                this.selectType = type
                
                this.confire = true
                //定义选项
                if(type== 'auction') {
                    //拍卖次数选择
                    
                    this.querySelect('12')
                    this.auctionKey = '1'
                } else {
                    //拍卖状态
                    this.querySelect('14')
                    this.selectValue = '前期调查中'
                }
            },
            save(val){
                var that = this
                if(that.isSave) return
                if(val == '1') {
                    if(!that.auctionKey) {
                        alert('请选择拍卖次数') 
                        return
                    }
                    if(!that.stateKey) {
                        alert('请选择拍卖状态')
                        return
                    }
                    if(!that.textPrice) {
                        alert('请输入成交价格')
                        return
                    }
                    if(!that.startTime) {
                        alert('请输入开始时间')
                        return
                    }
                    if(!that.endTime) {
                        alert('请输入结束时间')
                        return
                    }
                    if(!that.textPeople) {
                        alert('请输入竞买人数')
                        return
                    }
                    if(!that.textName) {
                        alert('请输入买受人')
                        return
                    }
                    if(!that.textBidders) {
                        alert('请输入竞买号')
                        return
                    }
                    if(!that.textPlatform) {
                        alert('请输入拍卖平台')
                        return
                    }
                    if(!that.textLink) {
                        alert('请输入标的链接')
                        return
                    }
                }
                
                let url = `${ReqUrl.add}`
                let data = {
                    type_code: "t11",
                    userId: that.userId,
                    prodId: that.productId || that.historyId,
                    status: val, //0保存 1完成
                    data11: {
                        auction_no: that.auctionKey,//拍卖次数
                        auction_type: that.stateKey,//拍卖状态
                        winprice: that.textPrice,// 成交价格
                        starttime: that.startTime,//开始时间
                        endtime: that.endTime,//结束时间
                        attend_time: that.textPeople,//竞买人数
                        bid_no: "",//出价记录
                        buyer: that.textName, //买受人
                        attend_no: that.textBidders,//竞买号
                        platform: that.textPlatform,//拍卖平台
                        auction_url:that.textLink//标的链接
                        }
                }
                if(val == '1') {
                    MessageBox.confirm('确认完成后将无法修改信息!').then(action => {
                        that.$http.post(
                            url,
                            packup(data),
                            {
                                headers:{openId: that.openId}
                            }
                        )
                        .then(res => {
                            if(res.data.code=='0000') {
                                that.isSave = true
                                this.$router.go(-1)
                            } else {
                                alert(res.data.msg)
                            }
                            console.log(res)
                        })
                        .catch(error => {
                            alert(error);
                        });
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
                        if(res.data.code=='0000') {
                            Toast('保存成功')
                            this.$router.go(-1)
                            that.isSave = true
                        } else {
                            alert(res.data.msg)
                        }
                        console.log(res)
                    })
                    .catch(error => {
                        alert(error);
                    });
                }
                
            },
            cancel(){
                // 取消清空
                this.isShow = false
                if(this.type == 'price') {
                    this.textPrice = ''
                }
                if(this.type == 'people') {
                    this.textPeople = ''
                }
                if(this.type == 'name') {
                    this.textName = ''
                }
                if(this.type == 'bidders') {
                    this.textBidders = ''
                }
                if(this.type == 'platform') {
                    this.textPlatform = ''
                }
                if(this.type == 'link') {
                    this.textLink = ''
                }
            },
            formatDate(date) {
                const y = date.getFullYear()
                let m = date.getMonth() + 1
                m = m < 10 ? '0' + m : m
                let d = date.getDate()
                d = d < 10 ? ('0' + d) : d
                let h = date.getHours()
                h = h <10 ? ('0'+h):h
                let min = date.getMinutes()
                min = min < 10?('0' + min):min
                let s = date.getSeconds()
                s = s<10?('0'+s):s
                return y + '-' + m + '-' + d + ' ' + h + ':'+ min + ':'+s
            },
            openPicker(picker) {
                if(this.status == '1' || this.userType != 1) return
                this.$refs[picker].open();
                // this.timeType = type
            },
            handleConfirm(value){
                this.startTime = this.formatDate(value)
            },
            handleConfirm2(value) {
                this.endTime = this.formatDate(value)
            },
            getData() {
                var that=this
                let url = `${ReqUrl.queryDetail}`
                let data = {
                    type_code: "t11",
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
                        var data=res.data.data.data
                        this.data = res.data.data.data
                        this.auctionKey = data.auction_no
                        this.stateKey = data.auction_type
                        this.textPrice = data.winprice
                        this.startTime = data.starttime
                        this.endTime = data.endtime
                        this.textPeople = data.attend_time
                        this.textName = data.buyer
                        this.textBidders = data.attend_no
                        this.textPlatform = data.platform
                        this.textLink = data.auction_url
                    } else {
                        // alert(res.data.msg)
                    }
                    
                })
                .catch(error => {
                    console.log(error)
                });
            },
            detail() {
                if(!this.isSave) {
                    alert('请先进行保存，再查看竞买记录')
                    return
                }
                this.$router.push({
                    path: '/detail/bidrecord', 
                    name: 'bidrecord',
                    params: { 
                        id: this.productId || this.historyId,
                    }
                    /*query: {
                        name: 'name', 
                        dataObj: this.msg
                    }*/
                })
            },
            link() {
                var link = this.textLink
                this.$router.push({link})
            }
        },
        computed: {
        },
        created(){
            if(!this.auctionKey ||!this.stateKey ||!this.textPrice ||!this.startTime ||!this.endTime || !this.textPeople|| !this.textName || !this.textBidders || !this.textPlatform || !this.textLink) {
                this.hasUpdate = false
            }
            this.productId = this.$route.params.id
            this.status = this.$route.params.status
            if(this.status) {
                localStorage.setItem('status',this.status)
            }
            this.openId = sessionStorage.getItem('openId')
            this.userId = localStorage.getItem('userId')
            this.userType = localStorage.getItem('userType')
            this.$wx.ready(function(){
                console.log('111')
            })
            this.getData()
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
                height:86px;
                overflow: hidden;
                zoom:1;
                line-height:86px;
                padding-right:28px;
                font-size: 28px;
                color:#333;
                .time{
                    font-size:26px;
                    color:#666;
                    text-align: right;
                    a{
                        color:#D80E1C;
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
                div{
                    border:none;
                }
                input{
                    border:none;
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
        .section_combobox{
            .mint-radiolist-label{
                font-size:26px;
            }
            .cancel{
                background: #ccc;
                color:#fff;
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
