
export default {
	data(){
		return{
			apiToken: '',
			tenantId: '',
			tenantList: [],
			meterList: [],
			showModel: false,
		}
	},
	
	onLoad(){
		this.apiToken = uni.getStorageSync('apiToken')
		console.log('onLoad apiToken:', this.apiToken);
		if(this.apiToken){
			this.initTenantList()
		}
		
	},
	
	methods:{
		
		initTenantList(){
			let userInfo = uni.getStorageSync('userInfo');
			console.log('userInfo:', userInfo);
			this.$http(
				'user.roomList', {
					AccountId: userInfo.id,
				},
			).then(res => {
				console.log('bind index onLoad $http res:', res);
				if (res.code === 200) {
					this.tenantList = res.data
					console.log('this.tenantList:', this.tenantList);
				} else {
					that.$u.toast(res.message)
				}
			});
		},
		
		addUser(){
			uni.navigateTo({
				url:'/pages/user/bind/method/index'
			})
		},
		
		unBind(roomItem){
			console.log('unBind roomItem:', roomItem);
			let notice = '解除 ' + roomItem.userName + ' 绑定'
			let that = this
			uni.showModal({
			    title: '提示',
			    content: notice,
			    success: function (res) {
			        if (res.confirm) {
			            //console.log('用户点击确定');
						that.$http('user.unBind', {
							idList: [roomItem.id],
						}, '正在解除...').then(res => {
							//console.log('allowPay res:', res);
							if(res.code === 200){
								that.initTenantList()
								that.$u.toast(res.message)
							}else{
								that.$u.toast(res.message)
							}
						})
						
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
		},
		
		showMeterModal(list){
			this.meterList = list
			this.showModel = true
			console.log('list:', list);
		},
		
		hideMeterModal(){
			this.showModel = false
		},
		
	}
}