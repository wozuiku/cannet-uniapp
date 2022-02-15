/*
 * @property {Object} config = 私有属性，默认值
 * @property {Function} requestBefore = 私有方法，请求前
 * @property {Function} requestAfter = 私有方法，请求后
 */
import {
	BASE_URL
} from '@/env'

export default class Request {
	constructor() {
		// 默认配置
		this.config = {
			baseUrl: BASE_URL,
			header: {
				'content-type': 'application/json',
			},
			url: '',
			data: {},
			params: {},
			method: 'GET',
			dataType: 'json',
			// #ifndef MP-ALIPAY || APP-PLUS
			responseType: 'text',
			// #endif
			custom: {},
			// #ifdef APP-PLUS
			sslVerify: false
			// #endif
		}
		
		/* 拦截器 */
		this.interceptor = {
			request: (cb) => {
				if (cb) {
					this.requestBefore = cb
				} else {
					this.requestBefore = request => request
				}
			},
			response: (cb) => {
				if (cb) {
					this.requestAfter = cb
				} else {
					this.requestAfter = response => response
				}
			}
		}
	}

	/* 请求前 */
	static requestBefore(config) {
		return config
	}

	/* 请求后 */
	static requestAfter(response) {
		return response
	}
	
	/**
	 * @Function
	 * @param {Object} options - 请求配置项
	 * @prop {String} options.url - 请求路径
	 * @prop {Object} options.data - 请求参数
	 * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
	 * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
	 * @prop {Object} [options.header = config.header] - 请求header
	 * @prop {Object} [options.method = config.method] - 请求方法
	 * @returns {Promise<unknown>}
	 */
	async request(options = {}) {
		options = {
			...options,
			...this.config,
			...this.requestBefore(options)
		}
		
		return new Promise((resolve, reject) => {
			options.success = res => {
				console.log('后台返回结果(', options.url, '):', res.data);
				if(res.data){
					resolve(this.requestAfter(res.data))
				}else{
					let msg={"code":5000,"message":"网络繁忙，请稍后再试！","describe":res}
					reject(this.requestAfter(msg))
				}
				 
			}
			options.fail = err => {
				//console.log('fail err:', err);
				reject(this.requestAfter(err))
			}
			console.log('前端发送参数(', options.url, '):', options);
			//console.log('前端发送参数2(', options.url, '):', JSON.stringify(options));
			
			uni.request(options)
			
		}).catch((e) => {});//解决微信内置的浏览器报错
		
		console.log('######request end######');
	}
}
