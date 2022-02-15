/*
 * 登录提示页
 */
import {
	mapMutations,
	mapActions,
	mapState,
	mapGetters
} from 'vuex';

import FormValidate from '@/common/validate/authForm';
import schema from '@/uni_modules/uview-ui/libs/util/async-validator';

export default {
	name: 'cannetAuthModal',
	data() {
		return {
			platform: this.$platform.get(),
			form: {
				//注册
				register: {
					data: {
						accountName: '',
						passWord: '',
						confirmPassWord: '',
						fullName: '',
						phoneNumber: '',
						verificationCode: '',
					},

					rules: {
						accountName: FormValidate.register.accountName,
						passWord: FormValidate.register.passWord,
						confirmPassWord: FormValidate.register.confirmPassWord,
						fullName: FormValidate.register.fullName,
						phoneNumber: FormValidate.register.phoneNumber,
						verificationCode: FormValidate.register.verificationCode,
					},

				},

				//账号密码登录
				accountLogin: {
					data: {
						loginName: '', // 账号
						passWord: '' // 密码
					},
					rules: {
						loginName: FormValidate.accountLogin.loginName,
						passWord: FormValidate.accountLogin.passWord,
					},
				},
				
				//忘记密码
				forgotPwd: {
					data: {
						phoneNumber: '', //手机号
						verificationCode: '', //验证码
						passWord: '', //新密码
						confirmPassWord: '' //确认密码
					},
					rules: {
						phoneNumber: FormValidate.forgotPwd.phoneNumber,
						verificationCode: FormValidate.forgotPwd.verificationCode,
						passWord: FormValidate.forgotPwd.passWord,
						confirmPassWord: FormValidate.forgotPwd.confirmPassWord,
					},
					
				},

				//修改密码
				changePwd: {
					data: {
						oldPassWord: '', //旧密码
						passWord: '', //新密码
						confirmPassWord: '' //确认密码
					},
					
					rules: {
						oldPassWord: FormValidate.changePwd.oldPassWord,
						passWord: FormValidate.changePwd.passWord,
						confirmPassWord: FormValidate.changePwd.confirmPassWord,
					},
				},

			},

			codeText: '获取验证码',
			disabledCode: false,
			protocol: false, //是否同意隐私协议
			placeholderStyle: 'font-size: 30rpx; font-weight: 500;color:#C2C7CF;'
		}
	},

	methods: {
		...mapActions(['getUserInfo', 'showAuthModal']),

		closeAuthModal() {
			this.$store.dispatch('showAuthModal', '');
		},
		
		showToast(message) {
			let params = {
				message: message,
			}
			this.$refs.cannetToast.show({
				...params,
			})
		},

		//获取短信验证码
		getSmsCode(type) {
			console.log('/components/cannet-auth-modal.vue->getSmsCode begin')
			const that = this;
			//手机号符合规则才能发短信
			if(!that.checkValue('phoneNumber')){
				return;
			}
			if (!that.disabledCode) {
				that.$http(
					'common.smsSend', {
						Telephone: that.form[this.authType].data.phoneNumber,
						SmsType: type
					},
					'获取验证码中...'
				).then(res => {
					console.log(res)
					if (res.code === 200) {
						that.codeChange();
						that.$u.toast('验证码已发送，请注意查收短信');
					} else {
						that.$u.toast(res.msg);
					}
				});
			} else {
				that.$u.toast('请稍后再试');
			}
			console.log('/components/cannet-auth-modal.vue->getSmsCode end')
		},


		// 倒计时
		codeChange() {
			if (this.disabledCode) return;
			this.disabledCode = true;
			let n = 60;
			this.codeText = n + 's';
			const run = setInterval(() => {
				n -= 1;
				if (n < 0) {
					clearInterval(run);
				}
				this.codeText = n + 's';
				if (this.codeText < 0 + 's') {
					this.disabledCode = false;
					this.codeText = '重新获取';
				}
			}, 1000);
		},
		
		// 检测
		checkValue(key){
			let valid = true
			this.validation(key, error =>{
				if(error){
					valid = false;
					this.$u.toast(error);
				}
			});
			return valid;
		},


		validation(key, callback = () => {}) {
			console.log('######validation begin######');
			let that = this;
			//拿到需要校验的数据
			let fieldValue = this.form[this.authType].data[key];
			
			//确认密码字段把密码字段值也传
			if(key === 'confirmPassWord'){
				fieldValue = this.form[this.authType].data['passWord'] + ',' + this.form[this.authType].data[key];
			}
			//拿到需要检验的规则
			let rules = this.form[this.authType].rules[key];
			
			// 判空
			if (!rules || rules.length === 0) {
				return callback('');
			}
			// 设置当前的装填，标识为校验中
			let validateState = 'validating';
			// 调用async-validator的方法
			let validator = new schema({
				[key]: rules
			});

			// 校验
			validator.validate({
					[key]: fieldValue
				}, {
					firstFields: true
				},
				(errors, fields) => {
					// 记录状态和报错信息
					validateState = !errors ? 'success' : 'error';
					let validateMessage = errors ? errors[0].message : '';
					callback(validateMessage);
				}
			);
			console.log('######validation end######');
		},

		validateAll() {
			console.log('######validateAll begin######');
			let that = this;
			
			return new Promise(resolve => {
				// 对当前所有表单检验
				let valid = true; // 默认通过
				let count = 0; // 用于标记是否检查完毕
				let errorArr = []; // 存放错误信息
				let curFormData = that.form[that.authType].data;
				
				Object.keys(curFormData).map(field => {
					that.validation(field, error => {
						//如果回调有error
						if (error) {
							valid = false;
							errorArr.push(error);
						}
						
						if (++count === Object.keys(curFormData).length) {
							console.log('===');
							resolve(valid);
							if (errorArr.length) {
								this.$u.toast(errorArr[0]);
							}
							if (typeof callback == 'function') callback(valid);
						}
					})
				})
			})
			console.log('######validateAll end######');
		},
		
		
		validateAll2() {
			console.log('######validateAll begin######');
			let that = this;
			let promise = new Promise(resolve => {
				// 对当前所有表单检验
				let valid = true; // 默认通过
				let count = 0; // 用于标记是否检查完毕
				let errorArr = []; // 存放错误信息
				let curFormData = that.form[that.authType].data;
				
				Object.keys(curFormData).map(field => {
					that.validation(field, error => {
						console.log('error:');
						console.log(error);
			
						//如果回调有error
						if (error) {
							valid = false;
							errorArr.push(error);
						}
					})
				})
				
				if (errorArr.length) {
					this.$u.toast(errorArr[0]);
				}
				
				if (errorArr.length === 0) {
					resolve(true);
				}else{
					resolve(false);
				}
			})
			
			promise.then(function(valid){
				console.log('promise.then.valid:');
				console.log(valid);
				return valid;
			});
			
			console.log('######validateAll end######');
		},
		



		// 规则校验
		validateSubmit() {
			console.log('######validateSubmit begin######');
			if (['register', 'accountLogin'].includes(this.authType) && !this.protocol) {
				this.$u.toast('请同意用户协议');
				return false;
			}
			let valid = this.validateAll();
			console.log('######valid######');
			console.log(valid);
			return valid;
			console.log('######validateSubmit end######');
		},


		// 注册
		async registerSubmit() {

			let that = this;
			(await that.validateSubmit()) && that.$http(
				'user.register', {
					accountName: that.form['register'].data.accountName,
					fullName: that.form['register'].data.fullName,
					passWord: that.form['register'].data.passWord,
					confirmPassWord: that.form['register'].data.confirmPassWord,
					phoneNumber: that.form['register'].data.phoneNumber,
					verificationCode: that.form['register'].data.verificationCode
				},
				'注册中...'
			).then(res => {
				console.log(res)
				if (res.code === 200) {
					that.$u.toast(res.message);
					that.showAuthPage('');
					that.getUserInfo(res.data.token);
				}
				console.log('cannet-auth-modal.vue->registerSubmit end')
			});
		},

		//账号登录
		async accountLoginSubmit() {
			console.log('/cannet-auth-modal.vue->accountLoginSubmit begin')

			let that = this;
			(await that.validateSubmit()) && that.$http(
					'user.accountLogin', {
						loginName: that.form['accountLogin'].data.loginName,
						passWord: that.form['accountLogin'].data.passWord
					},
					'登录中...'
				)
				.then(res => {
					console.log(res)
					if (res.code === 200) {
						that.closeAuthModal();
						//that.getUserInfo(res.data.token);
						let token =
							'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjY4NDlFRUM0OEVEQ0I3NEM0Nzc0RDM5NzkwQTNEMEYxIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2MzYwODk0NzUsImV4cCI6MTY2NzYyNTQ3NSwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMC40MTo1MzM2MiIsImF1ZCI6WyJCYXNlU2VydmljZSIsIkJ1c2luZXNzU2VydmljZSIsIkNvbGxlY3Rpb25TZXJ2aWNlIiwiRXF1aXBtZW50U2VydmljZSIsIlNldHRsZW1lbnRTZXJ2aWNlIl0sImNsaWVudF9pZCI6InBlcnNvbmFsLWFwcCIsImlhdCI6MTYzNjA4OTQ3NSwic2NvcGUiOlsiQmFzZVNlcnZpY2UiLCJCdXNpbmVzc1NlcnZpY2UiLCJDb2xsZWN0aW9uU2VydmljZSIsIkVxdWlwbWVudFNlcnZpY2UiLCJTZXR0bGVtZW50U2VydmljZSJdfQ.R0tS1CTA1GvF4H3sicb517Wn7K2uPQEEEIxk52j9n4sapg5L1vMySR8M8dkr5Br85n8BbYV1HUgwqYJKd3hhyy-IQ1YtcYCgZ57tYcZ5CM-TBbeocmTCWnyOP4Fu4Xym32yBAXs0m7LjkAbyaW3sSfN3HEvQnGJrqLyAln0xu9TXq-b0zLtawArCefDHBuZoJc_YjjSpXOLI5jAlwkl4ZujPFIudfszGOxo6nZAyP9qUCLRbTBP_-xFUbs0enZmEa3fHnP4UW7qxKZyBLZJptTUL5BWMsfIITLa7WXmTPLoWWVLI0fpun__Z1sjTsF9ZlbHqvSREDqzzzxVpG_jygQ'
						that.getUserInfo(token);
						that.$u.toast(res.message);
					} else {

						//that.getUserInfo(res.data.token);
						that.$u.toast(res.message);

					}
				});


			console.log('/cannet-auth-modal.vue->accountLoginSubmit end')

		},
		
		
		//忘记密码
		async forgotPwdSubmit() {
			console.log('cannet-auth-modal.vue->forgotPwdSubmit begin')
			let userInfo = uni.getStorageSync('userInfo');
			console.log('userInfo:');
			console.log(userInfo);
			let that = this;
			(await that.validateSubmit()) && that.$http(
				'user.forgotPwd', {
					phoneNumber: that.form['forgotPwd'].data.phoneNumber,
					verificationCode: that.form['forgotPwd'].data.verificationCode,
					passWord: that.form['forgotPwd'].data.passWord,
					confirmPassWord: that.form['forgotPwd'].data.confirmPassWord
				},
				'修改中...'
			).then(res => {
				console.log(res);
				if (res.code === 200) {
					that.$u.toast(res.message);
					that.closeAuthModal();
				}
				console.log('cannet-auth-modal.vue->forgotPwdSubmit end')
			});
		},
		
		
		
		// 修改密码
		async changePwdSubmit() {

			console.log('cannet-auth-modal.vue->changePwdSubmit begin')

			let userInfo = uni.getStorageSync('userInfo');
			console.log('userInfo:');
			console.log(userInfo);

			let that = this;
			(await that.validateSubmit()) && that.$http(
				'user.changePwd', {
					id: userInfo.id,
					oldPassWord: that.form['changePwd'].data.oldPassWord,
					passWord: that.form['changePwd'].data.passWord,
					confirmPassWord: that.form['changePwd'].data.confirmPassWord
				},
				'修改中...'
			).then(res => {

				console.log(res);

				if (res.code === 200) {
					that.closeAuthModal();
					//that.getUserInfo(res.data.userinfo.token);
				}
				
				that.$u.toast(res.message);
				
				console.log('cannet-auth-modal.vue->changePwdSubmit end')
			});
		},


	},

	computed: {
		...mapGetters(['isLogin', 'authType']),
		showAuth: {
			get() {
				return !!this.authType;
			},
			set(value) {
				value ? uni.hideTabBar() : uni.showTabBar();
			}
		},
	},
}
