<template>
	<view class="bind-wrap">
		
		<view class="bind-content">
			<cu-custom :isBack="true" bgColor="bg-gradual-blue" style="color: #000000;"><block slot="backText" ></block><block slot="content">绑定用户</block></cu-custom>
			<!-- <view class="prompt-text text-gray">
				用户号对应唯一电表，安装多只电表请绑定多个用户号
			</view> -->
			
			<view class="tenant-list">
				<view class="tenant-item" v-for="(tenantItem, tenantIndex) in tenantList">
					<view class="tenant-name solid-bottom text-gray">
						<view class="tenant-name-label">
							所属单位：
						</view>
						<view class="tenant-name-text">
							{{tenantItem.extraName}}
						</view>
					</view>
					
					<view class="room-list">
						<view class="room-item solid-bottom" v-for="(roomItem, roomIndex) in tenantItem.roomList">
							<view class="user-num ">
								<view class="user-num-left">
									<view class="user-num-label">
										用户号:
									</view>
									<view class="user-num-text">
										{{roomItem.roomName}}
									</view>
									<view class="meter-link-text" @tap="showMeterModal(roomItem.meterViewList)">
										监测点信息
									</view>
								</view>
								<view class="user-num-right" @tap="unBind(roomItem)">
									<image class="del-icon" src="/static/images/user/bind_delete.png"></image>
								</view>
							</view>
							<view class="room-name text-gray">
								{{roomItem.userName}}
							</view>
							
							<view class="room-location">
								<image class="room-location-icon" src="/static/images/user/bind_location.png"></image>
								<view class="room-location-address text-gray">
									{{roomItem.userAddress}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="add-btn-box margin-top">
			<button class="bg-gradual-blue shadow add-btn" @click="addUser">
				绑定新用户
			</button>
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
	</view>
</template>

<script>
	import Main from './main.js'
	export default Main
</script>

<style lang="scss" scoped>
	@import "./main.scss"
</style>
