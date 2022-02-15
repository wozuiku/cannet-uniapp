<template>
	<view>
		
	</view>
</template>

<script>
	import {
		APP_ID
	} from "@/env";
	//#ifdef H5
	 import wxtool from '@/common/wechat/wxtool.js'; //获取公众号code\openid
	//import VConsole from 'common/vConsole-v3.3.0.js'
	//#endif
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			let userInfo=uni.getStorageSync('userInfo');
			//let token=Vue.prototype.token;
			console.log("userInfo",userInfo);
			let code=wxtool.getUrlCode("code");//微信回调后再跳转带code参数返回主页
			let wxcode=code?("?code="+code):"";
			uni.setStorageSync('code',code);
			if(code==null||code==""){//先判断code是否存在
				if(wxtool.isWechat()){
					wxtool.wxAuthorize(APP_ID ,function(code){
						console.log("Code=",code);
						
					})
				}else{
					if(userInfo==""||userInfo==null){
						console.log("userInfo不存在，将跳转登录===============");
						uni.reLaunch({
						    url: '/pages/auth/index',
						 });
						
					}else{
							uni.reLaunch({
							    url: '/pages/index/index/index'+wxcode,
							 });
						console.log('userInfo不为空！');
					}
					// if(userInfo!=""||userInfo!=null){//为空就跳登录页面
					// 	uni.reLaunch({
					// 	    url: '/pages/index/index/index'+wxcode,
					// 	 });
						
					// }else{
					// 	console.log('userInfo为空！');
					// }
				}
				
			
			}else{//如果code存在，则判断token是否存在
			console.log("code存在，则判断token是否存在===============");
				// if(userInfo!=""&&userInfo!=null){
				// 	console.log("userInfo存在，将跳转主页===============");
				// 	uni.reLaunch({
				// 	    url: '/pages/index/index/index',
				// 	 });
					
				// }else{
				// 	console.log('userInfo为空！');
				// }
				if(userInfo==""||userInfo==null){
					console.log("userInfo不存在，将跳转登录===============");
					uni.reLaunch({
					    url: '/pages/auth/index',
					 });
					
				}else{
					console.log('userInfo不为空！');
						uni.reLaunch({
						    url: '/pages/index/index/index',
						 });
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
