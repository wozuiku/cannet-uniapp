<script>
	import Vue from 'vue';
	import {
		APP_ID
	} from "@/env";
	//#ifdef H5
	 import wxtool from '@/common/wechat/wxtool.js'; //获取公众号code\openid
	//import VConsole from 'common/vConsole-v3.3.0.js'
	//#endif
	export default {
		onLaunch: function() {
			console.log('App Launch',location.href)
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
			
					// #ifdef MP-WEIXIN || MP-QQ
					Vue.prototype.StatusBar = e.statusBarHeight;
					let capsule = wx.getMenuButtonBoundingClientRect();
					if (capsule) {
						Vue.prototype.Custom = capsule;
						// Vue.prototype.capsuleSafe = uni.upx2px(750) - capsule.left + uni.upx2px(750) - capsule.right;
						Vue.prototype.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					}
					// #endif		
				
			
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
			
			
		},
		onShow: function() {
			console.log('App Show')
			//let tenantid=this.$commom.getLocalParam("tenantid");
				//this.$commom.getCustomTableList({"tenantId":tenantid});//获取自定义字段段
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style>
	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 40upx 0px;
		justify-content: space-between;
	}
	
	.nav-li {
		padding: 30upx;
		border-radius: 12upx;
		width: 45%;
		margin: 0 2.5% 40upx;
		background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}
	
	.nav-li::after {
		content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10upx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}
	
	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}
	
	.nav-title {
		font-size: 32upx;
		font-weight: 300;
	}
	
	.nav-title::first-letter {
		font-size: 40upx;
		margin-right: 4upx;
	}
	
	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}
	
	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40upx;
		height: 6upx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}
	
	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100upx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40upx;
		opacity: 0.3;
	}
	
	.nav-name::first-letter {
		font-weight: bold;
		font-size: 36upx;
		margin-right: 1px;
	}
	
	.nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}
	
	.text-light {
		font-weight: 300;
	}
	/*水平垂直居中并且竖向排列*/
	.flexcolumn {
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: center;
		/*水平居中*/
		align-items: center;
		/*垂直居中*/
	}

	/*水平垂直居中并且横向排列*/
	.flexrow {
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		justify-content: center;
		/*水平居中*/
		align-items: center;
		/*垂直居中*/
	}

	/*水平垂直并且横向排列*/
	.flexrowstart {
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		justify-content: flex-start;
		/*水平居中*/
		align-items: center;
		/*垂直居中*/
	}

	/*水平垂直并且左右排列*/
	.flexrowbetween {
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		justify-content: space-between;
		/*左右排布*/
		align-items: center;
		/*垂直居中*/
	}

	.ZColor {
		font-weight: bold;
		margin: 0px 5px;
		color: #1890ff !important;
	}

	.AColor {
		font-weight: bold;
		margin: 0px 5px;
		color: #fff100 !important;
	}

	.BColor {
		font-weight: bold;
		margin: 0px 5px;
		color: #8fc31f !important;
	}

	.CColor {
		font-weight: bold;
		margin: 0px 5px;
		color: #e60012 !important
	}
	.spaceheight{   /* 底部撑高 */
		height: 100rpx;
		width: 100%;
	}
	.width-full{
		width: 100%;
	}
	.heigth-full{
		height: 100vh;
	}
</style>
<style lang="scss">
	@import 'static/style/index.scss';
</style>
