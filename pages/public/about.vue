<template>
	
	<view class="page">
		<cu-custom  bgColor="bg-white" :isBack="true" >
			<block slot="backText"></block>
			<block slot="content">关于电管家</block>
		</cu-custom>
		
		<view class="content">
			
			<image class="about-image" src="/static/images/public/public_about.png"></image>
			<view class="text-line1">
				电管家
			</view>
			<view class="text-line2 text-gray">
				Version 1.0.0
			</view>
			<view class="text-line3">
				
			</view>
		</view>
		
	</view>
	
	
	
</template>

<script>
	export default {
		data(){
			return {
				title: ''
			}
		},
		
		onLoad(options) {
			this.title = options.title
			
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		.content{
			width: 100%;
			height: 100vh;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: #FFF;
			
			.about-image{
				margin-top: 120rpx;
				width: 220rpx;
				height: 220rpx;
				
			}
			
			.text-line1{
				margin-top: 22rpx;
				font-size: 36rpx;
				
			}
			
			.text-line2{
				margin-top: 16rpx;
				
			}
			
			.text-line3{
				margin-top: 16rpx;
				
			}
			
		}
	}
	
</style>
