<template>
	<view class="bill-wrap">
		<view class="top-wrap">
			<cu-custom :isBack="true"><block slot="backText">电费账单</block><block slot="content"></block></cu-custom>
			<view class="user-message">
				<view class="user-address">福建交通运输部漳州保障中心</view>
				<view class="user-number">
					<view class="user-number-label">用户号：</view>
					<view class="user-number-text">123456</view>
				</view>
				<view class="user-location">
					<image class="user-location-icon" src="/static/images/user/bind_location.png"></image>
					<view class="user-location-text">漳州市蓝天开发区</view>
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	import Main from './main'
	export default Main
</script>

<style lang="scss" scoped>
	@import "./main.scss"
</style>
