<template>
  <!-- 下拉框 -->
  <div class="section_combobox">
    <div class="box">
      <div class="title">
        标的物类型
      </div>
      <div class="content">
        <ul>
          <li v-for="(item, index) in 10" :key="index">
            <span>机动车</span><i class="selected"></i>
          </li>
        </ul>
      </div>
      <div class="cancel">取消</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.section_combobox{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display:flex;
  align-items: center;/*垂直居中*/
  justify-content: center;/*水平居中*/
  width:100%;
  height:100%;
  .box{
    width: 603px;
    height: 663px;
    background: #fff;
    position: relative;
    overflow: auto;
    .title{
      height: 76x;
      border-bottom: 2px solid #cccccc;
      font-size: 32px;
      color: #333333;
      text-align: center;
      line-height: 76px;
    }
    .content{
      height: 500px;
      overflow: auto;
      ul{
        padding:0 30px;
        li{
          height: 76px;
          line-height: 76px;
          font-size: 26px;
          color: #666666;
          border-bottom: 2px solid #D9D9D9;
          span{

          }
          i{
            float: right;
            width: 47px;
            height: 47px;
            margin-top: 15px;
            border: 1px solid #999999;
            border-radius: 50%;
          }
          .selected{

          }
        }
        li:nth-last-of-type(1){
          border: 0;
        }
      }
    }
    .cancel{
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 83px;
      line-height: 83px;
      text-align: center;
      background: #CCCCCC;
      font-size: 32px;
      color: #FFFFFF;
    }
  }
}
</style>
