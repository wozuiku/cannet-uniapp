/*
 * 接口列表
 * @url 接口地址
 * @auth 接口是否需要登录才能访问
 * @method 请求类型
 */

export default {
	/** 公共 ↓ **/
	common: {
		apiToken: {
			url: "/connect/token",
			auth: false,
			method: "POST",
		},

		smsSend: {
			url: "/api/message/producer/SendVerifyCode",
			auth: false,
			method: "POST",
		},

		wxJssdk: {
			url: "/api/extend/wechatbase/GetSdkConfig",
			auth: false,
			method: "GET",
		},
		
		"getOpenid": {
			url: "/api/extend/wechatbase/GetOpenId",
			auth: true,
			method: "GET",
		},
		
		"bindOpenid":{
			"url":"/api/base/personalaccount/SetThridParty",
			auth: true,
			method: "POST",
		},
		"getCustomTableList":{//获取自定义字段
			"url":"/api/base/customtable/GetCustomTableList",
			auth: true,
			method: "GET",
		}
	},

	/** 用户 ↓ **/
	user: {
		tenant: {
			url: "/api/equipment/accountroom/GetMyTenantList",
			auth: true,
			method: "GET",
		},
		//注册
		register: {
			url: "/api/base/personalaccount/RegisterAppUser",
			auth: false,
			method: "POST",
			// desc: '注册',
		},

		//用户登录
		accountLogin: {
			url: "/api/base/personalaccount/AppLogin",
			auth: false,
			method: "POST",
			// desc: '账号密码登录',
		},

		//用户信息
		info: {
			url: "/api/base/personalaccount/GetUserInfo",
			auth: true,
			method: "GET",
			// desc: '用户信息',end
		},

		smsLogin: {
			url: "/api/user/smsLogin",
			auth: false,
			method: "POST",
			// desc: '短信登录',
		},


		//重置密码
		forgotPwd: {
			url: "/api/base/personalaccount/ForgetPassword",
			auth: false,
			method: "PUT",
			// desc: '重置密码',
		},



		changePwd: {
			url: "/api/base/personalaccount/UpdatePassword",
			auth: true,
			method: "PUT",
			// desc: '修改密码',
		},


		profile: {
			url: "/api/user/profile",
			auth: true,
			method: "POST",
			// desc: '修改用户信息',end
		},

		logout: {
			url: "/api/user/logout",
			auth: true,
			method: "POST",
			// desc: '退出登录',end
		},

		//获取房间信息
		roomInfo: {
			url: "/api/equipment/AccountRoom/GetRoomInfo",
			auth: true,
			method: "GET",
		},

		//绑定房间
		bindRoom: {
			url: "/api/equipment/AccountRoom/ApplicationJoinRoom",
			auth: true,
			method: "POST",
		},


		//获取房间列表
		roomList: {
			url: "/api/equipment/AccountRoom/GetAccountRoomList",
			auth: true,
			method: "GET",
		},


		//获取申请列表
		roomAccountList: {
			url: "/api/equipment/AccountRoom/GetRoomAccountList",
			auth: true,
			method: "GET",
		},


		//获取申请列表
		applicationList: {
			url: "/api/equipment/AccountRoom/GetApplicationList",
			auth: true,
			method: "GET",
		},


		//roomAccountApproval
		roomAccountApproval: {
			url: "/api/equipment/AccountRoom/Approval",
			auth: true,
			method: "POST",
		},


		accountAllowPay: {
			url: "/api/equipment/AccountRoom/ChangeDeduction",
			auth: true,
			method: "POST",
		},


		unBind: {
			url: "/api/equipment/AccountRoom/UnBind",
			auth: true,
			method: "POST",
		},


	},

	/** 电费 ↓ **/
	charge: {
		//获取账户余额
		balance: {
			url: "/api/settlement/FeeWallet/GetAccountBalance",
			auth: true,
			method: "POST",
		},
	},
	//房间相关信息
	room:{
		"getMeterByRoomId":{//获取房间关联监测点
			"url":"/api/equipment/roomMeterView/GetMeterByRoomId",
			auth: true,
			method: "GET",
		},
		"getBalance":{
			"url":"/api/settlement/FeeWallet/GetRoomBalance",
			auth: true,
			method: "POST",
		},
		"getEnalysisList":{  // 获取用能分析
			"url":"/api/settlement/energyreport/GetAppEnergyAnalysis",
		}
	},

	//工业账单
	bill: {
		industry: {
			url: "/api/settlement/energyreport/ReportEnergyAccountMonthDetailNew",
			auth: false,
			method: "GET",
		},
		getAppEnergyDetail:{
			url: "/api/business/energy/GetAppEnergyDetail",
			auth: true,
			method: "GET",
		}
	},
	
	pay:{
		createorder: { //创建支付订单
			url: "/api/payment/paymentorder/CreateOrder",
			auth: true,
			method: "POST",
			// desc: '创建支付订单',
		},
		"getpaytype":{
			"url":"/api/base/paymentsetting/GetList",
			auth: true,
			method: "GET",
		},
		"getOrderList":{//充值记录
			"url":"/api/payment/paymentorder/GetOrderList",
			auth: true,
			method: "GET",
		},
		"getOrderDetails":{//获取订单详情
			"url":"/api/payment/paymentorder/GetOrderDetails",
			auth: true,
			method: "GET",
		},
		"createAppRefund":{//添加APP退款订单
			"url":"/api/payment/refundorder/CreateAppRefund",
			auth: true,
			method: "POST",
		}
	}

};
