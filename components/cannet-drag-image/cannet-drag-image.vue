<template>
	<view class="drag-image-wrap">
		<movable-area class="drag-area" :style="{height: areaHeight}">
			<block v-for="(item, index) in imageList" :key="item.id">
				<movable-view class="drag-view" :x="item.x" :y="item.y" direction="all" :damping="40"
					:style="{ width: viewWidth + 'px', height: viewWidth + 'px', 'z-index': item.zIndex, opacity: item.opacity }"
					@change="onChange($event, item)" @touchstart="onTouchStart(item)" @longpress="onTouchStart(item)" @touchend="onTouchEnd(item)">
					<view class="image-box solid-bottom solid-right"
						:style="{ width: childWidth, height: childWidth, transform: 'scale(' + item.scale + ')' }">
						<image class="image-icon" :src="item.icon" mode="aspectFill"></image>
						<text class="image-name">{{item.name}}</text>
						<view v-if="item.isShowBadge" class="image-badge-box" @click="delImage(item, index)">
							<image class="image-badge" src="/static/images/func/del.jpeg">
						</view>
					</view>
				</movable-view>
			</block>
		</movable-area>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				platform: this.$platform.get(),
				imageList: [], //所有图片
				colsValue: 0, //列数 (由props的cols赋值)
				viewWidth: 0, //图片宽度（拖拽对象宽度）
				add: {
					x: 0,
					y: 0
				},
			}
		},

		props: {
			list: {
				type: Array,
				default: function() {
					return []
				}
			},
			
			item:{
				type: Object,
				default: function() {
					return {}
				}
			},
			
			imageWidth: {
				type: Number,
				default: 80
			},

			//图片列数
			cols: {
				type: Number,
				default: 5
			},

			//图片周围空白填充，单位rpx
			padding: {
				type: Number,
				default: 0
			},

			// 拖动图片时放大倍数
			scale: {
				type: Number,
				default: 1.1
			},

			// 拖动图片时不透明度
			opacity: {
				type: Number,
				default: 0.7
			},

		},

		created() {
			console.log('######component created begin######');
			console.log('component created platform:', this.platform);
			
			this.width = uni.getSystemInfoSync().windowWidth
			console.log('component created this.width: ', this.width);
			//this.viewWidth = this.rpx2px(this.imageWidth)
			console.log('component created this.viewWidth: ', this.viewWidth);
			console.log('######component created end######');
		},

		mounted() {
			console.log('######component mounted begin######');
			
			console.log('component mounted list:', this.list);
			
			const query = uni.createSelectorQuery().in(this)
			query.select('.drag-area').boundingClientRect(data => {
				console.log('component mounted data: ', data);
				this.colsValue = Math.floor(data.width / this.viewWidth)
				console.log('component mounted colsValue: ', this.colsValue);
				if (this.cols > 0) {
					this.colsValue = this.cols
					this.viewWidth = data.width / this.cols
				}
				console.log('this.colsValue = ', this.colsValue);
				console.log('this.viewWidth = ', this.viewWidth);
				console.log('component mounted this.colsValue:', this.colsValue);
				console.log('component mounted this.viewWidth:', this.viewWidth);
				

				for (let item of this.list) {
					this.addProperties(item)
					console.log(item);
				}
			}).exec()
			
			console.log('######component mounted end######');
		},

		computed: {
			//可拖拽区域的高度
			areaHeight() {
				console.log('######component computed areaHeight begin######');
				
				let areaHeight2 = Math.ceil(this.imageList.length / this.colsValue) * this.viewWidth + 'px'
				
				console.log('component computed areaHeight this.imageList.length', this.imageList.length);
				
				console.log('component computed areaHeight this.colsValue', this.colsValue);
				
				console.log('component computed areaHeight this.viewWidth', this.viewWidth);
				
				console.log('component computed areaHeight areaHeight2', areaHeight2);
				
				return Math.ceil(this.imageList.length / this.colsValue) * this.viewWidth + 'px'
				
				console.log('######component computed areaHeight end######');
			},

			//单个图片宽度image-box
			childWidth() {
				return this.viewWidth - this.rpx2px(this.padding) * 2 + 'px'
			},
			
			
		},

		watch: {
			item: {
			    handler(newItem, oldItem) {
					// console.log('######watch item begin######');
					// console.log(newItem);
					// console.log('######watch item end######');
					//将新增的一项添加到imageList
					this.addProperties(newItem)
			    }
			},
		},

		methods: {
			onChange(e, item) {
				if (!item) return
				item.oldX = e.detail.x
				item.oldY = e.detail.y
				if (e.detail.source === 'touch') {
					if (item.moveEnd) {
						item.offset = Math.sqrt(Math.pow(item.oldX - item.absX * this.viewWidth, 2) + Math.pow(item.oldY -
							item.absY * this.viewWidth, 2))
					}
					let x = Math.floor((e.detail.x + this.viewWidth / 2) / this.viewWidth)
					if (x >= this.colsValue) return
					let y = Math.floor((e.detail.y + this.viewWidth / 2) / this.viewWidth)
					let index = this.colsValue * y + x
					if (item.index != index && index < this.imageList.length) {
						this.changeStatus = false
						for (let obj of this.imageList) {
							if (item.index > index && obj.index >= index && obj.index < item.index) {
								this.change(obj, 1)
							} else if (item.index < index && obj.index <= index && obj.index > item.index) {
								this.change(obj, -1)
							} else if (obj.id != item.id) {
								obj.offset = 0
								obj.x = obj.oldX
								obj.y = obj.oldY
								setTimeout(() => {
									this.$nextTick(() => {
										obj.x = obj.absX * this.viewWidth
										obj.y = obj.absY * this.viewWidth
									})
								}, 0)
							}
						}
						item.index = index
						item.absX = x
						item.absY = y
						this.sortList()
					}
				}
			},

			change(obj, i) {
				obj.index += i
				obj.offset = 0
				obj.x = obj.oldX
				obj.y = obj.oldY
				obj.absX = obj.index % this.colsValue
				obj.absY = Math.floor(obj.index / this.colsValue)
				setTimeout(() => {
					this.$nextTick(() => {
						obj.x = obj.absX * this.viewWidth
						obj.y = obj.absY * this.viewWidth
					})
				}, 0)
			},
			
			onTouchStart(item) {
				this.imageList.forEach(v => {
					v.zIndex = v.index + 9
				})
				item.zIndex = 99
				item.moveEnd = true
				this.tempItem = item
				this.timer = setTimeout(() => {
					item.scale = this.scale
					item.opacity = this.opacity
					clearTimeout(this.timer)
					this.timer = null
				}, 200)
			},

			onLongPress(item) {
				console.log('######onLongpress begin######');
				console.log(item);
				console.log('######onLongpress end######');
				this.imageList.forEach(v => {
					v.zIndex = v.index + 9
				})
				item.zIndex = 99
				item.moveEnd = true
				this.tempItem = item
				this.timer = setTimeout(() => {
					item.scale = this.scale
					item.opacity = this.opacity
					clearTimeout(this.timer)
					this.timer = null
				}, 200)
			},

			onTouchEnd(item) {
				console.log('######onTouchEnd begin######');
				console.log(item);
				console.log('######onTouchEnd end######');
				//this.previewImage(item)
				item.scale = 1
				item.opacity = 1
				item.x = item.oldX
				item.y = item.oldY
				item.offset = 0
				item.moveEnd = false
				setTimeout(() => {
					this.$nextTick(() => {
						item.x = item.absX * this.viewWidth
						item.y = item.absY * this.viewWidth
						this.tempItem = null
						this.changeStatus = true
					})
				}, 0)
			},

			sortList() {
				let sortList = this.imageList.slice()
				sortList.sort((a, b) => {
					return a.index - b.index
				})
				for (let i = 0; i < sortList.length; i++) {
					sortList[i] = sortList[i].item
				}

				this.$emit('updateCommonListEvent', sortList)
			},

			addProperties(item) {
				let absX = this.imageList.length % this.colsValue
				let absY = Math.floor(this.imageList.length / this.colsValue)
				let x = absX * this.viewWidth
				let y = absY * this.viewWidth
				this.imageList.push({
					name: item.name,
					icon: item.icon,
					isShowBadge: item.isShowBadge,
					item: item, //该字段用于排序形成新的数组，回传到父组件
					x,
					y,
					oldX: x,
					oldY: y,
					absX,
					absY,
					scale: 1,
					zIndex: 9,
					opacity: 1,
					index: this.imageList.length,
					id: this.guid(),
					disable: false,
					offset: 0,
					moveEnd: false
				})
				this.add.x = (this.imageList.length % this.colsValue) * this.viewWidth + 'px'
				this.add.y = Math.floor(this.imageList.length / this.colsValue) * this.viewWidth + 'px'
				this.sortList()

			},

			rpx2px(v) {
				return this.width * v / 750
			},

			guid() {
				function S4() {
					return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
				}
				return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
			},

			delImage(item, index) {
				if (this.imageList.length == 1) {
					uni.showToast({
						title: '至少1个功能',
						icon: 'none',
						duration: 2000
					});
					return
				}
				this.imageList.splice(index, 1)
				for (let obj of this.imageList) {
					if (obj.index > item.index) {
						obj.index -= 1
						obj.x = obj.oldX
						obj.y = obj.oldY
						obj.absX = obj.index % this.colsValue
						obj.absY = Math.floor(obj.index / this.colsValue)
						this.$nextTick(() => {
							obj.x = obj.absX * this.viewWidth
							obj.y = obj.absY * this.viewWidth
						})
					}
				}
				this.add.x = (this.imageList.length % this.colsValue) * this.viewWidth + 'px'
				this.add.y = Math.floor(this.imageList.length / this.colsValue) * this.viewWidth + 'px'
				this.sortList()
			},
		}

	}
</script>

<style lang="scss" scoped>
	.drag-image-wrap {
		width: 100%;

		.drag-area {
			width: 100%;

			.drag-view {
				display: flex;
				justify-content: center;
				align-items: center;

				.image-box {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					padding: 20rpx 0rpx 30rpx;
					background-color: #FFF;

					.image-icon {
						width: 60rpx;
						height: 60rpx;
					}

					.image-name {
						margin-top: 10rpx;
						color: #303133;
						font-size: 22rpx;
					}

					.image-badge-box {
						position: absolute;
						top: 16rpx;
						right: 16rpx;
						width: 26rpx;
						height: 26rpx;

						.image-badge {
							width: 26rpx;
							height: 26rpx;
						}
					}
				}
			}
		}
	}
</style>
