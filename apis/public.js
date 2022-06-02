import api from '../plugins/request/'
import store from '../store'
import {
	BaseApi,
	cdnBaseApi
} from '../plugins/request/baseApi.js'
import router from '@/plugins/router/router.js'
const school = "/cloud/service-school"
export function uploadImage(params) {
	return new Promise((req, rej) => {
		var userInfo = store.state.userInfo;
		var token = " ";
		if (userInfo.token) {
			token = userInfo.token;
		} else {
			token = " "
		}
		console.log(token)
		const uploadTask = uni.uploadFile({
			url: BaseApi + school+'/upload/image',
			filePath: params,
			name: 'file',
			header: {
				'Authorization': token,
			},
			formData: {
				'user': 'test'
			},

			success: (res) => {
				res.data = JSON.parse(res.data);
				console.log(res.data)
				if (res.data.status == 0) {
					return req(res.data.data)
				} else if (res.data.status == 608) {
					uni.showModal({
						title: 'Hi',
						content: '此时此刻需要您登录哦',
						confirmText: "去登录",
						cancelText: "再逛会",
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
				} else {
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: res.data.msg,
						success: function(res) {
					
						}
					});
				}

			}
		});
		uploadTask.onProgressUpdate((res) => {
			// console.log('上传进度' + res.progress);
			// console.log('已经上传的数据长度' + res.totalBytesSent);
			// console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
            //store.commit('setUploadProgress', res)
			// // 测试条件，取消上传任务。
			// if (res.progress > 50) {
			// 	uploadTask.abort();
			// }
			
		});

	})
}

export default {
	uploadImage
}
