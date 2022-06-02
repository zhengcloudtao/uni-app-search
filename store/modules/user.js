export const state = {
	//用户数据
	userInfo: {},
};
export const mutations = {
	userInfo(state, data) {
		console.log("userInfo", state)
		if (data) {
			// #ifdef H5
			state.userInfo = data;
			sessionStorage.setItem('userInfo', JSON.stringify(data));
			localStorage.setItem('userInfo', JSON.stringify(data))
			// #endif
			// #ifndef H5
			state.userInfo = Object.assign({}, state.userInfo, data);
			uni.setStorageSync('userInfo', state.userInfo);
			// #endif
		}
	},
};
export const actions = {

};
