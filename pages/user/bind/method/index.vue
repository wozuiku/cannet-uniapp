<template>
	<view class="add-wrap">
		<!-- <cu-custom :isBack="true" bgColor="bg-white" style="color: #000000;"><block slot="backText" >添加绑定新用户</block><block slot="content"></block></cu-custom> -->
		<cu-custom :isBack="true" bgColor="bg-gradual-blue" style="color: #000000;"><block slot="backText" ></block><block slot="content">添加绑定新用户</block></cu-custom>
		<view class="prompt-text text-gray">
			请联系管理员，获取相应用户二维码后，点击下面扫码，成功后点击“绑定用户”按钮即可。您也可以选择手动输入用户号进行添加。
		</view>
		<view class="scan-image-box">
			<image class="scan-image" src="/static/images/user/bind_scancode.png" mode=""></image>
		</view>
		<view class="scan-btn-box">
			<button class="bg-gradual-blue  scan-btn" @click="scanBind">
				立即扫码添加
			</button>
			
		</view>
		<view class="input-btn-box">
			<button class="line-blue  input-btn" @click="inputBind">
				输入户号添加
			</button>
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
