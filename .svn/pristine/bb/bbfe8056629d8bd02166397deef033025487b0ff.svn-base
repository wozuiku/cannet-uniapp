
import schema from '@/uni_modules/uview-ui/libs/util/async-validator';
import formRule from '@/common/validate/rule';


export default {

	validation(key, value, rule, callback = () => {}) {
		console.log('validate validation key, value, rule:', key, value, rule);
		// 判空
		if (!rule || rule.length === 0) {
			return callback('');
		}
		// 设置当前的装填，标识为校验中
		let validateState = 'validating';
		// 调用async-validator的方法
		let validator = new schema({
			[key]: rule
		});
	
		// 校验
		validator.validate({
				[key]: value
			}, {
				firstFields: true
			},
			(errors, fields) => {
				console.log('validate validation errors, fields:', errors, fields);
				// 记录状态和报错信息
				validateState = !errors ? 'success' : 'error';
				let validateMessage = errors ? errors[0].message : '';
				callback(validateMessage);
			}
		);
		
	},
	
	
	validateAll(values, rules) {
		console.log('validate validateAll values, rules:', values, rules);
		let that = this;
		return new Promise(resolve => {
			// 对当前所有表单检验
			let valid = true; // 默认通过
			let count = 0; // 用于标记是否检查完毕
			let errorArr = []; // 存放错误信息
			
			Object.keys(values).map((key) => {
				
				let value = values[key]
				let rule = rules[key]
				
				that.validation(key, value, rule, error => {
					//如果回调有error
					if (error) {
						valid = false;
						errorArr.push(error);
					}
					if (++count === Object.keys(values).length) {
						resolve(valid);
						if (errorArr.length) {
							uni.showToast({
								title: errorArr[0],
								icon: 'none',
								duration: 1000,
								mask: true
							});
						}
						if (typeof callback == 'function') callback(valid);
					}
				})
			})
		})
	},
}