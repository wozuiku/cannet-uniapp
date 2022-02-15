<template>
	<view class="result-wrap">
		<view class="result-icon-box">
			<image v-if="resultType=='sucess'" class="result-icon" src="/static/images/user/bind_success.png"></image>
			<image v-if="resultType=='fail'" class="result-icon" src="/static/images/user/bind_fail.png"></image>
			
		</view>
		<view class="result-text-box">
			<view class="result-text">{{resultMsg}}</view>
		</view>
		<view class="prompt-text-box">
			<view class="result-text">
				{{promptText}}后跳转绑定用户列表页面
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				promptText:'',
				resultType:'',
				resultMsg:''
			}
			
		},
		
		onLoad(options){
			this.resultType = options.type
			this.resultMsg = options.resultMsg
			this.promptChange()
		},
		
		methods:{
			promptChange(){
				let n = 5;
				this.promptText = n + '秒';
				const run = setInterval(() => {
					n -= 1;
					if (n < 0) {
						clearInterval(run);
					}
					this.promptText = n + '秒';
					if (this.promptText < 0 + '秒') {
						uni.navigateTo({
							url:'/pages/user/bind/index/index'
						})
					}
				}, 1000);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.result-wrap{
		display: flex;
		flex-direction: column;
		justify-content: center;
		
		.result-icon-box{
			display: flex;
			justify-content: center;
			margin-top: 120rpx;
			.result-icon{
				height: 120rpx;
				width: 120rpx;
			}
		}
		
		.result-text-box{
			display: flex;
			justify-content: center;
			margin-top: 60rpx;
			.result-text{
				font-size: 36rpx;
				font-weight: 600;
			}
			
		}
		
		.prompt-text-box{
			display: flex;
			justify-content: center;
			margin-top: 60rpx;
			.prompt-text{
				
			}
			
		}
	}
</style>
