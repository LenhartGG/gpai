<template>
    <!-- 实地勘察 -->
    <div>
        <div class="video">
            <video src="https://test50.oss-cn-shanghai.aliyuncs.com/NAMS/mp4/%E6%B5%8B%E8%AF%95%E6%A0%87%E7%9A%84.mp4?Expires=1560151976&OSSAccessKeyId=LTAI27GnxNo87Vou&Signature=2weuzrHGbcJL0Y95T15eHt2o%2F6k%3D" controls="controls">
                您的浏览器不支持 video 标签。
            </video>
        </div>
    </div>
</template>

<script>
    import * as ReqUrl from '../../../config/ReqUrl'
    import { Uploader } from 'vant'
    import { Picker,Toast} from 'mint-ui'
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
            }
        },
        filters: {
        },
        watch:{
        },
        methods: {
        },
        computed: {
        },
        created(){
            this.productId = this.$route.params.id
            console.log(this.$route.params)
            this.userId = localStorage.getItem('userId')
            this.openId = sessionStorage.getItem('openId')
            this.userType = localStorage.getItem('userType')
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







</style>
