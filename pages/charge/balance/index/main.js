export default {
	data(){
		return{
			balanceItem: {},
		}
	},
	
	onLoad(options){
		this.balanceItem=  JSON.parse(decodeURIComponent(options.item));
		console.log('onLoad options.item:', options.item);
		console.log('onLoad balanceItem:', this.balanceItem);
	},
	
	methods:{
		charge_bill(){
			let userType = this.balanceItem.userType
			console.log('userType :', userType);
			//工业账单
			if(userType == 0||userType==null){
				uni.navigateTo({
					url: '/pages/charge/bill/industry/index?balanceItem=' + encodeURIComponent(JSON.stringify(this.balanceItem))
				});
			//居民账单
			}else if(userType == 1){
				uni.navigateTo({
					url: '/pages/charge/bill/resident/index?balanceItem=' + encodeURIComponent(JSON.stringify(this.balanceItem))
				});
			}
			
			// uni.navigateTo({
			// 	url: '/pages/charge/bill/resident/index?balanceItem=' + encodeURIComponent(JSON.stringify(this.balanceItem))
			// });
			
		},
		to_charge() {//去充值页面
			// uni.navigateTo({
			// 	url: '/pages/charge/pay/index/index'
			// });
			uni.navigateTo({
				url: '/pages/charge/pay/topay?item=' + encodeURIComponent(JSON.stringify(this.balanceItem)),
			});
		},
		toUseElect(){
			uni.navigateTo({
				url: '/pages/charge/bill/electricityusage/electricityusage?item=' + encodeURIComponent(JSON.stringify(this.balanceItem)),
			});
			
		}
	}
}