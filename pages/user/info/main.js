import {
	mapMutations,
	mapActions,
	mapState,
	mapGetters
} from 'vuex';

export default {
	data() {
		return {
			showModal: false,
			editInfoDisabled: true,
			userData: {},
		}
	},

	computed: {
		...mapGetters(['userInfo', 'authType'])
	},

	onLoad() {
		this.userData = JSON.parse(JSON.stringify(this.userInfo));
	},

	methods: {
		...mapActions(['getUserInfo', 'showAuthPage', 'logout']),
		// 修改密码
		changePwd() {
			this.showAuthModal('changePwd');
		},
		confirmLogOut() {
			this.logout();
			this.showAuthPage('accountLogin')
			this.$Router.push({
				path: '/pages/auth/index'
			});
		},
		
		logoutSubmit(){
			this.showModal = true
		}
	}
}
