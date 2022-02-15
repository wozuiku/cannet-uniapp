import { mapMutations, mapActions, mapState, mapGetters } from 'vuex';

export default {
	data(){
		return {
			userInfo: {}
		}
	},
	
	onLoad() {
		
	},
	
	onShow(){
		this.userInfo = uni.getStorageSync('userInfo')
		console.log('this.userInfo:', this.userInfo);
	},
	
	computed: {
		...mapGetters(['authType']),
	},
	
	
	methods: {
		
		...mapActions(['showAuthPage']),
		
		jumpChangePwd(){
			this.showAuthPage('changePwd')
			uni.navigateTo({
				url: '/pages/auth/index'
			})
		}
		
	}
	
}