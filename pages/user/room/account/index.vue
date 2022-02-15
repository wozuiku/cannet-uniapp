<template>
	<view class="account-wrap">
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				账户列表
			</view>
		</view>

		<view class="cu-list menu">
			<view class="cu-item" v-for="(item,index) in accountList" :key="index">
				<view class="content">
					<image src="/static/images/user/pic.png"></image>
					<text class="text-grey">{{item.fullName}}</text>
				</view>
				<view class="action">
					<view class="account-btn-box">
						<button class="cu-btn bg-green round shadow allow-pay-btn" @tap="allowPay(item)">
							{{item.allowPayText}}</button>
						
						<view class="unbind-btn-box">
							<button class="cu-btn bg-orange round shadow unbind-btn" @tap="unBind(item)">
								解除绑定</button>
						</view>

					</view>
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
