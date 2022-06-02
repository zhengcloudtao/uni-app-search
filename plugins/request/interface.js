import {
	BaseApi
} from './baseApi.js'
import api from './'
import user from '../../apis/modules/user.js'
import store from '../../store'
import {
	showLoading,
	hideLoading
} from '../utils/loading.js'

let requestVerifyNum = 0;
export default {
	config: {
		baseUrl: BaseApi,
		header: {
			'content-type': 'application/x-www-form-urlencoded',
		},
		timeout: 90000,
		data: {},
		method: "GET",
		dataType: "json",
		/* 如设为json，会对返回的数据做一次 JSON.parse */
		responseType: "text",
		success() {},
		fail() {},
		complete() {},
		load: true
	},
	interceptor: {
		request: null,
		response: null
	},
	async verify() {
		let _this = this
		let res = await user.verify()
		console.log(res)
		if (res.status == 0) {
			res.data.password = store.state.userInfo.password
			store.commit('userInfo', res.data)
		}
	},
	request(options) {
		var _this = this
		if (options.load) {
			console.log("显示加载中:", options.url)
			showLoading()
		}
		console.log(options.url)
		console.log("option:",options)
		if (!options) {
			options = {}
		}
		var userInfo = store.state.userInfo;
		var expire = userInfo.expire;
		var loginTime = userInfo.loginTime;
		var oldTime = (new Date(loginTime)).getTime()
		var expireTime = oldTime + expire
		var nowTime = new Date().getTime()

		if (nowTime + 1000 * 60 * 5 < expireTime) {
			console.log("还没过期:" + ((expireTime - nowTime) / 1000 / 60).toFixed(0) + "分钟")
		} else {
			if (requestVerifyNum == 0 && userInfo.expire) {
				console.log("已过期过期:" + ((expireTime - nowTime) / 1000 / 60).toFixed(0) + "分钟")
				requestVerifyNum = 1;
				_this.verify()
			} else if (!userInfo.expire) {
				console.log("还没登录")
			}

		}

		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = options.baseUrl + options.url
		options.data = options.data || {}
		options.method = options.method || this.config.method
		return new Promise((resolve, reject) => {
			let _config = null

			options.complete = (response) => {
				if (options.load) {
					console.log("隐藏:", options.url)
					hideLoading()
				}
				let statusCode = response.statusCode
				response.config = _config
				if (this.interceptor.response) {

					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}

				if (statusCode === 200) { //成功
					resolve(response);
				} else {
					//reject(response)
					resolve(response);

				}
			}

			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()

			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}


			uni.request(_config);
		});
	}
}
