import http from '@/common/request/index'
import store from '@/store'

const state = {
	authType: 'login', //register:登录, login:登录, forgotPwd:忘记密码, changePwd:修改密码
	
}

const getters = {
	authType: state => state.authType
}

const mutations = {
	authType(state, data) {
		// data ? uni.hideTabBar() : uni.showTabBar();
		state.authType = data;
	},
}

const actions = {
	// 登录页面控制
	showAuthPage({
		commit
	}, type = 'login') {
		commit('authType', type);
	},

}


export default {
	state,
	mutations,
	actions,
	getters
}
