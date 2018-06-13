<template>
    <div class="main">
        <!-- <div class="header">
            <div class="back" @click="back">返回</div>
            登记服务
        </div> -->
        <h1 class="title">特殊竞买人登记</h1>
        <div class="list" v-for="(value,index) in lists" :key="index" @click="detail(value.id,value.bookType,value.name)">
            <div class="item">
                <div class="content">
                    <div class="fl left">
                        <div class="name">{{value.name}}</div>
                        <div class="type" v-show="value.bookType=='1'">委托代理</div>
                        <div class="type" v-show="value.bookType=='2'">联合竞买</div>
                    </div>
                    <div class="link fr" @click.stop="delList(value.id)" v-show="isOk!='1' && userType ==1">
                        <span class="remove">删除</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="addtime" v-show="isOk!='1' && userType ==1">
            <p><router-link :to="{path: '/detail/addregister'}" tag="li" style="color:#fff;"> 添加<br>登记</router-link></p>
        </div> 
        <div class="bottom" v-show="isOk!='1' && userType ==1">
            <div class="button" @click="saveInfo('1')">确认完成</div>
            <div class="button" @click="saveInfo('0')">保存</div>
        </div>
        <!-- 异议 -->
    <div class="otherSuggest" @click="otherSuggest()" v-show="userType==2">异议</div>
    </div>
</template>
<script>
    import { CellSwipe } from 'mint-ui';
    import * as ReqUrl from '../../../config/ReqUrl'
    import { MessageBox } from 'mint-ui';
    import qs from 'qs'
    const parseForm = qs.stringify
    function packup (data = {}) {
        return parseForm({
            info: JSON.stringify(data)
        })
    }
    export default {
        name: "Registrationservices",
        data () {
            return {
                lists: '',
                typeId:'',
                isOk:'',
                userType: null,
                isSave: false
            }
        },
        methods: {
            otherSuggest(){
            this.$router.push({path:'/detail/otherSuggest',query:{type:'t10'}})
            },
            detail(id,type,name){
                if(type=='1'){
                    //委托竞买
                this.$router.push({path:'/detail/addregister',query:{fromId:id}})
                }else if(type=='2'){
                    //联合竞买
                    this.$router.push({path:'/detail/addregistertwo',query:{fromId:id}})
                    sessionStorage.detailfrom='regService'
                    sessionStorage.queryName=name
                }
            },
          SetData(val){
            var that = this;
            let url = `${ReqUrl.baseinfoQuery}`
            let data = {
              type_code: that.typeId || sessionStorage.typeId,
                userId: localStorage.userId,
                prodId: localStorage.productId
            }
            that.$http.post(
                url,
                packup(data),
                {
                    headers:{openId: sessionStorage.openId}
                }
            )
            .then(res => {
                console.log(res)
                that.lists=res.data.data
            })
            .catch(error => {
                console.log(error);
            });
          },
          delList(id){
              console.log(id)
                var that = this;
                let url = `${ReqUrl.bookDelete}`
                let data = {
                    id: id
                }
                that.$http.post(
                    url,
                    packup(data),
                    {
                        headers:{openId: sessionStorage.openId}
                    }
                )
                .then(res => {
                    console.log(res)
                    that.SetData()
                })
                .catch(error => {
                    console.log(error);
                });
            },
            confirm(){
                this.SetData()
                this.back();
            },
            actionSheet: function(){
                <span style="white-space:pre;"></span>// 打开action sheet
                this.sheetVisible = true;
            },
            getCamera: function(){
                console.log("打开照相机")
                this.voucher = true;
                this.confirmSave = true;
            },
            saveInfo(type){
                if(type=='1'){
                    MessageBox.confirm('确认完成后将无法修改信息').then(action => {
                        console.log(action)
                        if(action=='confirm'){
                        this.saveInfoTwo(type)
                        }
                    })
                }else{
                    this.saveInfoTwo(type)
                }
            },
            saveInfoTwo(type){
                var that=this;
                if(that.isSave) return
                let url = `${ReqUrl.add}`
                let data = {
                    status: type,//0保存1完成
                    type_code: that.typeId || sessionStorage.typeId,
                    userId: localStorage.userId,
                    prodId: localStorage.productId  
                }
                that.$http.post(
                    url,
                    packup(data),
                    {
                        headers:{openId: sessionStorage.openId}
                    }
                )
                .then(res => {
                    console.log(res)
                    if(res.data.code=='0000'){
                        that.isSave = true
                        that.$router.go(-1)
                    }else{
                        alert('操作失败')
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            },
        },
        computed: {
        },
        created(){
            this.ut = localStorage.getItem('ut') || ''
            this.userType = localStorage.getItem('userType')
            console.log(this.userType)
            console.log(this.ut)
            this.$wx.ready(function(){
                console.log('111')
            })
            this.typeId=this.$route.query.typeId
            this.SetData()
            this.isOk=sessionStorage.isOk
            sessionStorage.removeItem('detailfrom')
        },
        components:{
            CellSwipe
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
        padding-bottom:170px;
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
        .title{
            line-height:90px;
            padding-left:30px;
            background:#fff;
            border-bottom:#ccc solid 1px;
            font-size:30px;
            color:#333;
        }
        .list{
            background:#fff;
            padding-left:28px;
            margin-bottom:18px;
            .item{

                height:86px;
                overflow: hidden;
                zoom:1;
                line-height:86px;
                padding-right:52px;
                font-size: 28px;
                color:#333;
                position: relative;
                user-select: none;
                .content{
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    z-index: 100;
                    //  设置过渡动画
                    transition: 0.3s;
                    background:#fff;
                    border-bottom:#C6C2C3 solid 1px;
                }
                // .remove{
                //     position: absolute;
                //     width:200px;
                //     right: 1px;
                //     top: 0;
                //     color:#fff;
                //     text-align: center;
                //     background:#f00;
                    
                // }
                .remove{
                    width: 102px;
                    height: 52px;
                    background: #D80E1C;
                    color: #fff;
                    font-size: 26px;
                    padding: 14px 26px;
                    margin-right: 30px;
                    }
                .left{
                    div{
                        display:inline-block;
                        color:#666;
                    }
                    .name{
                        width:110px;
                        font-size:28px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        display: inline-block;
                        float: left;
                    }
                    .type{
                        font-size:26px;
                        display: inline-block;
                        float: left;
                    }
                }
                .link{
                    a{
                        font-size:24px;
                        color:#D80E1C;
                        text-decoration: underline;
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
            font-size:18px;
            color:#fff;
            border-radius:50%;
            overflow:hidden;
            zoom:1;
            text-align:center;
            font-size:18px;
            position:fixed;
            right:29px;
            bottom:100px;

            p{
                line-height:30px;
                padding-top:12px;
            }
            // bottom:50px;
            span{
                font-size:16px;
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
        .slider{
            width: 100%;
            height:200px;
            position: relative;
            user-select: none;
            .content{
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                background:green;
                z-index: 100;
                //  设置过渡动画
                transition: 0.3s;

            }
            .remove{
                position: absolute;
                width:200px;
                height:200px;
                background:red;
                right: 0;
                top: 0;
                color:#fff;
                text-align: center;
                font-size: 40px;
                line-height: 200px;
            }
        }
    }

</style>
