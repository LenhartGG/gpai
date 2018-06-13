<template>
    <div>
        <div class="list">
            <div class="item">
                <div class="fl" v-show="organName">机构名称</div>
                <div class="time fr" v-show="organName">
                    {{organName}} <span class="r_arrow"></span>
                </div>
                <div class="fl" v-show="courtName">法院名称</div>
                <div class="time fr" v-show="courtName">
                    {{courtName}} <span class="r_arrow"></span>
                </div>
            </div>
            <div class="item">
                <div class="fl">我的姓名</div>
                <div class="time fr">
                    {{name}} <span class="r_arrow"></span>
                </div>
            </div>
            <div class="item">
                <div class="fl">咨询手机</div>
                <div class="time fr">
                    {{mobile}} <span class="r_arrow"></span>
                </div>
            </div>
            <div class="item">
                <div class="fl">联系地址</div>
                <div class="time fr">
                    {{address}} <span class="r_arrow"></span>
                </div>
            </div>
        </div>
        <div class="list">
            <!-- <div class="item">
                <div class="fl">密码修改</div>
                <div class="time fr">
                     <span class="r_arrow"></span>
                </div>
            </div> -->
            <div class="item" @click="unbind()">
                <div class="fl">解除绑定</div>
                <div class="time fr">
                     <span class="r_arrow"></span>
                </div>
            </div>
            <div class="item" @click="sigout()">
                <div class="fl">退出</div>
                <div class="time fr">
                     <span class="r_arrow"></span>
                </div>
            </div>
        </div>
        <Tab></Tab>
    </div>
</template>

<script>
import Tab from '../components/Tab.vue'
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
            organName:'',
            name:'',
            mobile:'',
            address:'',
            courtName:''
        }
    },
    created(){
        this.initData()
        // this.base.getWxOpenid()
    },
    methods:{
        initData(){
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
                var data=res.data.data
                that.organName=data.organName
                that.name=data.name
                that.mobile=data.mobile
                that.address=data.address
                that.courtName=data.courtName
            })
            .catch(error => {
                console.log(error);
            });
        },
        sigout(){
            var that=this
            that.$wx.ready(function(){
                //alert('微信权限验证成功')
                that.$wx.closeWindow();
            })
        },
        unbind(){
            //解除绑定
            var that = this
            let url = `${ReqUrl.unbinding}`
            let data = {
                mobile:that.mobile
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
                if(res.data.code=='0000'){
                    that.$router.push({path:'/login'})
                }else{
                    alert('解除绑定失败')
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
    },
    components:{
        Tab
    }
}
</script>


<style lang="less" scoped>
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
            }
        }
        .item:last-child{
            border-bottom:none;
        }
    }
</style>

