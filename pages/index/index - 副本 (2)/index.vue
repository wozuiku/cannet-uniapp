<template>

	<view class="index-wrap">
		<view class="topbar-wrap bg-gradual-blue">
			<view class="topbar-left">
				<view class="topbar-tenant" @tap="showTenant">
					<u-select mode="single-column" v-model="showSelect" :list="tenantList"
						:default-value="selectDefaultValue" @confirm="confirmSelect" @cancel="cancelSelect">
					</u-select>
					<view class="text-cut select-value">{{tenantName}}</view>
					<view class="select-icon">
						<u-icon name="arrow-down" size="30" color="#FFF"></u-icon>
					</view>
				</view>
			</view>

			<view class="topbar-right">
				<view class="topbar-message" @tap="jumpBuilding('消息中心')">
					<!-- <u-icon name="chat" size="45" color="#FFF"></u-icon> -->
					<u-image width="48" height="35" src="/static/images/index/home_message.png"></u-image>
					<view class="topbar-message-text">消息</view>
				</view>

				<!-- bindUser scanCode-->
				<view class="topbar-scan" @tap="bindUser">
					<!-- <u-icon name="scan" size="40" color="#FFF"></u-icon> -->
					<u-image width="48" height="35" src="/static/images/index/home_add.png"></u-image>
					<view class="topbar-scan-text">绑定</view>
				</view>
			</view>
		</view>


		<scroll-view scroll-y="true">
			<view class="main-wrap">
				<view class="balance-wrap">
					<!-- 用户余额 -->
					<view class="balance" style="background-image: url;">
						<view class="left-arrow" :style="{'visibility': showLeftArrow?'':'hidden'}" @tap="left_arrow">
							<image class="left-arrow-image" src="/static/images/index/home_more_left.png"></image>
						</view>
						<view class="balance-items">
							<view class="balance-item" :class="((index==0) && showLine)?'solid-right':''"
								v-for="(item,index) in balanceList">
								<view class="item-line1" @tap="jumpBalance(item)">
									<view class="text-cut item-line1-text">{{item.roomName}}</view>
									<view class="item-line1-arrow">
										<text class="lg text-white cuIcon-right"></text>
									</view>
								</view>
								<view class="item-line2" @tap="jumpBalance(item)">
									<view class="text-cut item-line2-text">{{item.userName}}</view>
								</view>
								<view class="item-line3 text-cut" @tap="jumpBalance(item)">
									<view class="item-line3-label">余额:</view>
									<view class="item-line3-integer">{{item.accountBalanceInteger}}.</view>
									<view class="item-line3-decimal">{{item.accountBalanceDecimal}}</view>
									<view class="item-line3-currency">元</view>
								</view>
								<view class="charge-btn">
									<button class="cu-btn round sm lines-white" @tap="to_charge(item)">
										<view class="charge-btn-text">立即充值</view>
									</button>
								</view>
							</view>
						</view>
						<view class="right-arrow" :style="{'visibility': showRightArrow?'':'hidden'}"
							@tap="right_arrow">
							<image class="right-arrow-image" src="/static/images/index/home_more_right.png"></image>
						</view>
					</view>
				</view>

				<view class="float-wrap">
					<view class="content-wrap">
						<view class="function">
							<view class="cu-list grid radius shadow-warp bg-white"
								:class="['col-' + gridCol,gridBorder?'':'no-border']">

								<view class="cu-item" @tap="jumpFunc('电费')">
									<navigator open-type="navigate" url="pages/charge/bill/residentbill">
										<view>
											<image class="func-image" src="/static/images/index/home_function_01.png">
											</image>
										</view>
										<text>电费</text>
									</navigator>
								</view>
								<view class="cu-item" @tap="jumpFunc('水费')">
									<view>
										<image class="func-image" src="/static/images/index/home_function_02.png">
										</image>
									</view>
									<text>水费</text>
								</view>
								<view class="cu-item" @tap="jumpFunc('燃气费')">
									<view>
										<image class="func-image" src="/static/images/index/home_function_03.png">
										</image>
									</view>
									<text>燃气费</text>
								</view>
								<view class="cu-item" @tap="jumpFunc('物业费')">
									<view>
										<image class="func-image" src="/static/images/index/home_function_04.png">
										</image>
									</view>
									<text>物业费</text>
								</view>
								<view class="cu-item" @tap="jumpFunc('停车费')">
									<view>
										<image class="func-image" src="/static/images/index/home_function_05.png">
										</image>
									</view>
									<text>停车费</text>
								</view>
								<view class="cu-item" @tap="jumpFunc('报修')">
									<view>
										<image class="func-image" src="/static/images/index/home_function_06.png">
										</image>
									</view>
									<text>报修</text>
								</view>
								<view class="cu-item" @tap="jumpFunc('门禁')">
									<view>
										<image class="func-image" src="/static/images/index/home_function_07.png">
										</image>
									</view>
									<text>门禁</text>
								</view>
								<view class="cu-item" @tap="jumpFunc('更多')">
									<view>
										<image class="func-image" src="/static/images/index/home_function_more.png">
										</image>
									</view>
									<text>更多</text>
								</view>
							</view>
						</view>

						<!-- 通知 -->
						<view class="notice radius  bg-white">
							<view class="notice_left">
								<view class="notice_icon">
									<u-image width="33rpx" height="33rpx" src="/static/images/index/home_notice.png">
									</u-image>
								</view>
							</view>

							<view class="notice_right">
								<view class="notice_text">
									<swiper style="height: 33px;line-height: 33px;" :circular="true" :autoplay="true"
										interval="3000" duration="500" vertical="true">
										<swiper-item v-for="(item,index) in noticeList" :key="index">
											<text @tap="jumpNoticeItem(item)">{{item.title}}</text>
										</swiper-item>
									</swiper>
								</view>
								<view class="notice_more" @tap="jumpNoticeList">
									更多
								</view>
							</view>
						</view>


						<!-- 广告 -->
						<view class="ad">
							<view class="ad-swiper">
								<u-swiper :list="adList"></u-swiper>
							</view>
						</view>

						<view class="spaceheight"></view>
					</view>
				</view>
			</view>

		</scroll-view>
	</view>

</template>

<script>
	import Main from "./main";
	export default Main;
</script>

<style lang="scss" scoped>
	@import './main.scss'
</style>
<style>
	.solid-right::after {
		border-right: 0.5px solid #FFF !important;
	}
</style>
