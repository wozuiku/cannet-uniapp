<template>
	<view class="pay-wrap">
		<view class="pay-content-box shadow">
			<view class="balance-box">
				<view class="balance-label">
					余额
				</view>
				<view class="balance-value ">
					44.2元
				</view>
				
			</view>
			
			<view class="pay-line">
				<view class="solid-bottom"></view>
			</view>
			
			<view class="payname-box">
				<view class="payname-label">
					缴费户名
				</view>
				<view class="payname-value ">
					*志贤
				</view>
			</view>
			
			<view class="payaccount-box">
				<view class="payaccount-label">
					缴费户号
				</view>
				<view class="payaccount-value ">
					123456
				</view>
			</view>
			
			<view class="payacompany-box">
				<view class="payacompany-label">
					缴费单位
				</view>
				<view class="payacompany-value ">
					福建省电费
				</view>
			</view>
			
			<view class="address-box">
				<view class="address-label">
					地址
				</view>
				<view class="address-value ">
					芗城区金峰南路101号漳州万科城******15栋3803
				</view>
			</view>
			
			<view class="pay-amount-label">
				输入金额
			</view>
			
			<view class="pay-amount-box">
				<view class="pay-amount-rmb">
					￥
				</view>
				<view>
					<input class="pay-amount-value"  v-model="form.data.payAmount" @input="changeAmount" @blur="checkValue" placeholder=""></input>
				</view>
			</view>
			
			<view class="pay-line">
				<view class="solid-bottom"></view>
			</view>
			
			<view class="pay-tag-box">
				<view :class="isTag1Selected?'pay-tag-item-selected':'pay-tag-item'" @tap="select_tag(1)">50</view>
				<view :class="isTag2Selected?'pay-tag-item-selected':'pay-tag-item'" @tap="select_tag(2)">100</view>
				<view :class="isTag3Selected?'pay-tag-item-selected':'pay-tag-item'" @tap="select_tag(3)">500</view>
				<view :class="isTag4Selected?'pay-tag-item-selected':'pay-tag-item'" @tap="select_tag(4)">1000</view>
			</view>
			
		</view>
		
		
		
		<view class="pay-btn-box">
			<button class="bg-gradual-blue pay-submit-btn shadow" @tap="paySubmit">立即缴费</button>
		</view>
		
		<view class="pay-record-box">
			<button class="u-reset-button pay-record-btn">此户号的缴费记录</button>
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