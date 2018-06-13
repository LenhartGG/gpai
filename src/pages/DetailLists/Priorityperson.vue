<template>
    <!-- 优先权人 -->
    <div>
        <section>
            <div class="title">可能的优先竞买权人建议</div>
            <ul>
                <li v-for="(value,index) in dataList" :key="index" @click="detail(value.id)">
                    <div class="fl addClass"><span></span><span class="person">  {{value.name}}</span></div>
                    <div class="fl" style="margin-left:80px;" v-show="value.preemptType=='1'"><span></span>
                        <span class="person">承租人</span>
                    </div>
                    <div class="fl" style="margin-left:80px;" v-show="value.preemptType=='2'"><span></span>
                        <span class="person">共有人</span>
                    </div>
                    <div class="fl" style="margin-left:80px;" v-show="value.preemptType=='3'"><span></span>
                        <span class="person">股东</span>
                    </div>
                    <div class="fr"><span class="shunxu">顺位{{value.order}}</span><span @click.stop="deleteData(value.id)" class="remove" v-show="addyxqPersonState!='1' &&  userType == 1">删除</span></div>
                </li>
            </ul>
        </section>

        <!-- 添加优先权人 -->
        <div class="add_priority" v-show="addyxqPersonState!='1' &&  userType == 1" @click="addFrist()">
          添加<br>
          优先权人
        </div>

        <!-- 保存弹框 -->
        <div class="section_confirm" v-show="addyxqPersonState!='1' && userType == 1">
            <ul>
                <li class="confirm" @click="save('1')">确认完成</li>
                <li class="save" @click="save('0')">保存</li>
            </ul>
        </div>

        <!-- 直接退出 -->
        <div class="section_quit">
            <div class="box">
                <p>直接退出可能会造成数据丢失</p>
                <button class="cancel">取消</button>
                <button class="confirm">确认</button>
            </div>
        </div>
        <!-- 异议 -->
    <div class="otherSuggest" @click="otherSuggest()" v-show="userType==2">异议</div>
    </div>
</template>
<script>
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
  data(){
    return{
      typeId:'',
      dataList:[],
      addyxqPersonState:'',//完成状态0未完成1已完成
      userType: '',
      isSave: false
    }
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
    sessionStorage.typeId=this.$route.query.typeId
    this.addyxqPersonState=sessionStorage.addyxqPersonState
    this.SetData()
  },
  methods:{
    otherSuggest(){
      this.$router.push({path:'/detail/otherSuggest',query:{type:'t07'}})
    },
      detail(val){
          this.$router.push({path:'/detail/addFristPerson',query:{id:val}})
      },
      deleteData(val){
        var that=this;
        let url = `${ReqUrl.preemtionDelete}`
        let data = {
            id: val
        }
        MessageBox.confirm('是否删除当前优先竞买权人!').then(action => {
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
                    that.SetData()
                }
                
            })
            .catch(error => {
                console.log(error);
            });
        })
        
      },
    SetData(val){
      var that=this;
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
              if(res.data.code=='0000'){
                  that.dataList=res.data.data
              }
              
          })
          .catch(error => {
              console.log(error);
          });
    },
    save(status){
        if(status=='1'){
            MessageBox.confirm('确认完成后将无法修改信息').then(action => {
                console.log(action)
                if(action=='confirm'){
                    this.saveTwo(status)
                }
            })
        }else{
            this.saveTwo(status)
        }
    },
    saveTwo(status){
      var that=this;
      if(that.isSave) return
      let url = `${ReqUrl.add}`
      let data = {
        status: status,//0保存1完成
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
    back(){
      this.$router.go(-1)
    },
    addFrist(){
        this.$router.push({path:'/detail/addFristPerson'})
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
section{
    background: #fff;
    line-height: 90px;
    .title{
      height: 90px;
      padding-left: 30px;
      color: #333333;
      border-bottom: 1px solid #cccccc;
      font-size: 30px;
    }
    margin-bottom: 17px;
    ul{
        li{
            height: 90px;
            margin-left: 30px;
            div:nth-of-type(1){
                color:#333333;
                font-size: 28px;
                .person{

                }
            }
            div:nth-of-type(2){
                color: #666;
                font-size: 26px;
            }
            .arrow{
                float: right;
                width: 22px;
                height: 90px;
                margin-right: 28px;
                margin-left: 17px;
            }
        }
        li{
            border-bottom: 1px solid#C6C2C3;
        }

        li:nth-last-of-type(1){
            border-bottom:0;
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
.add_priority{
  position: fixed;
  padding-top: 10px;
  height: 83px;
  width: 93px;
  bottom: 167px;
  right: 29px;
  background: #D80E1C;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  font-size: 20px;
}
.remove{
  width: 102px;
  height: 52px;
  background: #D80E1C
}
.remove{
    color: #fff;
    font-size: 26px;
    padding: 14px 26px;
    margin-right: 30px;
}
.shunxu{
    margin-right: 40px;
}
.addClass{
    width: 120px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
</style>
