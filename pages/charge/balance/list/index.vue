<template>
	<view>
		<cu-custom  bgColor="bg-gradual-blue" :isBack="true" >
			<block slot="backText"></block>
			<block slot="content">电费</block>
		</cu-custom>
		<scroll-view scroll-y="true">
			<view class="list-wrap">
				<view class="item" v-for="(item,index) in balanceList">
					<view class="account solid-bottom">
						<view class="account-left">
							<image class="account-icon" src="/static/images/charge/balance_account.png"></image>
							<view class="account-message">
								<view class="message-line1">
									<view class="user-num" @tap="to_balance(item)">
										<view class="user-num-label">用户号：</view>
										<view class="user-num-text">{{item.roomName}}</view>
									</view>
									<view class="meter-link" @tap="showMeterModal(item.meterViewList)">
										监测点信息
									</view>
								</view>
								<view class="message-line2" @tap="to_balance(item)">
									<view class="user-name">{{item.userName}}</view>
								</view>
								<view class="message-line3" @tap="to_balance(item)">
									<text class="location-icon cuIcon-location"></text>
									<view class="location-text">
										{{item.userAddress}}
									</view>
								</view>
							</view>
						</view>
						<view class="right-arrow" @tap="to_balance(item)">
							<text class="cuIcon-right"></text>
						</view>
					</view>
					<view class="amount">
						<view class="balance-amount">
							<view class="balance-amount-line1">{{item.accountBalance}}</view>
							<view class="balance-amount-line2">余额（元）</view>
							<view class="balance-amount-line3" @tap="to_charge(item)">
								<view class="line3-text">
									去充值
								</view>
								<view class="right-arrow">
									<text class="cuIcon-right"></text>
								</view>
							</view>
						</view>
						<view class="month-amount">
							<view class="month-amount-line1">{{showAmount(item.currentMonthPayableMoney)}}</view>
							<view class="month-amount-line2">本月（元）</view>
							<view class="month-amount-line3" @tap="to_bill(item)">
								<view class="line3-text">
									查看账单
								</view>
								<view class="right-arrow">
									<text class="cuIcon-right"></text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 监测点信息右侧弹窗 -->
			<view class="cu-modal drawer-modal justify-end" :class="showModel?'show':''" @tap="hideMeterModal">
				<view class="cu-dialog basis-lg" @tap.stop="" :style="[{top:'45px',height:'calc(100vh - ' + '45px)'}]">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(meterItem, meterIndex) in meterList" :key="meterIndex">
							<view class="meter-item margin-top solid-bottom">
								<view class="meter-name">{{meterItem.meterName}}</view>
								<view class="meter-num text-gray">
									<view class="meter-num-label">资产编号：</view>
									<view class="meter-num-text">{{meterItem.meterNo}}</view>
								</view>
								<view class="meter-location text-gray">
									<image class="meter-location-icon" src="/static/images/user/bind_location.png"></image>
									<view class="meter-location-text">{{meterItem.installtionLocaltion}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 监测点信息右侧弹窗 -->
			<view class="cu-modal drawer-modal justify-end" :class="showModel?'show':''" @tap="hideMeterModal">
				<view class="cu-dialog basis-lg" @tap.stop="" :style="[{top:'45px',height:'calc(100vh - ' + '45px)'}]">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(meterItem, meterIndex) in meterList" :key="meterIndex">
							<view class="meter-item margin-top solid-bottom">
								<view class="meter-name">{{meterItem.meterName}}</view>
								<view class="meter-num text-gray">
									<view class="meter-num-label">资产编号：</view>
									<view class="meter-num-text">{{meterItem.meterNo}}</view>
								</view>
								<view class="meter-location text-gray">
									<image class="meter-location-icon" src="/static/images/user/bind_location.png"></image>
									<view class="meter-location-text">{{meterItem.installtionLocaltion}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import Main from './main'
	export default Main
</script>

<style lang="scss" scoped>
	@import "./main.scss"
</style>
