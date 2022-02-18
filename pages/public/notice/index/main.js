export default {
		data() {
			return {
				tabCur: 0,
				tabList: ['全部', '通知公告', '行业动态', '综合能源'],
				curTabItem: '',
				scrollLeft: 0
			};
		},
		
		onShow(){
			this.curTabItem = this.tabList[0]
		},
		
		methods: {
			tabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.curTabItem = this.tabList[this.tabCur]
				console.log('tabSelect this.curTabItem:', this.curTabItem);
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			
			jumpArticle(articleId){
				uni.navigateTo({
					url: "/pages/public/notice/detail/index?articleId" + articleId
				})
			}
		}
	}