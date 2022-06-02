import {
	BaseApi,
	cdnBaseApi
} from '@/plugins/request/baseApi.js'
import store from '@/store'

export function getTimestamp(timeStr) {
	var temp = timeStr.split(' ');
	var arr = temp[0].split('-');
	var brr = temp[1].split(':');
	var timestamp = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], +brr[0] - 8, brr[1], brr[2]));
	var timestamp = timestamp.getTime(); //除以1000 表示 非毫秒
	return timestamp
}


export function getTime(addTime) {

	var time = addTime
	var year = (new Date(time).getYear() + 1900)
	var month = (parseInt(new Date(time).getMonth()) + 1)
	var date = new Date(time).getDate()
	//now
	var nowYear = (new Date().getYear() + 1900)
	var nowMonth = (parseInt(new Date().getMonth()) + 1)
	var nowDate = new Date().getDate()
	var timeStr = null
	if (year == nowYear && month == nowMonth && date == nowDate) {
		timeStr = ""
	} else if (year == nowYear && month == nowMonth && date == (nowDate - 1)) {
		timeStr = "昨天 "
	} else {
		if (year == nowYear) {
			timeStr = month + "月" + date + "日 "
		} else {
			timeStr = year + "年" + month + "月" + date + "日 "
		}

	}

	if (new Date(time).getHours() < 10) {
		timeStr += "0" + new Date(time).getHours() + ":"
	} else {
		timeStr += new Date(time).getHours() + ":"
	}
	if (new Date(time).getMinutes() < 10) {
		timeStr += "0" + new Date(time).getMinutes() + ":"
	} else {
		timeStr += new Date(time).getMinutes() + ":"
	}
	if (new Date(time).getSeconds() < 10) {
		timeStr += "0" + new Date(time).getSeconds()
	} else {
		timeStr += new Date(time).getSeconds()
	}
	return timeStr
}

export function getImageUrl(url) {
	var res = ""
	if (url.indexOf("/hdfs/") != -1) {
		res = (BaseApi + "/cloud/service-school/upload/hdfs/get/image?src=" + url)
	} else {
		res = (cdnBaseApi + url)
	}
	return res
}
export function getStateCheck() {
	if (store.state.userInfo.id) {
		if (parseInt(store.state.userInfo.id) > 8 && store.state.userInfo.username == '19240254') {
			return 0;

		} else {
			return 1;
		}
	} else {
		return 0;
	}
}
export default {
	getTimestamp,
	getTime,
	getImageUrl,
	getStateCheck
}
