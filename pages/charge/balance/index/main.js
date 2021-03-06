export default {
	data(){
		return{
			balanceItem: {},
			PAYTYPE:{},
			historylist: [],
		}
	},
	
	onLoad(options){
		this.balanceItem=  JSON.parse(decodeURIComponent(options.item));
		this.PAYTYPE=this.$PAYTYPE;
		console.log('onLoad options.item:', options.item);
		console.log('onLoad balanceItem:', this.balanceItem);
		this.getPayHistory();
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
			
		},
		toDetaile(item){//充值详情页面
			uni.navigateTo({
				url: '/pages/charge/pay/payhistory/paydetail?item=' + encodeURIComponent(JSON.stringify(item)),
			});
		},
		tohistory(){//历史充值记录
			uni.navigateTo({
				url: '/pages/charge/pay/payhistory/payhistory?item=' + encodeURIComponent(JSON.stringify(this.balanceItem)),
			});
		},
		getPayHistory() {//获取充值记录
			var that = this;
			console.log(that.balanceItem);
			let userInfo = uni.getStorageSync('userInfo');
			this.$http(
				'pay.getOrderList', {
					"CreateTimeMin": that.$commom.dateFormat("yyyy-MM")+"-01",
					"CreateTimeMax": that.$commom.dateFormat("yyyy-MM-dd hh:mm:ss"),
					"AccountId":userInfo.id,
					"TenantId":that.$commom.getLocalParam("tenantId"),
					"RoomId":that.balanceItem.roomId,
					"PageNum":1,
					"PageSize":10,
					"PayStatus":''
				}, '加载中...'
			).then(res => {
				//console.log(res)
				console.log('获取充值记录:', res);
				if (res.code === 200) {
					for (var i = 0; i < res.data.length; i++) {
						let item=res.data[i]
						that.historylist.push(item)
					}
					
					//console.log('用电情况(日用电量):', res.data);
					//that.item.accountBalance = res.data.balance||0
				}
			});
		
		},
	}
}