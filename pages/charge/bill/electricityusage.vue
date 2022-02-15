<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">

			<block slot="content">用电情况</block>
			<!-- <block slot="right">
			<view class="margin-right text-xxl">
					<navigator url="../sancode/sancode" open-type="navigate">
						<text class="cuIcon-add " style="font-size: 40upx;"></text>
					</navigator>
			</view>
			</block> -->
		</cu-custom>
		<scroll-view scroll-y="true" class="page">
			<view class="cu-list">
				<view class="cu-item bg-gradual-blue flexrowbetween">
					<view style="padding: 25rpx;padding-bottom: 50rpx;">
						<text style="font-size: 33rpx;color:#FFF;font-weight: bold;">{{custom.roomName.columnAlias||custom.roomName.columnDescription}}：{{roomInfo.roomName}}</text>
						<view>
							<text style="font-size: 26rpx;margin-top: 10rpx; color:#B2E0FE ;font-weight: 400;">{{roomInfo.userName}}</text>
						</view>
						<view class="yhinfo">
							<text class="cuIcon-location" style="font-size: 24rpx;"></text>
							<text style="font-size: 26rpx;font-weight: 400;">{{roomInfo.userAddress}}</text>
						</view>
					</view>
					<text class="cuIcon-right margin-right"></text>
				</view>
				<scroll-view scroll-x class=" bg-white nav solid-bottom" style="margin-top: 2rpx;">
					<view class="flex text-center">
						<view class="cu-item flex-sub" v-for="(item,index) in tablist" :key="index" @tap="tabSelect"
							:data-id="index">
							<text :class="index==TabCur?'text-blue cur cu-item':''">{{item.title}}</text>
						</view>

					</view>
				</scroll-view>

				<view v-show="TabCur==0">
					<!-- 时间 -->
					<scroll-view scroll-x scroll-with-animation class="bg-white nav text-center">
						<view class="cu-item" :class="index==TabCur?'text-blue ycur':''"
							v-for="(item,index) in yearlist" :key="index" @tap="tabSelect" :data-id="index">
							{{item}}
						</view>
					</scroll-view>

					<!-- 表号 -->
					<view class="cu-item padding-sm bg-white solid-bottom text-black text-bold">
						表号：98070340758
					</view>

					<view class="cu-item bg-white">
						<echarts :option="option" style="height: 300px;"></echarts>
					</view>
					<view class="cu-item bg-white">
						<table class="bg-white" width="100%" style="padding-right: 10rpx;">
							<tr style="width: 100%;padding: 6rpx 0rpx;margin-top: 16rpx; background-color: #eee;">
								<td class="td-typeheader" width="15%">月份</td>
								<td class="td-typeheader" width="25%" style="text-align: right;padding-right: 16rpx;">
									电能量值<br>(kWh)</td>
								<td class="td-typeheader" width="20%">电费<br>(元)</td>
								<td class="td-typeheader" width="20%">服务费<br>(元)</td>
								<td class="td-typeheader" width="20%" style="text-align: right;padding-right: 16rpx;">
									总费用<br>(元)</td>
							</tr>
							<tr style="width: 100%;padding: 6rpx 0rpx;" v-for="(item,index) in yflist">
								<td class="td-content" width="15%">{{item.name}}</td>
								<td class="td-content" width="25%" style="text-align: right;padding-right: 16rpx;">
									{{item.price}}
								</td>
								<td class="td-content" width="20%">{{item.price}}</td>
								<td class="td-content" width="20%">{{item.price}}</td>

								<td class="td-content" width="20%" style="text-align: right;padding-right: 16rpx;">
									{{item.price}}
								</td>
							</tr>
							<tr style="width: 100%;height: 88rpx;">
								<td class="td-total" width="15%">总计</td>
								<td class="td-total" width="25%" style="text-align: right;padding-right: 16rpx;">
									2342</td>
								<td class="td-total" width="20%">3245</td>
								<td class="td-total" width="20%">345</td>

								<td class="td-total" width="20%" style="text-align: right;padding-right: 16rpx;">
									3245</td>
							</tr>

						</table>
					</view>

				</view>

				<view v-show="TabCur==1">
					<view class="cu-item text-center bg-white padding-sm flexrow">
						<view class="text-center day-time-border flex" style="">
							<view class="day-time text-center " :class="daytime==0?'day-curr':''"
								@tap="changeDayTime(0)">近7天</view>
							<view class="day-time text-center" :class="daytime==1?'day-curr':''"
								@tap="changeDayTime(1)">近30天</view>
						</view>
					</view>
					<view v-for="(dayitem,index) in devDayList">
						<!-- 表号 -->
						<view class="cu-item padding-sm bg-white solid-bottom text-black text-bold margin-top-sm">
							表号：{{dayitem.meter.meterNo}}
						</view>

						<view class="cu-item bg-white">
							<echarts :option="dayitem.option||{}" :ref="dayitem.meter.meterId" style="height: 300px;">
							</echarts>
						</view>
						<view class="cu-item  padding-sm solid-bottom flex">
							<view class="flex-sub">
								时间
							</view>
							<view class="flex-sub" style="float: right;text-align: right;">
								用电量(kWh)
							</view>
						</view>
						<view class="cu-item bg-white padding-sm solid-bottom  arrow "
							v-for="(energyitem,subindex) in dayitem.monthEnergy"
							@tap="toOpenList((index+'-'+subindex),energyitem)">
							<view class="flexrowstart" style="width: 100%;height: 66rpx;">
								<view class="flex-sub">
									{{dateFormat("yyyy-MM-dd",energyitem.dataTime)}}
								</view>
								<view class="flex-sub flex">
									<view class="flex-sub text-right padding-right">{{energyitem.base00}}</view>
									<text :class="listcurr==(index+'-'+subindex)?'cuIcon-unfold':'cuIcon-right'"
										style="float: right;"></text>
								</view>
							</view>
							<view v-show="listcurr==(index+'-'+subindex)" style=" height: 200rpx;">
								<view class="flex">
									<view class="flex-twice flex flex-direction justify-center">
										<view class="flex justify-start align-center">
											<view
												style="width: 24rpx;height: 24rpx; border-radius: 50px;background-color:#FFF100 ;">
											</view>
											<text style="margin:0px 12rpx;">尖用电量</text>
											<text
												style=" white-space: nowrap;min-width: 120rpx;text-align: end;">{{energyitem.base01}}</text>
											<text class="text-right "
												style="margin:0px 12rpx;min-width: 120rpx;">{{energyitem.base00!=0&&energyitem.base00!=null?((energyitem.base01/energyitem.base00*100).toFixed(2)+'%'):"-"+'%'}}</text>
										</view>
										<view class="flex justify-start align-center">
											<view
												style="width: 24rpx;height: 24rpx; border-radius: 50px;background-color:#36C778 ;">
											</view>
											<text style="margin:0px 12rpx;">峰用电量</text>
											<text
												style=" white-space: nowrap;min-width: 120rpx;text-align: end;">{{energyitem.base02}}</text>
											<text class="text-right "
												style="margin:0px 12rpx;min-width: 120rpx;">{{energyitem.base00!=0&&energyitem.base00!=null?((energyitem.base02/energyitem.base00*100).toFixed(2)+'%'):"-"+'%'}}</text>
										</view>
										<view class="flex justify-start align-center">
											<view
												style="width: 24rpx;height: 24rpx; border-radius: 50px;background-color:#E60012 ;">
											</view>
											<text style="margin:0px 12rpx;">平用电量</text>
											<text
												style=" white-space: nowrap;min-width: 120rpx;text-align: end;">{{energyitem.base03}}</text>
											<text class="text-right "
												style="margin:0px 12rpx;min-width: 120rpx;">{{energyitem.base00!=0&&energyitem.base00!=null?((energyitem.base03/energyitem.base00*100).toFixed(2)+'%'):"-"+'%'}}</text>
										</view>
										<view class="flex justify-start align-center">
											<view
												style="width: 24rpx;height: 24rpx; border-radius: 50px;background-color:#1890FF ;">
											</view>
											<text style="margin:0px 12rpx;">谷用电量</text>
											<text
												style=" white-space: nowrap;min-width: 120rpx;text-align: end;">{{energyitem.base04}}</text>
											<text class="text-right "
												style="margin:0px 12rpx;min-width: 120rpx;">{{energyitem.base00!=0&&energyitem.base00!=null?((energyitem.base04/energyitem.base00*100).toFixed(2)+'%'):("-"+'%')}}</text>
										</view>

									</view>
									<view class="flex-sub flex">
										<view style="width: 100%;">
											<echarts :option="energyitem.option||{}" :ref="energyitem.chartid"
												:id="energyitem.chartid" style="height: 200rpx;width:200rpx;"></echarts>
										</view>
									</view>
								</view>
							</view>

						</view>
						<view class="flexrowstart cu-item bg-white padding-sm solid-bottom" style="width: 100%;height: 66rpx;">
							<view class="flex-sub text-center">
								合计
							</view>
							<view class="flex-sub  text-center">
								<text  style="">{{getListTotal(dayitem.monthEnergy,"base00")}}</text>
							</view>
						</view>
					</view>
				</view>


				<view class="cu-form-group flexrowbetween" style="margin-top: 16rpx;padding: 0px;margin-bottom: 16rpx;">
					<view class="flexrowstart"
						style="flex-grow: 1;padding: 33rpx 27rpx;background: linear-gradient(-45deg, #D0E9FF 0%, #F7FBFF 100%);">
						<view class="bottom-image"
							style="background: url(../../static/icons/bill_function.png) no-repeat;background-size: 100%;">
						</view>
						<view class="flexcolumn" style="align-items: flex-start;margin-left: 8rpx;">
							<view class="bottom-useelect" style="">
								用电情况
							</view>
							<view class="bottom-useelect-tod">
								点击查看详情 >
							</view>
						</view>
					</view>
					<view class="flexrowstart"
						style="flex-grow: 1;padding: 33rpx 27rpx;background: linear-gradient(-45deg, #FFEBDD 0%, #FFFCF6 100%);">
						<view class="bottom-image"
							style="background: url(../../static/icons/bill_recharge.png) no-repeat;background-size: 100%;">
						</view>
						<view class="flexcolumn" style="align-items: flex-start;margin-left: 8rpx;">
							<view class="bottom-useelect" style="">
								充值
							</view>
							<view class="bottom-useelect-tod">
								立即去缴纳电费 >
							</view>
						</view>
					</view>
				</view>
			</view>

		</scroll-view>
	</view>
</template>
<script>
	import mock from './mockdata.js'
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
				custom:this.$commom.getCustom(),
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



			console.log(mock.mockdata);
			this.dayallOprion = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},

				grid: {
					top: 40,
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
</script>

<style>
	.ycur {
		background: #007DFE;
		border-radius: 23px;
		border-bottom: 0px;
		height: 48rpx;
		line-height: 48rpx;
		color: #FFF;
	}

	table {
		border-spacing: 0px;
	}

	table tr {
		width: 100%;
	}

	table tr td {
		text-align: center;
		border-top: 1px solid #f1f1f1;
		;
		border-bottom: 1px solid #f1f1f1;
		;
	}


	.td-typeheader {
		text-align: center;
	}

	.td-content {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 78rpx;
	}

	.td-total {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333;
		line-height: 78rpx;
	}

	.charts-box {
		width: 100%;
		height: 200px;
		background-color: #fff;
	}

	/* 日用电量 */
	.day-time-border {
		border: 2rpx solid #e3e3e3;
		border-radius: 30rpx;
		width: 240rpx;
		height: 50rpx;
		line-height: 50rpx;
	}

	.day-time {
		width: 120rpx;
		/* padding: 6rpx 15rpx; */
		height: 50rpx;
		line-height: 50rpx;
	}

	.day-curr {
		border-radius: 30rpx;
		background-color: #007CFF;
		color: #fff;
	}
</style>
<style lang="scss" scoped>

</style>
