<template>
	<view>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				房间账户列表
			</view>
		</view>
		
		<view class="cu-list menu">
			<view class="cu-item" v-for="(item,index) in accountList" :key="index" >
				<view class="content">
					<image src="/static/images/user/pic.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">{{item.fullName}}</text>
				</view>
				<view class="action">
					<view class="cu-tag round bg-olive light">审批</view>
					
				</view>
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

