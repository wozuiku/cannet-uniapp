<template>
	<view class="bind-wrap">
		<!-- <cu-custom :isBack="true" bgColor="bg-white" style="color: #000000;"><block slot="backText" >添加绑定新用户</block><block slot="content"></block></cu-custom> -->
		<cu-custom :isBack="true" bgColor="bg-gradual-blue" style="color: #000000;"><block slot="backText" ></block><block slot="content">添加绑定新用户</block></cu-custom>
		<view class="prompt-text text-gray">
			输入用户号查询后确认用户信息，获取验证码，点击"绑定用户"按钮
		</view>
		<form>
			<view class="cu-form-group">
				<view class="title">用户号</view>
				<input v-model = 'form.data.roomName' placeholder="请输入用户号" :disabled = '!userInput'></input>
				<button v-if = 'userInput' class='cu-btn bg-blue' @tap="search">查询</button>
			</view>
			<view class="cu-form-group">
				<view class="title">用户名</view>
				<input v-model = 'form.data.userName' placeholder="" disabled ></input>
			</view>
			<view class="cu-form-group">
				<view class="title">用电地址</view>
				<input v-model = 'form.data.userAddress' placeholder="" disabled></input>
			</view>
			<view class="cu-form-group">
				<view class="title">业主手机</view>
				<input v-model = 'form.data.encryptPhoneNumber' placeholder="" disabled></input>
			</view>
			<view class="cu-form-group">
				<view class="title">验证码</view>
				<input v-model = 'form.data.smsCode' placeholder="请输入验证码" type="number"></input>
				<button class='cu-btn bg-blue smscode-btn' :disabled="disabledCode" @tap="getSmsCode('5')">{{codeText}}</button>
			</view>
		</form>
		<view class="bind-btn-box">
			<button class="bg-gradual-blue bind-btn shadow" @click="bindSubmit">绑定用户</button>
		</view>
		
		<view class="cu-modal" :class="showModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">选择房间</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="">
					<radio-group class="block" @change="radioChange">
						<view class="cu-list menu text-left">
							<view class="cu-item" v-for="(roomInfoItem,roomInfoIndex) in this.roomInfoList" :key="roomInfoIndex">
								<label class="flex justify-between align-center flex-sub">
									<view class="flex-sub">
									    <view class="room-item">
											<view class="room-name">
												<view class="room-name-label">
													用户名：
												</view>
												<view class="room-name-text">
													{{roomInfoItem.roomInfo.userName}}
												</view>
											</view>
											<view class="room-num text-gray">
												<view class="room-num-label">
													用户号：
												</view>
												<view class="room-num-text">
													{{roomInfoItem.roomInfo.roomName}}
												</view>
											</view>
										</view>
									</view>
									<radio class="round" :value="''+roomInfoIndex"></radio>
								</label>
							</view>
						</view>
					</radio-group>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-blue text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-blue margin-left" @tap="hideModal">确定</button>
		
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

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
