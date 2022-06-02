import api from '../../plugins/request/'
const school="/cloud/service-school"
export async function myTimetable(params) {
	let res = await api.get(school+'/timetable/my', params, true);
	return res
}
export async function loverTimetable(params) {
	let res = await api.get(school+'/timetable/lover', params, true);
	return res
}
export async function scoreTerm(params) {
	let res = await api.get(school+'/score/term', params, true);
	return res
}
export async function score(params) {
	let res = await api.get(school+'/score/info', params, true);
	return res
}
export async function scoreXG(params) {
	let res = await api.get(school+'/score/xg/info', params, true);
	return res
}
export async function volunteers(params) {
	let res = await api.get(school+'/volunteers/info', params, true);
	return res
}
export async function bus(params) {
	let res = await api.get(school+'/bus/info', params, true);
	return res
}
export async function virusPlace(params) {
	let res = await api.get(school+'/virus/placeInfo', params, true);
	return res
}
export default {
	myTimetable,
	loverTimetable,
	scoreTerm,
	score,
	scoreXG,
	volunteers,
	bus,
	virusPlace

}
