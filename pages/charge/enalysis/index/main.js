import enanaldata from '../../../../mock/func.data.enanalysis.js'
export default {
	name: "energyanalysis",
	data() {
		return {
			balanceItem: {}, // 用户信息
			nowYear: this.$commom.dateFormat("yyyy"), // 当前年 
			lastYear: parseInt(this.$commom.dateFormat("yyyy")) - 1, // 上一年
			nowMonth: parseInt(this.$commom.dateFormat("MM")), // 当前月
			enanaldata: [], // 用能分析 模拟数据
			lfType: 1, // 量费趋势 1电量 2电费
			// 下面的到时候删除
			ydxData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
				24, 25, 26, 27, 28, 29, 30, 31
			], // 本月用电x轴
			ydyData: [120, 132, 101, 134, 90, 230, 890, 120, 132, 101, 134, 90, 230, 890, 120, 132, 101, 134, 90, 230,
				890
			], // 本月用电Y轴
			ydoption: {}, // 本月用电
			lfxData: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月",
				"10月", "11月", "12月"
			], // 量费趋势x轴
			lfdlDataPre: [120, 132, 101, 134, 90, 230, 890, 120], // 量费趋势 Y轴 电量
			lfdlDataNow: [150, 162, 121, 104, 100, 220, 990, 160], // 量费趋势 Y轴 电量
			lfoptiondl: {}, //量费趋势电量
			lfdfDataPre: [220, 232, 201, 234, 190, 280, 990, 150], // 量费趋势 Y轴 电费
			lfdfDataNow: [250, 262, 221, 204, 200, 250, 890, 170], // 量费趋势 Y轴 电费
			lfoptiondf: {}, //量费趋势电费

		}
	},
	onShow() {

	},
	onLoad(option) {
		// option.roomId  房间id
		this.balanceItem = JSON.parse(decodeURIComponent(option.balanceItem));
		console.log("进入用能分析2", this.balanceItem)
		// this.enanaldata = enanaldata.data.list
		// console.log("用电分析模拟数据", enanaldata)
		this.getEnalysisList()
	},
	methods: {
		// 获取用电分析
		getEnalysisList() {
			let that = this
			this.$http(
				'room.getEnalysisList', {
					"roomId": that.balanceItem.roomId,
				}, '加载中...'
			).then(res => {
				//console.log(res)
				console.log('获取用电分析:', res);
				if (res.code === 200) {
					console.log('获取用电分析列表:', res.data);
					that.enanaldata = res.data.list
				}
			});
		},

		// 封装方法 组 本月用电  量费趋势  年累计用电量
		// 本月用电  .vue页面调用方法
		ydoptionFn(data) {
			console.log("本月用电", data)
			// 对data进行数据处理  
			let nowDay = parseInt(this.$commom.dateFormat("dd"))
			let ydxData = [] // x轴数据
			let ydyData = [] // y轴数据
			data.forEach((item) => {
				let timeDay = this.$commom.dateFormat("dd", item.dataTime)
				let timeDayV = parseInt(timeDay)
				if (timeDayV <= nowDay) {
					let base00 = item.base00?item.base00:0
					ydyData.push(base00) // 大于今天号数的不显示值
				}
				ydxData.push(timeDayV)

			})
			let ydoption = {
				"tooltip": {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					},
					// trigger: 'axis',
					borderWidth: 0, // 边框宽度
					backgroundColor: 'rgba(0,0,0,0.7)', //背景颜色（此时为默认色）
					padding: 0, // 内边距
					formatter: function(params) { //自定义划过显示样式
						//params为滑过显示的数据信息
						// spanStr 划过提示 圆圈
						let spanStr =
							`<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#017eff;"></span>`
						var str = '';
						for (let i = 0; i < params.length; i++) {
							str += '<p class="fl" style="width:160px;">' + spanStr + " 本月用电" +
								' ' + params[i].value + " 度" + '</p>';
						}
						var tooltipHtml =
							'<div style="border:0px solid #ccc;padding:4px 6px;opacity:.8;width:160px;overflow-y:auto;font-size:12px;color:white;background-image: linear-gradient(to bottom left, #01737aB3, #014188B3);">' +
							params[0].axisValue + str + '</div>';

						return tooltipHtml;
					},
					// position: ['15%', '20%'],//显示的位置

					//formatter:'{a} \n {b} : {c} ({d}%)'
				},
				title: {
					//subtext: '用电 度'
				},
				legend: {

				},
				grid: {
					top: 10,
					left: 1,
					right: 5,
					bottom: 10,
					containLabel: true
				},
				"dataZoom": [{
					"type": "inside",

				}, {
					"type": "inside",

				}, ],
				xAxis: [{
					type: 'category',
					data: ydxData, //this.ydxData,
					axisLine: {
						lineStyle: {
							color: "#a9a9a9",
							width: 1,
						},
					}
				}],
				yAxis: [{
					type: 'value',
					axisLine: {
						lineStyle: {
							color: "#a9a9a9",
							width: 1,
						},
					}
				}],
				series: [{
					// name: 'Email',
					type: 'bar',
					color: {
						type: 'linear', // 渐变
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 0,
							color: '#01c5ff' // 0% 处的颜色
						}, {
							offset: 1,
							color: "#017eff" // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
					},
					data: ydyData, //this.ydyData
				}, ]
			};
			return ydoption

		},
		// 量费趋势 电量  暂时先不处理
		lfoptiondlFn(data) {
			console.log("量费趋势 电量",data)
			let lfxData = []
			let lfdlDataPre = []
			let lfdlDataNow = []
			data.forEach((item) => {
				let timeMonth = this.$commom.dateFormat("MM", item.dataTime)
				let timeMonthV = parseInt(timeMonth)
				let e0 = item.e0?item.e0:0
				let e1 = item.e1?item.e1:0
				lfdlDataPre.push(e0)
				lfdlDataNow.push(e1)
				lfxData.push(timeMonthV+"月")

			})
			let lfoptiondl = {
				"tooltip": {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					},
					// trigger: 'axis',
					borderWidth: 0, // 边框宽度
					backgroundColor: 'rgba(0,0,0,0.7)', //背景颜色（此时为默认色）
					padding: 0, // 内边距
					formatter: function(params) { //自定义划过显示样式
						//params为滑过显示的数据信息
						// spanStr 划过提示 圆圈
						let spanStr1 =
							`<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#00c4ff;"></span>`
						let spanStr2 =
							`<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#007dfe;"></span>`
						let spanArr = [spanStr1, spanStr2]
						var str = '';
						for (let i = 0; i < params.length; i++) {
							str += '<p class="fl" style="width:160px;">' + spanArr[i] + "" +
								' ' + params[i].value + " 度" + '</p>';
						}
						var tooltipHtml =
							'<div style="border:0px solid #ccc;padding:4px 6px;opacity:.8;width:160px;overflow-y:auto;font-size:12px;color:white;background-image: linear-gradient(to bottom left, #01737aB3, #014188B3);">' +
							params[0].axisValue + str + '</div>';

						return tooltipHtml;
					},
					// position: ['15%', '20%'],//显示的位置

					//formatter:'{a} \n {b} : {c} ({d}%)'
				},
				title: {
					//subtext: '用电 度'
				},
				legend: {

				},
				grid: {
					top: 32,
					left: 1,
					right: 5,
					bottom: 1,
					containLabel: true
				},
				"dataZoom": [{
					"type": "inside",

				}, {
					"type": "inside",

				}, ],
				xAxis: [{
					type: 'category',
					data: lfxData,
					axisLine: {
						lineStyle: {
							color: "#a9a9a9",
							width: 1,
						},
					}
				}],
				yAxis: [{
					type: 'value',
					axisLine: {
						lineStyle: {
							color: "#a9a9a9",
							width: 1,
						},
					}
				}],
				series: [{
						name: this.lastYear,
						type: 'bar',
						color: {
							type: 'linear', // 渐变
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [{
								offset: 0,
								color: '#00c4ff' // 0% 处的颜色
							}, {
								offset: 1,
								color: "#00c4ff" // 100% 处的颜色
							}],
							globalCoord: false // 缺省为 false
						},
						data: lfdlDataPre
					},
					{
						name: this.nowYear,
						type: 'bar',
						color: {
							type: 'linear', // 渐变
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [{
								offset: 0,
								color: '#007dfe' // 0% 处的颜色
							}, {
								offset: 1,
								color: "#007dfe" // 100% 处的颜色
							}],
							globalCoord: false // 缺省为 false
						},
						data: lfdlDataNow
					},
				]
			};
			return lfoptiondl
		},
		// 量费趋势 电费
		lfoptiondfFn(data) {
			// 后台还没写 暂时不用
			console.log("量费趋势 电费",data)
			return {}
			let lfxData = []
			let lfdfDataNow = []
			let lfdfDataPre = []
			data.forEach((item) => {
				let timeMonth = this.$commom.dateFormat("MM", item.dataTime)
				let timeMonthV = parseInt(timeMonth)
				let e0 = item.e0?item.e0:0
				let e1 = item.e1?item.e1:0
				lfdfDataPre.push(e0)
				lfdfDataNow.push(e1)
				lfxData.push(timeMonthV+"月")

			})
			let lfoptiondf = {
				"tooltip": {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					},
					// trigger: 'axis',
					borderWidth: 0, // 边框宽度
					backgroundColor: 'rgba(0,0,0,0.7)', //背景颜色（此时为默认色）
					padding: 0, // 内边距
					formatter: function(params) { //自定义划过显示样式
						//params为滑过显示的数据信息
						// spanStr 划过提示 圆圈
						let spanStr1 =
							`<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#ffc655;"></span>`
						let spanStr2 =
							`<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#ff985b;"></span>`
						let spanArr = [spanStr1, spanStr2]
						var str = '';
						for (let i = 0; i < params.length; i++) {
							str += '<p class="fl" style="width:160px;">' + spanArr[i] + "" +
								' ' + params[i].value + " 元" + '</p>';
						}
						var tooltipHtml =
							'<div style="border:0px solid #ccc;padding:4px 6px;opacity:.8;width:160px;overflow-y:auto;font-size:12px;color:white;background-image: linear-gradient(to bottom left, #01737aB3, #014188B3);">' +
							params[0].axisValue + str + '</div>';

						return tooltipHtml;
					},
					// position: ['15%', '20%'],//显示的位置

					//formatter:'{a} \n {b} : {c} ({d}%)'
				},
				title: {
					//subtext: '用电 度'
				},
				legend: {

				},
				grid: {
					top: 32,
					left: 1,
					right: 5,
					bottom: 1,
					containLabel: true
				},
				"dataZoom": [{
					"type": "inside",

				}, {
					"type": "inside",

				}, ],
				xAxis: [{
					type: 'category',
					data: lfxData,
					axisLine: {
						lineStyle: {
							color: "#a9a9a9",
							width: 1,
						},
					}
				}],
				yAxis: [{
					type: 'value',
					axisLine: {
						lineStyle: {
							color: "#a9a9a9",
							width: 1,
						},
					}
				}],
				series: [{
						name: '2021',
						type: 'bar',
						color: {
							type: 'linear', // 渐变
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [{
								offset: 0,
								color: '#ffc655' // 0% 处的颜色
							}, {
								offset: 1,
								color: "#ffc655" // 100% 处的颜色
							}],
							globalCoord: false // 缺省为 false
						},
						data: lfdfDataPre
					},
					{
						name: '2022',
						type: 'bar',
						color: {
							type: 'linear', // 渐变
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [{
								offset: 0,
								color: '#ff985b' // 0% 处的颜色
							}, {
								offset: 1,
								color: "#ff985b" // 100% 处的颜色
							}],
							globalCoord: false // 缺省为 false
						},
						data: lfdfDataNow
					},
				]
			};
			return lfoptiondf
		},
		// 年累计用电量  去年用电 今年用电
		nljoptiondfFn(lastYearEnergy, yearEnergy) {

			let nowYear = this.$commom.dateFormat("yyyy")
			let lastYear = parseInt(nowYear) - 1
			let nljxData = [lastYear, nowYear] // x轴

			let nljDataPre = [{
				value: lastYearEnergy,
				itemStyle: {
					color: '#00c4ff'
				}
			}, {
				value: yearEnergy,
				itemStyle: {
					color: '#007dfe'
				}
			}, ] // 年累计 Y轴 

			let nljoptiondf = {
				"tooltip": {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					},
					// trigger: 'axis',
					borderWidth: 0, // 边框宽度
					backgroundColor: 'rgba(0,0,0,0.7)', //背景颜色（此时为默认色）
					padding: 0, // 内边距
					formatter: function(params) { //自定义划过显示样式
						//params为滑过显示的数据信息
						// spanStr 划过提示 圆圈
						let spanStr1 =
							`<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#00c4ff;"></span>`
						let spanStr2 =
							`<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#007dfe;"></span>`
						let spanArr = [spanStr1, spanStr2]
						var str = '';
						for (let i = 0; i < params.length; i++) {
							str += '<p class="fl" style="width:160px;">' + spanArr[i] + "" +
								' ' + params[i].value + " 度" + '</p>';
						}
						var tooltipHtml =
							'<div style="border:0px solid #ccc;padding:4px 6px;opacity:.8;width:160px;overflow-y:auto;font-size:12px;color:white;background-image: linear-gradient(to bottom left, #01737aB3, #014188B3);">' +
							params[0].axisValue + str + '</div>';

						return "";
					},
					// position: ['15%', '20%'],//显示的位置

					//formatter:'{a} \n {b} : {c} ({d}%)'
				},
				title: {
					//subtext: '用电 度'
				},
				legend: {

				},
				grid: {
					top: "12%",
					left: 1,
					right: 5,
					bottom: 1,
					containLabel: true
				},
				"dataZoom": [{
					"type": "inside",

				}, {
					"type": "inside",

				}, ],
				xAxis: [{
					type: 'category',
					data: nljxData,
					axisLine: {
						lineStyle: {
							color: "#a9a9a9",
							width: 1,
						},
					}
				}],
				yAxis: [{
					type: 'value',
					axisLine: {
						lineStyle: {
							color: "#a9a9a9",
							width: 1,
						},
					}
				}],
				series: [{
					// name: '2021',
					label: {
						show: true,
						position: 'top'
					},
					type: 'bar',
					color: {
						type: 'linear', // 渐变
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 0,
							color: '#00c4ff' // 0% 处的颜色
						}, {
							offset: 1,
							color: "#00c4ff" // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
					},
					data: nljDataPre
				}, ]
			};
			return nljoptiondf
		}
	},
	components: { // 注册组件

	}
}
