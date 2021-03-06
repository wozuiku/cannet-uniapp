export default {
	data(){
		return{
			yearIndex: -1,
			yearPicker: [],
			monthCur: 0,
			scrollLeft: 0,
			balanceItem: {},
			billList: [],
			meterCount: 0,
		}
	},
	
	onLoad(options){
		console.log("-----------------------industy-----------");
		this.balanceItem  = JSON.parse(decodeURIComponent(options.balanceItem));
		console.log('onLoad options.balanceItem:', options.balanceItem);
		console.log('onLoad balanceItem:', this.balanceItem);
		
		this.init()
		
		console.log('onLoad selectTime:', this.selectTime);
	},
	
	computed: {
		selectTime: function(){
			let year = ''
			if(this.yearIndex == -1){
				year = this.yearPicker[0]
			}else{
				year = this.yearPicker[this.yearIndex]
			}
			
			let month = ''
			if(this.monthCur < 9){
				month = '0' + (this.monthCur + 1)
			}else{
				month =this.monthCur + 1
			}
			
			return year + '-' + month + '-01'
			
		}
	},
	
	methods:{
		init(){
			//初始化年选项
			let date = new Date();
			let year = date.getFullYear()
			this.yearPicker = [year, (year - 1), (year - 2)]
			this.getIndustryBill()
		},
		
		getIndustryBill(){
			this.$http('bill.industry', {
				'RoomId': this.balanceItem.roomId,
				'FeesTime': this.selectTime
			}).then(res => {
				if (res.code === 200) {
					this.billList = res.data
					this.meterCount = res.data.detailList.length
					console.log('this.billList:', this.billList);
					console.log('this.meterCount:', this.meterCount);
				}else{
					this.$u.toast('未找到账单')
					this.billList = []
				}
			})
		},
		
		selectYear(e) {
			this.yearIndex = e.detail.value
			console.log('selectYear e:', e);
			console.log('selectTime:', this.selectTime);
			this.getIndustryBill()
		},
		
		selectMonth(e) {
			this.monthCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			console.log('selectMonth e:', e);
			console.log('selectTime:', this.selectTime);
			this.getIndustryBill()
		},
		
		showAmount(amount){
			if(amount == null){
				return '-'
			}else{
				return amount
			}
		},
		showItem(item){
			if(item.capacityFees!=null||item.deamandFees!=null||item.forceFees!=null||item.differFees!=null){
				return true
			}else{
				return false
			}
		}
		
	}
}