export const state = {
	myCustomTimetable: {},
	myCustomLoveTimetable: {},
	//
	timeTableChangeIndex: null,
	timeTableColorIndex: null,
	timeTableBgUrl: null,

	loverTimeTableChangeIndex: null,
	loverTimeTableMyColor: null,
	loverTimeTableLoverColor: null,
	loverTimeTableBgUrl: null,
	
	busChoice:null,
	busTip:null
};
export const mutations = {

	myCustomTimetable(state, data) {
		if (data) {
			state.myCustomTimetable = data
			// #ifdef H5
			sessionStorage.setItem('myCustomTimetable', JSON.stringify(data));
			localStorage.setItem('myCustomTimetable', JSON.stringify(data));
			// #endif
			// #ifndef H5
			uni.setStorageSync('myCustomTimetable', data);
			// #endif
		}else{
			state.myCustomTimetable = {}
			// #ifdef H5
			sessionStorage.setItem('myCustomTimetable', {});
			localStorage.setItem('myCustomTimetable', {});
			// #endif
			// #ifndef H5
			uni.setStorageSync('myCustomTimetable', {});
			// #endif
		}
	},
	myCustomLoveTimetable(state, data) {
		if (data) {
			state.myCustomLoveTimetable = data
			// #ifdef H5
			sessionStorage.setItem('myCustomLoveTimetable', JSON.stringify(data));
			localStorage.setItem('myCustomLoveTimetable', JSON.stringify(data));
			// #endif
			// #ifndef H5
			uni.setStorageSync('myCustomLoveTimetable', data);
			// #endif
		}else{
			state.myCustomLoveTimetable = {}
			// #ifdef H5
			sessionStorage.setItem('myCustomLoveTimetable', {});
			localStorage.setItem('myCustomLoveTimetable', {});
			// #endif
			// #ifndef H5
			uni.setStorageSync('myCustomLoveTimetable', {});
			// #endif
		}
	},
	timeTableChangeIndex(state, data) {
		if (data) {
			state.timeTableChangeIndex = data
			// #ifdef H5
			sessionStorage.setItem('timeTableChangeIndex', JSON.stringify(data));
			localStorage.setItem('timeTableChangeIndex', JSON.stringify(data));
			// #endif
			// #ifndef H5
			uni.setStorageSync('timeTableChangeIndex', data);
			// #endif

		}
	},
	timeTableColorIndex(state, data) {
		if (data) {
			state.timeTableColorIndex = data
			// #ifdef H5
			sessionStorage.setItem('timeTableColorIndex',JSON.stringify(data));
			localStorage.setItem('timeTableColorIndex', JSON.stringify(data));
			// #endif
			// #ifndef H5
			uni.setStorageSync('timeTableColorIndex', data);
			// #endif

		}
	},
	timeTableBgUrl(state, data) {
		if (data) {
			state.timeTableBgUrl = data
			// #ifdef H5
			sessionStorage.setItem('timeTableBgUrl', data);
			localStorage.setItem('timeTableBgUrl', data);
			// #endif
			// #ifndef H5
			uni.setStorageSync('timeTableBgUrl', data);
			// #endif

		}
	},
	loverTimeTableChangeIndex(state, data) {
		if (data) {
			state.loverTimeTableChangeIndex = data
			// #ifdef H5
			sessionStorage.setItem('loverTimeTableChangeIndex', data);
			localStorage.setItem('loverTimeTableChangeIndex', data);
			// #endif
			// #ifndef H5
			uni.setStorageSync('loverTimeTableChangeIndex', data);
			// #endif

		}
	},

	loverTimeTableMyColor(state, data) {
		if (data) {
			state.loverTimeTableMyColor = data
			// #ifdef H5
			sessionStorage.setItem('loverTimeTableMyColor', data);
			localStorage.setItem('loverTimeTableMyColor', data);
			// #endif
			// #ifndef H5
			uni.setStorageSync('loverTimeTableMyColor', data);
			// #endif

		}
	},
	loverTimeTableLoverColor(state, data) {
		if (data) {
			state.loverTimeTableLoverColor = data
			// #ifdef H5
			sessionStorage.setItem('loverTimeTableLoverColor', data);
			localStorage.setItem('loverTimeTableLoverColor', data);
			// #endif
			// #ifndef H5
			uni.setStorageSync('loverTimeTableLoverColor', data);
			// #endif

		}
	},
	loverTimeTableBgUrl(state, data) {
		if (data) {
			state.loverTimeTableBgUrl = data
			// #ifdef H5
			sessionStorage.setItem('loverTimeTableBgUrl', data);
			localStorage.setItem('loverTimeTableBgUrl', data);
			// #endif
			// #ifndef H5
			uni.setStorageSync('loverTimeTableBgUrl', data);
			// #endif

		}
	},
	busChoice(state, data) {
		if (data) {
			state.busChoice= data
			// #ifdef H5
			sessionStorage.setItem('busChoice', data);
			localStorage.setItem('busChoice', data);
			// #endif
			// #ifndef H5
			uni.setStorageSync('busChoice', data);
			// #endif
	
		}
	},
	busTip(state, data) {
		if (data) {
			state.busTip= data
			// #ifdef H5
			sessionStorage.setItem('busTip', data);
			localStorage.setItem('busTip', data);
			// #endif
			// #ifndef H5
			uni.setStorageSync('busTip', data);
			// #endif
	
		}
	},
};
export const actions = {

};
