<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">

			<block slot="content">充值详情</block>
			<block slot="right">
				<!-- 	<view class="margin-right text-xxl">
					<navigator url="../sancode/sancode" open-type="navigate">
						<text class="cuIcon-add " style="font-size: 40upx;"></text>
					</navigator>
				</view> -->
			</block>
		</cu-custom>
		<scroll-view scroll-y="true" class="page">
			<view>
				<view class="cu-list">
					<view class="cu-item padding-sm bg-white  margin-top-sm">
						<view class="content" style="">
							<view class="yhname">{{custom.roomName.columnAlias||custom.roomName.columnDescription}}：{{item.roomName}}2364197227</view>
							<view class="flex justify-between">
								<text class="yhinfo">{{item.userName}}35kv田蕾I路326间隔（考核表）</text>
								<text class="devinfo" @tap="toDevInfo" data-target="DrawerModalR">监测点信息</text>
							</view>
							<view class="yhinfo">
								<text class="cuIcon-location" style="font-size: 24rpx;"></text>
								<text style="font-size: 26rpx;font-weight: 400;">{{item.userAddress}}古雷镇古雷村委会010-05号东林自然村</text>
							</view>
							
						</view>
					</view>
					<view class="cu-item margin-top-sm bg-white flex justify-between padding-sm">
						<view class="text-gray">订单编号</view>
						<view class="text-666">2022093240938420388089083</view>
					</view>
					<view class="cu-item  bg-white flex justify-between padding-sm">
						<view class="text-gray">充值状态</view>
						<view class="text-666">充值成功</view>
					</view>
					<view class="cu-item  bg-white flex justify-between padding-sm">
						<view class="text-gray">充值时间</view>
						<view class="text-666">2021-01-01 00:00:00</view>
					</view>
					<view class="cu-item  bg-white flex justify-between padding-sm">
						<view class="text-gray">充值金额</view>
						<view class="text-666">10000 元</view>
					</view>
					<view class="cu-item  bg-white flex justify-between padding-sm">
						<view class="text-gray">手续费</view>
						<view class="text-666">1元</view>
					</view>
					<view class="cu-item  bg-white flex justify-between padding-sm">
						<view class="text-gray">到账金额</view>
						<view class="text-666">9999 元</view>
					</view>
					<view class="cu-item  bg-white flex justify-between padding-sm">
						<view class="text-gray">支付方式</view>
						<view class="text-666">微信支付</view>
					</view>
					
					<view class="cu-item   margin-top-sm bg-white flex justify-between padding-sm">
						<view class="text-bold">退款信息</view>
						<view class="text-bold text-green">已退款</view>
					</view>
					<view class="cu-item  bg-white flex justify-between padding-sm">
						<view class="text-gray">退款方式</view>
						<view class="text-666">原路返回</view>
					</view>
					<view class="cu-item  bg-white flex justify-between padding-sm">
						<view class="text-gray">退款金额</view>
						<view class="text-666">10000 元</view>
					</view>
					<view class="cu-item  bg-white flex justify-between padding-sm">
						<view class="text-gray" style="min-width: 66px;">退款备注</view>
						<view class="text-666">已按原路返回，请注意查收 客家话JFK危害健康服务和范围划分和我尽快为可划分为回复i额外和覅我</view>
					</view>
					
					
					
					<view class="spaceheight"></view>
				</view>
			</view>
		</scroll-view>
		<view class="line" style="position: fixed;bottom: 0;width: 100%;">
			<button class="cu-btn  block  lg rechargebtn margin-top" >
				退款</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: {}, //
				custom:this.$commom.getCustom(),
			}
		},
		onLoad() { //页面加载

		},
		onShow() { //页面显示

		},
		onReady() { //页面初次显示
		},
		onHide() { //页面隐藏
		},
		onUnload() { //页面卸载

		},
		onBackPress() { //页面返回

		},
		onShareAppMessage() { //分享
		},
		onReachBottom() { //下拉加载
		},
		onPageScroll() { //页面滚动
			console.log('页面滚动...')
		},
		onPullDownRefresh() { //上拉刷新
			uni.stopPullDownRefresh();
		},

		// #ifdef APP-PLUS
		onNavigationBarButtonTap() {

		},
		// #endif
		methods: {

		}
	}
</script>

<style>
	.yhname {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		line-height: 48rpx;
	}

	.yhinfo {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666666;
	}
	.rechargebtn{
		background: linear-gradient(90deg, #007DFF 0%, #00C5FF 100%);
		color: #fff;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		height: 98rpx;
		width: 100%;
	}
	
</style>
<style lang="scss" scoped>

</style>
