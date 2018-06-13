<template> 
 <div> 
   <van-datetime-picker
    v-model="currentDate"
    type="datetime"
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="pp"
  />
 </div> 
</template> 
<script> 
import { DatetimePicker } from 'vant';
export default { 
 data () { 
 return { 
    minHour: 10,
    maxHour: 20,
    minDate: new Date(),
    maxDate: new Date(2019, 10, 1),
    currentDate: new Date()
 }
 },
 methods: {
    confirm(value){
      console.log(value)
    },
    pp(value){
      console.log(value)
    }
  }
} 
</script> 
<style scoped lang="less">
.btn {
  width: 100%;
  height: 3em;
  background-color: green;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>