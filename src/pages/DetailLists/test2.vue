<template>
<div>
    <button @click="openPicker('picker')">Click me!</button>
    <div>v-model 双向绑定的时间---{{pickerValue}}</div>
    <div>选定的时间----{{selectValue}}</div>
    <p>去掉双向绑定即可</p>

    <mt-datetime-picker
      ref="picker" 每一个都要填上这一条open
      type="date"
      aa="picker1"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate="startDate"
      :endDate="endDate"
      @confirm="handleConfirm" 设置点击确定
      v-model="pickerValue">
    </mt-datetime-picker>
</div>
</template>
<script>
import {format} from '../../assets/js/Util.js'
import {Toast} from 'mint-ui'
export default {
  data () {
    return {
      pickerValue: null,
      selectValue:'',
      startDate: new Date('2010/1/1'),
      endDate: new Date('2040/12/31')
    }
  },
  methods: {
    openPicker(){
      this.$refs.picker.open();
    },
    handleConfirm(value){
      console.log(this.$refs)
      console.log(this.$refs.picker)
      console.log(this.$refs.picker.$attrs.aa)
      this.selectValue = format(value, 'yyyy-MM-dd HH:mm:ss');
      Toast({ //提示
        message: '已选择 ' + value.toString(),
        position: 'bottom'
      });
    },
  }
}
</script>
