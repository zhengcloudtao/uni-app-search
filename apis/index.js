import api from '../plugins/request/'
const school = "/cloud/service-school"
export async function getInfo(params) {
	let res = await api.get(school + '/public/getInfo', params, false);
	return res
}

export default {
	getInfo
}
