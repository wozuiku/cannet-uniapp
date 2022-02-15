export default {
	data(){
		return {
			accountId: '',
			roomId: '',
			applicationList: [],
			applicationCount: 0,
		}
	},
	
	onLoad(option){
		console.log('approve onLoad option:',option);
		this.roomId = option.roomId
		this.initApplicationList()
	},
	
	methods:{
		
		initApplicationList(){
			
			let userInfo = uni.getStorageSync('userInfo')
			this.accountId = userInfo.id
			
			
			this.$http(
				'user.applicationList', {
					AccountId: this.accountId,
					RoomId: this.roomId
				}
			).then(res => {
				console.log('approve---onLoad---res:', res);
				if(res.code === 200){
					this.applicationList = res.data
					this.applicationCount = res.totalCount
				}
				console.log('approve---onLoad---applicationList:', this.applicationList);
			});
			
		},
		
		approveAgree(item){
			console.log('approveAgree item:', item);
			let that = this
			uni.showModal({
			    title: '提示',
			    content: '同意 ' + item.name + ' 成为分户',
			    success: function (res) {
			        if (res.confirm) {
			            console.log('用户点击确定');
						that.$http('user.roomAccountApproval', {
							applicationRoomId: item.id,
							isPass: true
						}, '审批分户...').then(res => {
							console.log('approveAgree res:', res);
							if(res.code === 200){
								that.$u.toast(res.message)
								that.initApplicationList()
							}
						})
						
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
		},
		
		approveReject(item){
			
			let that = this;
			uni.showModal({
			    title: '提示',
			    content: '拒绝 ' + item.name + ' 成为分户',
			    success: function (res) {
			        if (res.confirm) {
			            console.log('用户点击确定');
						that.$http('user.roomAccountApproval', {
							applicationRoomId: item.id,
							isPass: false
						}, '审批分户...').then(res => {
							console.log('approveAgree res:', res);
							if(res.code === 200){
								that.$u.toast(res.message)
								that.initApplicationList()
							}
						})
						
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
			
		}
		
	}
}