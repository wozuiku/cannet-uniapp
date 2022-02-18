import {
	mapMutations,
	mapActions,
	mapState,
	mapGetters
} from 'vuex';

// #ifdef H5
var jweixin = require("jweixin-module");
// #endif
import platform from '@/utils/platform'
import wxtool from '@/common/wechat/wxtool.js'; //获取公众号code\openid
import {
	APP_ID
} from '@/env'

export default {
	data() {
		return {
			tenantId: '', //单位id
			tenantName: '',
			apiToken: '', //apiToken
			userId: '', //用户id

			showSelect: false,
			tenantList: [],
			selectDefaultValue: [],
			
			balanceList: [], //余额账户列表
			balanceCount: 0, //余额账户个数
			balanceCurrent: 0, //当前游标
			showLeftArrow: false, //显示左边箭头
			showRightArrow: false, //显示右边箭头
			showLine: false, //显示中间间隔直线
			
			balanceListAll: [],

			noticeList: [{
					id: 0,
					image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					title: '昨夜星辰昨夜风，画楼西畔桂堂东'
				},
				{
					id: 1,
					image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
					title: '身无彩凤双飞翼，心有灵犀一点通'
				},
				{
					id: 2,
					image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
					title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
				}
			],

			adList: [{
					id: 0,
					image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					title: '昨夜星辰昨夜风，画楼西畔桂堂东'
				},
				{
					id: 1,
					image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
					title: '身无彩凤双飞翼，心有灵犀一点通'
				},
				{
					id: 2,
					image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
					title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
				}
			],

			modalName: null,
			gridCol: 4,
			gridBorder: false,
			menuBorder: false,
			menuArrow: false,
			menuCard: false,
			skin: false,
			listTouchStart: 0,
			listTouchDirection: null,

			dropdownItemValue: 1,
			dropdownItemOptions: [{
					label: '红星美凯龙',
					value: 1,
				},
				{
					label: '科能',
					value: 2,
				},

			],

		};
	},

	computed: {
		...mapGetters(['isLogin']),
	},

	onLoad() {
		let code = wxtool.getUrlCode("code"); //微信回调后再跳转带code参数返回主页
		this.initOpenid();
		
		console.log('####调试日志index onLoad调试日志####');
	},
	
	onShow(){
		this.init()
		console.log('####调试日志index onShow调试日志####');
	},

	watch: {
		balanceCurrent(val) {
			console.log('watch balanceCurrent val:', val);
			if (this.balanceCurrent > 0) {
				this.showLeftArrow = true
			} else {
				this.showLeftArrow = false
			}

			if (this.balanceCurrent + 2 < this.balanceCount) {
				this.showRightArrow = true
			} else {
				this.showRightArrow = false
			}
		},
	},

	methods: {
		init() {
			let userInfo = uni.getStorageSync('userInfo');
			this.userId = userInfo.id
			console.log('init userId:', this.userId);
			//初始化左上角单位列表
			this.initTenantList()
		},


		initTenantList() {
			this.$http(
				'user.tenant', {
					AccountId: this.userId,
				}, '加载中...'
			).then(res => {
				if (res.code === 200) {
					this.tenantList = res.data
					this.tenantList.forEach((item, index) => {
						this.tenantList[index] = {
							...item,
							...{
								value: item.id,
								label: item.extraName
							}
						}
					})
					
					this.tenantId = uni.getStorageSync('tenantId')
					this.tenantName = uni.getStorageSync('tenantName')
					console.log('initTenantList this.tenantId:', this.tenantId);
					
					//数据缓存tenantId为空
					if(!this.tenantId){
						console.log('this.tenantId is null');
						//单位id默认取第一个
						this.tenantId = this.tenantList[0].id
						this.tenantName = this.tenantList[0].extraName
						//存储tenantId、tenantName
						uni.setStorageSync('tenantId', this.tenantId)
						uni.setStorageSync('tenantName', this.tenantName)
						this.$commom.setLocalParam("tenantId",this.tenantId);//缓存单位id,后面可能用到
					}
					
					//设置apiToken
					this.setApiToken()
				}else{
					this.tenantId = ''
					this.tenantName = ''
					this.tenantList = []
					this.balanceListAll = []
					this.balanceList = []
				}
			});
		},


		setApiToken() {
			let header = {
				__tenant: this.tenantId,
				'content-type': 'application/x-www-form-urlencoded',
			}

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
				//存储tenantId、tenantName、apiToken
				uni.setStorageSync('tenantId', this.tenantId)
				uni.setStorageSync('tenantName', this.tenantName)
				uni.setStorageSync("apiToken", this.apiToken)
				this.$commom.getCustomTableList({"tenantId":this.tenantId});//获取自定义字段段
				this.getBalanceList()
			});
		},

		getBalanceList() {
			this.$http(
				'charge.balance', {
					AccountId: this.userId,
				}, '加载中...'
			).then(res => {
				console.log('http getBalanceList res:', res);
				if (res.code === 200) {
					this.balanceListAll = res.data
					this.balanceListAll.forEach((item, index) => {
						let balance = item.accountBalance.toString();
						let balanceInteger = parseInt(balance)
						let balanceDecimal = this.getDecimal(balance)
						
						let unpaid = item.unpaidMoney.toString();
						let unpaidInteger = parseInt(unpaid)
						let unpaidDecimal = this.getDecimal(unpaid)
						
						this.balanceListAll[index] = {
							...item,
							...{
								accountBalanceInteger: balanceInteger,
								accountBalanceDecimal: balanceDecimal,
								accountUnpaidInteger: unpaidInteger,
								accountUnpaidDecimal: unpaidDecimal,
							}
						}
					})
					
					this.balanceCount = this.balanceListAll.length
					this.balanceCurrent = 0
					this.balanceList = this.balanceListAll.slice(this.balanceCurrent, this.balanceCurrent + 2)

					console.log('getBalanceList this.balanceCount：', this.balanceCount);
					if(this.balanceCount > 2) {
					    this.showRightArrow = true
					}else {
						this.showRightArrow = false
					}
					console.log('getBalanceList this.showRightArrow：', this.showRightArrow);

					if (this.balanceCount > 1) {
						this.showLine = true
					} else {
						this.showLine = false
					}
				}
			});
		},
		
		getDecimal(str){
			let pointIndex = str.indexOf(".")
			let decimal = ''
			if(pointIndex == -1){
				decimal = '00'
			}else{
				decimal = str.substring(pointIndex + 1, pointIndex + 3);
			}
			return decimal
		},

		showTenant() {
			this.showSelect = true
			this.tenantList.find((element, index) => {
				if(element.label == this.tenantName){
					this.selectDefaultValue[0] = index
				}
			})
		},

		confirmSelect(selectItem) {
			this.tenantId = selectItem[0].value
			this.tenantName = selectItem[0].label
			this.$commom.setLocalParam("tengantid",this.tenantId);//缓存单位id,后面可能用到
			this.setApiToken();
			
		},

		cancelSelect() {

		},

		bindUser() {
			uni.navigateTo({
				url: '/pages/user/bind/index/index'
			})
		},
		
		jumpBuilding(title) {
			uni.navigateTo({
				url: "/pages/public/building?title=" + title
			})
		},

		left_arrow() {
			console.log('left_arrow');
			this.balanceCurrent = this.balanceCurrent - 1
			this.balanceList = this.balanceListAll.slice(this.balanceCurrent, this.balanceCurrent + 2)
		},

		right_arrow() {
			console.log('right_arrow');
			console.log('right_arrow balanceListAll：', this.balanceListAll);
			this.balanceCurrent = this.balanceCurrent + 1
			this.balanceList = this.balanceListAll.slice(this.balanceCurrent, this.balanceCurrent + 2)
		},

		jumpBalance(item) {
			console.log('jump item:', item);
			uni.navigateTo({
				url: '/pages/charge/balance/index/index?item=' + encodeURIComponent(JSON.stringify(item))
			});
		},

		to_charge(item) {
			uni.navigateTo({
				url: '/pages/charge/pay/topay?item=' + encodeURIComponent(JSON.stringify(item)),
			});
		},
		
		jumpFunc(funcName){
			console.log('jumpFunc funcName:', funcName);
			if(funcName == '电费'){
				uni.navigateTo({
					url: '/pages/charge/balance/list/index',
				});
			}else {
				this.$u.toast('暂未授权');
			}
		},
		
		jumpNoticeItem(item){
			console.log('jumpNoticeItem item:', item);
		},
		
		jumpNoticeList(){
			uni.navigateTo({
				url: "/pages/public/notice/index/index"
			})
		},
		
		
		
		initOpenid() {
			var _this = this;
			var userinfo = _this.$commom.getLocalParam("userInfo");
			console.log("1=======================================================",userinfo);
			//#ifdef H5
			console.log("=======================================================");
			if (wxtool.isWechat()) { //判断是否在微信端
				let openid = _this.$commom.getLocalParam("openid")
				console.log('微信登录日志initOpenid openid:', openid);
				if (openid == "" || openid == null) { //如果openid为空才去获取
					let code = wxtool.getUrlCode("code"); //微信回调后再跳转带code参数返回主页
					console.log('微信登录日志initOpenid code:', code);
					if (code) {
						console.log("Code=", code);
						wxtool.getOpenid({
							"code": code,
							"appid": APP_ID
						}, function(data) {
							console.log("获取到OPENID", data);
							_this.$commom.setLocalParam("openid", data.data);
							wxtool.bindOpenidAndUserId({
								"userid": userinfo.id,
								"appid":APP_ID,
								"openid":data.data
							});
						})
					} else {
						wxtool.wxAuthorize(APP_ID, function(code) {
							wxtool.getOpenid({
								"code": code,
								"appid": APP_ID
							}, function(data) {
								console.log("获取到OPENID", data);
								_this.$commom.setLocalParam("openid", data.data);
								wxtool.bindOpenidAndUserId({
									"userid": userinfo.id,
									"appid":APP_ID,
									"openid":data.data
								});
							})

						})
					}
				} else {
					wxtool.bindOpenidAndUserId({
						"userid": userinfo.id,
						"appid":APP_ID,
						"openid":openid
					});
					console.log("已经存在OPENID", openid);
				}
			}
			//#endif

		}

	}
}
