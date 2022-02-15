<template>
	
	<view class="page">
		<cu-custom  bgColor="bg-white" :isBack="true" >
			<block slot="backText"></block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		
		<view class="content">
			
			<image class="building-image" src="/static/images/public/public_building.png"></image>
			<view class="prompt-line1">
				功能建设中...
			</view>
			<view class="prompt-line2 text-gray">
				开发人员正在努力建设该功能，尽情期待！
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
			
			.building-image{
				margin-top: 240rpx;
				width: 240rpx;
				height: 240rpx;
				
			}
			
			.prompt-line1{
				margin-top: 36rpx;
				font-size: 36rpx;
				
			}
			
			.prompt-line2{
				margin-top: 22rpx;
				
			}
			
		}
	}
	
</style>
