import api from '../../plugins/request/'

const user="/cloud/service-user"
export async function verify(params) {
	let res = await api.get(user+'/user/verify', params, false);
	return res
}
export async function captcha(params) {
	let res = await api.get(user+'/user/getCaptcha', params, true);
	return res
}
export async function bindStudent(params) {
	//#ifndef MP-WEIXIN
	let res = await api.post(user+'/user/bindIPStudent', params, true);
	//#endif
	//#ifdef MP-WEIXIN
	let res = await api.post(user+'/user/bindStudent', params, true);
	//#endif
	return res
}
export async function bindStudentPassword(params) {
	//#ifndef MP-WEIXIN
	let res = await api.post(user+'/user/bindIPStudentPassword', params, true);
	//#endif
	//#ifdef MP-WEIXIN
	let res = await api.post(user+'/user/bindStudentPassword', params, true);
	//#endif
	return res
}
export async function bindLover(params) {
	//#ifndef MP-WEIXIN
	let res = await api.post(user+'/user/bindIPLoverStudent', params, true);
	//#endif
	//#ifdef MP-WEIXIN
	let res = await api.post(user+'/user/bindLoverStudent', params, true);
	//#endif
	return res
}
export async function noBindLover(params) {
	let res = await api.post(user+'/user/noBindLoverStudent', params, true);
	return res
}
export async function bindLoverPassword(params) {
	//#ifndef MP-WEIXIN
	let res = await api.post(user+'/user/bindIPLoverStudentPassword', params, true);
	//#endif
	//#ifdef MP-WEIXIN
	let res = await api.post(user+'/user/bindLoverStudentPassword', params, true);
	//#endif
	return res
}

export default {
	verify,
	captcha,
	bindStudent,
	bindStudentPassword,
	noBindLover,
	bindLover,
	bindLoverPassword
}
