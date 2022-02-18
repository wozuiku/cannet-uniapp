	import echarts from '@/components/echarts/echarts.vue';
	// import mecharts from '@/common/echarts/echarts-5.1.2-min.js'
	//import echarts from 'https://cdn.bootcdn.net/ajax/libs/echarts/4.9.0-rc.1/echarts.min.js'
	export default {
		data() {
			return {
				roomInfo: {},
				TabCur: 0,
				tablist: [{
					"title": "月度电费"
				}, {
					"title": "日用电量"
				}],
				yearlist: [2022, 2021, 2020],
				chartsDataColumn2: {},
				option: {},
				yflist: [],

				// 日用电量
				daytime: 0,
				optionline: {},
				listcurr: "0-0",
				dayoption: {},
				dayoptionids: {},
				devDayNetList:[],//网络请求回来的数据
				devDayList: [],
				pieoption: {},
				custom:{},
			}
		},
		onLoad(e) { //页面加载
			console.log(e);
			if (e.item) { //如果有传值过来的数据
				this.roomInfo = JSON.parse(decodeURIComponent(e.item));
				console.log("传递过来的数据", this.roomInfo);
			}
		},
		onShow() { //页面显示
		this.custom=this.$commom.getCustom();
			this.option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},
				legend: {},
				grid: {
					left: '3%',
					right: '4%',
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
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
				}],
				yAxis: [{
					type: 'value'
				}],
				series: [

					{
						name: '一档',
						type: 'bar',
						stack: 'Ad',
						emphasis: {
							focus: 'series'
						},

						data: [120, 132, 101, 134, 90, 230, 210]
					},
					{
						name: '二档',
						type: 'bar',
						stack: 'Ad',
						emphasis: {
							focus: 'series'
						},
						data: [220, 182, 191, 234, 290, 330, 310]
					},
					{
						name: '三档',
						type: 'bar',
						stack: 'Ad',
						emphasis: {
							focus: 'series'
						},
						data: [150, 232, 201, 154, 190, 330, 410]
					},

				]
			};
			for (var i = 0; i < 5; i++) {
				this.yflist.push({
					"name": i + 1 + "月",
					"price": i + ""
				})
			}



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
								colorStops: [{//渐变的
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
			dateFormat(fmt, dateTime = "", isEntity = false) {
				//$ch.log("时间格式化=" + dateTime, fmt);

				let ret;
				var date = null

				if (dateTime) {
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
			//选择0月费用、1日用电
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				var that = this;
				if (this.TabCur == 1) {
					this.getAppEnergyDetail();
					
					// let list=that.devDayList;
					// console.log("list",list);
					// for (var i = 0; i < this.devDayList.length; i++) {
					// 	let item=that.devDayList[i];
					// 	let id = item.meter.meterId;
					// 	console.log(that.$refs);
					// 	that.$refs[id][0].resizeChart()
					// }
					// this.$forceUpdate()
				}

			},
			getIndex(e) {
				console.log("获取点击索引事件", e);
			},

			changeDayTime(tab) {
				this.daytime = tab
				this.asnyData7And30(this.daytime,this.devDayNetList);
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
			asnyData7And30(tab,data) {
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
			getAppEnergyDetail() {//获取日用电量
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
						that.devDayNetList=res.data.list;
						that.asnyData7And30(0,that.devDayNetList);
						//console.log('用电情况(日用电量):', res.data);
						//that.item.accountBalance = res.data.balance||0
					}
				});
			
			},

		}
	}
