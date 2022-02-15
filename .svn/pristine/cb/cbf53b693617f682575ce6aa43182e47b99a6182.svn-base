export default {
	
	data(){
		return {
			roomId: '',
			accountList: [],
		}
	},
	
	onLoad(option){
		console.log('branch--onLoad--option', option);
		this.roomId = option.RoomId
		
		console.log('branch--onLoad--roomId', this.roomId);
		
		this.$http(
			'user.roomAccountList', {
				RoomId: this.roomId,
			},
			'获取房间账户列表...'
		).then(res => {
			console.log('branch---onLoad---res:', res);
			
			if(res.code === 200){
				
				this.accountList = res.data
			}
			
			console.log('branch---onLoad---accountList:', this.accountList);
		});
		
	},
	
	methods: {
		
		// jump(roomId){
			
		// 	let patams = {RoomId: roomId}
			
		// 	this.$Router.push({path: '/pages/user/room/branch/index', query: patams});
			
		// }
		
	}
	
}