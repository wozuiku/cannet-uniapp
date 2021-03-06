export default {
	data(){
		return {
			userId: '', //用户id
			balanceListAll: [],
			balanceList: [], //余额账户列表
			
			showModel: false,
			meterList: [],
		}
	},
	
	onLoad(){
		
	},
	
	onShow(){
		this.init()
	},
	
	methods: {
		
		init() {
			let userInfo = uni.getStorageSync('userInfo');
			this.userId = userInfo.id
			
			this.getBalanceList()
		},
		
		
		getBalanceList() {
			this.$http(
				'charge.balance', {
					AccountId: this.userId,
				}, '加载中...'
			).then(res => {
				if (res.code === 200) {
					//this.balanceListAll = res.data
					//this.balanceList = res.data
					
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
					
					this.balanceList = this.balanceListAll
					
				}
			});
		},
		
		showMeterModal(list){
			this.showModel = true
			this.meterList = list
			console.log('list:', list);
		},
		
		hideMeterModal(){
			this.showModel = false
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
		
		showAmount(amount){
			if(amount == null){
				return 0
			}else {
				return amount
			}
		},
		
		to_balance(item) {
			uni.navigateTo({
				url: '/pages/charge/balance/index/index?item=' + encodeURIComponent(JSON.stringify(item))
			});
		},
		
		to_charge(item) {
			uni.navigateTo({
				url: '/pages/charge/pay/topay?item=' + encodeURIComponent(JSON.stringify(item)),
			});
		},
		
		to_bill(item){
			let userType = item.userType
			console.log('userType :', userType);
			//工业账单
			if(userType == 0||userType==null){
				uni.navigateTo({
					url: '/pages/charge/bill/industry/index?balanceItem=' + encodeURIComponent(JSON.stringify(item))
				});
			//居民账单
			}else if(userType == 1){
				uni.navigateTo({
					url: '/pages/charge/bill/resident/index?balanceItem=' + encodeURIComponent(JSON.stringify(item))
				});
			}
		},
		
	}
}