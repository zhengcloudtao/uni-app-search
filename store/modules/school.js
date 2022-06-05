export const state = {
	myTimetable: {},
	loverTimetable: {},
	userExam:{},
	userScore: {},
	userNoScore: {},
	userCertificate:{},
	userScoreTerm: {},
	userScoreRank: {},
	userScoreEducation: {},
	volunteersTimeList: {},
	
	
};
export const mutations = {

	myTimetable(state, data) {
		if (data) {
			state.myTimetable = data
			// #ifdef H5
			sessionStorage.setItem('myTimetable', JSON.stringify(data));
			localStorage.setItem('myTimetable', JSON.stringify(data));
			// #endif
			// #ifndef H5
			uni.setStorageSync('myTimetable', data);
			// #endif
		}
	},
	loverTimetable(state, data) {
		if (data) {
			state.loverTimetable = data
			// #ifdef H5
			sessionStorage.setItem('loverTimetable', JSON.stringify(data));
			localStorage.setItem('loverTimetable', JSON.stringify(data));
			// #endif
			// #ifndef H5
			uni.setStorageSync('loverTimetable', data);
			// #endif

		}
	},
	userExam(state, data) {
		if (data) {
			state.userExam = data
			// #ifdef H5
			sessionStorage.setItem('userExam', JSON.stringify(data));
			localStorage.setItem('userExam', JSON.stringify(data));
			// #endif
			// #ifndef H5
			uni.setStorageSync('userExam', data);
			// #endif
	
		}
	},
	userScore(state, data) {
		if (data) {
			state.userScore = data
			// #ifdef H5
			sessionStorage.setItem('userScore', JSON.stringify(data));
			localStorage.setItem('userScore', JSON.stringify(data));
			// #endif
			// #ifndef H5
			uni.setStorageSync('userScore', data);
			// #endif

		}
	},
	userNoScore(state, data) {
		if (data) {
			state.userNoScore = data
			// #ifdef H5
			sessionStorage.setItem('userNoScore', JSON.stringify(data));
			localStorage.setItem('userNoScore', JSON.stringify(data));
			// #endif
			// #ifndef H5
			uni.setStorageSync('userNoScore', data);
			// #endif
	
		}
	},
	userCertificate(state, data) {
		if (data) {
			state.userCertificate = data
			// #ifdef H5
			sessionStorage.setItem('userCertificate', JSON.stringify(data));
			localStorage.setItem('userCertificate', JSON.stringify(data));
			// #endif
			// #ifndef H5
			uni.setStorageSync('userCertificate', data);
			// #endif
	
		}
	},
	userScoreRank(state, data) {
		if (data) {
			state.userScoreRank = data
			// #ifdef H5
			sessionStorage.setItem('userScoreRank', JSON.stringify(data));
			localStorage.setItem('userScoreRank', JSON.stringify(data));
			// #endif
			// #ifndef H5
			uni.setStorageSync('userScoreRank', data);
			// #endif

		}
	},
	userScoreEducation(state, data) {
		if (data) {
			state.userScoreEducation = data
			// #ifdef H5
			sessionStorage.setItem('userScoreEducation', JSON.stringify(data));
			localStorage.setItem('userScoreEducation', JSON.stringify(data));
			// #endif
			// #ifndef H5
			uni.setStorageSync('userScoreEducation', data);
			// #endif

		}
	},
	userScoreTerm(state, data) {
		if (data) {
			state.userScoreTerm = data
			// #ifdef H5
			sessionStorage.setItem('userScoreTerm', JSON.stringify(data));
			localStorage.setItem('userScoreTerm', JSON.stringify(data));
			// #endif
			// #ifndef H5
			uni.setStorageSync('userScoreTerm', data);
			// #endif

		}
	},

	volunteersTimeList(state, data) {
		if (data) {
			state.volunteersTimeList = data
			// #ifdef H5
			sessionStorage.setItem('volunteersTimeList', JSON.stringify(data));
			localStorage.setItem('volunteersTimeList', JSON.stringify(data));
			// #endif
			// #ifndef H5
			uni.setStorageSync('volunteersTimeList', data);
			// #endif

		}
	},
	


};
export const actions = {

};
