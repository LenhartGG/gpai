<template>
    <div class="main">
        <div class="list">
            <table cellspacing="0" cellpadding="0">
                <tr v-for="item in data" :key="item.id">
                    <td>{{item.attendNo}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.createTime_format}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
    import * as ReqUrl from '../../../config/ReqUrl'
    import qs from 'qs'
    import { Toast,DatetimePicker } from 'mint-ui'
    const parseForm = qs.stringify
    function packup (data = {}) {
        return parseForm({
            info: JSON.stringify(data)
        })
    }
    export default {
        name: "Addbidders",
        data () {
            return {
                openId: '',
                userId: '',
                productId: '',
                historyId: localStorage.getItem('productId'),
                data: []
            }
        },
        methods: {
            getData() {
                var that=this
                let url = `${ReqUrl.biddingRecord}`
                let data = {
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
                    console.log(res)
                    

                    if(res.data.code=='0000'){
                        this.data=res.data.data
                    } else {
                        alert(res.data.msg)
                    }
                    
                })
                .catch(error => {
                    console.log(error)
                });
            }
        },
        computed: {
        },
        created: function () {
            this.productId = this.$route.params.id
            this.openId = sessionStorage.getItem('openId')
            this.userId = localStorage.getItem('userId')
            if(this.productId) {
                this.getData()
            }
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
            margin-top:7px;
            table{
                width:100%;
                tr{
                    height:56px;
                    td{
                        border-right:#ccc solid 1px;
                        text-align:center;
                        border-bottom:#ccc solid 1px;
                        font-size:24px;
                        color:#666;
                    }
                }
            }
            
        }
    }

</style>
