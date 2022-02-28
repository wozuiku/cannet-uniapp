import formRule from '@/common/validate/rule';
import formValidate from '@/common/validate/validate';

export default {
	data() {
		return {
			form: {
				data: {
					roomId: '',
					userNumber: '',
					userName: '',
					userAddress: '',
					phoneNumber: '',
					encryptPhoneNumber: '',
					smsCode: '',
				},
				rules: {
					phoneNumber: formRule.bind.phoneNumber,
					smsCode: formRule.bind.smsCode,
				}
			},
			
			tenantId: '',
			apiToken: '',
			
			roomInfoList: [],
			showModal: false,
			listIndex: '',
			

			userInput: true, //手工填写可以编辑，扫码绑定页面不可编辑，userInput为false不可编辑
			codeText: '发送验证码',
			disabledCode: false,
		}
	},

	onLoad(options) {
		this.form.data.roomId = options.roomId
		this.form.data.roomName = options.roomName
		this.form.data.userName = options.userName
		this.form.data.userAddress = options.userAddress
		this.form.data.phoneNumber = options.phoneNumber
		this.form.data.encryptPhoneNumber = this.encryptMobile(options.phoneNumber)
		if (options.roomId) {
			this.userInput = false
		}
		if (!this.userInput) {
			if (!options.phoneNumber || options.phoneNumber.length === 0 || options.phoneNumber ==='null') {
				this.form.data.phoneNumber = ''
				this.form.data.encryptPhoneNumber = ''
				this.$u.toast('请先联系业主添加手机');
			}
		}
	},

	methods: {
		search() {
			let userInfo = uni.getStorageSync('userInfo');
<<<<<<< .mine
			
||||||| .r1724
			console.log('search userInfo:', userInfo);
			console.log('search roomName:', this.form.data);
=======
			console.log('search userInfo:', userInfo);
			console.log('search roomName:', this.form.data);
			this.form.data.roomName=this.form.data.roomName.trim();
>>>>>>> .r1796
			if(!this.form.data.roomName  || this.form.data.roomName.length === 0){
				this.$u.toast('请输入用户号');
				return
			}
			this.$http(
				'user.roomInfo', {
					AccountId: userInfo.id,
					RoomName: this.form.data.roomName
				},
			).then(res => {
				console.log('bind bind onLoad search $http res:', res);
				if (res.code === 200) {
					this.roomInfoList = res.data
					if(this.roomInfoList.length == 0){
						this.$u.toast('没有数据');
						this.form.data.roomId = ''
						this.form.data.userName = ''
						this.form.data.userAddress = ''
						this.form.data.phoneNumber = ''
						this.form.data.encryptPhoneNumber = ''
					}else if(this.roomInfoList.length == 1){
						console.log('roomInfoList:', this.roomInfoList);
						this.form.data.roomId = this.roomInfoList[0].roomInfo.id
						this.form.data.roomName = this.roomInfoList[0].roomInfo.roomName
						this.form.data.userName = this.roomInfoList[0].roomInfo.userName
						this.form.data.userAddress = this.roomInfoList[0].roomInfo.userAddress
						this.form.data.phoneNumber = this.roomInfoList[0].roomInfo.phoneNumber
						this.form.data.encryptPhoneNumber = this.encryptMobile(this.roomInfoList[0].roomInfo.phoneNumber)
						
						if (!this.form.data.phoneNumber) {
							this.$u.toast('请先联系业主添加手机');
						}
					}else if(this.roomInfoList.length > 1){
						this.showModal = true
					}
				} else {
					this.$u.toast(res.message);
					this.form.data.roomId = ''
					this.form.data.userName = ''
					this.form.data.userAddress = ''
					this.form.data.phoneNumber = ''
					this.form.data.encryptPhoneNumber = ''
				}
			});
		},
		
		radioChange(e){
			this.listIndex = parseInt(e.detail.value)
			console.log('radioChange:', e);
			console.log('listIndex:', this.listIndex);
		},
		
		hideModal(){
			this.showModal = false
			this.form.data.roomId = this.roomInfoList[this.listIndex].roomInfo.id
			this.form.data.roomName = this.roomInfoList[this.listIndex].roomInfo.roomName
			this.form.data.userName = this.roomInfoList[this.listIndex].roomInfo.userName
			this.form.data.userAddress = this.roomInfoList[this.listIndex].roomInfo.userAddress
			this.form.data.phoneNumber = this.roomInfoList[this.listIndex].roomInfo.phoneNumber
			this.form.data.encryptPhoneNumber = this.encryptMobile(this.roomInfoList[this.listIndex].roomInfo.phoneNumber)
		},

		encryptMobile(str) {
			if (null != str && str != undefined) {
				var pat = /(\d{3})\d*(\d{4})/;
				return str.replace(pat, '$1****$2');
			} else {
				return "";
			}
		},

		// 检验单个
		checkValue(key) {
			let valid = true
			//拿到需要校验的数据
			let value = this.form.data[key];
			//拿到需要检验的规则
			let rule = this.form.rules[key];
			formValidate.validation(key, value, rule, error => {
				if (error) {
					valid = false;
					this.$u.toast(error);
				}
			});
			return valid;
		},

		// 校验所有
		checkAll() {
			let valid = formValidate.validateAll(this.form.data, this.form.rules);
			return valid;
		},


		// 获取短信验证码
		getSmsCode(type) {

			//手机号符合规则才能发短信
			if (!this.checkValue('phoneNumber')) {
				return;
			}
			if (!this.disabledCode) {
				this.$http(
					'common.smsSend', {
						Telephone: this.form.data.phoneNumber,
						SmsType: type
					},
					'获取验证码中...'
				).then(res => {
					console.log(res)
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
					this.codeText = '重新发送';
				}
			}, 1000);
		},



		

		//绑定
		async bindSubmit() {
			console.log('######bindSubmit######');
			let that = this;
			let userInfo = uni.getStorageSync('userInfo');
			(await that.checkAll()) && that.$http(
				'user.bindRoom', {
					accountId: userInfo.id,
					roomId: that.form.data.roomId,
					phoneNumber: that.form.data.phoneNumber,
					code: that.form.data.smsCode
				},
				'绑定中...'
			).then(res => {
				console.log(res)
				if (res.code === 200) {
					this.tenantId = res.data.tenantId
					this.setApiToken()
			
					
				} else {
					that.$u.toast(res.message);
					
				}
			});
		},
		
		setApiToken() {
			let header = {
				__tenant: this.tenantId,
				'content-type': 'application/x-www-form-urlencoded',
			}
			var that=this;
			let param = {
				client_id: 'zzkn',
				client_secret: 'zzkn1*2!3~',
				grant_type: 'password',
				username: 'appAdmin',
				password: 'Zzkn123*!',
				refresh_token: '',
			}
		
			this.$http(
				'common.apiToken', param, '加载中...', '', header
			).then(res => {
				this.apiToken = res.token_type + ' ' + res.access_token
				uni.setStorageSync("apiToken", this.apiToken)
				
				that.$u.toast('绑定成功');
				uni.navigateTo({
					url: '/pages/user/bind/index/index'
				})
				
			});
		},
		


	}
}
