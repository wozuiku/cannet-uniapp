<template>
	<view class="action-wrap">
		<view class="line solid-bottom">
			<!-- 去交费 -->
			<view class="item solid-right" @tap="jump('pay')">
				<image class="image-icon" :src="action1.icon" mode="aspectFill"></image>
				<text class="image-name">{{action1.name}}</text>
			</view>
			<!-- 审批分户 -->
			<view v-if="masterSign==0" class="item" @tap="jump('approve')">
				<image class="image-icon" :src="action2.icon" mode="aspectFill"></image>
				<text class="image-name">{{action2.name}}</text>
			</view>
		</view>
		
		<view class="line">
			<!-- 房间账户 -->
			<view v-if="masterSign==0" class="item solid-right" @tap="jump('account')">
				<image class="image-icon" :src="action3.icon" mode="aspectFill"></image>
				<text class="image-name">{{action3.name}}</text>
			</view>
			
			<!-- 其他功能 -->
			<view class="item">
				<image class="image-icon" :src="action4.icon" mode="aspectFill"></image>
				<text class="image-name">{{action4.name}}</text>
			</view>
			
		</view>
		
	
		
	</view>
</template>

<script>
	import Main from './main.js'
	export default Main
</script>

<style lang="scss" scoped>
	@import "./main.scss"
</style>
