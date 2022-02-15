<template>
	
	<view class="info-wrap">
		
		<view class="info-content-box shadow">
			
			<view class="account-name-box">
				<view class="account-name-label">
					全名
				</view>
				<view class="account-name-value ">
					{{account.fullName}}
				</view>
			</view>
			
			<view class="phone-number-box">
				<view class="phone-number-label">
					手机号
				</view>
				<view class="phone-number-value ">
					{{account.phoneNumber}}
				</view>
			</view>
		</view>
		
		<view class="info-handle-box">
			<view class="allow_pay_btn-box">
				
				<button class="cu-btn bg-blue shadow allow_pay_btn" @tap="allow_pay">允许扣费</button>
				
			</view>
			
			<view class="unbind-btn-box">
				<button class="cu-btn bg-orange shadow unbind-btn" @tap="unbind">解除绑定</button>
			</view>
			
		</view>
	</view>
</template>

<script>
	
	export default {
		data(){
			return{
				account: {},
				
				allowedDeductions:'',
			}
		},
		
		onLoad(option){
			
			this.account = this.$Route.query.account
			
		},
		
		methods:{
			allow_pay(){
				this.$http(
					'user.accountAllowPay', {
						id: this.account.id,
						allowedDeductions: 0
					},
					'允许扣费...'
				).then(res => {
					console.log('res:', res);
					if(res.code === 200){
						this.accountList = res.data
						this.accountCount = res.totalCount
					}
					
				});
			},
			
			unbind(){
				
			},
		},
		
		
	}
</script>

<style lang="scss" scoped>
	
	.info-wrap{
		display: flex;
		flex-direction: column;
		height: 100vh;
		
		.info-content-box{
			display: flex;
			flex-direction: column;
			margin-top: 120rpx;
			margin-left: 38rpx;
			margin-right: 38rpx;
			background-color: #FFF;
			border-radius: 18rpx;
			
			.account-name-box{
				display: flex;
				padding-left: 28rpx;
				padding-top: 28rpx;
				.account-name-label{
					flex:3;
					color: #aaaaaa;
				}
				.account-name-value{
					flex:7
				}
			}
			
			.phone-number-box{
				display: flex;
				padding-left: 28rpx;
				padding-top: 28rpx;
				padding-bottom: 28rpx;
				.phone-number-label{
					flex:3;
					color: #aaaaaa;
				}
				.phone-number-value{
					flex:7
				}
			}
			
			
		}
		
		.info-handle-box{
			display: flex;
			
			justify-content: center;
			margin-top: 40rpx;
			.allow_pay_btn-box{
				padding: 16rpx;
				
				.allow_pay_btn{
					width: 290rpx;
				}
				
				
			}
			.unbind-btn-box{
				padding: 16rpx;
				.unbind-btn{
					width: 290rpx;
				}
				
				
			}
		}
	}
	
</style>
