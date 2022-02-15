import http from '@/common/request/index'

const isWechat = () => {
	//return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger";
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
};

function wxAuthorize(mappid, callback) {
	let link = window.location.href.split('#')[0];

	console.log("当前地址=", link);

	let params = getUrlCode('code'); // 地址解析
	console.log("url参数=", params);
	// 已经授权登录过的就不用再授权了
	// if (store.state.token) return;

	// 如果拿到code，调用授权接口，没有拿到就跳转微信授权链接获取 
	// if (params.code) {
	if (params) {
		uni.setStorageSync("code", params);
		callback(params);
		uni.setStorageSync("code", params);
		sessionStorage.setItem("code", params);
		//api.wxAuth(params.code); // 调用后台接口，授权 
	} else {

		let appid = mappid;
		//1.使用encodeURIComponent以及JSON.stringify()方法对对象进行字符串化和编码，这样可以控制url参数的长度，参考示例代码（uni-app书写方式，微信小程序自己改。）

		let uri = encodeURIComponent(link);
		//2.接受信息的页面使用JSON.parse()以及decodeURIComponent()接收和解码参数。  

		//snsapi_base   //snsapi_base  	 scope = snsapi_base（不弹出授权页面，直接跳转，只能获取用户 openid ）。
		//snsapi_userinfo  弹出
		//let authURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7ac278a5d3099db3&redirect_uri=wxdev.zzknclound.com&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
		let authURL = 'http://wxmp.zzknclound.com/?appid=' + appid + '&redirect_uri=' + uri +
			'&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
		window.location.href = authURL;
	}
}

function getUrlCode(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1]
		.replace(/\+/g, '%20')) || ""
}

function getOpenid(param = {}, callback) {
	http(
		'common.getOpenid', {
			code: param.code,
			appId: param.appid
		}, '加载中...'
	).then(res => {
		if (res.code === 200) {
			callback && callback(res)
		}
	});
}

function bindOpenidAndUserId(param = {}, callback) {
	http(
		'common.bindOpenid', {
			"AccountId": param.userid,
			"AppId": param.appid,
			Type: 0,
			OpenId: param.openid
		}, '加载中...'
	).then(res => {
		if (res.code === 200) {
			callback && callback(res)
		}
	});
}

export default {
	wxAuthorize, //获取code授权码
	isWechat, //判断网页是否是微信
	getOpenid, //根据code获取openid
	getUrlCode, //获取url传的参数
	bindOpenidAndUserId, //绑定openid和userid
}
