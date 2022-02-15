import {
	formatMoney
} from '@/utils/formatter';


export default {
	data() {
		return {
			form: {
				data: {
					payAmount: '',
				},
				rules: {
					payAmount: '',
				},
			},
			isTag1Selected: false,
			isTag2Selected: false,
			isTag3Selected: false,
			isTag4Selected: false,
		}
	},

	methods: {
		// 检测
		checkValue() {
			this.validation('payAmount', error => {
				if (error) {
					this.form.data['payAmount'] = ''
					this.$u.toast(error);
				}
			});
		},


		validation(key, callback = () => {}) {

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

		},

		changeAmount() {
			console.log('changeAmount');
			this.isTag1Selected = false
			this.isTag2Selected = false
			this.isTag3Selected = false
			this.isTag4Selected = false

		},

		select_tag(tagInex) {
			if (tagInex == 1) {
				this.form.data.payAmount = formatMoney(50, 2)
				this.isTag1Selected = true
				this.isTag2Selected = false
				this.isTag3Selected = false
				this.isTag4Selected = false
			}
			if (tagInex == 2) {
				this.form.data.payAmount = formatMoney(100, 2)
				this.isTag2Selected = true
				this.isTag1Selected = false
				this.isTag3Selected = false
				this.isTag4Selected = false
			}
			if (tagInex == 3) {
				this.form.data.payAmount = formatMoney(500, 2)
				this.isTag3Selected = true
				this.isTag1Selected = false
				this.isTag2Selected = false
				this.isTag4Selected = false
			}
			if (tagInex == 4) {
				console.log('tagInex payAmount:', formatMoney(10000, 2));
				this.form.data.payAmount = '1,000.00' //formatMoney(1000, 2)
				this.isTag4Selected = true
				this.isTag1Selected = false
				this.isTag2Selected = false
				this.isTag3Selected = false
			}

		},

		paySubmit() {
			let valid = true
			this.validation('payAmount', error => {
				if (error) {
					valid = false
					this.$u.toast(error);
				}
			});
			if(valid){
				
				this.$Router.push({path: '/pages/charge/pay/confirm/index', query: {payAmount: this.form.data.payAmount}});
				
			}
			
		}

	}
}
