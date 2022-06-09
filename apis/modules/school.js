import api from '../../plugins/request/'
const school = "/cloud/service-school"
export async function myTimetable(params) {
	let res = await api.get(school + '/timetable/my', params, true);
	return res
}
export async function loverTimetable(params) {
	let res = await api.get(school + '/timetable/lover', params, true);
	return res
}
export async function scoreTerm(params) {
	let res = await api.get(school + '/score/term', params, true);
	return res
}
export async function score(params) {
	let res = await api.get(school + '/score/info', params, true);
	return res
}
export async function noScore(params) {
	let res = await api.get(school + '/score/no', params, true);
	return res
}
export async function certificate(params) {
	let res = await api.get(school + '/score/certificate', params, true);
	return res
}
export async function exam(params) {
	let res = await api.get(school + '/exam/info', params, true);
	return res
}
export async function scoreXG(params) {
	let res = await api.get(school + '/score/xg/info', params, true);
	return res
}
export async function volunteers(params) {
	let res = await api.get(school + '/volunteers/info', params, true);
	return res
}
export async function bus(params) {
	let res = await api.get(school + '/bus/info', params, true);
	return res
}
export async function virusPlace(params) {
	let res = await api.get(school + '/virus/placeInfo', params, true);
	return res
}
export async function scoreShare(params) {
	let res = await api.get(school + '/score/share', params, true);
	return res
}
export async function scoreShareCancel(params) {
	let res = await api.get(school + '/score/share/cancel', params, true);
	return res
}
export async function scoreReceive(params) {
	let res = await api.get(school + '/score/receive', params, true);
	return res
}
export async function scoreReceiveCancel(params) {
	let res = await api.get(school + '/score/receive/cancel', params, true);
	return res
}
export async function scoreGetShareScoreInfo(params) {
	let res = await api.get(school + '/score/get/share/score/info', params, true);
	return res
}
export async function scoreReceiveInfo(params) {
	let res = await api.get(school + '/score/receive/info', params, true);
	return res
}
export async function scoreShareInfo(params) {
	let res = await api.get(school + '/score/share/info', params, true);
	return res
}
export default {
	myTimetable,
	loverTimetable,
	scoreTerm,
	score,
	scoreXG,
	certificate,
	noScore,
	volunteers,
	bus,
	virusPlace,
	exam,
	scoreShare,
	scoreShareCancel,
	scoreReceive,
	scoreReceiveCancel,
	scoreGetShareScoreInfo,
	scoreReceiveInfo,
	scoreShareInfo

}
