<template>
	<view class="box-wrap">
		<view class="top-wrap-title">
			<cu-custom :isBack="true" bgColor="bg-gradual-blue">
				<block slot="backText">
				</block>
				<block slot="content">
					用能分析
				</block>
			</cu-custom>
			<view class="top-info">
				<view class="top-titleNo">
					用户号：{{balanceItem.roomName}}
				</view>
				<view class="top-titleName">
					{{balanceItem.userName}}
				</view>
				
			</view>
		</view>

		<view class="meter-item" v-for="(item,index) in enanaldata" :key="index">
			<!-- 表号 -->
			<view class="border-bt">
				<view class="meter-no">
					表号：{{item.meter.meterNo}}
				</view>
			</view>
			<!-- 本月用电 -->
			<view class="border-bt bg-color yd-info info-pdding">
				<view class="item-title ">
					本月用电
				</view>
				<view class="yd-echarts">
					<view class="title-bt">
						用电 度
					</view>
					<my-echarts :option="ydoptionFn(item.dayEnergy)" style="height: 318rpx;"></my-echarts>
					<!-- <qiun-data-charts type="column"  :opts="{dataLabel: false,extra:{column:{type:'stack'}}}" :eopts="{dataLabel: false,xAxis:{axisLabel:{color:'#FF0000'}}}" :chartData="ydoption"
						:echartsH5="true" :echartsApp="true" /> -->
				</view>
				<view class="yd-tb-title">
					<view class="yd-tb-item1">

					</view>
					<view class="yd-tb-item2">
						本月用电量
					</view>
					<view class="yd-tb-item3">
						占比
					</view>
					<view class="yd-tb-item4">
						同比
					</view>
					<view class="yd-tb-item5">
						环比
					</view>
				</view>
				<view class="yd-tb-info">
					<view class="yd-tb-item1">
						总
					</view>
					<view class="yd-tb-item2 yd-tb-d">
						{{item.energySum[0]}}
					</view>
					<view class="yd-tb-item3 yd-tb-hs yd-tb-hsg">
						‐
					</view>
					<view class="yd-tb-item4">
						<view class="yd-tb-j" v-if="item.lastMonthChange[0]<0">
							<!-- 箭头到时候换成图标 -->
							<span>↓</span>{{Math.abs(item.lastMonthChange[0])}}%
						</view>
						<view class="yd-tb-s" v-else-if="item.lastMonthChange[0]>0">
							<span>↑</span>{{Math.abs(item.lastMonthChange[0])}}%
						</view>
						<view class="yd-tb-hs" v-else>
							<!-- 0的时候是灰色 -->
							0%
						</view>
					</view>
					<view class="yd-tb-item5">
						<view class="yd-tb-j" v-if="item.lastYearChange[0]<0">
							<span>↓</span>{{Math.abs(item.lastYearChange[0])}}%
						</view>
						<view class="yd-tb-s" v-else-if="item.lastYearChange[0]>0">
							<span>↑</span>{{Math.abs(item.lastYearChange[0])}}%
						</view>
						<view class="yd-tb-hs" v-else>
							<!-- 0的时候是灰色 -->
							0%
						</view>
					</view>
				</view>
				<view class="yd-tb-info">
					<view class="yd-tb-item1">
						峰
					</view>
					<view class="yd-tb-item2 yd-tb-d">
						{{item.energySum[2]}}
					</view>
					<view class="yd-tb-item3 yd-tb-z">
						{{item.monthRate[2]}}%
					</view>
					<view class="yd-tb-item4">
						<!-- 同比 -->
						<view class="yd-tb-j" v-if="item.lastMonthChange[2]<0">
							<span>↓</span>{{Math.abs(item.lastMonthChange[2])}}%
						</view>
						<view class="yd-tb-s" v-else-if="item.lastMonthChange[2]>0">
							<span>↑</span>{{Math.abs(item.lastMonthChange[2])}}%
						</view>
						<view class="yd-tb-hs" v-else>
							<!-- 0的时候是灰色 -->
							0%
						</view>
					</view>
					<view class="yd-tb-item5">
						<view class="yd-tb-j" v-if="item.lastYearChange[2]<0">
							<span>↓</span>{{Math.abs(item.lastYearChange[2])}}%
						</view>
						<view class="yd-tb-s" v-else-if="item.lastYearChange[2]>0">
							<span>↑</span>{{Math.abs(item.lastYearChange[2])}}%
						</view>
						<view class="yd-tb-hs" v-else>
							<!-- 0的时候是灰色 -->
							0%
						</view>
					</view>
				</view>
				<view class="yd-tb-info">
					<view class="yd-tb-item1">
						谷
					</view>
					<view class="yd-tb-item2 yd-tb-d">
						{{item.energySum[4]}}
					</view>
					<view class="yd-tb-item3 yd-tb-z">
						{{item.monthRate[4]}}%
					</view>
					<view class="yd-tb-item4">
						<!-- 同比 -->
						<view class="yd-tb-j" v-if="item.lastMonthChange[4]<0">
							<span>↓</span>{{Math.abs(item.lastMonthChange[4])}}%
						</view>
						<view class="yd-tb-s" v-else-if="item.lastMonthChange[4]>0">
							<span>↑</span>{{Math.abs(item.lastMonthChange[4])}}%
						</view>
						<view class="yd-tb-hs" v-else>
							<!-- 0的时候是灰色 -->
							0%
						</view>
					</view>
					<view class="yd-tb-item5">
						<view class="yd-tb-j" v-if="item.lastYearChange[4]<0">
							<span>↓</span>{{Math.abs(item.lastYearChange[4])}}%
						</view>
						<view class="yd-tb-s" v-else-if="item.lastYearChange[4]>0">
							<span>↑</span>{{Math.abs(item.lastYearChange[4])}}%
						</view>
						<view class="yd-tb-hs" v-else>
							<!-- 0的时候是灰色 -->
							0%
						</view>
					</view>
				</view>

			</view>
			<!-- 量费趋势 -->
			<view class="border-bt info-pdding lf-info bg-color">
				<view class="lf-item-title">
					<view class="item-title">
						量费趋势
					</view>
					<view class="lf-title-right">
						<view @tap="lfType=1" :class="lfType==1?'lf-title-dl lf-selectd':'lf-title-dl lf-noselectd'">
							电量
						</view>
						<view @tap="lfType=2" :class="lfType!=1?'lf-title-df lf-selectd':'lf-title-df lf-noselectd'">
							电费
						</view>
					</view>
				</view>
				<view class="lf-echarts">
					<view v-if="lfType==1" style="position: relative;">
						<view class="title-bt" style="position: absolute;top:10rpx">
							电量 度
						</view>
						<my-echarts :option="lfoptiondlFn(item.monthEnergy)" style="height: 350rpx;"></my-echarts>
					</view>
					<view v-if="lfType!=1" style="position: relative;">
						<view class="title-bt" style="position: absolute;top:10rpx">
							电费 元
						</view>
						<my-echarts :option="lfoptiondfFn(item.monthFee)" style="height: 350rpx;"></my-echarts>
					</view>
				</view>
			</view>
			<!-- 年累计用电量 -->
			<view class="lj-info info-pdding bg-color">
				<view class="item-title ">
					年累计用电量
				</view>
				<view class="lj-center">
					<view class="lj-center-left" style="position: relative;">
						<view class="title-bt" style="position: absolute;top:-10rpx">
							千瓦时
						</view>
						<my-echarts :option="nljoptiondfFn(item.lastYearEnergy,item.yearEnergy)" style="height: 350rpx;"></my-echarts>
					</view>
					<view class="lj-center-right">
						<view class="lj-center-title">
							<view class="lj-center-title-item">
								碳排放量变化
							</view>
							<img class="img-icon" :src="item.emissionChange>=0?'/static/icons/analysis_icon_emissionsup.png':'/static/icons/analysis_icon_emissionsup.pngdown.png'">
						</view>
						<view class="lj-center-icon">
							<!-- 根据值的不同显示图标 -->
							<img class="img-icon" src="/static/icons/analysis_icon_electricity.png">
							<img class="img-icon"
								:src="item.emissionChange>=0?'/static/icons/analysis_icon_co2up.png':'/static/icons/analysis_icon_co2down.png'">
						</view>
						<view class="lj-center-val">
							<view class="lj-center-dl">
								{{Math.abs(item.energyChange)}} 度
							</view>
							<view class="lj-center-tp">
								{{Math.abs(item.emissionChange)}} kg
							</view>
						</view>
						<view class="lj-center-bt">
							<view class="">
								{{item.energyChange>=0?"增加用电":"减少用电"}}
							</view>
							<view class="">
								{{item.emissionChange>=0?"增加碳排":"减少碳排"}}
							</view>
						</view>
					</view>
				</view>
				<view class="lj-btval">
					截至{{nowYear}}年{{parseInt(nowMonth)}}月，用电量<span class="lj-btval-color">{{item.yearEnergy}}</span>度，
					相比{{lastYear}}年{{item.energyChange>=0?"增加用电":"减少用电"}}<span class="lj-btval-color">{{Math.abs(item.energyChange)}}</span>度，
					相当于{{item.emissionChange>=0?"增加":"减少"}}当地碳排<span class="lj-btval-color">{{Math.abs(item.emissionChange)}}</span>kg
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import Main from './main'
	export default Main
</script>

<style lang="scss" scoped>
	@import "./main.scss"
</style>
