import Vue from 'vue'
import App from './App'
import store from "@/store";
import uView from '@/uni_modules/uview-ui'
import http from '@/common/request/index'
import platform from '@/utils/platform'
// #ifdef H5
import wxsdk from '@/common/wechat/sdk'
// #endif
import {API_URL, IMG_URL} from '@/env';
//通用方法
import commom from '@/common/commonfun.js'
import vConsole from 'vconsole' // 引入vconsole
Vue.prototype.$vConsole = new vConsole() // 使用vconsole

import cuCustom from '@/uni_modules/colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import MyEcharts from '@/components/echarts/echarts.vue';
Vue.component('my-echarts',MyEcharts)  // 全局echarts组件

App.mpType = 'app'
//引入全局uView
Vue.use(uView);

//挂载变量
Vue.prototype.$API_URL = API_URL;
Vue.prototype.$IMG_URL = IMG_URL;
//挂载请求
Vue.prototype.$http = http;
//平台判断
Vue.prototype.$platform = platform;

Vue.prototype.$commom = commom;//by  luzq
//微信H5，wxsdk挂载
// #ifdef H5
Vue.prototype.$wxsdk = wxsdk;
// #endif
Vue.prototype.$custom={"roomName":{},"userName":{},"phoneNumber":{},"userAddress":{},
"spare01":{},"spare02":{},"spare03":{},"spare04":{}};//自定义字段赋值为全局

//微信jssdk
//#ifdef H5
let jweixin = require('jweixin-module');
Vue.prototype.$wx = jweixin;

//#endif

Vue.prototype.$Dict={
	"NYDN":"电",
	"NYSN":"水",
	"NYQN":"气",
	"NYLN":"热",
	"NYHJ":"环境",
	"NYKG":"开关(IO)",
};

Vue.prototype.$toast=function(title){
	uni.showToast({
	    title: title,
	    duration: 4000,
		icon:"none"
	});
}
Vue.prototype.$showloading=function(title='加载中'){
	uni.showLoading({
	    title: title,
		mask:true,
	});
}
Vue.prototype.$hideloading=function(){
	uni.hideLoading();
}
//弹窗
Vue.prototype.$showdialog=function(title,content,comfirm,cancel){
	console.log("进入弹窗");
	uni.showModal({
	    title: title,
	    content: content,
		showCancel:cancel?true:false,
	    success: function (res) {
	        if (res.confirm) {
	           comfirm();
	        } else if (res.cancel) {
	           cancel();
	        }
	    }
	});
}



const app = new Vue({
	store,
    ...App
})

app.$mount(); 



			


