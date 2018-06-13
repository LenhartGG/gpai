<template>
    <div class="main">
        <div class="input">
            <input type="text" placeholder="请输入" v-model="text">
            <button @click="save()">保存</button>
        </div>
    </div>
</template>
<script>
import * as ReqUrl from '../../../config/ReqUrl'
import bus from '../../assets/eventBus'
import qs from 'qs'
const parseForm = qs.stringify
function packup (data = {}) {
    return parseForm({
        info: JSON.stringify(data)
    })
}
export default {
    name: "Uservisit",
    data () {
        return {
            lists: '',
            openId: '',
            userType: null,
            inputType:'',
            text: ''
        }
    },
    watch:{
        text (val) {
        }
    },
    methods: {
        save() {
            console.log(this.text)
            bus.$emit('myevent',this.text)
            this.$router.go(-1);
        }
    },
    computed: {
    },
    created(){
        
        this.openId = `${ReqUrl.openId}`
        this.userType = localStorage.getItem('userType') || null
        console.log(this.userType)
        this.$wx.ready(function(){
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
        .input{
            input{
                width:98%;
                height:102px;
                background:#fff;
                padding-left:2%;
            }   
            button{
                width:200px;
                height:100px;
                background:#D80E1C;
                color:#fff;
                font-size: 24px;
                border:none;
                margin:30px auto;
            }

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
            float: left;
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
</style>
