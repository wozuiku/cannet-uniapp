import {
	mapMutations,
	mapActions,
	mapState,
	mapGetters
} from 'vuex';

import formRule from '@/common/validate/rule';
import formValidate from '@/common/validate/validate';


export default {
	data() {
		return {
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
						verificationCodeDisabled: true,
						phoneNumberDisabled: false,
						show: false,
						showConfirm: false,
					},

					rules: {
						accountName: formRule.register.accountName,
						passWord: formRule.register.passWord,
						confirmPassWord: formRule.register.confirmPassWord,
						fullName: formRule.register.fullName,
						phoneNumber: formRule.register.phoneNumber,
						verificationCode: formRule.register.verificationCode,
					},
				},

				//登录
				login: {
					data: {
						loginName: '', // 账号15810103071
						passWord: '', // 密码zzx123456
						show: false,
					},
					rules: {
						loginName: formRule.login.loginName,
						passWord: formRule.login.passWord,
					},
				},



				//忘记密码
				forgotPwd: {
					data: {
						phoneNumber: '', //手机号
						verificationCode: '', //验证码
						passWord: '', //新密码
						confirmPassWord: '', //确认密码
						verificationCodeDisabled: true,
						phoneNumberDisabled: false,
						show: false,
						showConfirm: false,
					},
					rules: {
						phoneNumber: formRule.forgotPwd.phoneNumber,
						verificationCode: formRule.forgotPwd.verificationCode,
						passWord: formRule.forgotPwd.passWord,
						confirmPassWord: formRule.forgotPwd.confirmPassWord,
					},
				},

				//修改密码
				changePwd: {
					data: {
						oldPassWord: '', //旧密码
						passWord: '', //新密码
						confirmPassWord: '', //确认密码
						showOld: false,
						show: false,
						showConfirm: false,
					},

					rules: {
						oldPassWord: formRule.changePwd.oldPassWord,
						passWord: formRule.changePwd.passWord,
						confirmPassWord: formRule.changePwd.confirmPassWord,
					},
				},
			},
			
			protocol: false, //是否同意隐私协议
		}
	},

	onLoad() {
		let link = window.location.href;  
		console.log("link",link); 
	},
	
	computed: {
		...mapGetters(['authType']),
	},
	
	
	methods: {
		...mapActions(['showAuthPage']),
		
		//校验手机号是否符合规则，并更新验证码按钮是否可用
		checkPhoneNumber() {
			let valid = true
			//拿到需要校验的数据
			let value = this.form[this.authType].data['phoneNumber'];
			//拿到需要检验的规则
			let rule = this.form[this.authType].rules['phoneNumber'];
			formValidate.validation('phoneNumber', value, rule, error => {
				if (error) {
					valid = false;
				}
			});
			if (valid) {
				if(this.authType == 'register'){
					this.form['register'].data.verificationCodeDisabled = false
				}else if(this.authType == 'forgotPwd'){
					this.form['forgotPwd'].data.verificationCodeDisabled = false
				}
				
			} else {
				if(this.authType == 'register'){
					this.form['register'].data.verificationCodeDisabled = true
				}else if(this.authType == 'forgotPwd'){
					this.form['forgotPwd'].data.verificationCodeDisabled = true
				}
			}
		},
		
		
		//子组件回传注册验证码按钮状态
		updateRegisterDisabled(disabledStatus){
			this.form['register'].data.verificationCodeDisabled = disabledStatus
			this.form['register'].data.phoneNumberDisabled = disabledStatus
		},
		
		//子组件回传忘记密码验证码按钮状态
		updateForgotPwdDisabled(disabledStatus){
			this.form['forgotPwd'].data.verificationCodeDisabled = disabledStatus
			this.form['forgotPwd'].data.phoneNumberDisabled = disabledStatus
		},
		
		//校验单个字段
		checkValue(key) {
			let valid = true
			//拿到需要校验的数据
			let value = this.form[this.authType].data[key];
			//拿到需要检验的规则
			let rule = this.form[this.authType].rules[key];
			formValidate.validation(key, value, rule, error => {
				if (error) {
					valid = false;
					this.$u.toast(error);
				}
			});
			return valid;
		},
		
		
		//校验所有字段
		async checkAll() {
			if (['register'].includes(this.authType) && !this.protocol) {
				this.$u.toast('请同意用户协议');
				return false;
			}
			
			let valid = await formValidate.validateAll(this.form[this.authType].data, this.form[this.authType].rules);
			
			if(['register', 'forgotPwd', 'changePwd'].includes(this.authType)){
				if(valid){
					if(this.form[this.authType].data.passWord != this.form[this.authType].data.confirmPassWord){
						this.$u.toast('密码和确认密码需相同');
						valid = false
					}
				}
			}
			
			return valid;
		},
		
		showOldPassword(){
			if(this.form['changePwd'].data.showOld){
				this.form['changePwd'].data.showOld = false
			}else{
				this.form['changePwd'].data.showOld = true
			}
		},
		
		
		//显示隐藏密码
		showPassword(){
			
			if(this.authType == 'register'){
				if(this.form['register'].data.show){
					this.form['register'].data.show = false
				}else{
					this.form['register'].data.show = true
				}
			}else if(this.authType == 'login'){
				if(this.form['login'].data.show){
					this.form['login'].data.show = false
				}else{
					this.form['login'].data.show = true
				}
			}else if(this.authType == 'forgotPwd'){
				if(this.form['forgotPwd'].data.show){
					this.form['forgotPwd'].data.show = false
				}else{
					this.form['forgotPwd'].data.show = true
				}
			}else if(this.authType == 'changePwd'){
				if(this.form['changePwd'].data.show){
					this.form['changePwd'].data.show = false
				}else{
					this.form['changePwd'].data.show = true
				}
			}
		},
		
		//显示隐藏确认密码
		showConfirmPassWord(){
			
			if(this.authType == 'register'){
				if(this.form['register'].data.showConfirm){
					this.form['register'].data.showConfirm = false
				}else{
					this.form['register'].data.showConfirm = true
				}
			}else if(this.authType == 'forgotPwd'){
				if(this.form['forgotPwd'].data.showConfirm){
					this.form['forgotPwd'].data.showConfirm = false
				}else{
					this.form['forgotPwd'].data.showConfirm = true
				}
			}else if(this.authType == 'changePwd'){
				if(this.form['changePwd'].data.showConfirm){
					this.form['changePwd'].data.showConfirm = false
				}else{
					this.form['changePwd'].data.showConfirm = true
				}
			}
		},
		
		//跳转注册
		jumpRegister() {
			this.showAuthPage('register')
			
		},

		//跳转登录
		jumpLogin() {
			this.showAuthPage('login')
		},
		
		//跳转忘记密码
		jumpForgotPwd() {
			this.showAuthPage('forgotPwd')
		},
		
		// 注册
		async registerSubmit() {
			let that = this;
			(await that.checkAll()) && that.$http(
				'user.register', {
					accountName: that.form[this.authType].data.phoneNumber,
					fullName: that.form[this.authType].data.fullName,
					passWord: that.form[this.authType].data.passWord,
					confirmPassWord: that.form[this.authType].data.confirmPassWord,
					phoneNumber: that.form[this.authType].data.phoneNumber,
					verificationCode: that.form[this.authType].data.verificationCode
				},
				'注册中...'
			).then(res => {
				console.log(res)
				if (res.code === 200) {
					that.$u.toast('注册成功');
					that.showAuthPage('login');
				}else{
					that.$u.toast(res.message);
				}
			});
		},

		//账号登录
		async loginSubmit() {
			let that = this;
			(await that.checkAll()) && that.$http(
					'user.accountLogin', {
						loginName: that.form[this.authType].data.loginName,
						passWord: that.form[this.authType].data.passWord
					},
					'登录中...'
				)
				.then(res => {
					console.log('accountLoginSubmit http res:', res)
					if (res.code === 200) {
						uni.setStorageSync("userInfo", res.data)
						that.$u.toast(res.message);
						uni.switchTab({
							url: '/pages/index/index/index'
						});
					} else {
						that.$u.toast(res.message);
					}
				});
		},
		
		//忘记密码
		async forgotPwdSubmit() {
			let userInfo = uni.getStorageSync('userInfo');
			console.log('userInfo:');
			console.log(userInfo);
			let that = this;
			(await that.checkAll()) && that.$http(
				'user.forgotPwd', {
					phoneNumber: that.form[this.authType].data.phoneNumber,
					verificationCode: that.form[this.authType].data.verificationCode,
					passWord: that.form[this.authType].data.passWord,
					confirmPassWord: that.form[this.authType].data.confirmPassWord
				},
			).then(res => {
				that.$u.toast(res.message);
				if (res.code === 200) {
					that.jumpLogin();
				}
			});
		},
		
		//修改密码
		async changePwdSubmit() {
			let userInfo = uni.getStorageSync('userInfo');
			console.log('userInfo:');
			console.log(userInfo);
			let that = this;
			(await that.checkAll()) && that.$http(
				'user.changePwd', {
					id: userInfo.id,
					oldPassWord: that.form[this.authType].data.oldPassWord,
					passWord: that.form[this.authType].data.passWord,
					confirmPassWord: that.form[this.authType].data.confirmPassWord
				},
			).then(res => {
				if (res.code === 200) {
					that.$u.toast('修改成功');
					that.jumpLogin();
				}else{
					that.$u.toast(res.message);
				}
			});
		},
	}
}
