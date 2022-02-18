<template>
	<view>
		<cu-custom  bgColor="bg-white" :isBack="true" >
			<block slot="backText"></block>
			<block slot="content">公告</block>
		</cu-custom>
		<scroll-view scroll-y="true" >
			<view class="suggestion-wrap">
				<view class="prompt-text">
					为更好解决您的意见或反馈，请您务必选择类型，并详细描述
					反馈内容。
				</view>
				
				<view class="suggestion-content">
					<view class="type-title">类型</view>
					<view class="type-tag">
						<view class="tag-item cu-tag">功能异常</view>
						<view class="tag-item cu-tag">产品体验</view>
						<view class="tag-item cu-tag">交易问题</view>
						<view class="tag-item cu-tag">其他</view>
					</view>
					
					<view class="suggestion-box">
						<input class="suggestion-input" placeholder="请输入您的意见反馈详情内容"></input>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import Main from './main.js'
	export default Main
</script>

<style lang="scss" scoped>
	@import "./main.scss"
</style>
