<template>
	<view class="func-wrap">
		<view v-if="!isFuncEdit" class="search-box">
				<view class="search-inner">
					<u-icon name="search" color="#909399" :size="28"></u-icon>
					<input class="search-text" type="text" v-model="searchInput"></input>
				</view>
		</view>
		
		<view v-if="!isFuncEdit" class="common-wrap">
			<view class="common-left">
				<view class="common-title">
					常用功能
				</view>
			</view>
			<view class="common-right">
				<view class="func-icons">
					<view v-for="(item,index) in preCommonFuncs" :key="index">
						<image class="func-icon-item" :src="item.icon" mode=""></image>
					</view>
				</view>
				<view class="func-edit">
					<button class="func-edit-btn" @tap="funcEdit">编辑</button>
				</view>
			</view>
		</view>
		
		<view v-if="isFuncEdit">
			<view class="common-edit-wrap">
				<view class="common-edit-bar solid-bottom">
					<view class="common-edit-cancel" @tap="funcEditCancel">
						取消
					</view>
					<view class="common-edit-commit" @tap="funcEditCommit">
						完成
					</view>
				</view>
				
				<view class="common-edit-title solid-bottom">
					<view class="common-edit-titleText">
						常用功能
					</view>
					<view class="common-edit-subTitleText">
						拖动排列顺序
					</view>
				</view>
				
				<view class="common-edit-func-box solid-bottom">
					<cannet-drag-image :list="commonFuncs" :item="commonFuncItem" @updateCommonListEvent="updateCommonFuncList"></cannet-drag-image>
				</view>
			</view>
		</view>
		
		<!-- <view class="nav-menu"> -->
			<cannet-nav-menu :list="allFuncs" :gridBorder="gridBorder" :commonFuncCount="commonFuncs.length" @updateAllListEvent="updateALlFuncList"></cannet-nav-menu>
		<!-- </view> -->
	</view>
	
</template>

<script>
	import Main from "./main";
	export default Main;
</script>

<style lang="scss" scoped>
	@import './main.scss'
</style>
