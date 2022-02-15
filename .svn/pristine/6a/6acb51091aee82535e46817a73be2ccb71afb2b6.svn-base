<template>
	<view class="container">
		<view class="info-head">
			<view class="info-title">基本信息</view>
			<view class="">
				<button class="bg-gradual-blue save-btn">保存</button>
			</view>
		</view>
		
		
		<view class="user-list u-flex u-row-between">
			<text class="list-name">头像</text>
			<view class="u-flex" @tap="onChooseImg">
				<image class="avatar" :src="userData.avatar" mode=""></image>
				<text class="u-iconfont uicon-arrow-right u-m-l-20" style="color:#999;"></text>
			</view>
		</view>
		
		<view class="user-list u-flex u-row-between">
			<text class="list-name">昵称</text>
			<view class="u-flex">
				<input
					class="list-val"
					v-model="userData.fullName"
					@input="onChangeNickName"
					@blur="onChangeNickName"
					@confirm="onChangeNickName"
					placeholder="请输入昵称~"
					maxlength="50"
					placeholder-style="color:#c8c9cc;fontSize:28rpx"
				/>
				<text class="u-iconfont uicon-arrow-right u-m-l-20" style="color:#999;"></text>
			</view>
		</view>
		
		<view class="user-list u-flex u-row-between u-m-b-10" @tap="bindMobile">
			<text class="list-name">手机号</text>
			<view class="u-flex">
				<text class="list-val">{{ userInfo.phoneNumber || '暂未绑定手机号' }}</text>
				<text class="u-iconfont uicon-checkmark-circle-fill u-m-l-20" style="color:#09BB07;"></text>
			</view>
			
		</view>
		
		<view class="user-list u-flex u-row-between" @tap="$Router.push('/pages/user/address/list')">
			<text class="list-name">地址管理</text>
			<view class="u-flex">
				<text class="list-val"></text>
				<text class="u-iconfont uicon-arrow-right u-m-l-20" style="color:#999;"></text>
			</view>
		</view>
		
		<view class="user-list u-flex u-row-between" @tap="changePwd">
			<text class="list-name">修改密码</text>
			<view class="u-flex">
				<text class="list-val"></text>
				<text class="u-iconfont uicon-arrow-right u-m-l-20" style="color:#999;"></text>
			</view>
		</view>
		
		
		<view class="btn-box u-flex u-row-center u-col-center">
			<button class="bg-gradual-blue u-reset-button logout-btn" @tap="logoutSubmit">退出登录</button>
		</view>
		
		<!-- <cannet-auth-modal></cannet-auth-modal> -->
		
		
		<u-modal
			ref="uModal"
			v-model="showModal"
			:show-cancel-button="true"
			confirm-color="#F54141"
			cancel-color="#666666"
			@confirm="confirmLogOut"
			content="确定退出登录？"
		></u-modal>
	</view>
</template>

<script>
	import Main from "./main";
	export default Main;
</script>

<style lang="scss" scoped>
	@import "./main.scss"
</style>