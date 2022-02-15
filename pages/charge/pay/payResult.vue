<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">

			<block slot="content">支付详情</block>
			<block slot="right">
				<!-- 	<view class="margin-right text-xxl">
					<navigator url="../sancode/sancode" open-type="navigate">
						<text class="cuIcon-add " style="font-size: 40upx;"></text>
					</navigator>
				</view> -->
			</block>
		</cu-custom>
		<scroll-view scroll-y="true" class="page">
		<view class="step-bar-list">
			<view class="step-item bg-white ">
				<view class="step-item-left flex flex-direction justify-center align-center">
					<view style="width:0px;" class="flex-sub bg-grey step-item-line"></view>
					<text class="cuIcon-roundcheckfill  text-blue" style="font-size: 66rpx;"></text>
					<view style="width:1px;" class="flex-sub bg-blue"></view>
				</view>
				<view class="step-item-right flex flex-direction justify-start align-start padding-sm">
					<view class="text-333 text-lg text-bold">支付成功</view>
					<view class="text-red  text">{{roomInfo.money}}元</view>
				</view>
			</view>
			<view class="step-item bg-white ">
				<view class="step-item-left flex flex-direction justify-center align-center">
					<view style="width:1px;" class="flex-sub bg-blue step-item-line"></view>
					<text class="cuIcon-timefill text-xsl text-blue" style="font-size: 44rpx;"></text>
					<view style="width:1px;" class="flex-sub bg-grey"></view>
				</view>
				<view class="step-item-right flex flex-direction justify-start align-start padding-sm">
					<view class="text-333 text-lg text-bold">充值中</view>
					<view class="text-999 text-sm text">充值量大,可能存在延迟,请关注到账提醒</view>
				</view>
			</view>
			<view class="step-item bg-white ">
				<view class="step-item-left flex flex-direction justify-center align-center">
					<view style="width:1px;" class="flex-sub bg-grey step-item-line"></view>
					<text class="cuIcon-rechargefill text-xsl "></text>
					<view style="width:0px;" class="flex-sub bg-grey"></view>
				</view>
				<view class="step-item-right flex flex-direction justify-start align-start padding-sm">
					<view class="text-333 text-lg text-bold">充值成功</view>
					
				</view>
			</view>
		</view>
		<view class="bg-gradual-blue margin text-center padding-sm radius" @tap="confirm()">
			完成
		</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				roomInfo:{"money":"-"}
			}
		},
		onLoad(e) { //页面加载
			if(e.item){//如果有传值过来的数据
				this.roomInfo = JSON.parse(decodeURIComponent(e.item));
				console.log("传递过来的数据", this.roomInfo);
			}
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
			confirm(){
				uni.redirectTo({
				   url: '/pages/charge/pay/topay?item=' + encodeURIComponent(JSON.stringify(this.roomInfo)),
				});
			},
		}
	}
</script>

<style>
	.bg-grey{
		background-color: #E3E3E3;
	}
	.step-bar-list{
		display: flex;
		flex-direction: column;
	}
	.step-item{
		display: flex;
	}
	.step-item-left{
		width: 15vw;
	}
	.step-item-right{
		width: 85vw;
	}
	.step-bar-list>.step-item-line:first-child{
		display: none;
	}
/* .cu-timeline>.cu-item:first-child::after{
	top:50rpx
} */
</style>
<style lang="scss" scoped>

</style>
