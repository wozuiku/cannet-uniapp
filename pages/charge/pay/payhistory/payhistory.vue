<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">

			<block slot="content">充值记录</block>
			<block slot="right">
				<view class="margin-right " @tap="showModal" data-target="DrawerModalR">
						<text class="" style="">筛选</text>
				</view>
			</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav text-center cu-bar fixed" style="top:45px">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''"
					v-for="(item,index) in staticlist" :key="index" @tap="tabSelect(index,item)" :data-id="index">

					{{item.title}}<text class="text-red text-bold " style="margin-left: 6rpx;"
						v-if="item.num>0">{{item.num}}</text>


				</view>
			</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="page" style="margin-top:45px">
			<view>

				<view class="cu-list menu-avatar">
					<view class="bg-white" v-for="(item,index) in historylist" >
						<view @tap="toDetaile(item)" class="cu-item bg-white solid-bottom flex " style="padding: 16rpx 15px; margin-top: 15rpx;">
							<view class="cu-avatar round lg " style="background-image:url(../../../../static/icons/wechatpay.png);background-color:#0000;">
							</view>
							<view class="content  flex-sub" style="margin-left: 15rpx;">
								<view class=" text-bold flex ">
									<view class="flex-sub text-black text-lg">
										<text class="text-black"
											style="min-width: 120rpx;">{{custom.roomName.columnAlias||custom.roomName.columnDescription}}：</text>
										<text>{{item.roomName}}</text>
									</view>
									<view :class="[{'text-red':(item.payStatus===0||item.payStatus==3)},{'text-green':item.payStatus==1}]">
										{{ORDERSTATE[item.payStatus+""]}}
									</view>

								</view>
								<view class="text-grey flexrowstart">
									<text class="text-sm flex-sub">{{item.userName}}</text>
									<text class=" flex-sub text-bold text-black text-xl text-right"
										style="margin-left: 10rpx;white-space: nowrap;">{{item.money}}元</text>
								</view>
								<view style="color: #C2C2C2;">{{item.createTime}}</view>
							</view>
						</view>
					<!-- 	<view class="padding-sm flex justify-end" style="padding:10rpx 10px;">
							<view class="margin-right-sm border-btn-blue" v-if="item.payStatus===0" @tap="topay(item)">
								<text>去支付</text>
							</view>
							<view class="margin-right-sm border-btn-orange" v-if="!item.isRecharged&&item.payStatus===1">
								<text>去查询</text>
							</view>
						</view> -->
					</view>

				</view>
			</view>
			<view class="flex flex-direction justify-center align-center margin-top"  v-if="historylist.length==0">
				<image src="../../../../static/icons/public_blank.png" style="width: 30vh;height: 30vh;"></image>
				<text class="text-999"> 暂无数据</text>
			</view>
		</scroll-view>
	<view class="cu-modal drawer-modal justify-end" :class="modalName=='DrawerModalR'?'show':''" @tap="hideModal">
		<view class="cu-dialog basis-lg" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
			<view class="cu-list menu text-left">
				<view class="cu-item solid-bottom" >
					<view class="content flex">
						<text class="cuIcon-search"></text>
						<input v-model="searchVal" style="font-size: 26rpx;" :placeholder="'请输入'+(custom.roomName.columnAlias||custom.roomName.columnDescription)+'/'+(custom.userName.columnAlias||custom.userName.columnDescription)" name="input"></input>
					</view>
				</view>
				<view class="cu-item solid-bottom" >
					<view class="content flex justify-between">
						<text>开始时间:</text>
						<picker mode="date" :value="starttime" start="2021-01-01"  @change="startDateChange">
							<view class="picker">
								{{starttime}}
							</view>
						</picker>
					</view>
				</view>
				<view class="cu-item solid-bottom" >
					<view class="content flex justify-between">
						<text>截止时间:</text>
						<picker mode="date" :value="endtime" start="2021-01-01"  @change="endDateChange">
							<view class="picker">
								{{endtime}}
							</view>
						</picker>
					</view>
				</view>
				<view class="cu-item solid-bottom" >
					<view class="content flex justify-center">
						<button class="cu-btn" @tap='reset'>重置</button>
						<button class="cu-btn bg-blue margin-left" @tap='toSearch()'>搜索</button>
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				CustomBar: this.CustomBar,
				modalName: null,
				roomInfo:{},
				staticlist: [{
						"type": "",
						"title": "全部",
						"num": 0
					}, {
						"type": "Paying",
						"title": "支付中",
						"num": 0
					},
					{
						"type": "AlreadyAccount",
						"title": "已到账",
						"num": 0
					}, {
						"type": "Other",
						"title": "其他",
						"num": 0
					}
				],
				PageNum:1,
				PageSize:30,
				PayStatus:'',
				custom: this.$commom.getCustom(),
				historylist: [],
				starttime:'',
				endtime:'',
				searchVal:'',
				ORDERSTATE:{"0":'未支付',"1":'支付成功',"2":'支付失败',"3":'已关闭',"4":'其他'},
			}
		},
		onLoad(e) { //页面加载
			console.log(e);
			if (e.item) { //如果有传值过来说明是查单个房间，如果没有就是查询个人名下所有的
				this.roomInfo = JSON.parse(decodeURIComponent(e.item));
				console.log("传递过来的数据", this.roomInfo);
			}
			
			this.starttime=this.$commom.dateFormat("yyyy-MM")+"-01";
			this.endtime= this.$commom.dateFormat("yyyy-MM-dd "),
			this.getPayHistory();
		},
		onShow() { //页面显示
			
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
		console.log("下拉加载...");
		this.PageNum++;
		this.getPayHistory('');
		},
		onPageScroll() { //页面滚动
			console.log('页面滚动...')
		},
		onPullDownRefresh() { //上拉刷新
		console.log("上拉刷新...");
		this.getPayHistory();
			uni.stopPullDownRefresh();
		},

		// #ifdef APP-PLUS
		onNavigationBarButtonTap() {

		},
		// #endif
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			startDateChange(e) {
				this.starttime = e.detail.value
			},
			endDateChange(e) {
				this.endtime = e.detail.value
			},
			tabSelect(index,item) {
				this.TabCur = index;
				this.historylist=[];
				this.PageNum=1;
				this.PayStatus=item.type;
				this.getPayHistory();
				//this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			toDetaile(item){
				uni.navigateTo({
					url: '/pages/charge/pay/payhistory/paydetail?item=' + encodeURIComponent(JSON.stringify(item)),
				});
			},
			reset(){
				this.starttime=this.$commom.dateFormat("yyyy-MM")+"-01";
				this.endtime= this.$commom.dateFormat("yyyy-MM-dd");
				this.searchVal='';
				this.historylist=[];
				this.getPayHistory();
				this.modalName = null
			},
			toSearch(){
				this.historylist=[];
				this.getPayHistory();
				this.modalName = null
			},
			getPayHistory() {//获取充值记录
				var that = this;
				console.log(that.roomInfo);
				let userInfo = uni.getStorageSync('userInfo');
				this.$http(
					'pay.getOrderList', {
						"CreateTimeMin": this.starttime+" 00:00:00",
						"CreateTimeMax": this.endtime+" 23:59:59",
						"AccountId":userInfo.id,
						"TenantId":that.$commom.getLocalParam("tenantId"),
						"RoomId":that.roomInfo.roomId,
						"PageNum":this.PageNum,
						"PageSize":this.PageSize,
						"PayStatus":this.PayStatus,
						"NumOrName":this.searchVal
					}, '加载中...'
				).then(res => {
					//console.log(res)
					console.log('获取充值记录:', res);
					if (res.code === 200) {
						for (var i = 0; i < res.data.length; i++) {
							let item=res.data[i]
							that.historylist.push(item)
						}
						
						//console.log('用电情况(日用电量):', res.data);
						//that.item.accountBalance = res.data.balance||0
					}
				});
			
			},
			createOrder(item) {//创建预支付订单
				var that = this;
				console.log(that);
				let userInfo = uni.getStorageSync('userInfo');
				
				let openid=that.$commom.getLocalParam("openid");
				let shopname=(that.custom.roomName.columnAlias||that.custom.roomName.columnDescription)+"："+that.roomInfo.roomName+"充值费用"
				
				
				this.$http(
					'pay.createorder', {
						"payChannel": item.payChannel,
						"money": item.mMoney,
						"description": shopname,
						"openId": openid,
						"tlTitle":shopname,
						"roomId":that.roomInfo.roomId,
						"accountId":userInfo.id
					}, '加载中...'
				).then(res => {
					//console.log(res)
					console.log('创建预支付订单:', res);
					if (res.code === 200) {
						that.toPay(res.data);
					}else{
						that.$toast(res.message)
					}
				});
			
			},
			toPay(data) {
			        try {
						var that=this;
			            WeixinJSBridge.invoke(
			                'getBrandWCPayRequest', {
			                    "appId": data.appId,     //公众号名称，由商户传入
			                    "timeStamp": data.timeStamp,         //时间戳，自1970年以来的秒数
			                    "nonceStr": data.nonceStr, //随机串
			                    "package": data.package,
			                    "signType": data.signType,         //微信签名方式：
			                    "paySign": data.paySign //微信签名
			                },
			                function (res) {
								console.log(res);
								that.getBalance();
			                  //  addLog(res);
			                    if (res.err_msg == "get_brand_wcpay_request:ok") {
			                  // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
			                   
			                       }
			                    else if (res.err_msg == "get_brand_wcpay_request:fail") {
			                       
			                    }
			                }
			            );
			            //alert("pay complete");
			        }
			        catch (ex) {
			          
			        }
			},
		}
	}
</script>

<style>
	.border-btn-blue{
		border: 1px solid #007AFF;
		border-radius: 10rpx;
		padding: 8rpx 15rpx;
		color: #007AFF;
	}
	.border-btn-orange{
		border: 1px solid #FD6136;
		border-radius: 10rpx;
		padding: 8rpx 15rpx;
		color: #FD6136;
	}
	/* 必须设置这个使它置于顶层 */
	.uni-picker-container{
		z-index: 1111 !important;
	}
</style>
<style lang="scss" scoped>
/* 必须设置这个使它置于顶层 */
	.uni-picker-container{
		z-index: 1111 !important;
	}
</style>
