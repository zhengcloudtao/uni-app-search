export const state = {
	know: null, //用户须知
	rem: null, //记住密码
	isExit: null, //退出程序
	notice: null, //公告栏
	showStyle: null, //暗夜模式
	quickIndex: null, //；快速启动
	noticeIndex: null, //公告栏推送
	loginStateGo: {}, //登录跳转状态
	day: null,
	loginTip: null


};
//缓存浏览器的数据名称
const cacheNameList = [
	"know",
	"token",
	"rem",
	"isExit",
	"notice",
	"showStyle",
	"quickIndex",
	"noticeIndex",
	"loginStateGo",
	"day",
	"loginTip",


	"userInfo",

	"myCustomTimetable",
	"myCustomLoveTimetable",

	"myTimetable",
	"loverTimetable",
	"userExam",
	"userScore",
	"userNoScore",
	"userCertificate",
	"userScoreRank",
	"userScoreEducation",
	"userScoreTerm",
	"volunteersTimeList",

	"timeTableChangeIndex",
	"timeTableColorIndex",
	"timeTableBgUrl",

	"loverTimeTableChangeIndex",
	"loverTimeTableMyColor",
	"loverTimeTableLoverColor",
	"loverTimeTableBgUrl",
	"busChoice",
	"busTip",
	"scoreShareTip",
];
export const mutations = {
	//取出缓存数据（打开APP就取出）
	setCacheData(state) {
		for (let name of cacheNameList) {
			let data;
			// #ifndef H5
			data = uni.getStorageSync(name);
			// #endif
			// #ifdef H5
			data = sessionStorage.getItem(name) || localStorage.getItem(name);
			// #endif
			if (data) {
				// #ifdef H5
				try {
					data = JSON.parse(data);
				} catch (e) {
					console.log()
				}


				// #endif
				state[name] = data;
			}
		}
	},
	cleanAllCacheData(state) {
		// #ifndef H5
		uni.clearStorageSync();
		// #endif
		// #ifdef H5
		sessionStorage.clear();
		localStorage.clear();
		//userInfo特别，退出登录
		state.userInfo = {};
		// #endif
		uni.showModal({
			title: '提示',
			content: '已完成全部缓存清除，请自行重新进入程序！',
			showCancel: false,
			success: function(res) {

			}
		});
	},
	cleanCacheData(state, key) {
		// #ifndef H5
		uni.removeStorage({
			key: key,
			success: function(res) {
				console.log('success');
			},
			fail: function(res) {
				console.log(res)
			}
		});
		// #endif
		// #ifdef H5
		sessionStorage.removeItem(key);
		localStorage.removeItem(key);
		// #endif
		state[key] = null;
	},
	know(state, data) {
		if (data) {
			state.know = data
			// #ifdef H5
			sessionStorage.setItem('know', data);
			localStorage.setItem('know', data);
			// #endif
			// #ifndef H5
			uni.setStorageSync('know', data);
			// #endif
		}
	},
	day(state, data) {
		if (data) {
			state.day = data
			// #ifdef H5
			sessionStorage.setItem('day', data);
			localStorage.setItem('day', data);
			// #endif
			// #ifndef H5
			uni.setStorageSync('day', data);
			// #endif
		}
	},
	loginTip(state, data) {

		state.loginTip = data
		// #ifdef H5
		sessionStorage.setItem('loginTip', data);
		localStorage.setItem('loginTip', data);
		// #endif
		// #ifndef H5
		uni.setStorageSync('loginTip', data);
		// #endif

	},
	rem(state, data) {
		if (data) {
			state.rem = data
			// #ifdef H5
			sessionStorage.setItem('rem', data);
			localStorage.setItem('rem', data);
			// #endif
			// #ifndef H5
			uni.setStorageSync('rem', data);
			// #endif
		}
	},

	isExit(state, data) {
		if (data) {
			state.isExit = data
			// #ifdef H5
			sessionStorage.setItem('isExit', data);
			localStorage.setItem('isExit', data);
			// #endif
			// #ifndef H5
			uni.setStorageSync('isExit', data);
			// #endif
		}
	},
	notice(state, data) {
		if (data) {
			state.notice = data
			// #ifdef H5
			sessionStorage.setItem('notice', data);
			localStorage.setItem('notice', data);
			// #endif
			// #ifndef H5
			uni.setStorageSync('notice', data);
			// #endif
		}
	},
	showStyle(state, data) {
		if (data) {
			state.showStyle = data
			// #ifdef H5
			sessionStorage.setItem('showStyle', data);
			localStorage.setItem('showStyle', data);
			// #endif
			// #ifndef H5
			uni.setStorageSync('showStyle', data);
			// #endif
		}
	},
	quickIndex(state, data) {
		if (data) {
			state.quickIndex = data
			// #ifdef H5
			sessionStorage.setItem('quickIndex', data);
			localStorage.setItem('quickIndex', data);
			// #endif
			// #ifndef H5
			uni.setStorageSync('quickIndex', data);
			// #endif
		}
	},
	noticeIndex(state, data) {
		if (data) {
			state.noticeIndex = data
			// #ifdef H5
			sessionStorage.setItem('noticeIndex', data);
			localStorage.setItem('noticeIndex', data);
			// #endif
			// #ifndef H5
			uni.setStorageSync('noticeIndex', data);
			// #endif
		}
	},
	loginStateGo(state, data) {
		if (data) {
			state.loginStateGo = data
			// #ifdef H5
			sessionStorage.setItem('loginStateGo', data);
			localStorage.setItem('loginStateGo', data);
			// #endif
			// #ifndef H5
			uni.setStorageSync('loginStateGo', data);
			// #endif
		}
	}
};
export const actions = {

};
