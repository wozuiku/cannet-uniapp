<template>
	<view>
		<button class='cu-btn bg-blue sms-code-btn' :disabled="disabledCode" type=""
			@tap="getSmsCode(smsType)">{{codeText}}</button>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				codeText: '获取验证码',
				//disabledCode: false,
			}
		},
		
		props:{
			smsType:{
				type: Number,
				default: 0
			},
			
			phoneNumber:{
				type: String,
				default: ''
			},
			
			disabledCode:{
				type: Boolean,
				default: false
			}
			
		},
		
		methods:{
			getSmsCode(smsType) {
				console.log('cannet-sms-code smsType:', smsType);
				if (!this.disabledCode) {
					this.$http(
						'common.smsSend', {
							Telephone: this.phoneNumber,
							SmsType: this.smsType
						},
						'获取验证码中...'
					).then(res => {
						if (res.code === 200) {
							this.codeChange();
							this.$u.toast('验证码已发送，请注意查收短信');
						} else {
							this.$u.toast(res.msg);
						}
					});
				} else {
					this.$u.toast('请稍后再试');
				}
			},
			
			// 倒计时
			codeChange() {
				if (this.disabledCode) return;
				//this.disabledCode = true;
				this.$emit('updateDisabledCode', true)
				let n = 60;
				this.codeText = n + ' s';
				const run = setInterval(() => {
					n -= 1;
					if (n < 0) {
						clearInterval(run);
					}
					this.codeText = n + ' s';
					if (n < 0) {
						//this.disabledCode = false;
						this.$emit('updateDisabledCode', false)
						this.codeText = '重新获取';
					}
				}, 1000);
			},
		}
	}
</script>

<style>
	.sms-code-btn{
		width: 200rpx;
	}
</style>
