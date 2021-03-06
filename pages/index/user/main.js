import {
	mapMutations,
	mapActions,
	mapState,
	mapGetters
} from 'vuex';

export default {
	data() {
		return {
			userInfo: {},
			isLogin: false,
		}
	},

	onShow() {
		this.userInfo = uni.getStorageSync('userInfo')
	},

	computed: {
		...mapGetters(['authType']),
	},

	methods: {
		...mapActions(['showAuthPage']),

		logout() {
			let that = this
			uni.showModal({
				title: '提示',
				content: '确定要退出应用吗？',
				success: function(res) {
					if (res.confirm) {
						uni.setStorageSync('userInfo', '')
						uni.setStorageSync('apiToken', '')
						uni.setStorageSync('tenantId', '')
						uni.setStorageSync('tenantId', '')
						uni.setStorageSync('tenantName', '')
						that.showAuthPage('login')
						uni.reLaunch({
							url: '/pages/auth/index'
						})
					}
				}
			});
		},

		encryptMobile(str) {
			if (null != str && str != undefined) {
				var pat = /(\d{3})\d*(\d{4})/;
				return str.replace(pat, '$1****$2');
			} else {
				return "";
			}
		},

		jumpUserInfo() {
			uni.navigateTo({
				url: "/pages/index/user/info/index"
			})
		},

		jumpUserManage() {
			uni.navigateTo({
				url: "/pages/user/bind/index/index"
			})
		},

		jumpBuilding(title) {
			uni.navigateTo({
				url: "/pages/public/building?title=" + title
			})
		},

		contactService() {
			uni.makePhoneCall({
			    phoneNumber: '40012345678' //仅为示例
			});

		},
		
		jumpAbout(){
			uni.navigateTo({
				url: "/pages/public/about"
			})
		},
		
		jumpSuggestion(){
			uni.navigateTo({
				url: "/pages/user/suggestion/index"
			})
		}
	},
}
