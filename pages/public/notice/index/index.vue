<template>
	<view>
		<cu-custom  bgColor="bg-white" :isBack="true" >
			<block slot="backText"></block>
			<block slot="content">公告</block>
		</cu-custom>
		<scroll-view scroll-y="true">
			<view class="notice-wrap">
				<view class="search-box solid-top">
					<view class="cu-form-group search">
						<input placeholder="输入关键字搜索" name="input"></input>
						<text class='cuIcon-search text-gray'></text>
					</view>
				</view>
				
				<view class="notice-list">
					<view class="notice-tab solid-bottom">
						<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
							<view class="cu-item" :class="tabIndex==tabCur?'text-blue cur':''" v-for="(tabItem, tabIndex) in tabList" :key="tabIndex" @tap="tabSelect" :data-id="tabIndex">
								{{tabItem}}
							</view>
						</scroll-view>
					</view>
					
					<view v-if="curTabItem=='全部'">
						<view class="notice-item solid-bottom" @tap="jumpArticle(1)">
							<view class="title">
								做好关于2022年春节关于用电安全通知
							</view>
							<view class="prompt">
								<view class="tag">
									通知公告
								</view>
								<view class="time">
									2022.1.22
								</view>
							</view>
						</view>
						
						<view class="notice-item-image solid-bottom" @tap="jumpArticle(2)">
							<view class="item-left">
								<view class="title">
									新春贺喜：奋发贺虎年，领航向未来
								</view>
								<view class="prompt">
									<view class="tag">
										媒体聚焦
									</view>
									<view class="time">
										2022.1.11
									</view>
								</view>
							</view>
							
							<view class="item-right">
								<image class="notice-image" src="https://cdn.uviewui.com/uview/swiper/1.jpg"></image>
							</view>
							
						</view>
					</view>
					
					<view v-if="curTabItem=='通知公告'">
						
					</view>
					
					<view v-if="curTabItem=='行业动态'">
						
					</view>
					
					<view v-if="curTabItem=='综合能源'">
						
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