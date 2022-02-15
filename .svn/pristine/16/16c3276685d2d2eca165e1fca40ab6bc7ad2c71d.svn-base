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
							style="background: url(../../../../static/icons/bill_function.png) no-repeat;background-size: 100%;">
						</view>
						<view class="flexcolumn align-start" style="margin-left: 8rpx;">
							<view class="bottom-useelect text-bold" style="">
								电费账单
							</view>
							<view class="text-999 text-sm">
								点击查看详情 >
							</view>
						</view>
					</view>
					<view class="flexrowstart"
						style="flex-grow: 1;padding: 33rpx 27rpx;background: linear-gradient(-45deg, #FFEBDD 0%, #FFFCF6 100%);">
						<view class="bottom-image"
							style="background:url(../../../../static/icons/bill_recharge.png) no-repeat;background-size: 100%;">
						</view>
						<view class="flexcolumn align-start" style="margin-left: 8rpx;">
							<view class="bottom-useelect text-bold" style="">
								充值
							</view>
							<view class="text-999 text-sm">
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
	import Main from './main'
	export default Main
</script>
<style >
	@import "./main.scss"
</style>
/* <style lang="scss" scoped>
	@import "./main.scss"
</style> */
