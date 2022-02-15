import {
	mapMutations,
	mapActions,
	mapState,
	mapGetters
} from 'vuex';

export default {
	data() {
		return {
			actionlist: [],
			show: false,
			currentItem: {},
			accountId: '',
			roomList: [],
			roomCount: 1,
		}
	},

	onLoad(option) {
		console.log('room onLoad option', option);
		this.accountId = option.userId

		this.$http(
			'user.roomList', {
				AccountId: this.accountId,
			},
			'获取房间列表...'
		).then(res => {
			console.log('room---onLoad---res:', res);
			if (res.code === 200) {
				this.roomList = res.data
				this.roomCount = res.totalCount
			}
			console.log('room---onLoad---roomList:', this.roomList);
		});

	},


	computed: {
		...mapGetters(['isLogin']),
	},

	methods: {
		// jump(item) {
		// 	let params = {
		// 		roomId: item.id,
		// 		masterSign: item.masterSign,
		// 	}
		// 	console.log('room jump params:', params);
		// 	this.$Router.push({
		// 		path: '/pages/user/room/action/index',
		// 		query: params
		// 	});
		// },

		showAction(item) {
			this.currentItem = item
			if (item.masterSign == 0) {
				this.actionlist = [{
					text: '去交费',
				}, {
					text: '审批分户',
				}, {
					text: '房间账户',
				}];
			}else if(item.masterSign == 1){
				this.actionlist = [{
					text: '去交费',
				}];
			}
			this.show = true;
		},

		clickAction(index) {
			//交电费
			if(index == 0){
				this.$Router.push('/pages/charge/pay/index/index')
			}
			//审批分户
			if(index == 1){
				let param = {
					roomId: this.currentItem.id
				}
				this.$Router.push({path: '/pages/user/room/approve/index', query: param})
			}
			//房间账户
			if(index == 2){
				let param = {
					roomId: this.currentItem.id
				}
				this.$Router.push({path: '/pages/user/room/account/index', query: param});
			}
		},

		scanCode() {
			console.log('######scanCode begin######');
			let that = this
			if (this.isLogin) {
				//理解为房间的id
				let qrCode = ''
				let userInfo = uni.getStorageSync('userInfo');

				//扫描二维码获取二维码信息
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						qrCode = res.result
						that.$http(
							'user.roomInfo', {
								QRCode: qrCode,
								AccountId: userInfo.id,
							},
							'获取中...'
						).then(res => {
							console.log('index scanCode res:', res);
							if (res.code === 200) {
								let isBind = res.data.isBind
								let isExistMain = res.data.isExistMain
								let roomId = res.data.roomInfo.id
								let roomName = res.data.roomInfo.roomName

								if (isBind == 'true') {
									this.$u.toast('该房间您已经绑定过了')
								} else {

									let params = '?accountId=' + userInfo.id + '&roomId=' + roomId +
										'&roomName=' + roomName + '&isBind=' + isBind +
										'&isExistMain=' + isExistMain
									console.log('index scanCode params:', params);
									uni.navigateTo({
										url: 'pages/user/bind/index' + params
									});
								}
							} else {
								this.$u.toast(res.message)
							}

						});

					}
				});

			} else {
				console.log('else');
				this.$store.dispatch('showAuthModal')
			}

			console.log('######scanCode end######');

		}
	}
}
