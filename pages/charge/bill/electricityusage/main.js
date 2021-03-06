import echarts from '@/components/echarts/echarts.vue';
// import mecharts from '@/common/echarts/echarts-5.1.2-min.js'
//import echarts from 'https://cdn.bootcdn.net/ajax/libs/echarts/4.9.0-rc.1/echarts.min.js'
export default {
	data() {
		return {
			roomInfo: {},
			TabCur: 0,
			yearCur: new Date().getFullYear(),
			tablist: [{
				"title": "月度电费"
			}, {
				"title": "日用电量"
			}],
			yearlist: [],
			chartsDataColumn2: {},
			yearoption: {},
			yearMeterList: [], //月度电费所有表的集合
			yflist: [],

			// 日用电量
			daytime: 0,
			optionline: {},
			listcurr: "0-0",
			dayoption: {},
			dayoptionids: {},
			devDayNetList: [], //网络请求回来的数据
			devDayList: [],
			pieoption: {},
			custom: {},
		}
	},
	onLoad(e) { //页面加载
		console.log(e);
		if (e.item) { //如果有传值过来的数据
			this.roomInfo = JSON.parse(decodeURIComponent(e.item));
			console.log("传递过来的数据", this.roomInfo);
		}
		this.yearlist = [(new Date().getFullYear()), (new Date().getFullYear() - 1), (new Date().getFullYear() - 2)]
		this.getAppEnergyFeeListOfYear(this.yearCur);
	},
	onShow() { //页面显示
		this.custom = this.$commom.getCustom();
	



		//日用电量的图标配置
		this.dayallOprion = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},

			grid: {
				top: 40,
				left: '5%',
				right: '5%',
				bottom: '3%',
				containLabel: true
			},
			"dataZoom": [{
				"type": "inside",

			}, {
				"type": "inside",

			}, ],
			xAxis: [{
				type: 'category',
				data: [],
				axisLine: {
					show: true,
					color: "#999",
					symbol: ['none', 'arrow'],
					symbolOffset: [10, 10],
					symbolSize: [5, 8],
					lineStyle: {
						"color": "#999", //坐标轴X的颜色
					}
				}
			}],
			yAxis: [{
				type: 'value',
				"name": "kWh",
				axisLine: {
					color: "#999",
					show: true,
					symbol: ['none', 'arrow'],
					symbolOffset: [10, 10],
					symbolSize: [5, 8],
					lineStyle: {
						"color": "#999", //坐标轴X的颜色
					}
				},
			}],
			series: [

				{
					name: '',
					type: 'line',
					emphasis: {
						focus: 'series'
					},
					data: [],
					"itemStyle": {
						color: "#1890ff"
					},
					areaStyle: {
						color: {
							colorStops: [{ //渐变的
									offset: 0.2,
									color: 'rgb(43, 174, 255)'
								},
								{
									offset: 0.3,
									color: 'rgb(120, 224, 255)'
								},
								{
									offset: 0.8,
									color: '#fff'
								}
							],
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							type: 'linear',
							global: false
						}

					},
				},

			]
		}
		//日用电量--日用电量的饼状图
		this.pieoption = {
			tooltip: {
				trigger: 'item'
			},
			legend: {
				show: false,
				orient: 'vertical',
				left: 'left',
				top: 'center',
				width: "100%",
				itemWidth: 8,
				itemHeight: 8,
				icon: "circle"
			},
			// "grid": {
			// 	//top: 10,
			// 	left: '5%',
			// 	right: '5%',
			// 	bottom: 10,
			// 	containLabel: true
			// },
			series: [{
				name: '',
				type: 'pie',
				radius: '80%',
				data: [
					// {
					// 	value: 0,
					// 	name: 'Search Engine'
					// },
					// {
					// 	value: 735,
					// 	name: 'Direct'
					// },
					// {
					// 	value: 580,
					// 	name: 'Email'
					// },
					// {
					// 	value: 484,
					// 	name: 'Union Ads'
					// },
					// {
					// 	value: 300,
					// 	name: 'Video Ads'
					// }
				],
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				},
				label: {
					show: false,
				},
				labelLine: {
					show: false
				},
			}]
		}


		//var resData=mock.mockdata.list

		// for (var i = 0; i < this.devDayList.length; i++) {
		// 	let item=this.devDayList[i];
		// 	item.option=JSON.parse(JSON.stringify(this.dayallOprion))
		// 	for (var j = 0; j < item.monthEnergy.length; j++) {
		// 		let subitem=item.monthEnergy[j];
		// 		subitem.dataTime=this.$commom.dateFormat("yyyy-MM-dd",subitem.dataTime)
		// 		item.option.xAxis[0].data.push(subitem.dataTime);
		// 		item.option.series[0].data.push(subitem.base00);

		// 		subitem.option=JSON.parse(JSON.stringify(pieoption))
		// 		subitem.option.series[0].data=[
		// 			{
		// 				value: subitem.base01,
		// 				name: '尖'
		// 			},
		// 			{
		// 				value: subitem.base02,
		// 				name: '峰'
		// 			},
		// 			{
		// 				value: subitem.base03,
		// 				name: '平'
		// 			},
		// 			{
		// 				value: subitem.base04,
		// 				name: '谷'
		// 			}
		// 		]
		// 	}


		// }




		// var pieoption = {
		// 	tooltip: {
		// 		trigger: 'item'
		// 	},
		// 	legend: {
		// 		orient: 'vertical',
		// 		left: 'left',
		// 		top: 'center'
		// 	},
		// 	"grid": {
		// 		top: 10,
		// 		left: '50%',
		// 		right: '5%',
		// 		bottom: 10,
		// 		containLabel: true
		// 	},
		// 	series: [{
		// 		name: 'Access From',
		// 		type: 'pie',
		// 		radius: '50%',
		// 		data: [{
		// 				value: 0,
		// 				name: 'Search Engine'
		// 			},
		// 			{
		// 				value: 735,
		// 				name: 'Direct'
		// 			},
		// 			{
		// 				value: 580,
		// 				name: 'Email'
		// 			},
		// 			{
		// 				value: 484,
		// 				name: 'Union Ads'
		// 			},
		// 			{
		// 				value: 300,
		// 				name: 'Video Ads'
		// 			}
		// 		],
		// 		emphasis: {
		// 			itemStyle: {
		// 				shadowBlur: 10,
		// 				shadowOffsetX: 0,
		// 				shadowColor: 'rgba(0, 0, 0, 0.5)'
		// 			}
		// 		},
		// 		label: {
		// 	 	show: false,
		// 		},
		// 		labelLine: {
		// 			show: false
		// 		},
		// 	}]
		// }

		// for (var i = 0; i < 7; i++) {
		// 	let oprion = pie;
		// 	let data = [{
		// 		 value: 1048 * i,
		// 			name: '尖：'
		// 		},
		// 		{
		// 			value: 735 * i,
		// 			name: '峰：'
		// 		},
		// 		{
		// 			value: 580 * i,
		// 			name: '平：'
		// 		},
		// 		{
		// 			value: 484 * i,
		// 			name: '谷：'
		// 		}
		// 	]

		// 	oprion.series[0].data = data;
		// 	let item = {
		// 		"id": "id" + i,
		// 		"option": oprion
		// 	}
		// 	//this.daytimelist.push(item);
		// }

	},
	onReady() { //页面初次显示
	},
	onHide() { //页面隐藏
	},
	onUnload() { //页面卸载

	},
	onBackPress() { //页面返回

	},
	onShareAppMessage() { //分享
	},
	onReachBottom() { //下拉加载
	},
	onPageScroll() { //页面滚动
		//console.log('页面滚动...')
	},
	onPullDownRefresh() { //上拉刷新
		uni.stopPullDownRefresh();
	},

	// #ifdef APP-PLUS
	onNavigationBarButtonTap() {

	},
	// #endif
	methods: {
		charge_bill(){
			let userType = this.roomInfo.userType
			console.log('userType :', userType);
			//工业账单
			if(userType == 0||userType==null){
				uni.navigateTo({
					url: '/pages/charge/bill/industry/index?balanceItem=' + encodeURIComponent(JSON.stringify(this.roomInfo))
				});
			//居民账单
			}else if(userType == 1){
				uni.navigateTo({
					url: '/pages/charge/bill/resident/index?balanceItem=' + encodeURIComponent(JSON.stringify(this.roomInfo))
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
				url: '/pages/charge/pay/topay?item=' + encodeURIComponent(JSON.stringify(this.roomInfo)),
			});
		},
		dateFormat(fmt, dateTime = "", isEntity = false) {
			//console.log("时间格式化=" + dateTime, fmt);

			let ret;
			var date = null

			if (dateTime) {
				dateTime=dateTime.replace(/\-/g, '/')
				date = new Date(dateTime)
			} else {
				date = new Date()
			}

			if (isEntity && !dateTime) {
				return ""
			}

			var o = {
				"M+": date.getMonth() + 1, //月份   
				"d+": date.getDate(), //日   
				"h+": date.getHours(), //小时   
				"m+": date.getMinutes(), //分   
				"s+": date.getSeconds(), //秒   
				"q+": Math.floor((date.getMonth() + 3) / 3), //季度   
				"S": date.getMilliseconds() //毫秒   
			};
			if (/(y+)/.test(fmt))
				fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
			for (var k in o)
				if (new RegExp("(" + k + ")").test(fmt))
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
						.length)));

			return fmt;
		},
		
		//月度电费的选择年
		yearSelect(item) {
			this.yearCur = item;
			this.getAppEnergyFeeListOfYear(this.yearCur);
		},
		asnyYearData(data) {
			this.yearoption = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},
				legend: {},
				grid: {
					left: '5%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				"dataZoom": [{
					"type": "inside",

				}, {
					"type": "inside",

				} ],
				xAxis: [{
					type: 'category',
					
					data: []
				}],
				yAxis: [{
					type: 'value',
					name:"kWh"
					
				}],
				series: [

					{
						name: '',
						type: 'bar',
						stack: 'Ad',
						emphasis: {
							focus: 'series'
						},

						data: []
					},
					// 		{
					// 			name: '二档',
					// 			type: 'bar',
					// 			stack: 'Ad',
					// 			emphasis: {
					// 				focus: 'series'
					// 			},
					// 			data: []
					// 		},
					// 		{
					// 			name: '三档',
					// 			type: 'bar',
					// 			stack: 'Ad',
					// 			emphasis: {
					// 				focus: 'series'
					// 			},
					// 			data: []
					// 		},

				]
			};


			for (var a = 0; a < data.length; a++) {
				let item = data[a];
				item.max = ""; //最大值
				let x = [];
				let y = [];
				let option = JSON.parse(JSON.stringify(this.yearoption))
				for (var i = 0; i < item.monthList.length; i++) {
					let subitem = item.monthList[i];
					item.max == "" ? subitem.billingQuantityAll : item.max;
					if (subitem.billingQuantityAll && subitem.billingQuantityAll > item.max ) {
						item.max = subitem.billingQuantityAll
						console.log("item.max",item.max);
					}
					subitem.time = this.dateFormat("MM", subitem.feesTime)
					subitem.timeStr = this.dateFormat("yyyy-MM", subitem.feesTime)
					x.push(subitem.time+"月");
					subitem.isShow=(new Date().getTime()>=new Date(subitem.timeStr).getTime());//判断小于当前的不显示
					console.log("subitem.isShow",subitem.isShow);
					if (subitem.stepList.length > 0) { //如果是阶梯的话
						let dataitem = {
							value: subitem.billingQuantityAll,
							itemStyle: {
								color: {
									colorStops: [{ //渐变的
											offset: 0.2,
											color: 'blue'
										},
										{
											offset: 0.3,
											color: 'yellow'
										},
										{
											offset: 0.8,
											color: 'red'
										}
									],
									x: 1,
									y: 1,
									x2: 1,
									y2: 0,
									type: 'linear',
									global: false
								}
							}
						}
						let colorStops = [];
						let num = 0; //设置颜色百分比
						for (let b = 0; b < subitem.stepList.length; b++) {
							let bitem = subitem.stepList[b];
							console.log(bitem.billElectric, subitem.billingQuantityAll);
							let subnum = ((bitem.billElectric / subitem.billingQuantityAll));
							num = num + subnum;
							let op = {
								offset: num.toFixed(2),
								color: this.$COLORLIST[b]
							}

							colorStops.push(op)
						}
						dataitem.itemStyle.color.colorStops = colorStops
						y.push(dataitem)
					} else {
						y.push({
							value: subitem.billingQuantityAll,
							itemStyle: {
								color: {
									colorStops: [{ //渐变的
											offset: 0.5,
											color: '#4381FF'
										},
										{
											offset: 0.8,
											color: '#296CFA'
										}
									],
									x: 1,
									y: 1,
									x2: 1,
									y2: 0,
									type: 'linear',
									global: false
								}
							}
						})
					}
				}
				option.xAxis[0].data = x;
				option.series[0].data = y;
				item.option = option;
				
			}
			console.log(data);
			this.yearMeterList = JSON.parse(JSON.stringify(data))
		},
		
		toDayUse(item){
			item.roominfo=this.roomInfo
			uni.navigateTo({
				url: '/pages/charge/bill/electricityusage/dayelectusage/dayelectusage?item=' + encodeURIComponent(JSON.stringify(item)),
			});
		},
		changeDayTime(tab) {
			this.daytime = tab
			this.asnyData7And30(this.daytime, this.devDayNetList);
		},
		toOpenList(index, item) {
			console.log(item);
			this.listcurr = index;
			console.log(this);

			// let id = item.chartid;
			// console.log(this.$refs[id][0]);
			// this.$refs[id][0].resizeChart()
		},
		//日用电量的近7天和近30天数据
		asnyData7And30(tab, data) {
			let list = [];
			let res = JSON.parse(JSON.stringify(data));;
			this.devDayList = [];
			let isSevenData = false;
			console.log("data.length", res.length);
			for (var i = 0; i < res.length; i++) {
				let item = JSON.parse(JSON.stringify(res[i]));
				let mItem = JSON.parse(JSON.stringify(res[i]));
				mItem.monthEnergy = [];
				mItem.option = JSON.parse(JSON.stringify(this.dayallOprion))
				for (var j = 0; j < item.monthEnergy.length; j++) {
					let subitem = item.monthEnergy[j];
					console.log("tab" + tab);
					if (tab == 0 && j >= 7) { //获取前7天的数据
						console.log("大于7");
						isSevenData = true;
						break
					}
					subitem.chartid = item.meter.meterId + subitem.dataTime; //图表id
					subitem.dataTime = this.$commom.dateFormat("yyyy-MM-dd", subitem.dataTime)
					mItem.option.xAxis[0].data.push(subitem.dataTime);
					mItem.option.series[0].data.push(subitem.base00);

					subitem.option = JSON.parse(JSON.stringify(this.pieoption))
					subitem.option.series[0].data = [{
							value: subitem.base01,
							name: '尖 ' + subitem.base01
						},
						{
							value: subitem.base02,
							name: '峰 ' + subitem.base02
						},
						{
							value: subitem.base03,
							name: '平 ' + subitem.base03
						},
						{
							value: subitem.base04,
							name: '谷 ' + subitem.base04
						}
					]

					mItem.monthEnergy.push(subitem)
					console.log("subitem", subitem);
				}
				// mItem=JSON.parse(JSON.stringify(item));//复制一个对象
				console.log(mItem);
				//console.log(mItem);
				console.log("item.length", mItem.monthEnergy.length);

				list.push(mItem)
			}
			this.devDayList = list;
			console.log("this.devDayList", this.devDayList);
		},
		//获取总计
		getListTotal(dataList, name) {
			return dataList.reduce((total, item) => total + item[name], 0).toFixed(2)
		},
		/*********************************************************************/
		getAppEnergyDetail() { //获取日用电量
			var that = this;
			console.log(that.roomInfo);
			this.$http(
				'bill.getAppEnergyDetail', {
					"roomId": that.roomInfo.roomId,
				}, '加载中...'
			).then(res => {
				//console.log(res)
				console.log('用电情况(日用电量):', res);
				if (res.code === 200) {
					that.devDayNetList = res.data.list.reverse();
					that.asnyData7And30(0, that.devDayNetList);
					//console.log('用电情况(日用电量):', res.data);
					//that.item.accountBalance = res.data.balance||0
				}
			});

		},
		getAppEnergyFeeListOfYear(year) { //获取月度电费
			var that = this;
			console.log(that.roomInfo);
			this.$http(
				'bill.getAppEnergyFeeListOfYear', {
					"roomId": that.roomInfo.roomId,
					"Year": year
				}, '加载中...'
			).then(res => {
				//console.log(res)
				console.log('获取月度电费:', JSON.parse(JSON.stringify(res)));
				if (res.code === 200) {
					res.data=res.data.reverse();
					that.asnyYearData(res.data);
					//console.log('用电情况(日用电量):', res.data);
					//that.item.accountBalance = res.data.balance||0
				} else {
					that.$toast(res.message);
				}
			});

		},

	}
}
