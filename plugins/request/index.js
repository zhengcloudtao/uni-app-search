import http from './interface'
import store from '../../store'

import router from '@/plugins/router/router.js'
export const $http = (url, method, data, json, load) => {
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		var userInfo = store.state.userInfo;
		var token = "null";
		if (userInfo.token) {
			token = userInfo.token;
		} else {
			token = "null"
		}
		console.log(token)
		config.header = {
			'content-type': 'application/x-www-form-urlencoded',
			"Authorization": token
		}
		config.Url = url
	}
	var noTokenArr = [
		"pages/index/index",

		"pages/bind/login/index",
		"pages/bind/login/no",
		"pages/bind/loverBind/index",
		"pages/bind/loverBind/no",
	];
	var noUsernameArr = [
		"pages/school/timetables/index",
		"pages/school/loverTimetables/index"

	];
	//设置请求结束后拦截器
	http.interceptor.response = async (response) => {
		//console.log(response.config)
		//判断返回状态 执行相应操作

		console.log(response)
		if (!response.data) {
			console.log("请求错误", response.errMsg)
			//var errMsg={"errMsg":response.errMsg}
			return response
		}
		var pages = getCurrentPages() // 获取栈实例
		let currentRoute = pages[pages.length - 1].route; // 获取当前页面路由
		let currentPage = pages[pages.length - 1]['$page']['fullPath'] //当前页面路径(带参数)
		console.log(currentRoute)
		// 请根据后端规定的状态码判定
		if (response.data.status == 601) { //token失效
			console.log("token失效")
			return response.data = await doRequest(response, response.config.Url, response.config
				.method) //动态刷新token,并重新完成request请求
		} else if (response.data.status == 608 && noUsernameArr.indexOf(currentRoute) != -1 && store.state
			.loginTip == null) {
			store.commit("loginTip", "1")
			uni.showModal({
				title: 'Hi',
				content: '当前还没登录,是否要去输入学号',
				confirmText: "去登录",
				cancelText: "再逛会",
				success: function(res) {
					store.commit("loginTip", null)
					if (res.confirm) {
						router.navigateTo("/pages/bind/login/no")
					} else if (res.cancel) {
						console.log("点击了取消")

					} else {
						console.log("点击了别的")
					}
				}
			});
		} else if (response.data.status == 608 && noTokenArr.indexOf(currentRoute) == -1 && store.state
			.loginTip == null) {
			store.commit("loginTip", "1")
			uni.showModal({
				title: 'Hi',
				content: '会话已过期，\n当前功能需要登录,是否要去登录?\n(该程序的用户信息只存在手机本地，当切出程序需要重新登录)',
				confirmText: "去登录",
				cancelText: "再逛会",
				success: function(res) {
					store.commit("loginTip", null)
					if (res.confirm) {
						router.navigateTo("/pages/bind/login/index")
					} else if (res.cancel) {
						console.log("点击了取消")

					} else {
						console.log("点击了别的")
					}
				}
			});
		} else if (response.data.status == 603 && currentRoute != 'pages/bind/login/index') {
			uni.showModal({
				title: 'Hi',
				content: '账号密码错误或者不存在!',
				confirmText: "去登录",
				showCancel: false,
				success: function(res) {
					if (res.confirm) {
						router.navigateTo("/pages/bind/login/index")
					} else if (res.cancel) {
						console.log("点击了取消")

					} else {
						console.log("点击了别的")
					}
				}
			});

		}

		return response.data;
	}
	return http.request({
		method: method,
		url: url,
		dataType: 'json',
		data,
		load: load
	})
}

async function login() {
	//返回环宇token所需的login code
	return new Promise(resolve => {
		uni.login({
			provider: 'weixin',
			success(loginRes) {
				resolve(loginRes.code)
			},
			fail() {}
		});
	})
}

async function doRequest(response, url, method) {
	var code = null
	//#ifdef MP-WEIXIN
	code = await login()
	//#endif
	var res = await get('/cloud/service-user/user/verify?code=' + code, {}, true)

	if (res.status == 0) {
		let config = response.config

		res.data.password = store.state.userInfo.password
		store.commit('userInfo', res.data)
		config.header['Authorization'] = res.data.token
		let json = config.header["Content-Type"] === 'application/json'
		const resold = await $http(url, method, {
			...config.data
		}, json, true)
		return resold
	} else if (res.status == 608) {
		uni.showModal({
			title: 'Hi',
			content: '此时此刻需要您登录哦',
			confirmText: "去登录",
			cancelText: "再逛会",
			success: function(res) {
				if (res.confirm) {
					this.$Router.navigateTo("/pages/bind/login/index")
				} else if (res.cancel) {
					console.log("点击了取消")

				} else {
					console.log("点击了别的")
				}
			}
		});

		return "false"
	}
}

function postJson(url, data, load) {
	return $http(url, 'POST', data, load)
}

function get(url, data, load) {

	return $http(url, 'GET', data, true, load)
}

function post(url, data, load) {
	return $http(url, 'POST', data, true, load)
}

function put(url, data, load) {
	return $http(url, 'PUT', data, true, load)
}

function del(url, data) {
	return $http(url, 'DELETE', data, true, load)
}

export default {
	postJson,
	get,
	post,
	put,
	del
}
