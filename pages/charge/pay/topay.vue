<template>
	<view class="flex " style="flex-direction: column;">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">

			<block slot="content">充值</block>
			<block slot="right">
				<view class="margin-right text-xl" @tap="topayhistory()">
					<!-- <navigator url="/pages/charge/pay/payhistory/payhistory" open-type="navigate"> -->
						<text class="text-xl" style="font-size: 26rpx;">充值记录</text>
					<!-- </navigator> -->
				</view>
			</block>
		</cu-custom>
		<scroll-view scroll-y="true" class="">
			<view class="page cu-list menu card-menu margin-top" style="margin: 20rpx 20rpx;">
				<view class="cu-item padding-sm bg-white arrow" @tap="changeRoom" data-target="DrawerModalL">
					<view>
						当前选择：{{roomInfo.userName||'请选择要充值的用户'}}
					</view>
				</view>
				<view class="cu-item padding-sm bg-white  margin-top-sm">
					<view class="content" style="padding-top: 20rpx;">
						<view class="yhname">{{custom.roomName.columnAlias||custom.roomName.columnDescription}}：{{roomInfo.roomName}}</view>
						<view class="flex justify-between">
							<text class="yhinfo">{{roomInfo.userName}}</text>
							<text class="devinfo" @tap="toDevInfo" data-target="DrawerModalR">监测点信息</text>
						</view>
						<view class="yhinfo">
							<text class="cuIcon-location" style="font-size: 24rpx;"></text>
							<text style="font-size: 26rpx;font-weight: 400;">{{roomInfo.userAddress}}</text>
						</view>
						<view class="padding-top-sm padding-bottom-sm text-bold">
							<text class="text-black">余额：</text>
							<text :class="roomInfo.accountBalance<0?'text-red':'text-black'">{{roomInfo.accountBalance}}</text>
						</view>
					</view>
				</view>
				<!-- 选择房间列表 -->
				<view class="cu-modal drawer-modal justify-start" :class="modalName=='DrawerModalL'?'show':''"
					@tap="hideModal">
					<view class="cu-dialog basis-lg" @tap.stop=""
						:style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
						<view class="cu-list menu text-left margin-top-sm">
							
							<view class="cu-item solid-bottom"  :class="roomInfo.roomName==roomitem.roomName?'curr bg-blue':''" style="padding:15rpx;" v-for="(roomitem,index) in roomList"
								:key="index" @tap="toSelectRoom(roomitem)">
								<view class="content" >
									<view class="text-bold">
										<text style="min-width: 120rpx;">{{custom.roomName.columnAlias||custom.roomName.columnDescription}}：</text>
										<text>{{roomitem.roomName}}</text>
									</view>
									<view style="align-items: flex-start;">
										<text class="text-grey">{{roomitem.userName}}</text>
									</view>
									
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 查看监测点 -->
				<view class="cu-modal drawer-modal justify-end" :class="modalName=='DrawerModalR'?'show':''"
					@tap="hideModal">
					<view class="cu-dialog basis-lg" @tap.stop=""
						:style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
						<view class="cu-list menu text-left margin-top-sm">
							<view class="cu-item solid-bottom" style="padding:15rpx;" v-for="(item,index) in devList" :key="index">
								<view class="content">
									<view class="flex">
										<image v-if="item.energyType=='NYDN'" class="devimg" src="../../../static/images/index/home_function_01.png"></image>
										<image v-if="item.energyType=='NYSN'" class="devimg" src="../../../static/images/index/home_function_02.png"></image>
										<image v-if="item.energyType=='NYQN'" class="devimg" src="../../../static/images/index/home_function_03.png"></image>
										<image v-if="item.energyType=='NYLN'" class="devimg" src="../../../static/images/index/home_function_03.png"></image>
										<image v-if="item.energyType=='NYHJ'" class="devimg" src="../../../static/images/index/home_function_03.png"></image>
										<image v-if="item.energyType=='NYKG'" class="devimg" src="../../../static/images/index/home_function_03.png"></image>
										<view class="text-bold">
											<text>资产编号： {{item.meterNo}}</text>
										</view>
									</view>
									
									<view class="text-cut yhinfo"> {{item.meterName}}</view>
									<view class="flex">
										<text class="cuIcon-location" style="font-size: 24rpx;"></text>
										<text class="text-cut flex-sub" style="font-size: 24rpx;font-weight: 400;">{{item.installtionLocaltion}}</text>
									</view>
									
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-form-group margin-top-sm" >
					<view class="">快捷方式(元)：</view>
					<view class="content flex ">
						<view class='myButton' v-on:click="myMoneyClick(100)">100</view>
						<view class='myButton' v-on:click="myMoneyClick(300)">300</view>
						<view class='myButton' v-on:click="myMoneyClick(500)">500</view>
						<view class='myButton' v-on:click="myMoneyClick(1000)">1000</view>
					</view>
				</view>
				<view class="cu-form-group ">
					<view class="">充值金额(元)：</view>
					<view class=" flex flex-sub ">
						<input class="text-right money" placeholder="" type="digit" v-model="mMoney" @input="validNum"
							:maxlength="moneyMaxLeng"></input>
					</view>
					<view class="text-blue">元</view>
				</view>
				<radio-group class=" block margin-top-sm radius" @change="RadioChange">
					<view v-for="(payitem,index) in payTypeList">
					<view class="cu-form-group"   v-if="payitem.payType=='0'"  >
						<view class="content flex align-center">
							<!-- <text class="cuIcon-weixin text-green text-lg" style="font-size: 56upx;"></text> -->
							<view class="cu-avatar  " style="background: url(../../../static/icons/wechatpay.png) no-repeat;background-size: 100%;"></view>
							<text class="text-lg padding-left-sm ">微信支付</text>
						</view>
						<radio class="mradio blue" :class="payChannel==payitem.payType?'checked':''" :checked="payChannel==payitem.payType" :value="payitem.payType+''"></radio>
					</view>
					<view class="cu-form-group"  v-if="payitem.payType=='1'"  >
						<view class="content flex align-center">
							<!-- <text class="cuIcon-weixin text-green text-lg" style="font-size: 56upx;"></text> -->
							<view class="cu-avatar  " style="background: url(../../../static/icons/icon_wechat_tl.png) no-repeat;background-size: 100%;"></view>
							<text class="text-lg padding-left-sm ">微信支付</text>
						</view>
						<radio class="mradio blue" :class="payChannel==payitem.payType?'checked':''" :checked="payChannel==payitem.payType" :value="payitem.payType+''"></radio>
					</view>
					<!-- <view class="cu-form-group" v-if="false">
						<view class="content flex align-center">
							<view class="cu-avatar round " style="background: url(../../static/alipay.png) no-repeat;background-size: 100%;"></view>
							<text class="text-lg padding-left-sm ">支付宝</text>
						</view>
						<radio :class="radio=='2'?'checked':''" :checked="radio=='2'?true:false" value="2"></radio>
					</view> -->
					</view>
				</radio-group>
			</view>
		</scroll-view>
		<view style="position: fixed;bottom: 0;width: 100%;">
			<button class="cu-btn  block  lg rechargebtn margin-top"  @tap="rechargebtn()">立即充值</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: "",
				roomInfo: {}, //
				mMoney: "",
				moneyMaxLeng: 7,
				payChannel: '',
				roomList: [], //房间列表
				devList: [], //房间列表
				CustomBar: this.CustomBar,
				modalName: null,
				custom:this.$commom.getCustom(),
				payTypeList:[],//支付平台
			}
		},
		onLoad(e) {
			console.log(e);
			if(e.item){//如果有传值过来的数据
				this.roomInfo = JSON.parse(decodeURIComponent(e.item));
				console.log("传递过来的数据", this.roomInfo);
			}
		
			let userInfo = uni.getStorageSync('userInfo');
			this.userId = userInfo.id;
			this.getPayType();
			this.getRoomList();
			
			console.log("自定义字段",this.$commom.getCustom());
		},
		onShow() { //页面显示
			this.getBalance();
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
			//uni.stopPullDownRefresh();
		},

		
		methods: {
			toDevInfo(e) { //监测点信息列表
				this.getDevList();
				this.modalName = e.currentTarget.dataset.target
				console.log(this.modalName);
			},
			changeRoom(e) { //切换房间
				this.getRoomList();
				this.modalName = e.currentTarget.dataset.target
			},
			// showModal(e) {

			// },
			hideModal(e) {
				this.modalName = null
			},
			myMoneyClick(fastmoney) {
				this.mMoney = fastmoney;
			},
			validNum(e) { //验证金钱
				this.$nextTick(() => {
					 let val = e.target.value.toString();
					var temp=/^\d+(\.\d{1,2})?$/;
					    if (temp.test(val)) {
							console.log("222222222");
					    } else {
					        val =val.replace(/[^\d.]/g, "");// val.match(temp, "");//val.substr(0, val.length - 1);  /[^\d.]/g
							if (val.includes(".")) {
								let numDian = val.toString().split(".")[1].length;
								if (numDian > 2) {
									let dotnum=numDian-2;
									val=val.substring(0,val.length-dotnum);
								}
							}
							 val =val.replace(/[^\d.]/g, "");// val.match(temp, "");//val.substr(0, val.length - 1);  /[^\d.]/g
					      
					    }
					this.mMoney = val;
				});
			},
			RadioChange(e) {
				this.payChannel = e.detail.value
			},
			toSelectRoom(item){//左侧选择点击房间页面
				this.roomInfo=item;
				this.modalName = null
				this.getBalance();
			},
			topayhistory(){//前往充值
				uni.navigateTo({
					url: '/pages/charge/pay/payhistory/payhistory?item=' + encodeURIComponent(JSON.stringify(this.roomInfo)),
				});
			},
			rechargebtn(){//充值按钮
				
					//#ifdef H5||MP-WEIXIN
					if(this.$commom.isWechat()){
						var openid = this.$commom.getLocalParam("openid");
						if (!openid || openid == "") {
							uni.removeStorage({
								key: 'info', //清楚个人信息
							});
							uni.removeStorage({
								key: 'token', //清除密钥
							});
							this.$toast("登录已过期请重新登录")
							return;
						}
					}
					
					var money = this.mMoney;
					var allmoney = parseFloat(money) + parseFloat(this.roomInfo.accountBalance); //充值后的金额
					if (money == ""||money<=0) {
						this.$toast("请填写正确金额");
						return false;
					}
					if (allmoney < 0) {
						this.$toast("当前充值后金额小于0");
						return false;
					} 
				// #endif
				
				if (this.payChannel =='') {
					this.$toast("请选择支付方式");
					return false;
				}
				this.createOrder();
			},
			
			
			getRoomList() {//获取房间列表
				var that = this;
				this.$http(
					'charge.balance', {
						AccountId: this.userId,
					}, '加载中...'
				).then(res => {
					//console.log(res)
					console.log('获取房间列表:', res);
					if (res.code === 200) {
						console.log('获取房间列表:', res.data);
						that.roomList = res.data
						if(!that.roomInfo.roomId){
							that.roomInfo=res.data[0];
						}
					}
				});

			},
			getDevList() {//获取监测点列表
				var that = this;
				console.log(that.roomInfo);
				this.$http(
					'room.getMeterByRoomId', {
						"roomId": that.roomInfo.roomId,
					}, '加载中...'
				).then(res => {
					//console.log(res)
					console.log('获取监测点列表:', res);
					if (res.code === 200) {
						console.log('获取设备列表:', res.data);
						that.devList = res.data
					}
				});
			
			},
			getBalance() {//获取房间余额
				var that = this;
				console.log(that.roomInfo);
				this.$http(
					'room.getBalance', {
						"roomId": that.roomInfo.roomId,
					}, '加载中...'
				).then(res => {
					//console.log(res)
					console.log('获取房间余额:', res);
					if (res.code === 200) {
						console.log('获取房间余额:', res.data);
						that.roomInfo.accountBalance = res.data.balance.toFixed(2)||0;
					}
				});
			
			},
			getPayType() {//获取支付平台
				var that = this;
				console.log(that.roomInfo);
				let tenantid=this.$commom.getLocalParam("tengantid");
				this.$http(
					'pay.getpaytype', {
						"tenantId": tenantid,
					}, '加载中...'
				).then(res => {
					//console.log(res)
					console.log('获取支付平台:', res);
					if (res.code === 200) {  
						that.payTypeList = res.data;
						for (var i = 0; i < res.data.length; i++) {
							let item=res.data[i];
							if(item.isDefault){
								that.payChannel=(item.payType+"")
							}
						}
						if(that.payChannel==''&&that.payTypeList.length==1){//没有设置默认的支付方式，并且只有一种支付方式
							that.payChannel=that.payTypeList[0].payType;
						}
						
					}
				});   
			
			},
			createOrder() {//创建预支付订单
				var that = this;
				console.log(that);
				let userInfo = uni.getStorageSync('userInfo');
				
				let openid=that.$commom.getLocalParam("openid");
				let shopname=(that.custom.roomName.columnAlias||that.custom.roomName.columnDescription)+"："+that.roomInfo.roomName+"充值费用"
				
				
				this.$http(
					'pay.createorder', {
						"payChannel": that.payChannel,
						"money": that.mMoney,
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
						this.$toast(res.message)
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
									that.roomInfo.money=that.mMoney;//赋值充值的金额
									uni.navigateTo({
										url: '/pages/charge/pay/payResult?item=' + encodeURIComponent(JSON.stringify(that.roomInfo)),
									});
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
	.page{
		height: calc(100vh - 120px);
	}
	.yhname {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		line-height: 48rpx;
	}

	.yhinfo {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666666;
	}

	.devinfo {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		text-decoration: underline;
		color: #007CFF;
		margin-left: 23rpx;
	}

	.myButton {

		background-color: white;
		border-radius: 6upx;
		display: inline-block;
		cursor: pointer;
		color: black;
		font-family: Arial;
		font-size: 30upx;
		padding: 20upx 30upx;
		text-decoration: none;

	}

	.myButton:hover {
		color: white;
		background-color: #0688fa;
	}

	.myButton:active {
		background-color: #2dabf9;
		color: white;
		position: relative;
		top: 1px;
	}

	.money {
		font-size: 44rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #007DFE;
	}
.rechargebtn{
	background: linear-gradient(90deg, #007DFF 0%, #00C5FF 100%);
	color: #fff;
	font-size: 32rpx;
	font-family: PingFang SC;
	font-weight: bold;
	height: 98rpx;
	width: 100%;
}
.radius{
	border-radius: 10px;
}
.curr{
	background: linear-gradient(90deg, #007DFF 0%, #00C5FF 100%);
}
.curr .text-black,.curr .text-grey{
	color:#fff;
}
.uni-input-placeholder{
	font-size: 12px;
}
.devimg{
	width: 44rpx;
	height: 44rpx;
}
</style>
<style lang="scss" scoped>

</style>
