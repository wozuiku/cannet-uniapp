// #ifdef H5
var jweixin = require("jweixin-module");
// #endif
import platform from '@/utils/platform'

import {
	APP_ID
} from '@/env'

export default {
	data(){
		return{
			roomInfoList: [],
		}
	},
	
	methods:{
		scanBind(){
			let that = this
			let platform = that.$platform.get();
			let qrCode = ''
			let userInfo = uni.getStorageSync('userInfo');
			
			// #ifdef H5
			if (platform === 'H5') {
				this.$u.toast('普通浏览器不支持扫码功能，请使用小程序或微信内浏览器');
			} else {
				console.log('else');
				this.$wxsdk.scanQRCode(res => {
					//this.scanCodes = res.resultStr.split(',');
					console.log('scanBind res:', res);
					qrCode = res.resultStr
					that.$http(
						'user.roomInfo', {
							QRCode: qrCode,
							AccountId: userInfo.id,
						},
						'获取中...'
					).then(res => {
						console.log('scanBind $http res:', res);
						
						if (res.code === 200) {
							this.roomInfoList = res.data
							console.log('roomInfoList:', this.roomInfoList);
							let isBind = res.data[0].isBind
							let isExistMain = res.data[0].isExistMain
							let roomId = res.data[0].roomInfo.id
							let roomName = res.data[0].roomInfo.roomName
							let userName = res.data[0].roomInfo.userName
							let userAddress = res.data[0].roomInfo.userAddress
							let phoneNumber = res.data[0].roomInfo.phoneNumber
							
							console.log('scanBind $http res phoneNumber:', phoneNumber);
							
					
							if (isBind) {
								that.$u.toast('该房间您已经绑定过了')
							} else {
								let params = '?roomId=' + roomId +
									'&roomName=' + roomName + '&userName=' + userName +
									'&userAddress=' + userAddress + '&phoneNumber=' + phoneNumber
								console.log('scanBind navigateTo params:', params);
								uni.navigateTo({
									url: '/pages/user/bind/bind/index' + params
								});
							}
						} else {
							that.$u.toast(res.message)
						}
					
					});
					
				});
				
			}
			// #endif
			
		},
		
		inputBind(){
			uni.navigateTo({
				url:'/pages/user/bind/bind/index'
			})
		}
	}
}