<template>
    <div class="main">
        <!-- <div class="header">
            <div class="back" @click="back">返回</div>
            看样服务
        </div> -->
        <div class="list" v-for="(item,index) in listData" :key="index">
            <div class="fl left" :style="status == '1' || listData.length==0 || userType != 1?'width:100%':''">
                <div class="item" @click="openPicker('picker',index)">
                    <div class="fl" >看样开始时间{{index+1}}</div>
                    <div class="time fr">
                        {{item.view_start}} 
                        <span  v-if="status !== '1' && userType == 1">></span>
                    </div>
                </div>
                <div class="item" @click="openPicker('picker2',index)">
                    <div class="fl">看样结束时间{{index+1}}</div>
                    <div class="time fr">
                        {{item.view_end}} 
                        <span  v-if="status !== '1' && userType == 1">></span>
                    </div>
                </div>
                <div class="item">
                    <div class="fl">预约看样人数</div>
                    <div class="time fr">
                        <span class="reduce" @click="reduce(item)" v-if="status !== '1' && userType == 1 " >-</span>
                        <span>{{item.view_num}}</span>
                        <span class="add" @click="add(item)" v-if="status !== '1' && userType == 1 ">+</span>
                    </div>
                </div>
            </div>
            <div class="fr right" @click="remove(index)" v-if="status !== '1' && userType == 1" >
                删除
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
            :itemHeight= 72
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
            :itemHeight= 72
            @confirm="handleConfirm2">
        </mt-datetime-picker>
        <div class="addtime" @click="addTime" v-if="status !=='1'  && userType == 1">
            <span class="font1" style="">添加</span>
            <br><span style="" class="font2">看样时间</span>
        </div>
        <div class="bottom" v-if="status !=='1' && userType == 1 && listData[0]" >
            <div class="button" @click="save('1')">确认完成</div>
            <div class="button" @click="save('0')">保存</div>
        </div>
    </div>
</template>
<script>
import * as ReqUrl from '../../../config/ReqUrl'
import { Toast,DatetimePicker,MessageBox } from 'mint-ui'
// import { DatetimePicker } from 'vant';
import qs from 'qs'
const parseForm = qs.stringify
function packup (data = {}) {
    return parseForm({
        info: JSON.stringify(data)
    })
}
export default {
    name: "Sampleservice",
    data () {
        return {
            productId: '',
            status: '',
            openId: '',
            userId: '',
            userType: '',
            historyId: localStorage.getItem('productId'),
            number: 1,
            listData: [],
            startTime:'',
            endTime:'',
            startDate: new Date('2010/1/1'),
            endDate: new Date('2040/1/1'),
            pickerValue:'',
            currentIndex: null,
            listLength: null,//listData列表数组长度
            hasIndex: false,
            isStop: false,
            isSave: false
            // minDate: new Date(),
            // maxDate: new Date(2019, 10, 1),
            // currentDate: new Date()
        }
    },
    watch:{
        listData(val) {
            this.listLength = val.length-1
            // console.log(val)
        },
        startTime(val) {
            //开始时间判断
            if(this.hasIndex) {
                this.listData[this.currentIndex].view_start = val
            } else {
                this.listData[this.listLength].view_start = val
            }
        },
        endTime(val) {
            //结束时间判断
            if(this.hasIndex) {
                this.listData[this.currentIndex].view_end = val
            } else {
                this.listData[this.listLength].view_end = val
            }
        }
    },
    methods: {
        addTime(){
            let data = {
                view_start: '',
                view_end: '',
                view_num: '1'
            }
            this.listData = this.listData.concat(data)
        },
        openPicker(picker,index) {
            if(this.status == '1' || this.userType != 1) return
            this.pickerValue = ''
            if(this.listData[index]) {
                this.currentIndex = index
                this.hasIndex = true
            }
            if(this.status == '1') return
            this.$refs[picker].open();
            // this.timeType = type
        },
        cancel(){},
        handleConfirm(value){
            this.startTime = this.formatDate(value)
        },
        getColumnValue(val) {
            console.log(val)
        },
        handleConfirm2(value) {
            this.endTime = this.formatDate(value)
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
        save(type){
            if(this.listData && type == '1') {
                this.listData.forEach(item=>{
                    if(!item.view_start|| !item.view_end) {
                        alert('请完善信息')
                        this.isStop = true
                    }
                })
            }
            if(this.isStop) return            
            var that=this
            if(that.isSave) return
            let url = `${ReqUrl.add}`
            let data = {
                type_code: "t09",
                userId: that.userId,
                prodId: that.productId || that.historyId,
                status: type, //0保存 1完成
                data09: this.listData
            }
            if(type == '1') {
                MessageBox.confirm('确认完成后将无法修改信息!').then(action => {
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
                            that.isSave = true
                        } else {
                            alert(res.data.msg)
                        }
                        console.log(res)
                    })
                    .catch(error => {
                        console.log(error);
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
                    if(res.data.code=='0000'){
                        that.isSave = true
                        Toast('保存成功')
                        this.$router.go(-1)
                    } else {
                        alert(res.data.msg)
                    }
                    console.log(res)
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
                type_code: "t09",
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
                    var data = res.data.data.data.data09
                    this.listData =data
                    // console.log(this.listData)
                } else {
                    // alert(res.data.msg)
                }
                
            })
            .catch(error => {
                console.log(error)
            });
        },
        remove(val) {
            this.listData.filter((item,index) => {
                if(val == index) {
                    this.listData.splice(index,1)
                }
            })
        },
        reduce (item) {
            item.view_num--
            if(this.view_num = 1) return
        },
        add (item) {
            item.view_num++
        }
    },
    computed: {
    },
    components: {
        DatetimePicker
    },
    created(){
        this.openId = sessionStorage.getItem('openId')
        this.productId = this.$route.params.id
        this.status = this.$route.params.status
        this.userId = localStorage.getItem('userId')
        this.userType = localStorage.getItem('userType')
        this.getData()
        this.$wx.ready(function(){
            console.log('111')
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
            overflow: hidden;
            zoom:1;
            .left{
                width:90%;

            }
            .right{
                width:10%;
                background-color: #D80E1C;
                color:#fff;
                height:265px;
                text-align:center;
                line-height:265px;
            }
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
                    .reduce{
                        width:52px;
                        height:52px;
                        display: inline-block;
                        text-align:center;
                        line-height:52px;
                        font-size:26px;
                        border:#ccc solid 1px;
                        margin-right:30px;
                    }
                    .add{
                        width:52px;
                        height:52px;
                        display: inline-block;
                        text-align:center;
                        line-height:52px;
                        font-size:26px;
                        margin-left:30px;
                        border:#ccc solid 1px;
                    }
                }
            }
            .item:last-child{
                border-bottom:none;
            }
        }
        .addtime{
            width:93px;
            height:93px;
            background:#D80E1C;
            font-size:12px;
            color:#fff;
            border-radius:50%;
            overflow:hidden;
            zoom:1;
            text-align:center;
            position:fixed;
            right:29px;
            bottom:100px;
            line-height: 30px;
            // bottom:50px;
            span{
                font-size:12px;
                display: inline-block;
            }
            .font1{
                font-size: 18px;
                padding-top:10px;
            }
            .font2{
                font-size: 16px;
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
            .button:first-child{
                background: #D80E1C;
                color:#fff;
                float:left;
            }
            .button:last-child{
                background: #fff;
                color:#333;
                float:right;
            }
        }
        .photo{
            width:100px;
            height:100px;
            border:#f00 solid 1px;
            background:url(../../assets/images/img_all.jpg);
            .img{
                width:50px;
                height:50px;
            }
        }
    }

</style>
