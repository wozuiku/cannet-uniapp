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
						<text style="font-size: 33rpx;color:#FFF;font-weight: bold;">A栋：2342342</text>
						<view>
							<text
								style="font-size: 26rpx;margin-top: 10rpx; color:#B2E0FE ;font-weight: 400;">用户号：2398472895743</text>
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
				<view class="cu-item padding-sm bg-white solid-bottom text-black text-bold">
					表号：98070340758
				</view>
				<scroll-view scroll-x scroll-with-animation class="bg-white nav text-center">
					<view class="cu-item" :class="index==TabCur?'text-blue ycur':''" v-for="(item,index) in yearlist"
						:key="index" @tap="tabSelect" :data-id="index">
						{{item}}
					</view>
				</scroll-view>

				<view class="cu-item bg-white">
					<echarts :option="option" style="height: 300px;"></echarts>
				</view>
				<view>
					  <view class="charts-box">
						  <qiun-data-charts type="column"  :opts="{dataLabel: false,extra:{column:{type:'stack'}}}" :eopts="{dataLabel: false,xAxis:{axisLabel:{color:'#FF0000'}}}" :chartData="chartsDataColumn2"
						  	:echartsH5="true" :echartsApp="true" />
					  </view>
				</view>
				
			</view>

		</scroll-view>
	</view>
</template>
<script>
	import echarts from '@/components/echarts/echarts.vue';
	// import mecharts from '@/common/echarts/echarts-5.1.2-min.js'
	//import echarts from 'https://cdn.bootcdn.net/ajax/libs/echarts/4.9.0-rc.1/echarts.min.js'
	export default {
		data() {
			return {
				TabCur: 0,
				tablist: [{
					"title": "月度电费"
				}, {
					"title": "日用电量"
				}],
				yearlist: [2022, 2021, 2020],
				chartsDataColumn2: {},
				option: {},
			}
		},
		onLoad() { //页面加载

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
						name: 'Email',
						type: 'bar',
						stack: 'Ad',
						emphasis: {
							focus: 'series'
						},
						data: [120, 132, 101, 134, 90, 230, 210]
					},
					{
						name: 'Union Ads',
						type: 'bar',
						stack: 'Ad',
						emphasis: {
							focus: 'series'
						},
						data: [220, 182, 191, 234, 290, 330, 310]
					},
					{
						name: 'Video Ads',
						type: 'bar',
						stack: 'Ad',
						emphasis: {
							focus: 'series'
						},
						data: [150, 232, 201, 154, 190, 330, 410]
					},

				]
			};


  //处理堆叠柱状图的series
      let duidie = JSON.parse(JSON.stringify(this.option))
	  duidie.categories=duidie.xAxis[0].data;
      for (var i = 0; i < duidie.series.length; i++) {
        duidie.series[i].stack = 'one'
        duidie.series[i].barWidth = '50%'
        duidie.series[i].label = {position: 'inside',color:'#FFFFFF'}
      }
	   this.chartsDataColumn2=duidie
	   console.log(this.chartsDataColumn2);
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
			console.log('页面滚动...')
		},
		onPullDownRefresh() { //上拉刷新
			uni.stopPullDownRefresh();
		},

		// #ifdef APP-PLUS
		onNavigationBarButtonTap() {

		},
		// #endif
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			getIndex(e) {
				console.log("获取点击索引事件", e);
			}
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

	.charts-box {
		width: 100%;
		height: 300px;
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>

</style>
