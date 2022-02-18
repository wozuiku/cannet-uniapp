import mpHtml from '@/components/mp-html/mp-html'
const content = require('./content')
// 上传图片方法
function upload(src) {
	return new Promise((resolve, reject) => {
		console.log('上传图片：', src)
		resolve(src)
		/*
		// 实际使用时，上传到服务器
		wx.uploadFile({
		  url: 'xxx', // 接口地址
		  filePath: src,
		  name: 'xxx',
		  success(res) {
		    resolve(res.data.path) // 返回线上地址
		  },
		  fail: reject
		})
		*/
	})
}
// 删除图片方法
function remove(src) {
	console.log('删除图片：', src)
	// 实际使用时，删除线上资源
}
export default {
	data() {
		return {
			content,
			modal: null,
			editable: true
		}
	},
	components: {
		mpHtml
	},
	onReady() {
		
		/**
		 * @description 设置获取链接的方法
		 * @param {String} type 链接的类型（img/video/audio/link）
		 * @param {String} value 修改链接时，这里会传入旧值
		 * @returns {Promise} 返回线上地址
		 *   type 为音视频时可以返回一个数组作为源地址
		 *   type 为 audio 时，可以返回一个 object，包含 src、name、author、poster 等字段
		 */
		this.$refs.article.getSrc = (type, value) => {
			return new Promise((resolve, reject) => {
				if (type === 'img') {
					uni.showActionSheet({
						itemList: ['本地选取', '远程链接'],
						success: res => {
							if (res.tapIndex === 0) {
								// 本地选取
								uni.chooseImage({
									count: value === undefined ? 9 :
									1, // 2.2.0 版本起插入图片时支持多张（修改图片链接时仅限一张）
									success: res => {
										uni.showLoading({
											title: '上传中'
										});
										(async () => {
											const arr = []
											for (let item of res
													.tempFilePaths) {
												// 依次上传
												const src = await upload(
													item)
												arr.push(src)
											}
											return arr
										})().then(res => {
											wx.hideLoading()
											resolve(res)
										})
									},
									fail: reject
								})
							} else {
								// 远程链接
								this.callback = {
									resolve,
									reject
								}
								this.$set(this, 'modal', {
									title: '图片链接',
									value
								})
							}
						}
					})
				} else {
					this.callback = {
						resolve,
						reject
					}
					let title
					if (type === 'video') {
						title = '视频链接'
					} else if (type === 'audio') {
						title = '音频链接'
					} else if (type === 'link') {
						title = '链接地址'
					}
					this.$set(this, 'modal', {
						title,
						value
					})
				}
			})
		}
	},
	methods: {
		// 删除图片/视频/音频标签事件
		remove(e) {
			// 删除线上资源
			remove(e.src)
		},
		// 处理模态框
		modalInput(e) {
			this.value = e.detail.value
		},
		modalConfirm() {
			this.callback.resolve(this.value || this.modal.value || '')
			this.$set(this, 'modal', null)
		},
		modalCancel() {
			this.callback.reject()
			this.$set(this, 'modal', null)
		},
		// 调用编辑器接口
		edit(e) {
			this.$refs.article[e.currentTarget.dataset.method]()
		},
		// 清空编辑器内容
		clear() {
			uni.showModal({
				title: '确认',
				content: '确定清空内容吗？',
				success: res => {
					if (res.confirm)
						this.$refs.article.clear()
				}
			})
		},
		// 保存编辑器内容
		save() {
			setTimeout(() => {
				var content = this.$refs.article.getContent()
				uni.showModal({
					title: '保存',
					content,
					confirmText: '完成',
					success: res => {
						if (res.confirm) {
							// 复制到剪贴板
							uni.setClipboardData({
								data: content,
							})
							// 结束编辑
							this.editable = false
						}
					}
				})
			}, 50)
		}
	}
}
