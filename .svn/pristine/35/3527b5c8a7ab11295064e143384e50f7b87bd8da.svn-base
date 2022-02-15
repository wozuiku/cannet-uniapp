import test from '@/uni_modules/uview-ui/libs/function/test.js'

export default {
	
	/*用户注册*/
	register:{
		// 全名
		fullName: [{
				required: true,
				message: '请输入真实姓名',
			},
		],
		
		// 手机号
		phoneNumber: [{
				required: true,
				message: '请输入手机号',
			},
			{
				validator: (rule, value, callback) => {
					return test.mobile(value);
				},
				message: '手机号不符合规则',
			}
		],
		
		// 密码
		passWord: [{
				required: true,
				message: '请输入密码',
			},
			{
				pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
				message: '密码需同时含有字母和数字，长度在6-12之间',
			}
		],
		
		// 确认密码
		confirmPassWord: [{
				required: true,
				message: '请输入确认密码',
			},
			{
				pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
				message: '确认密码需同时含有字母和数字，长度在6-12之间',
			},
		],
		
		// 短信验证码
		verificationCode: [{
				required: true,
				len: 6,
				message: '请输入6位验证码',
			},
		]
	},
	
	
	/*用户登录*/
	login:{
		loginName: [{
				required: true,
				message: '请输入手机号码',
			},
		],
		
		passWord:[{
			required: true,
			message: '请输入密码',
		}]
	},
	
	
	/*忘记密码*/
	forgotPwd:{
		// 手机号
		phoneNumber: [{
				required: true,
				message: '请输入手机号',
			},
			{
				validator: (rule, value, callback) => {
					return test.mobile(value);
				},
				message: '手机号不符合规则',
			}
		],
		
		// 短信验证码
		verificationCode: [{
				required: true,
				len: 6,
				message: '请输入6位验证码',
			},
		],
		
		// 密码
		passWord: [{
				required: true,
				message: '请输入密码',
			},
			{
				pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
				message: '密码需同时含有字母和数字，长度在6-12之间',
			}
		],
		
		// 确认密码
		confirmPassWord: [{
				required: true,
				message: '请输入确认密码',
			},
			{
				pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
				message: '确认密码需同时含有字母和数字，长度在6-12之间',
			},
		],
	},
	
	
	/*修改密码*/
	changePwd:{
		//旧密码
		oldPassWord: [{
				required: true,
				message: '请输入旧密码',
			},
		],
		
		// 密码
		passWord: [{
				required: true,
				message: '请输入密码',
			},
			{
				pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
				message: '密码需同时含有字母和数字，长度在6-12之间',
			}
		],
		
		
		// 确认密码
		confirmPassWord: [{
				required: true,
				message: '请输入确认密码',
			},
			{
				pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
				message: '确认密码需同时含有字母和数字，长度在6-12之间',
			},
		],
		
	},
	
	
	
	
	/*用户绑定*/
	bind:{
		// 手机号
		phoneNumber: [
			{
				required: true,
				message: '业主手机不能为空',
			},
			{
				validator: (rule, value, callback) => {
					return test.mobile(value);
				},
				message: '业主手机不符合规则',
			}
		],
		
		// 短信验证码
		smsCode: [
			{
				required: true,
				len: 6,
				message: '请输入6位验证码',
			},
		]
	},
	
}
