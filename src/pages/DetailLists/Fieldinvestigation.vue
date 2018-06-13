<template>
    <!-- 实地勘察 -->
    <div>
        <div class="section_img">
          <div class="title">
                标的物照片
            </div>
            <div class="content clearfix">
                <li v-for="(item, index) in photoList" :key="index" v-if="photoList.length>0" >
                    <div :style="item| bgimg">
                        <!-- <img :src="item" alt="" > -->
                        <span @click="removeUrl(item)" v-if="status !=='1' && historyStatus!== '1' && userType == 1">X</span>
                    </div>
                </li>
                <li v-if="status !=='1' && historyStatus!== '1' && userType == 1">
                    <div v-if="photoList.length != 9">
                        <van-uploader :after-read="wthUpload" >
                            <img src="../../assets/images/add.png" alt="" class="img">
                        </van-uploader>
                        
                    </div>
                    <div v-if="photoList.length == 9">
                        <img src="../../assets/images/add.png" alt="" class="img"  @click="prompt">
                    </div>
                </li>
                
            </div>
        </div>

        <section>
            <ul>
                <li @click="toVideo">
                    <div class="fl">标的物视频</div>
                    <div class="fr">
                        <span>已上传</span>
                        <span class="arrow r_arrow" v-if="status !=='1' && historyStatus!== '1' && userType == 1"></span>
                    </div>
                </li>
            </ul>
        </section>
        <section v-show="productType  && productType == '2' || historyProductType == '2'">
            <ul>
                <li @click="showBox('accountInfor')" >
                    <div class="fl left">户口（工商）信息</div>
                    <div class="fr right" >
                        <span class="textOver">{{accountInfor}}</span>
                        <span class="arrow r_arrow" v-if="status !=='1' && historyStatus!== '1' && userType == 1"></span>
                    </div>
                </li>
                <li @click="showBox('accountStatus')">
                    <div class="fl">户口情况</div>
                    <div class="fr">
                        <span :class="accountStatus.length>14?'textOver':''">{{accountStatus}}</span>
                        <span class="arrow r_arrow" v-if="status !=='1' && historyStatus!== '1' && userType == 1"></span>
                    </div>
                </li>
            </ul>
        </section>

        <section v-show="productType && productType == '2' || historyProductType == '2'">
            <ul>
                <li @click="selectChange($event,'vacate')">
                    <div class="fl">是否腾空</div>
                    <div class="fr">
                        <span >{{textVacate}}</span>
                        <span class="arrow r_arrow" v-if="status !=='1' && historyStatus!== '1' && userType == 1"></span>
                    </div>
                </li>
                <li @click="selectChange($event,'clear')">
                    <div class="fl">是否清场</div>
                    <div class="fr">
                        <span>{{textClear}}</span>
                        <span class="arrow r_arrow" v-if="status !=='1' && historyStatus!== '1' && userType == 1"></span>
                    </div>
                </li>
                <li @click="showBox('leaseStatus')">
                    <div class="fl">租赁情况</div>
                    <div class="fr">
                        <span class="textOver">{{leaseStatus}}</span>
                        <span class="arrow r_arrow" v-if="status !=='1' && historyStatus!== '1' && userType == 1"></span>
                    </div>
                </li>
                <li @click="showBox('refinementStatus')">
                    <div class="fl">装修情况</div>
                    <div class="fr">
                        <span class="textOver">{{refinementStatus}}</span>
                        <span class="arrow r_arrow" v-if="status !=='1' && historyStatus!== '1' && userType == 1"></span>
                    </div>
                </li>
                <li @click="selectChange($event,'key')">
                    <div class="fl">钥匙</div>
                    <div class="fr">
                        <span>{{textKey}}</span>
                        <span class="arrow r_arrow" v-if="status !=='1' && historyStatus!== '1' && userType == 1"></span>
                    </div>
                </li>
                <li @click="showBox('arrearsStatus')">
                    <div class="fl">欠费情况</div>
                    <div class="fr">
                        <span class="textOver">{{arrearsStatus}}</span>
                        <span class="arrow r_arrow" v-if="status !=='1' && historyStatus!== '1' && userType == 1"></span>
                    </div>
                </li>
            </ul>
        </section>

        <section v-show="productType && productType == '2' || historyProductType == '2'">
            <ul>
                <li @click="showBox('traffic')">
                    <div class="fl" >交通状况</div>
                    <div class="fr">
                        <span class="textOver">{{traffic}}</span>
                        <span class="arrow r_arrow" v-if="status !=='1' && historyStatus!== '1' && userType == 1"></span>
                    </div>
                </li>
                <li @click="showBox('realEstate')">
                    <div class="fl" >不动产四至</div>
                    <div class="fr">
                        <span class="textOver">{{realEstate}}</span>
                        <span class="arrow r_arrow" v-if="status !=='1' && historyStatus!== '1' && userType == 1"></span>
                    </div>
                </li>
                <li @click="showBox('matching')">
                    <div class="fl" >周边配套</div>
                    <div class="fr">
                        <span class="textOver">{{matching}}</span>
                        <span class="arrow r_arrow" v-if="status !=='1' && historyStatus!== '1' && userType == 1"></span>
                    </div>
                </li>
            </ul>
        </section>

        <section class="section" >
            <ul>
                <li @click="showBox('introduction')">
                    <div class="fl">其它介绍</div>
                    <div class="fr">
                        <span :class="introduction.length>14?'textOver':''">{{introduction}}</span>
                        <span class="arrow r_arrow" v-if="status !=='1' && historyStatus!== '1' && userType == 1"></span>
                    </div>
                </li>
            </ul>
        </section>
        <!-- 文本输入 -->
        <div class="input-main" v-show="isShow" >
            <div class="input" v-if="type == 'accountInfor'">
                <mt-field v-model="accountInfor" v-focus="true" placeholder="请输入户口(工商)信息"></mt-field>
            </div>
            <div class="input" v-if="type == 'accountStatus'">
                <mt-field v-model="accountStatus" v-focus placeholder="请输入户口情况"></mt-field>
            </div>
            <div class="input" v-if="type == 'leaseStatus'">
                <mt-field v-model="leaseStatus" placeholder="请输入租赁情况"></mt-field>
            </div>
            <div class="input" v-if="type == 'refinementStatus'">
                <mt-field v-model="refinementStatus" placeholder="请输入装修情况"></mt-field>
            </div>
            <div class="input" v-if="type == 'arrearsStatus'">
                <mt-field v-model="arrearsStatus" placeholder="请输入欠费情况"></mt-field>
            </div>
            <div class="input" v-if="type == 'traffic'">
                <mt-field v-model="traffic" placeholder="请输入交通状况"></mt-field>
            </div>
            <div class="input" v-if="type == 'realEstate'">
                <mt-field v-model="realEstate" placeholder="请输入不动产四至"></mt-field>
            </div>
            <div class="input" v-if="type == 'matching'">
                <mt-field v-model="matching" placeholder="请输入周边配套"></mt-field>
            </div>
            <div class="input" v-if="type == 'introduction'">
                <mt-field v-model="introduction" placeholder="请输入其它介绍"></mt-field>
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
                <template v-if="selectType == 'vacate'">是否腾空</template>
                <template v-if="selectType == 'clear'">是否清场</template>
                <template v-if="selectType == 'key'">钥匙</template>
            </div>
            <div class="content">
              <mt-radio
                align="right"
                v-model="selectValue"
                :options="options" :value="selectValue">
              </mt-radio>
            </div>
            <div class="cancel" @click="selectShow=false" v-show="!confire">取消</div>
            <div class="cancel-cur" @click="selectShow=false" v-show="confire">确定</div>
          </div>
        </div>
        <!-- 确认完成 -->
        <div class="section_confirm" v-if="status !=='1' && historyStatus!== '1' && userType == 1">
            <ul>
                <li class="confirm fl" @click="save('1')">确认完成</li>
                <li class="save fr" @click="save('0')">保存</li>
            </ul>
        </div>
        <!-- 异议 -->
        <div class="otherSuggest" @click="otherSuggest()" v-show="userType==2">异议</div>

        <!-- 直接退出 -->
        <div class="section_quit">
            <div class="box">
                <p>直接退出可能会造成数据丢失</p>
                <button class="cancel">取消</button>
                <button class="confirm">确认</button>
            </div>
        </div>
        <div class="video" v-if="isshowVideo" @click="isshowVideo = false">
            <video src="https://test50.oss-cn-shanghai.aliyuncs.com/NAMS/mp4/%E6%B5%8B%E8%AF%95%E6%A0%87%E7%9A%84.mp4?Expires=1560151976&OSSAccessKeyId=LTAI27GnxNo87Vou&Signature=2weuzrHGbcJL0Y95T15eHt2o%2F6k%3D" controls="controls">
                您的浏览器不支持 video 标签。
            </video>
        </div>
    </div>
</template>

<script>
    import * as ReqUrl from '../../../config/ReqUrl'
    import { Uploader } from 'vant'
    import { Picker,Toast,MessageBox,Indicator } from 'mint-ui'
    import qs from 'qs'
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
                productId: '',
                status: '',
                openId: '',
                userId: '',
                userType:'',
                openId: '',
                productType: '',
                historyId: localStorage.getItem('productId'),
                isShow: false,
                textPrice: '',
                photoList: [],
                type: '',
                accountInfor:'',//户口(工商)信息
                accountStatus:'',//户口情况
                leaseStatus:'',//租赁情况
                refinementStatus:'',//精修情况
                arrearsStatus:'',//欠费情况
                traffic:'',//交通情况
                realEstate:'',//不动产四至
                matching:'',//周边配套
                introduction:'',//其它介绍
                selectType: '',
                selectValue: '',
                selectShow: '',
                confire: false,
                isshowVideo:false,
                historyStatus: localStorage.getItem('historyStatus'),
                historyProductType: localStorage.getItem('historyProductType'),
                options:[
                    {
                        label: '是',
                        value:'是',
                        disabled: false
                    },
                    {
                        label: '否',
                        value:'否',
                        disabled: false
                    },
                ],
                textVacate:'是',
                textClear: '是',
                textKey:'有',
                vacateKey: '1',//是否腾空
                clearKey:'1',//是否清空
                key: '1',//钥匙
                video: '',
                isSave: false
            }
        },
        filters: {
            bgimg: url => {
                return {
                    backgroundImage: `url(${url})`
                }
            },
        },
        watch:{
            selectValue(value) {
                if(value) {
                    this.confire = true
                }
                if(this.selectType == 'vacate') {
                    this.textVacate = value
                    if(value == '是') {
                        this.vacateKey = '1'
                    } else{
                        this.vacateKey = '0'
                    }
                    console.log(this.vacateKey)
                } 
                if(this.selectType == 'clear'){
                    this.textClear = value
                    if(value == '是') {
                        this.clearKey = '1'
                    } else{
                        this.clearKey = '0'
                    }
                    console.log(this.clearKey)
                }
                if(this.selectType == 'key') {
                    this.textKey = value
                    if(value == '有') {
                        this.key = '1'
                    } else{
                        this.key = '0'
                    }
                    console.log(this.key)
                    
                }
            },
            status(val) {
                if(val) {
                    localStorage.setItem('historyStatus',val)
                    // alert(localStorage.getItem('historyStatus'))
                }
            }
        },
        methods: {
            prompt() {
                alert('最多只能上传九张')
            },
            toVideo(){
                this.$router.push({
                    name:'video',
                    params:{
                        id: this.productId
                    }
                })
            },
            wthUpload(file){
                if(this.status == '1' || this.historyStatus =='1' || this.userType != 1) return
                this.uploadImg(file.content)
            },
            uploadImg(baseCode){
                var that=this;
                let url = `${ReqUrl.upload64Img}`
                Indicator.open('正在上传图片...')
                let data = {
                    baseCode: baseCode,     
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
                    
                    if(res.data.code=='0000'){
                        if(this.photoList.length == 9) {
                            alert('最多可上传九张')
                            return
                        }
                        var url = res.data.data
                        if(res.data.data) {
                            Indicator.close()
                        }
                        that.photoList = that.photoList.concat(url)
                        console.log(that.photoList)
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            },
            showBox(type) {
                if(this.status == '1' || this.historyStatus =='1' ||  this.userType != 1) return
                
                this.type = type
                this.isShow = true
            },
            updateInput(){
                if(this.type == 'accountInfor') {
                    if(!this.accountInfor) {
                        alert('请输入户口(工商)信息')
                        return
                    } else {
                        this.isShow = false
                    }
                }
                if(this.type == 'accountStatus') {
                    if(!this.accountStatus){
                        alert('请输入户口情况')
                        return
                    } else {
                        this.isShow = false
                    }
                }
                if(this.type == 'leaseStatus') {
                    if(!this.leaseStatus) {
                        alert('请输入租赁情况')
                        return
                    } else {
                        this.isShow = false
                    }
                }
                if(this.type == 'refinementStatus'){
                    if(!this.refinementStatus) {
                        alert('请输入精修情况')
                        return
                    } else {
                        this.isShow = false
                    }
                }
                if(this.type == 'arrearsStatus') {
                    if(!this.arrearsStatus) {
                        alert('请输入欠费情况')
                        return
                    } else {
                        this.isShow = false
                    }
                }
                if(this.type == 'traffic') {
                    if(!this.traffic) {
                        alert('请输入交通情况')
                        return
                    } else {
                        this.isShow = false
                    }
                }
                if(this.type == 'realEstate') {
                    if(!this.realEstate) {
                        alert('请输入不动产四至')
                        return
                    } else {
                        this.isShow = false
                    }
                }
                if(this.type == 'matching') {
                    if(!this.matching) {
                        alert('请输入周边配套')
                        return
                    } else {
                        this.isShow = false
                    }
                }
                if(this.type == 'introduction') {
                    if(!this.introduction) {
                        alert('请输入其它介绍')
                        return
                    } else {
                        this.isShow = false
                    }
                }
            },
            selectChange(e,type) {
                if(this.status == '1' || this.historyStatus =='1' || this.userType != 1) return
                this.selectType = type
                this.selectShow = true
                if(this.selectType == 'key') {
                    this.options = [
                        {
                            label: '有',
                            value:'有',
                            disabled: false
                        },
                        {
                            label: '无',
                            value:'无',
                            disabled: false
                        },
                    ]
                }
                if(type == 'vacate' || type == 'clear' ) {
                    this.selectValue = '是'
                } else{
                    this.selectValue = '有'
                }
                
                // this.confire = false

            },
            removeUrl(url){
                this.photoList.filter((item,index) => {
                    if(item === url) {
                        this.photoList.splice(index,1)
                        console.log(item)
                    }
                })
            },
            save(val){
                var that = this
                if(that.isSave) return
                if(val == '1') {
                    if(that.productType && that.productType == '2') {
                        if(!that.photoList[0]) {
                            alert('请上传标的物照片')
                            return
                        }
                        if(!that.accountInfor) {
                            alert('请输入户口(工商)信息')
                            return
                        }
                        if(!that.accountStatus) {
                            alert('请输入户口情况')
                            return
                        }
                        if(!that.leaseStatus) {
                            alert('请输入租赁情况')
                            return
                        }
                        if(!that.refinementStatus) {
                            alert('请输入精修情况')
                            return
                        }
                        if(!that.arrearsStatus) {
                            alert('请输入欠费情况')
                            return
                        }
                        if(!that.traffic) {
                            alert('请输入交通状况')
                            return
                        }
                        if(!that.realEstate) {
                            alert('请输入不动产四至')
                            return
                        }
                        if(!that.matching) {
                            alert('请输入其它介绍')
                            return
                        }
                        if(!that.introduction){
                            alert('请输入其它信息')
                            return
                        }
                    } else{
                        if(!that.photoList[0]) {
                            alert('请上传标的物照片')
                            return
                        }
                        if(!that.introduction){
                            alert('请输入其它信息')
                            return
                        }
                    }
                }
                let url = `${ReqUrl.add}`
                let data = {
                    type_code: "t05",
                    userId: that.userId,
                    prodId: that.productId ||that.historyId,
                    status: val, //0保存 1完成
                    data05: {
                        BDWZP: that.photoList.join(','),//标的物照片
                        BDWSP:'',//标的物视频：  （通用）
                        HKXX:that.accountInfor,//户口（工商）信息
                        HKQK:that.accountStatus,//户口情况
                        SFTK:that.vacateKey,//是否腾空
                        SFQC:that.clearKey,//是否清场
                        ZLQK:that.leaseStatus,//租赁情况
                        ZXQK:that.refinementStatus,//装修情况  
                        YS:that.key,//钥匙
                        QFQK:that.arrearsStatus,//欠费情况
                        JTZK:that.traffic,//交通状况
                        BDCSZ:that.realEstate,//不动产四至
                        ZBPT:that.matching,//周边配套
                        QTJS:that.introduction//其他介绍（通用）
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
                            if(res.data.code == '0000') {
                                this.$router.go(-1)
                                that.isSave = true
                            } else {
                                alert(res.data.msg)
                            }

                        })
                        .catch(error => {
                            console.log(error);
                        })
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
                        if(res.data.code == '0000') {
                            that.isSave = true
                            Toast('保存成功')
                            this.$router.go(-1)
                        } else {
                            alert(res.data.msg)
                        }

                    })
                    .catch(error => {
                        console.log(error);
                    })
                }
               
            },
            getData() {
                var that=this
                let url = `${ReqUrl.queryDetail}`
                let data = {
                    type_code: "t05",
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
                        var data = res.data.data.data
                        if(data.BDWZP) {
                            that.photoList = data.BDWZP.split(',')
                        }
                        that.accountInfor = data.HKXX
                        that.accountStatus = data.HKQK
                        that.leaseStatus = data.ZLQK
                        that.refinementStatus = data.ZXQK
                        that.arrearsStatus = data.QFQK  
                        that.traffic = data.JTZK
                        that.realEstate = data.BDCSZ
                        that.video = data.BDWSP
                        that.matching = data.ZBPT
                        that.introduction = data.QTJS
                        that.vacateKey = data.SFTK
                        if(that.vacateKey == '1') {
                            this.textVacate = '是'
                        } else {
                            this.textVacate = '否'
                        }
                        that.clearKey = data.SFQC
                        if(that.clearKey == '1') {
                            this.textClear = '是'
                        } else {
                            this.textClear = '否'
                        }
                        that.key = data.YS
                        if(that.key == '1') {
                            this.textKey = '有'
                        } else {
                            this.textKey = '无'
                        }
                        // console.log(this.listData)
                    } else {
                        // alert(res.data.msg)
                    }
                    
                })
                .catch(error => {
                    console.log(error)
                });
            },
            otherSuggest(){
                this.$router.push({path:'/detail/otherSuggest',query:{type:'t05'}})
            }
        },
        computed: {
        },
        created(){
            this.productId = this.$route.params.id
            this.status = this.$route.params.status
            this.productType = this.$route.params.productType
            // if(this.status && this.status != '') {
            //     this.historyStatus = localStorage.setItem('historyStatus',this.status)
            //     alert(this.historyStatus)
            // }
            if(this.productType) {
                this.historyProductType = localStorage.setItem('historyProductType',this.productType)
            }
            console.log(this.$route.params)
            this.userId = localStorage.getItem('userId')
            this.openId = sessionStorage.getItem('openId')
            this.userType = localStorage.getItem('userType')
            this.getData()
            console.log(this.photoList)
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
.video{
    width:100%;
    width:100vw;
    height:100vh;
    background: rgba(0,0,0,0.5);
    position: fixed;
}
.otherSuggest{
  width: 50%;
  position: fixed;
  z-index: 10;
  right: 0;
  bottom: 0;
  background: #D80E1C;
  color: #fff;
  text-align: center;
  height: 82px;
  line-height: 82px;
  font-size: 34px;
}
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
                width:35%;
                span{
                    display: inline-block;
                }
            }
            div:nth-of-type(2){
                width:65%;
                color: #666;
                font-size: 26px;
                text-align: right;
            }
            span.textOver{
                float:left;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                width: 390px;
            }
            
            .arrow{
                display: inline-block;
                line-height: 40px;
                width: 40px;
                height: 90px;
                // margin-right: 28px;
                // margin-left: 17px;
            }
        }

        li:nth-last-of-type(1){
            border-bottom:0;
        }
    }
}
.section2{
    height: 163px;
    background: #FFFFFF;
    margin-bottom: 15px;
    .fl{
        line-height: 163px;
        font-size: 30px;
        color: #333333;
        text-indent: 31px;
    }
    .fr{
        margin: 20px 20px;
        ul{
            li{
                float: left;
                margin-right: 17px;
                position: relative;
                img{
                    width: 83px;
                    height: 123px;
                    background: red
                }
                span{
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 34px;
                    height: 34px;
                    background: blue;
                }
            }
        }
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
        input{
            font-size:24px;
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
        background:#ccc;
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
.section_quit{
    display: none;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    .box{
        width: 603px;
        height: 343px;
        background: #ffffff;
        border-radius: 8px;
        margin: 336px auto;
        font-size: 28px;
        color: #333333;
        text-align: center;
        position: relative;
        p{
            line-height: 200px;
        }
        button{
            position: absolute;
            width: 223px;
            height: 73px;
            bottom: 30px;
            outline: 0;
            border: 0;
        }
        .cancel{
            left: 60px;
            border: 1px solid #000000;
            background: #ffffff;
        }
        .confirm{
            right: 60px;
            background: #d80e1c;
            color: #ffffff;
        }
    }
}
.section{
    padding-bottom:100px;
}
.section_img{
    margin-bottom: 17px;
    .title{
        height: 90px;
        line-height: 90px;
        text-indent: 31px;
        font-size: 28px;
        color: #333333;
        background: #fff;
        margin-bottom: 2px;
    }
    .content{
        background: #fff;
        margin: 0 auto;
        padding: 4px 36px;
        li{
            float: left;
            width: 183px;
            height:123px;
            margin-top: 13px;
            margin-bottom: 13px;
            margin-right:42px;
            div{
                width: 183px;
                height: 123px;
                background:#ccc;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                position:relative;
                overflow: hidden;
                zoom: 1;
                text-align:center;
                span{
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 40px;
                    height: 40px;
                    background: #666;
                    border-radius: 20px;
                    color:#fff;
                }
                
            }
            img{
                width: 100%;

            }
            .img{
                display: inline-block;
                margin:20px auto;
                width:80px;
            }
        }
    }
}
</style>
