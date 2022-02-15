<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">

			<block slot="content">电费账单</block>
			<block slot="right">
				<!-- 	<view class="margin-right text-xxl">
					<navigator url="../sancode/sancode" open-type="navigate">
						<text class="cuIcon-add " style="font-size: 40upx;"></text>
					</navigator>
				</view> -->
			</block>
		</cu-custom>
		<scroll-view scroll-y="true" class="page">
			<form>
				<view style="width: 100%;position:relative;height: 100vh;">
					<!-- 信息区 -->
					<view class="bg-gradual-blue" style="width: 100%;height: 330rpx; position: absolute;padding: 16rpx; border-bottom-left-radius: 20px;border-bottom-right-radius: 20px;background-color: #000000;">
						<view class="flexrowbetween" style="width: 100%;height: 88rpx;background-color: #0000;">
							<view style="padding: 20rpx;">
								<view style="margin-top: 34rpx;"><text
										style="font-size: 32rpx;font-weight: bold;">福建交通运输部漳州保障中心</text></view>
								<view style="margin-top: 14rpx;">
									<text
										style="font-size: 26rpx;color:#B2E0FE;font-weight: 400;">用户号：596000012312</text>
									<view>
										<text class="iconfont iconweizhi1"></text>
										<text
											style="font-size: 26rpx;color:#B2E0FE ;font-weight: 400;">漳州市蓝田开发区吴桥中路</text>
									</view>
								</view>

							</view>
							<text class="cuIcon-right"></text>
						</view>
						<view style="height: 88rpx;background-color: #0000;"></view>
					</view>
					<!-- 年月 -->
					<view style="width: 100%;height:100vh; position: absolute; margin-top: 140rpx; padding: 20rpx;">
						<!-- 一只表的信息 -->
						<view>
							<view style="background: url(../../static/icons/bill_card.png) no-repeat;background-size: 100%;border-radius: 20rpx;width: 100%;height:380rpx ;padding: 45rpx;">
								<!-- 年月选择 -->
								<view class="flexrowstart">
									<view class="flexrowstart" style="font-weight: bold;font-size: 26rpx;">2021 年<text
											class="knicon kn-sanjiaoxing-shang-copy" style=" font-size: 6rpx;"></text>
									</view>
									<scroll-view scroll-x class=" nav" scroll-with-animation :scroll-left="scrollLeft"
										style="width: 80%;margin-left: 8rpx;">
										<view class="cu-item" :class="index==MonthCur?'text-green cur':''"
											v-for="(item,index) in 12" :key="index" @tap="tabSelect" :data-id="index"
											style="font-size: 26rpx;">
											{{index+1}}月
										</view>
									</scroll-view>
								</view>
								<view class="flexrowstart" style="margin-top: 30rpx;">
									<view class="flexcolumn" style="align-items: flex-start;flex-grow: 1;">
										<text class="num">17820</text>
										<view class="numstr">本月结算电量(kWh)</view>
									</view>
									<view class="flexcolumn"
										style="align-items: flex-start;flex-grow: 1;margin-left: 40rpx;">
										<text class="num">14584.84</text>
										<view class="numstr">本月结算金额(元)</view>
									</view>
								</view>
								<view class="flexrowstart" style="margin-top: 40rpx;">
									<view class="flexcolumn" style="align-items: flex-start;flex-grow: 1;">
										<text class="num">17820</text>
										<view class="numstr">本月结算电量(kWh)</view>
									</view>
									<view class="flexcolumn"
										style="align-items: flex-start;flex-grow: 1;margin-left: 40rpx;">
										<text class="num">14584.84</text>
										<view class="numstr">本月结算金额(元)</view>
									</view>
								</view>
							</view>
							<!-- 抄表 -->
							<view class="cu-form-group flexcolumn" style="margin-top: 20rpx;border-radius: 10rpx;border-bottom: 1px solid #eee ;">
								<table width="100%">
									<tr
										style="width: 100%;padding: 6rpx 0rpx;margin-top: 16rpx; background-color: #eee;">
										<td class="tdheader" width="40%">表号</td>
										<td class="tdheader" width="20%">倍率</td>
										<td class="tdheader" width="40%"
											style="text-align: right;padding-right: 16rpx;">用电量<br>(kWh)</td>
									</tr>
									<tr>
										<td class="tdcontent" width="40%">201202020202</td>
										<td class="tdcontent" width="20%">200</td>
										<td class="tdcontent" width="40%"
											style="text-align: right;padding-right: 16rpx;">3443333.34</td>
									</tr>
								</table>
								<view class=" flexrowbetween"
									style="width: 100%;padding: 16rpx 0rpx; border-bottom: 1px solid #eee;">
									<view>
										<text>上次抄表：</text>
										<text>2021.12.1</text>
									</view>
									<view>
										<text>本次抄表：</text>
										<text>2022.1.1</text>
									</view>

								</view>
								<view style="width: 100%; position: relative;height: 200rpx;">
										<!-- 进度条 -->
										<view class="cu-progress round sm striped " style="position: absolute;top:33%">
											<view class="bg-green round" style=" background: linear-gradient(90deg, #39C678 0%, #FFD304 50%, #ff0000 100%);"
												:style="[{ width:loading?(progressNum+'%'):''}]"></view>
										</view>
										<!-- 进度条圆圈和数字区 -->
										<view :style="[{ 'margin-left':loading?(progressNum-2+'%'):''}]" style="background-color: #007AFF;">
											<!-- 进度条圆圈 -->
											<view style="top:30%;position: absolute;width:36rpx;height: 36rpx;background-color: #fff;border-radius: 50%;border: 1px solid #E0E0E0; "></view>
											<!-- 进度条数字 -->
											<text style="top:10%;position: absolute;font-weight: bold;">234</text>
										</view>
										<!-- 阶梯电量 -->
										<view class="flexrowstart" style="position: absolute;top:50%;width: 100%;">
											<view class="flexcolumn" v-for="(item,index) in 3" :key="index" style="flex-grow: 1;width: 100%;">

												<text style="font-size: 32rpx;font-weight: bold; color: #39C678"
													:style="[{'color':colorlist[index]}]">
													0-{{index*100+index}}
												</text>
												<text style="color: #999999;">
													第{{index+1}}阶梯
												</text>
											</view>
										</view>
								</view>
							</view>
							<!-- 表详情 -->
							<view class="cu-form-group flexcolumn" style="padding-top: 25rpx;border-radius: 10rpx;">
							
								<table width="100%" style="margin-bottom: 39rpx;">
									<tr
										style="width: 100%;padding: 6rpx 0rpx;margin-top: 16rpx; background-color: #eee;">
										<td class="td-typeheader" width="15%">类型</td>
										<td class="td-typeheader" width="20%">单价<br>(元)</td>
										<td class="td-typeheader" width="25%" style="text-align: right;padding-right: 16rpx;">电能量值<br>(kWh)</td>
										<td class="td-typeheader" width="20%"
											style="text-align: right;padding-right: 16rpx;">金额<br>(元)</td>
									</tr>
									<tr style="width: 100%;padding: 6rpx 0rpx;" v-for="(item,index) in jglist">
										<td class="td-typeheader" width="15%">{{item.name}}</td>
										<td class="td-typeheader" width="20%">{{item.price}}</td>
										<td class="td-typeheader" style="text-align: right;padding-right: 16rpx;" width="25%">{{item.elect}}</td>
										<td class="td-typeheader" width="20%"
											style="text-align: right;padding-right: 16rpx;">{{item.money}}</td>
									</tr>
									<tr style="width: 100%;height: 88rpx;">
										<td colspan="2" class="td-typeheader"
											style="text-align: left;padding-right: 16rpx;">滞纳金(元)</td>
										<td colspan="2" class="td-typeheader"
											style="text-align: right;padding-right: 16rpx;">123234</td>
									</tr>
									<tr
										style="width: 100%;padding: 6rpx 0rpx;margin-top: 16rpx; background-color: #eee;">
										<td class="td-typeheader" width="15%">类别</td>
										<td colspan="2" class="td-typeheader">上次/本次<br>电能示值(kWh)</td>
										<td class="td-typeheader" style="text-align: right;padding-right: 16rpx;">
											抄见电量<br>(kWh)</td>
									</tr>
									<tr style="width: 100%;padding: 6rpx 0rpx;" v-for="(item,index) in lblist">
										<td class="td-typeheader" width="15%">{{item.name}}</td>
										<td colspan="2" class="td-typeheader">{{item.elect}} / {{item.elect}}</td>
										<td class="td-typeheader" style="text-align: right;padding-right: 16rpx;">
											{{item.elect}}
										</td>
									</tr>
								</table>
							</view>

						</view>
						<view class="cu-form-group flexrowbetween"
								style="margin-top: 16rpx;padding: 0px;margin-bottom: 32rpx;">
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

				</view>

			</form>

		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				MonthCur: 0, //列表展开的索引
				scrollLeft: 0,
				loading: true,
				progressNum: 60,
				colorlist: ["#39C678", "#FFD304", "#FF5726"],
				jglist: [{
						"name": "一档",
						"price": "10",
						"elect": "123423.89",
						"money": 1000.98
					},
					{
						"name": "二档",
						"price": "10",
						"elect": "123423.89",
						"money": 1000.98
					},
					{
						"name": "峰",
						"price": "10",
						"elect": "2323.89",
						"money": 23239.8
					},
					{
						"name": "谷",
						"price": "10",
						"elect": "4343.89",
						"money": 43438.9
					}
				],
				lblist: [{
						"name": "有功(总)",
						"price": "10",
						"elect": "123423.89",
						"money": 1000.98
					},
					{
						"name": "有功(峰)",
						"price": "10",
						"elect": "123423.89",
						"money": 1000.98
					},
					{
						"name": "有功(谷)",
						"price": "10",
						"elect": "123423.89",
						"money": 1000.98
					},

				],
			}
		},
		onShow() {
			console.log("进入功能页面");

		},
		methods: {
			tabSelect(e) {
				this.MonthCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style>
	.mainclass {
		border: 2px red solid;
		border-radius: 5px;
		color: red;
		padding: 2px;
		font-weight: bold;
		font-size: 12px;
		margin-right: 5px;
	}

	.subclass {
		border: 2px solid #ffa407;
		border-radius: 5px;
		color: #ffa407;
		padding: 3px;
		font-size: 12px;
		font-weight: bold;
		margin-right: 5px;
	}

	.num {
		width: 121rpx;
		height: 32rpx;
		font-size: 44rpx;
		font-family: Helvetica;
		font-weight: bold;
		color: #333333;
	}

	.numstr {
		width: 215rpx;
		height: 23rpx;
		font-size: 24rpx;
		margin-top: 17rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		opacity: 0.6;
	}

	.cur {
		background: #007DFE;
		border-radius: 23px;
		border-bottom: 0px;
		height: 48rpx;
		line-height: 48rpx;
		color: #FFF;
	}

	table tr td {
		text-align: center;
	}

	.tdheader {
		font-size: 26rpx;
		font-weight: bold;
		padding: 10rpx 0rpx;
		color: #666;
	}

	.tdcontent {
		font-size: 26rpx;
		font-weight: 400;
		color: #333333;
		line-height: 60rpx;
	}

	.td-typeheader {
		font-size: 24rpx;
		padding: 10rpx 0rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
	}

	.item {
		background-color: #ffffff;
		padding: 0.5px 16px;
		display: flex;
		align-items: center;

		justify-content: space-between;
	}

	.bottom-image {
		width: 98rpx;
		height: 98rpx;

	}

	.bottom-useelect {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}

	.bottom-useelect-tod {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
	}
	
	.flexcolumn {
	            display: flex;
	            display: -webkit-flex;
	            flex-direction: column;
	            justify-content: center; /*水平居中*/
	            align-items: center; /*垂直居中*/
	        }
	        /*水平垂直居中并且横向排列*/
	        .flexrow {
	            display: flex;
	            display: -webkit-flex;
	            flex-direction: row;
	            justify-content: center; /*水平居中*/
	            align-items: center; /*垂直居中*/
	        }
	        /*水平垂直并且横向排列*/
	        .flexrowstart {
	            display: flex;
	            display: -webkit-flex;
	            flex-direction: row;
	            justify-content: flex-start; /*水平居中*/
	            align-items: center; /*垂直居中*/
	        }
	        /*水平垂直并且左右排列*/
	        .flexrowbetween {
	            display: flex;
	            display: -webkit-flex;
	            flex-direction: row;
	            justify-content: space-between; /*左右排布*/
	            align-items: center; /*垂直居中*/
	        }
</style>
