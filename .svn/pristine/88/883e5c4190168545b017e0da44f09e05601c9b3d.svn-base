<template>
	<view>
		<cu-custom  bgColor="bg-white" :isBack="true" >
			<block slot="backText"></block>
			<block slot="content">个人信息</block>
		</cu-custom>
		
		<scroll-view scroll-y="true" class="page">
			<view class="cu-list menu">
				<view class="cu-item solid-top">
					<view class="content">
						<text class="text-grey">头像</text>
					</view>
					<view class="action">
						<view class="cu-avatar round" style="background-image:url(/static/images/index/avatar_default.png);"></view>
					</view>
				</view>
				
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">姓名</text>
					</view>
					<view class="action text-grey">
						{{userInfo.fullName}}
					</view>
				</view>
				
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">手机号</text>
					</view>
					<view class="action text-grey">
						{{userInfo.phoneNumber}}
					</view>
				</view>
				
				<view class="cu-item arrow" @tap=jumpChangePwd>
					<view class="content">
						<text class="text-grey">修改密码</text>
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