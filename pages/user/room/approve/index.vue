<template>
	<view class="approve-wrap">
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				申请列表
			</view>
		</view>

		<view v-if="applicationCount > 0">
			<view class="cu-list menu">
				<view class="cu-item" v-for="(item,index) in applicationList" :key="index">
					<view class="content">
						<image src="/static/images/user/pic.png"></image>
						<text class="text-grey">{{item.name}}</text>
					</view>
					<view class="action">
						<view class="approve-btn-box">
							<!-- <view class="approve-agree-btn"> -->
							<button class="cu-btn bg-green round approve-agree-btn" @tap="approveAgree(item)">
								同意</button>
							<!-- </view> -->

							<view class="approve-reject-btn-box">
								<button class="cu-btn bg-orange round approve-reject-btn" @tap="approveReject(item)">
									拒绝</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view v-if="applicationCount == 0">
			<view class="no-data">
				暂无申请数据
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
