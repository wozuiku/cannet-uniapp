import FormValidate from '@/common/validate/bindForm';
import schema from '@/uni_modules/uview-ui/libs/util/async-validator';


export default {
	data(){
		return{
			form:{
				data:{
					accountId:'',
					roomId:'',
					roomName:'',
					phoneNumber:'',
					code:''
				},
				rules:{
					phoneNumber: FormValidate.bind.phoneNumber,
					code: FormValidate.bind.code,
				}
			},
			codeText: '发送验证码',
			disabledCode: false,
			isBind: false,    //房间是否已经绑定
			isExistMain: false  //房间是否已经绑定主户
		}
	},
	
	onLoad(option){
		console.log('######onLoad begin######');
		
		// this.form.data.accountId = this.$Route.query.accountId;
		// this.form.data.devBaseId = this.$Route.query.devBaseId;
		// this.form.data.roomName = this.$Route.query.roomName;
		// this.isBind = this.$Route.query.isBind;
		// this.isExistMain = this.$Route.query.isExistMain;
		
		
		console.log('bind onLoad option:', option);
		
		this.form.data.accountId = option.accountId;
		this.form.data.roomId = option.roomId;
		this.form.data.roomName = option.roomName;
		this.isBind = option.isBind;
		this.isExistMain = option.isExistMain;
		
		
		
		console.log('######onLoad end######');
	},
	
	methods:{
		
		// 获取短信验证码
		getSmsCode(type) {
			
			const that = this;
			//手机号符合规则才能发短信
			if(!that.checkValue('phoneNumber')){
				return;
			}
			if (!that.disabledCode) {
				that.$http(
					'common.smsSend', {
						Telephone: that.form.data.phoneNumber,
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
					this.codeText = '重新发送';
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
			let fieldValue = this.form.data[key];
			//拿到需要检验的规则
			let rules = this.form.rules[key];
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
				let curFormData = that.form.data;
				
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
		
		
		// 规则校验
		validateSubmit() {
			
			console.log('######validateSubmit begin######');
			//如果房间主户已经绑定，则不需要检验
			if(this.isExistMain){
				return true
			}
			let valid = this.validateAll();
			console.log('######valid######');
			console.log(valid);
			return valid;
			console.log('######validateSubmit end######');
		},
		
		//绑定
		async bindSubmit(){
			console.log('######bindSubmit######');
			let that = this;
			let userInfo = uni.getStorageSync('userInfo');
			(await that.validateSubmit()) && that.$http(
				'user.bindRoom', {
					accountId: userInfo.id,
					roomId: that.form.data.roomId,
					phoneNumber: that.form.data.phoneNumber,
					code: that.form.data.code
				},
				'绑定中...'
			).then(res => {
				console.log('######request:######');
				console.log('accountId:');
				console.log(userInfo.id);
				console.log('roomId:');
				console.log(that.roomId);
				console.log('phoneNumber:');
				console.log(that.form.data.phoneNumber);
				console.log('code:');
				console.log(that.form.data.code);
				
				console.log('######response:######');
				console.log(res)
				that.$u.toast(res.message);
				if (res.code === 200) {
					// this.$Router.push({
					// 	path: 'pages/index/index/index'
					// });
					
					uni.switchTab({
						url: '/pages/index/index/index'
					});
				}
				console.log('cannet-auth-modal.vue->registerSubmit end')
			});
			
		}
		
	},
	
	
}