<template>
	<view>

		<view v-if="roomCount > 0">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					房间列表
				</view>
			</view>

			<view class="cu-list menu">
				<view class="cu-item arrow" v-for="(item,index) in roomList" :key="index" @tap="showAction(item)">
					<view class="content">
						<image src="/static/images/user/pic.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">{{item.roomName}}</text>
					</view>
					<view class="action">
						<view v-if="item.masterSign==0">
							<view class="cu-tag round bg-olive light">主户</view>
						</view>

						<view v-if="item.masterSign==1">
							<view class="cu-tag round bg-olive light">分户</view>
						</view>
					</view>
				</view>
			</view>
		</view>


		<view v-if="roomCount==0">
			<view class="bind-room-nobind-box">
				<view class="bind-room-notice">
					<text class="text-grey">暂未绑定</text>
				</view>

				<view class="bind-room-tobind">
					<button class="bg-gradual-blue bind-room-tobind shadow" @click="scanCode">扫码绑定</button>
				</view>
			</view>
		</view>
		<u-action-sheet :cancel-btn="true" :mask-close-able="true"  @click="clickAction" :list="actionlist"
			v-model="show" :safe-area-inset-bottom="true"></u-action-sheet>
	</view>
</template>

<script>
	import Main from './main.js'
	export default Main
</script>

<style lang="scss" scoped>
	@import "./main.scss"
</style>
