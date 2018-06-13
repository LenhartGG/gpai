<template>
    <div class="content">
        <ul class="items clearfix">
            <router-link :to="{path:'/detail'}" v-for="item in 10" :key="item" tag="li">
                <div class="left ">
                    <div class="label">10日</div>
                    <img src="" alt="">
                </div>
                <div class="right ">
                    <p class="title">(2017)&nbsp;&nbsp;沪0114执2996号</p>
                    <p class="address">上海市虹口区同丰路667弄45号1107室上海市虹口区同丰路667弄45号1107室</p>
                    <i class="state">前期调查中</i>
                    <p class="court">上海市虹口区人民法院</p>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<style lang="less">

.content{
    position: fixed;
    top: 272px;
    left: 0;
    right: 0;
    bottom: 101px;
    overflow: auto;
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
                    height: 27px;
                    line-height: 27px;
                    font-size: 28px;
                    color: #333333;
                    margin-bottom: 20px;
                }
                .address{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    height: 63px;
                    line-height: 33px;
                    font-size: 26px;
                    color: #666;
                    margin-bottom: 18px;
                }
                .state{
                    display: inline-block;
                    width: 153px;
                    height: 33px;
                    line-height: 33px;
                    text-align: center;
                    border: 1px solid #D80E1C;
                    color: #D80E1C;
                    margin-bottom: 18px;
                    font-size: 20px;
                }
                .court{
                    height: 22px;
                    line-height: 22px;
                    font-size: 22px;
                    color: #999;
                }
            }
        }
    }
}
</style>
