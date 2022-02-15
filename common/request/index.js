import Request from './request'
import apiList from './apis'
import store from '@/store'

const cannetRequest = new Request();

export default function http(
	url,
	data = {},
	toastBefore = '', // 请求前加载提示
	toastAfter = true, // 请求后错误提示
	header
) {
	let api = getApiPath(url);
	/* 请求之前拦截器 */
	cannetRequest.interceptor.request((config, cancel) => {
		if (toastBefore !== '') {
			uni.showLoading({
				title: toastBefore,
				mask: true
			});
		}
		return config
	});

	/* 请求之后拦截器 */
	cannetRequest.interceptor.response((response) => {
		uni.hideLoading();
		if (response.code === 0) {
			if (toastAfter) {
				uni.showToast({
					title: response.msg || '请求出错,稍后重试',
					icon: 'none',
					duration: 1000,
					mask: true
				});
			}
		}

		// token过期注销
		if (response.code === 401) {
			store.dispatch('logout');
			store.dispatch('showAuthModal');
			throw (`登录已过期或注销,已阻止此次API请求: '${api.url}'`);
		}
		
		return response
	})
	
	//默认在请求的header加上apiToken
	let apiToken = uni.getStorageSync('apiToken');
	let userInfo = uni.getStorageSync('userInfo')||{};
	header = {
		...header,
		...{'Authorization': apiToken},
		...{'AccountId': userInfo.id}//加用户id
	}
	
	
	return cannetRequest.request({
		url: api.url,
		header,
		data,
		method: api.method
	})

}

// 组装接口路径
function getApiPath(url) {
	let apiArray = url.split(".");
	let api = apiList;
	apiArray.forEach(v => {
		api = api[v];
	});
	return api;
}
