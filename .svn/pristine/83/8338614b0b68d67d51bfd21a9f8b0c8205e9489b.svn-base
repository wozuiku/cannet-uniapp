export default {
	data(){
		return {
			
			roomId: '', //房间id
			masterSign: '', //当前账户是否房间主户(0-是,1-不是)
			
			action1:{
				code: '',
				name: '去交费',
				icon: 'https://cdn.uviewui.com/uview/common/classify/1/7.jpg',
			},
			
			action2:{
				code: '',
				name: '审批分户',
				icon: 'https://cdn.uviewui.com/uview/common/classify/1/14.jpg',
			},
			
			action3:{
				code: '',
				name: '房间账户',
				icon: 'https://cdn.uviewui.com/uview/common/classify/9/3.jpg',
			},
			
			action4:{
				code: '',
				name: '其他功能',
				icon: 'https://cdn.uviewui.com/uview/common/classify/9/2.jpg',
			}
		}
	},
	
	onLoad(option){
		console.log('action--onLoad--option', option);
		this.roomId = option.roomId
		this.masterSign = option.masterSign
	},
	
	methods:{
		
		jump(funcType){
			
			if(funcType === 'pay'){
				this.$Router.push('/pages/charge/pay/index/index')
				
			}
			
			if(funcType === 'approve'){
				
				let param = {
					roomId: this.roomId
				}
				
				this.$Router.push({path: '/pages/user/room/approve/index', query: param});
			}
			
			if(funcType === 'account'){
				
				let param = {
					roomId: this.roomId
				}
				
				this.$Router.push({path: '/pages/user/room/account/index', query: param});
				
			}
		}
		
	}
}