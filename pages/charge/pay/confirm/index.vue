<template>
	<view class="confirm-wrap">
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="receiver-label">收款方</text>
				</view>
				<view class="action">
					<text class="receiver-value">国家电网公司</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="payamount-label">支付金额</text>
				</view>
				<view class="action">
					<text class="payamount-value">{{payAmount}}元</text>
				</view>
			</view>
		</view>


		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="paymethod-label">支付方式</text>
			</view>

		</view>
		<radio-group class="block" @change="radioChange">
			<view class="cu-list menu">


				<view class="cu-item">
					<view class="content">
						<image src="/static/images/pay/wepay.png"></image>
						<text class="text-grey">微信</text>
					</view>

					<view class="action">
						<radio class="blue" value="WEIXIN" style="transform:scale(0.8);">
						</radio>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<image src="/static/images/pay/alipay.png"></image>
						<text class="text-grey">支付宝</text>
					</view>
					<view class="action">
						<radio class='blue' value="ZHIFUBAO" style="transform:scale(0.8);">
						</radio>
					</view>
				</view>

			</view>
		</radio-group>
		<view class="pay-confirm-btn-box">
			<button class="bg-gradual-blue pay-confirm-btn shadow" @tap="confirmSubmit">确认支付</button>
		</view>
	</view>
</template>

<script>
	
	import {
		formatMoney
	} from '@/utils/formatter';
	
	export default {
		data() {
			return {
				radio: '',
				payAmount: '',
			}
		},
		
		onLoad() {
			this.payAmount = formatMoney(this.$Route.query.payAmount, 2);
		},
		
		methods:{
			radioChange(e) {
				console.log('RadioChange',e.detail.value)
			},
			
			confirmSubmit(){
				console.log('confirmSubmit');
			},
		}
	}
</script>

<style lang="scss" scoped>
	.confirm-wrap {

		.receiver-label {
			color: #aaaaaa;
			font-size: 26rpx;

		}

		.receiver-value {
			font-size: 28rpx;

		}


		.payamount-label {
			color: #aaaaaa;
			font-size: 26rpx;
		}

		.payamount-value {
			font-size: 28rpx;
		}

		.paymethod-label {
			font-size: 26rpx;
		}

		.paymethod-checkbox-size {
			height: 22rpx;
			width: 22rpx;
		}

		.pay-confirm-btn-box {
			margin-top: 120rpx;
			padding-left: 32rpx;
			padding-right: 32rpx;
			height: 80rpx;

			.pay-confirm-btn {
				color: #FFF;
				font-size: 32rpx;
				line-height: 80rpx;
			}
		}

	}
</style>
