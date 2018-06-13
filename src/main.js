// 模块导入
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import base from './assets/js/base.js'
import 'lib-flexible'
import Mint from 'mint-ui'
import wx from 'weixin-js-sdk'
import 'mint-ui/lib/style.css'
import initCss from './assets/css/init.css'
import commonCss from './assets/css/common.css'
import textInput from './components/textInput.vue' //文本输入框
import ComboBox from './components/ComboBox.vue' //下拉选择框
import VueWechatTitle from 'vue-wechat-title';
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
Vue.use(Vant);
// 注册公用组件
Vue.use(require('vue-wechat-title')) //微信设置title
    //将常用的js插件挂载到vue实例上
Vue.prototype.$http = axios
Vue.prototype.$qs = qs
Vue.prototype.$wx = wx
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(Mint)
Vue.use(base)

/* eslint-disable no-new */
new Vue({
        el: '#app',
        router,
        components: { App },
        template: '<App/>'
    })
    //路由变化执行方法
router.afterEach((to, from) => {
    // Vue.prototype.base.wxconfig(to, Vue.prototype.$wx)
})

Vue.filter('HideText', function (value) {
  if (!value) return ''
  if (value.length<=10) {
    value = value.toString()
  } else {
    value = value.substring(0, 12) + '...'
  }
  return value
})

Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
