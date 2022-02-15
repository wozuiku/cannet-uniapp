<template>
	<view class="bill-wrap">
		<view class="top-wrap">
			<cu-custom :isBack="true" bgColor="bg-gradual-blue">
				<block slot="backText"></block>
				<block slot="content">电费账单</block>
			</cu-custom>
			<view class="user-message">
				<view class="user-address">{{balanceItem.userName}}</view>
				<view class="user-number">
					<view class="user-number-label">用户号：</view>
					<view class="user-number-text">{{balanceItem.roomName}}</view>
				</view>
				<view class="user-location">
					<image class="user-location-icon" src="/static/images/charge/bill_location.png"></image>
					<view class="user-location-text">{{balanceItem.userAddress}}</view>
				</view>
			</view>
		</view>
		<view class="float-wrap">
			<view class="content-wrap">
				<view class="bill-sum">
					<view class="select">
						<view class="select-year">
							<view class="year-picker">
								<picker @change="selectYear" :value="yearIndex" :range="yearPicker">
									<view class="picker">
										{{yearIndex>-1 ? yearPicker[yearIndex] + '年': '2022年'}}
									</view>
								</picker>
							</view>
							<view class="down-icon">
								<text class="cuIcon-triangledownfill lg"></text>
							</view>
						</view>
		
						<view class="select-month">
		
							<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft">
								<view class="cu-item" :class="monthIndex==monthCur?'text-green cur':''"
									v-for="(monthItem, monthIndex) in 12" :key="monthIndex" @tap="selectMonth"
									:data-id="monthIndex">
									{{monthIndex + 1}} 月
								</view>
							</scroll-view>
						</view>
					</view>
		
					<view class="sum-line">
						<view class="item">
							<view class="item-amount">
								{{showAmount(billList.totalBillElectric)}}
							</view>
							<view class="item-label text-gray">
								本月用电量(kWh)
							</view>
						</view>
						<view class="item2">
							<view class="item-amount">
								{{showAmount(billList.totalPayableMoney)}}
							</view>
							<view class="item-label text-gray">
								本月总金额(元)
							</view>
						</view>
					</view>
					<view class="sum-line">
						<view class="item">
							<view class="item-amount">
								{{showAmount(billList.totalPaidMoney)}}
							</view>
							<view class="item-label text-gray">
								本月已缴金额(元)
							</view>
						</view>
						<view class="item2">
							<view class="item-amount">
								{{showAmount(billList.totalUnpaidMoney)}}
							</view>
							<view class="item-label text-gray">
								本月未缴金额(元)
							</view>
						</view>
					</view>
				</view>
		
				<block v-for="(billItem, billIndex) in billList.detailList">
					<view class="bill-item">
						<view class="header">
							<view class="header-item">
								表号
							</view>
							<view class="header-item2">
								综合倍率
							</view>
							<view class="header-item-right">
								用电量
							</view>
						</view>
		
						<view class="item-line text-gray solid-bottom">
							<view class="line-item">
								{{billItem.meterNo}}
							</view>
							<view class="line-item2">
								{{billItem.magnification}}
							</view>
							
							<view class="line-item-right">
								{{billItem.billingQuantityAll}}
							</view>
						</view>
						
						<view class="meter-time-box text-gray solid-bottom">
							<view class="meter-time-item">
								<view class="meter-time-label">
									上次抄表：
								</view>
								<view class="meter-time-text">
									{{billItem.lastTime}}
								</view>
							</view>
							<view class="meter-time-item">
								<view class="meter-time-label">
									本次抄表：
								</view>
								<view class="meter-time-text">
									{{billItem.thisTime}}
								</view>
							</view>
						</view>
		
						<view v-if="showStep(billItem.pricingPlan)" class="electric-step-box" style="position: relative;height: 200rpx;">
							<view class="step-process">
								<view class="cu-progress round sm margin-top">
									<view class="bg-green round" :style="getProgressStyle(billItem.billingQuantityAll, billItem.stepList)">
										{{percent}}
									</view>
									
									<view class="process-circle-number">
										<view class="process-circle"></view>
										<text class="process-number">{{billItem.billingQuantityAll}}</text>
									</view>
								</view>
							</view>
							
							<view class="step-explain">
								<view class="explain-item" v-for="(stepItem, stepIndex) in billItem.stepList">
									<view class="item-number" :style="getStyle(stepIndex)">
										{{stepItem.beginMeasure}}-{{showStepAmount(stepItem.endMeasure)}}
									</view>
									<view class="item-text text-gray">
										{{stepItem.indicationTitleName}}
									</view>
								</view>
							</view>
						</view>
					</view>
		
					<view class="bill-item2">
						<view class="header">
							<view class="header-item">
								类型
							</view>
							<view class="header-item2">
								<view class="header-item-top">
									单价
								</view>
								<view class="header-item-bottom">
									(元)
								</view>
							</view>
							<view class="header-item2">
								<view class="header-item-top">
									电能量值
								</view>
								<view class="header-item-bottom">
									(kWh)
								</view>
							</view>
							<view class="header-item-right">
								<view class="header-item-right-top">
									金额
								</view>
								<view class="header-item-right-bottom">
									(元)
								</view>
							</view>
						</view>
						<!-- 阶梯 -->
						<view class="item-line text-gray" v-for="(stepItem, stepIndex) in billItem.stepList"
							:key="stepIndex">
							<view class="line-item">{{showAmount(stepItem.titleName)}}</view>
							<view class="line-item">{{showAmount(stepItem.price)}}</view>
							<view class="line-item">{{showAmount(stepItem.billElectric)}}</view>
							<view class="line-item-right">{{showAmount(stepItem.amountMoney)}}
							</view>
						</view>
						<!-- 分时 -->
						<view class="item-line text-gray" v-for="(subBillItem, subBillIndex) in billItem.subList"
							:key="subBillIndex">
							<view class="line-item">{{showAmount(subBillItem.titleName)}}</view>
							<view class="line-item">{{showAmount(subBillItem.price)}}</view>
							<view class="line-item">{{showAmount(subBillItem.billElectric)}}</view>
							<view class="line-item-right">{{showAmount(subBillItem.amountMoney)}}
							</view>
						</view>
		
						<u-line length="100%" direction="row" />
		
						
						<view class="item-line text-gray">
							<view class="line-item">滞纳金</view>
							<view class="line-item">-</view>
							<view class="line-item">-</view>
							<view class="line-item-right">{{showAmount(billItem.lateFee)}}</view>
						</view>
					</view>
		
		
					<view class="bill-item3">
						<view class="header">
							<view class="header-item">
								类别
							</view>
							<view class="header-item2">
								<view class="header-item-top">
									上次/本次电量示值
								</view>
								<view class="header-item-bottom">
									(kWh)
								</view>
							</view>
		
							<view class="header-item-right">
								<view class="header-item-right-top">
									抄见电量
								</view>
								<view class="header-item-right-bottom">
									(kWh)
								</view>
							</view>
						</view>
		
						<view class="item-line text-gray" v-for="(subBillItem, subBillIndex) in billItem.subList"
							:key="subBillIndex">
							<view class="line-item">{{showAmount(subBillItem.indicationTitleName)}}</view>
							<view class="line-item2">{{showAmount(subBillItem.lastElectric)}}/{{showAmount(subBillItem.thisElectric)}}</view>
							<view class="line-item-right">{{showAmount(subBillItem.billElectric)}}
							</view>
						</view>
					</view>
		
		
					<view v-if="billIndex < meterCount - 1" class="divid-line-box">
						<image class="divid-line" src="/static/images/charge/bill_separator.png"></image>
					</view>
		
					<view v-if="billIndex == meterCount - 1" class="divid-line-box">
						<image class="divid-line" src="/static/images/charge/bill_end.png"></image>
						
						<view class="bill-function">
							<view class="func-use">
								<view class="func-icon-box">
									<image class="func-icon" src="/static/images/charge/bill_use.png"></image>
								</view>
								<view class="func-name-box">
									<view class="func-name">用电情况</view>
									<view class="prompt-text text-gray">点击查看详情
										<text class="lg cuIcon-right text-gray"></text>
									</view>
								</view>
							</view>
							<view class="function-charge">
								<view class="func-icon-box">
									<image class="func-icon" src="/static/images/charge/bill_charge.png"></image>
								</view>
								<view class="func-name-box">
									<view class="func-name">充值</view>
									<view class="prompt-text text-gray">立即去缴纳电费
										<text class="lg cuIcon-right text-gray"></text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
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
