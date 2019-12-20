import axios from 'axios'
// import { Indicator } from 'mint-ui';
import Vue from 'vue';
// import { Toast } from 'vant';
// import icon from '../assets/images/loding-01.gif'
// Vue.use(Toast);
import store from '../store'
import { Toast,Notify  } from 'vant';
// import router from '../router.js'
const token = localStorage.getItem("token");
const api = axios.create()
api.defaults.baseURL = '/'
// api.defaults.timeout = 5000
// api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// api.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

// 请求拦截
api.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // store.commit('SET_LOADING', true)
  // // 如果有token,添加到请求报文 后台会根据该报文返回status
  // Toast.loading({
  //   duration: 0, // 持续展示 toast
  //   forbidClick: true,
  //   icon: icon
  // });

  return config
}, function (error) {
  // 对请求错误做些什么

  // store.commit('SET_LOADING', false)
  console.log(error);
  return Promise.reject(error)
})

// 添加响应拦截器
api.interceptors.response.use(function (response) {
  // Toast.clear();
  // store.commit('SET_LOADING', false)
  // 对响应数据做点什
  console.log(response.status,response.data.flag);
  if(response.status && response.status == 200){
    if(response.data && response.data.flag == 0){
      console.log(response);
      return Promise.resolve(response.data.results)
    }else{
      // Toast(response.data.message)
      Notify({ type: 'danger', message:response.data.message });
    }
  }else{
    Notify({ type: 'danger', message: response.statusText || '服务器错误' });
    // Toast(response.statusText || '服务器错误')
  }
  return Promise.reject(error)
}, function (error) {
  // Toast.clear();
  // 对响应错误做点什么
  // store.commit('SET_LOADING', false)

  // Toast(error.message||'请求超时')
  Notify({ type: 'danger', message: error.message||'请求超时'});


  return Promise.reject(error)
})
export default api
