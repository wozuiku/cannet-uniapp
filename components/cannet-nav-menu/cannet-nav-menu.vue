<template>
	<view class="menu-wrap">
		<scroll-view scroll-y scroll-with-animation class="tab-view menu-scroll-view" :scroll-top="scrollTop"
		 :scroll-into-view="itemId">
			<view v-for="(item,index) in list" :key="index" class="tab-item" :class="[current == index ? 'tab-item-active' : '']"
			 @tap.stop="swichMenu(index)">
				<text>{{item.name}}</text>
			</view>
		</scroll-view>
		
		<scroll-view :scroll-top="scrollRightTop" scroll-y scroll-with-animation  @scroll="rightScroll">
			<view class="right-box">
				<view class="category-item" :id="'item' + index" v-for="(item , index) in list" :key="index">
					<view class="item-title" :class="gridBorder?'solid-bottom':''">
						<text>{{item.name}}</text>
					</view>
					<view class="item-container">
						<view class="cu-list grid item-container-grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
							<view class="cu-item" v-for="(item1, index1) in item.category" :key="index1">
								<view>
									<image class="item-menu-image" :src="item1.icon" ></image>
								</view>
								<view class="item-menu-name">{{item1.name}}</view>
								<view v-if="item1.isShowBadge" class="item-menu-badge" @tap="funcAdd(item1)">
									<image class="item-menu-badge-image"  src="/static/images/func/add.jpeg">
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	
	export default {
		data(){
			return {
				scrollTop: 0, //tab标题的滚动条位置
				oldScrollTop: 0,
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				itemId: '', // 栏目右边scroll-view用于滚动的id
				menuItemPos: [],
				arr: [], //存放右边菜单每个item到顶部的距离
				scrollRightTop: 0, // 右边栏目scroll-view的滚动条高度
				gridCol: 3, //右边栏目grid三列
				timer: null, // 定时器
				
				
			}
		},
		
		props:{
			list: {
				type: Array,
				default: function() {
					return []
				}
			},
			
			//编辑时候展示边框
			gridBorder: {
				type: Boolean,
				default: false
			},
			
			//常用功能个数
			//用来判断是否可以继续添加常用功能
			//个数多于8个不允许继续添加
			commonFuncCount: {
				type: Number,
				default: 0
			},
			
			
		},
		
		created() {
			console.log('######component created begin######');
			console.log('component created this.list: ', this.list);
			console.log('######component created end######');
		},
		
		mounted() {
			this.getMenuItemTop()
		},
		
		
		methods:{
			// 点击左边的栏目切换
			async swichMenu(index) {
				console.log('swichMenu, index:', index);
				console.log('swichMenu, this.arr.length:', this.arr.length);
				if (this.arr.length == 0) {
					//获取右边菜单每个item到顶部的距离
					await this.getMenuItemTop();
				}
				if (index == this.current) return;
				
				//右边栏目scroll-view的滚动条高度
				this.scrollRightTop = this.oldScrollTop;
				
				this.$nextTick(function() {
					this.scrollRightTop = this.arr[index];
					console.log('swichMenu nextTick this.scrollRightTop:', this.scrollRightTop);
					this.current = index;
					this.leftMenuStatus(index);
				})
			},
			
			
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
						resolve();
					}).exec();
				}).catch((e) => {});//解决微信内置的浏览器报错
			},
			
			
			// 设置左边菜单的滚动状态
			async leftMenuStatus(index) {
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('tab-item', 'menuItemHeight');
				}
				// 将菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			
			
			//获取右边菜单每个item到顶部的距离
			getMenuItemTop() {
				new Promise(resolve => {
					let selectorQuery = uni.createSelectorQuery();
					selectorQuery.selectAll('.category-item').boundingClientRect((rects) => {
						console.log('getMenuItemTop, rects:',rects);
						// 如果节点尚未生成，rects值为[](因为用selectAll，所以返回的是数组)，循环调用执行
						if (!rects.length) {
							setTimeout(() => {
								this.getMenuItemTop();
							}, 10);
							return;
						}
						rects.forEach((rect) => {
							// 这里减去rects[0].top，是因为第一项顶部可能不是贴到导航栏(比如有个搜索框的情况)
							this.arr.push(rect.top - rects[0].top);
							resolve();
						})
					}).exec()
				})
			},
			
			
			// 右边菜单滚动
			async rightScroll(e) {
				this.oldScrollTop = e.detail.scrollTop;
				if(this.arr.length == 0) {
					await this.getMenuItemTop();
				}
				if(this.timer) return ;
				if(!this.menuHeight) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
				}
				setTimeout(() => { // 节流
					this.timer = null;
					// scrollHeight为右边菜单垂直中点位置
					let scrollHeight = e.detail.scrollTop + this.menuHeight / 2;
					for (let i = 0; i < this.arr.length; i++) {
						let height1 = this.arr[i];
						let height2 = this.arr[i + 1];
						// 如果不存在height2，意味着数据循环已经到了最后一个，设置左边菜单为最后一项即可
						if (!height2 || scrollHeight >= height1 && scrollHeight < height2) {
							this.leftMenuStatus(i);
							return ;
						}
						// //比较当前滚动高度和右侧菜单前后两项到顶部高度，在范围内，则设置左侧菜单为选中
						// //如果不存在height2，意味着数据循环已到了最后一个，设置左边菜单为最后一项即可
						// if (scrollHeight >= height1 && scrollHeight < height2 || !height2) {
						// 	this.leftMenuStatus(i);
						// 	return;
						// }
					}
				}, 10)
			},
			
			
			
			funcAdd(item) {
				//最多只能八个功能
				if (this.commonFuncCount >= 8) {
					this.$u.toast('最多8个功能')
					return
				}
				
				console.log('funcAdd addItem:', item);
				// //在常用功能区添加功能
				// addItem = {
				// 	...addItem,
				// 	...{
				// 		isShowBadge: true //addItem添加角标属性
				// 	}
				// }
				// //将新功能item传给组件cannetDragImage
				// this.commonFuncItem = addItem
				
				this.$emit('updateAllListEvent', item)
				
			},
			
			
		},
	}
	
</script>

<style lang="scss" scoped>
	.menu-wrap{
		display: flex;
		overflow: hidden;
		
		.tab-view {
			width: 200rpx;
			height: 100%;
			
			.tab-item {
				height: 110rpx;
				background: #f6f6f6;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 26rpx;
				color: #444;
				font-weight: 400;
				line-height: 1;
			}
			
			.tab-item-active {
				position: relative;
				color: #4EB5B2;
				font-size: 26rpx;
				font-weight: 600;
				background: #fff;
			}
		}
		
		.right-box{
			padding: 16rpx;
			background-color: rgb(250, 250, 250);
			//overflow: auto;
			
			.category-item {
				margin-bottom: 30rpx;
				background-color: #fff;
				
				.item-title {
					font-size: 26rpx;
					color: $u-main-color;
					font-weight: bold;
					padding: 12rpx;
				}
				
				.item-container {
						.item-container-grid{
							width: 100%;
							
							.item-menu-image {
								width: 120rpx;
								height: 120rpx;
							}
							
							.item-menu-name {
								font-weight: normal;
								font-size: 24rpx;
								color: $u-main-color;
							}
							
							.item-menu-badge{
								position: absolute;
								top: 12rpx;
								right: 12rpx;
								width: 26rpx;
								height: 26rpx;
								.item-menu-badge-image{
									width: 26rpx;
									height: 26rpx;
								}
							}
						}
					}
				}
			}
			.category-item:last-child {
				min-height: 100vh;
			}
	}
</style>
