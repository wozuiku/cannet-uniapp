export default {
	data(){
		return {
			yearIndex: -1,
			yearPicker: [],
			monthCur: 0,
			scrollLeft: 0,
			balanceItem: {},
			billList: [],
			meterCount: 0,
			colorList: ['#39C678', '#FFD304', '#FF5726'],
			loading: true,
			progressStyle: '',
			percent: ''
		}
	},
	
	onLoad(options){
			console.log("-----------------------resident-----------");
		this.balanceItem  = JSON.parse(decodeURIComponent(options.balanceItem));
		console.log('options:', options);
		this.init()
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
			this.getBill()
		},
		
		getBill(){
			
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
			this.getBill()
		},
		
		selectMonth(e) {
			this.monthCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			console.log('selectMonth e:', e);
			console.log('selectTime:', this.selectTime);
			this.getBill()
		},
		
		showAmount(amount){
			if(amount == null){
				return '-'
			}else{
				return amount
			}
		},
		
		showStepAmount(amount){
			if(amount == null){
				return '以上'
			}else{
				return amount
			}
		},
		
		getStyle(index){
			let style = ''
			style = "color:" + this.colorList[index] + ";"
			return style
		},
		
		getProgressStyle(processNumber, stepList){
			console.log('getProgressStyle processNumber:', processNumber);
			console.log('getProgressStyle stepList:', stepList);
			let step1 = stepList[0].endMeasure
			let step2 = stepList[1].endMeasure
			
			let gradient = ''
			let style = ''
			if(processNumber <= step1){
				this.percent = Math.floor((processNumber / step2)*100) + "%"
				gradient = "linear-gradient(90deg, #39C678 100%);"
				style = "background:" + gradient + "width:" + this.percent
			}else if(processNumber > step1 && processNumber <= step2){
				this.percent = Math.floor((processNumber / step2)*100) + "%"
				gradient = "linear-gradient(90deg, #39C678 50%, #FFD304 100%,);"
				style = "background:" + gradient + "width:" + this.percent
			}else if(processNumber > step2){
				this.percent = "100%"
				gradient = "linear-gradient(90deg, #39C678 33%, #FFD304 66%, #ff0000 100%);"
				style = "background:" + gradient + "width:" + this.percent
			}
			
			return style
		},
		
		showStep(pricingPlan){
			//1-单一计价，2-分时计价， 3-阶梯计价,  4-分时阶梯计价
			if(pricingPlan == '3' || pricingPlan == '4'){
				return true
			}else{
				return false
			}
			
		},
	}
}