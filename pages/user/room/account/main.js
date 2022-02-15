export default {
	data(){
		return {
			roomId: '',
			accountList: [],
			accountCount: 0,
			allowPayText: '',
			
		}
	},
	
	onLoad(option){
		console.log('account onLoad option:', option);
		this.roomId = option.roomId
		this.initAccountList(option)
		
	},
	
	methods:{
		
		initAccountList(){
			
			this.accountList = []
			
			
			this.$http(
				'user.roomAccountList', {
					RoomId: this.roomId
				},
				'获取账户列表...'
			).then(res => {
				console.log('account---onLoad---res:', res);
				if(res.code === 200){
					res.data.forEach((item, index) => {
						
						if(item.allowedDeductions == 0){
							item = {
								...item,
								...{allowPayText: '允许扣费'}
							}
						}
						
						if(item.allowedDeductions == 1){
							item = {
								...item,
								...{allowPayText: '禁止扣费'}
							}
						}
						
						
						this.accountList.push(item)
					})
					
					this.accountCount = res.totalCount
				}
				console.log('account---onLoad---accountList:', this.accountList);
			});
			
		},
		
		allowPay(item){
			console.log('allowPay item:', item);
			let userInfo = uni.getStorageSync('userInfo');
			console.log('allowPay userInfo:', userInfo);
			
			let allow = 0
			let notice = ''
			if(item.allowedDeductions == 0){
				allow = 1
				notice = '允许 ' + item.fullName + ' 扣费'
			}else if(item.allowedDeductions == 1){
				allow = 0
				notice = '禁止 ' + item.fullName + ' 扣费'
			}
			
			let that = this
			uni.showModal({
			    title: '提示',
			    content: notice,
			    success: function (res) {
			        if (res.confirm) {
			            console.log('用户点击确定');
						that.$http('user.accountAllowPay', {
							id: item.id,
							allowedDeductions: allow,
							accountId: userInfo.id
						}, '正在修改...').then(res => {
							console.log('allowPay res:', res);
							if(res.code === 200){
								that.initAccountList()
								that.$u.toast(res.message)
							}
						})
						
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
			
		},
		
		unBind(item){
			let notice = '解除 ' + item.fullName + ' 绑定'
			let that = this
			
			uni.showModal({
			    title: '提示',
			    content: notice,
			    success: function (res) {
			        if (res.confirm) {
			            console.log('用户点击确定');
						that.$http('user.accountUnBind', {
							idList: [item.id],
						}, '正在解除...').then(res => {
							console.log('allowPay res:', res);
							if(res.code === 200){
								that.initAccountList()
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
		
		
	}
}