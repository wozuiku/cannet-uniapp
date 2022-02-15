import funcDataAll from '@/mock/func.data.all.js';
import funcDataCommon from '@/mock/func.data.common.js';
import {
	mapMutations,
	mapActions,
	mapState,
	mapGetters
} from 'vuex';


export default {
	data() {
		return {
			searchInput: '',
			commonFuncs: funcDataCommon[0].funcs,
			commonFuncList: [], //存放加工后的常用功能列表，比如添加是否展示角标isShowBadge
			commonFuncItem: {}, //用于向拖拽组件传新增项目
			allFuncs: [],
			allFuncList: [], //存放加工后的所有功能列表，比如添加是否展示角标isShowBadge
			isFuncEdit: false, //是否正在编辑常用功能
			gridBorder: false, //编辑的时候显示边框
		}
	},
    
	created(){
		console.log('created');
	},
	
	
	
	onShow(){
		console.log('onShow');
	},
	
	mounted(){
		console.log('mounted');
	},
	
	onReady(){
		console.log('onReady');
	},
	
	onLoad() {
		console.log('onLoad');
		let sourceCommonFuncList = funcDataCommon[0].funcs;

		for (let i = 0; i < sourceCommonFuncList.length; i++) {
			let itemObj = {
				isShowBadge: false
			};
			itemObj = {
				...sourceCommonFuncList[i],
				...itemObj,
			}
			//commonFuncList
			this.commonFuncList.push(itemObj)
		}
		// console.log('commonFuncList');
		// console.log(this.commonFuncList);
		this.commonFuncs = this.commonFuncList


		let sourceFuncList = funcDataAll;
		for (let i = 0; i < sourceFuncList.length; i++) {
			let sourceCateList = sourceFuncList[i].category
			let cateObj = new Object();
			let cateFuncList = []
			for (let j = 0; j < sourceCateList.length; j++) {
				let itemObj = {
					isShowBadge: false
				};
				itemObj = {
					...sourceCateList[j],
					...itemObj,
				}
				// console.log('itemObj:');
				// console.log(itemObj);
				cateFuncList.push(itemObj)
			}
			cateObj.name = sourceFuncList[i].name
			cateObj.category = cateFuncList
			this.allFuncList.push(cateObj)
		}

		this.allFuncs = this.allFuncList

	},

	onShow() {
		console.log('onShow');

	},


	computed: {
		...mapGetters(['isLogin']),
		
		//常用功能预览只显示6个图标
		preCommonFuncs(){
			return this.commonFuncs.slice(0, 6)
		}
	},

	watch: {
		searchInput() {
			let key = this.searchInput;
			let allFuncList = funcDataAll;
			let searchFuncList = []
			for (let i = 0; i < allFuncList.length; i++) {
				let categoryList = allFuncList[i].category
				let cateObj = new Object();
				let cateFuncList = []
				for (let j = 0; j < categoryList.length; j++) {
					let funcName = categoryList[j].name;
					if (categoryList[j].name.search(key) != -1) {
						cateFuncList.push(Object.create(categoryList[j]))
					}
				}
				if (cateFuncList.length > 0) {
					cateObj.name = allFuncList[i].name
					cateObj.category = cateFuncList
					searchFuncList.push(cateObj)
				}
			}
			this.allFuncs = searchFuncList
		}
	},


	methods: {
		
		...mapActions(['showAuthPage']),

		//设置图片角标
		setImageBadge() {
			//处于编辑状态
			if (this.isFuncEdit) {
				//设置常用功能区角标
				this.commonFuncs.forEach((item) => {
					item.isShowBadge = true
				})
				this.allFuncs.forEach((cateItem) => {
					//最近使用功能区不设置角标
					if (cateItem.name == '最近使用') {
						let categorys = cateItem.category
						categorys.forEach((funcItem) => {
							funcItem.isShowBadge = false
						})
					//设置所有功能区角标
					} else {
						let categorys = cateItem.category
						categorys.forEach((funcItem) => {
							let funcName = funcItem.name
							//如果某个功能在常用功能区存在，则不设置角标
							if (this.isCommonFunc(funcName)) {
								funcItem.isShowBadge = false
							//如果某个功能在常用功能区不存在，则设置绿色加号角标
							} else {
								funcItem.isShowBadge = true
							}
						})
					}
				})
			//处于非编辑的状态
			} else {
				//设置常用功能区角标
				this.commonFuncs.forEach((item) => {
					item.isShowBadge = false
				})

				//设置所有功能区角标
				this.allFuncs.forEach((cateItem) => {
					let categorys = cateItem.category
					categorys.forEach((funcItem) => {
						funcItem.isShowBadge = false
					})
				})
			}

		},
		
		//判断某个功能是否是常用功能里的某一项
		isCommonFunc(funcName) {
			let flag = false
			this.commonFuncs.forEach(function(item) {
				if (funcName == item.name) {
					flag = true
				}
			})
			return flag
		},

		funcEdit() {

			if (this.isLogin) {
				// console.log('funcEdit')
				this.isFuncEdit = true //设置当前处于编辑状态
				this.gridBorder = true //编辑状态添加边框
				//搜索功能会使allFuncs改变，重置赋值所有功能
				this.allFuncs = this.allFuncList

				this.setImageBadge()

				// console.log('this.allFuncs');
				// console.log(JSON.stringify(this.allFuncs));



			} else {
				this.$store.dispatch('showAuthPage')
				this.$Router.push('/pages/auth/index')
			}
		},

		
		
		//子组件cannetDragImage的emit事件会触发该方法
		updateCommonFuncList(list) {
			console.log('updateCommonFuncList');
			console.log(list);
			//更新commonFuncs
			this.commonFuncs = list
			//更新角标
			this.setImageBadge()

		},
		
		updateALlFuncList(item){
			
			// addItem = {
			// 	...addItem,
			// 	...{
			// 		isShowBadge: true //addItem添加角标属性
			// 	}
			// }
			// //将新功能item传给组件cannetDragImage
			this.commonFuncItem = item
			
			
		},
		
		//取消编辑常用功能
		funcEditCancel() {
			this.isFuncEdit = false //设置当前不是编辑状态
			this.gridBorder = false //不是编辑状态去掉边框
			//设置所有功能区域角标不再显示
			this.allFuncs.forEach((cateItem) => {
				let categorys = cateItem.category
				categorys.forEach((funcItem) => {
					funcItem.isShowBadge = false
				})
			})
		},


		//提交编辑常用功能
		funcEditCommit() {
			this.isFuncEdit = false
			this.gridBorder = false

			this.allFuncs.forEach((cateItem) => {
				let categorys = cateItem.category
				categorys.forEach((funcItem) => {
					funcItem.isShowBadge = false
				})
			})
		},
	},
}
