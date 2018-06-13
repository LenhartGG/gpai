<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components:{
  }
}
</script>

<style>
#app{
  width: 100%;
  height: 100%;
}
</style>
