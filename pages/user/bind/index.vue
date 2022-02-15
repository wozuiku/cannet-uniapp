<template>
	<view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">房间名称</view>
				<input v-model="form.data.roomName" disabled></input>
			</view>
			
		    <view v-if="isExistMain=='false'">
				
				<view class="cu-form-group">
					<view class="title">业主手机</view>
					<input v-model="form.data.phoneNumber" placeholder="输入手机号" name="input"></input>
				</view>
				
				<view class="cu-form-group">
					
					<view class="bind-smscode">
						<view class="bind-smscode-left">
							<view class="title">验证码</view>
							<input v-model="form.data.code" placeholder="输入验证码" name="input"></input>
						</view>
						<view class="bind-smscode-right">
							<button class='cu-btn bg-blue bind-smscode-btn' :disabled="disabledCode" type="" @tap="getSmsCode('5')">{{codeText}}</button>
						</view>
					</view>
					
				</view>
				
				<view class="cu-form-group bind-submit-box">
					<button class='cu-btn bg-gradual-blue shadow bind-submit-btn' @click="bindSubmit">确认绑定</button>
				</view>
				
			</view>
			
			<view v-if="isExistMain==='true'">
				<view class="cu-form-group bind-submit-box" style="height: 120rpx;">
					<button class='cu-btn bg-gradual-blue shadow bind-submit-btn' @click="bindSubmit">确认绑定</button>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	import Main from './main.js'
	export default Main
</script>

<style lang="scss" scoped>
	@import "./main.scss"
</style>
