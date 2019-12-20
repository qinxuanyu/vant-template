import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/utils/api'

import FastClick from 'fastclick'

import '@/style/base.css'
import { Button, List, Image, Field, Picker, Popup,CellGroup,PullRefresh,Toast,Notify,Dialog, NavBar  } from 'vant'
Vue.config.productionTip = false
Vue.use(CellGroup ).use(Button).use(List).use(Image).use(Field).use(Picker).use(Popup).use(PullRefresh).use(Toast).use(Notify).use(Dialog)
.use(NavBar)


FastClick.prototype.focus = function (targetElement) {   //解决FastClick在ios输入框聚焦慢
  let length;
  if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length;
    targetElement.focus();
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
}
FastClick.attach(document.body)
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
