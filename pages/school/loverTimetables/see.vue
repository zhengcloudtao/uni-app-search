<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-brown'" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">情侣课表总览</block>
		</cu-custom>
		<view :class="isDark?'dark':''">

			<view class="cu-bar bg-white solid-bottom" style="font-weight:bold" :class="isDark?'dark':'bg-white'">
				<view class="action">
					<text class="cuIcon-titles text-brown"></text>情侣课表总揽
					<text class="cuIcon-search"></text>
				</view>
			</view>
			<scroll-view scroll-x class=" nav text-center" :class="isDark?'dark':'bg-white'">
				<view class="cu-item" :class="0==TabCur?'text-brown cur':''" @tap="tabSelect" data-id="0">
					学校
				</view>
				<view class="cu-item" :class="1==TabCur?'text-brown cur':''" @tap="tabSelect" data-id="1">
					自定义
				</view>
			</scroll-view>
			<view v-if="TabCur!=1">
				<view class=" padding flex flex-direction" :class="isDark?'dark':'bg-white'">
					<button class="cu-btn round bg-brown text-white lg">学校课程总数:{{num}}</button>
				</view>

				<view class="padding  text-grey  shadow-warp cu-list menu card-menu" :class="isDark?'darkIn':'bg-white'"
					style="border: 3rpx solid #000000;">

					<view class="" v-for="(val,index) in seeList" :key="index" class="solids-bottom">
						<view class="padding  radius" :class="isDark?'darkIn':'bg-white'" v-if="val.place!='1'">
							<view>
								<!-- <span style="width:50rpx;font-weight:bold;color:#6739b6;">{{index+1}}</span> -->
								<view>
									<span>{{val.courseName}}</span><span class="margin-left-xl">{{val.teacher}}</span>
								</view>
								<view>{{val.place}}</view>
								<view>{{val.week}}</view>
								<view>{{val.weekNum}}</view>
								<view class="margin-bottom-xl">节次:{{val.course}}<button
										class="cu-btn bg-red text-sm margin-bottom-xl fr" @tap="deleteStorage"
										:data-index="index">删</button></view>

							</view>

						</view>

					</view>

				</view>
			</view>
			<view v-if="TabCur!=0">
				<view class=" padding flex flex-direction" :class="isDark?'dark':'bg-white'">
					<button class="cu-btn round bg-brown text-white lg">自定义课程总数:{{customNum}}</button>
				</view>

				<view class="padding text-grey  shadow-warp cu-list menu card-menu" :class="isDark?'darkIn':'bg-white'"
					style="border: 3rpx solid #000000;">
					<view class="" v-for="(val,index) in customList" :key="index" class="solids-bottom">
						<view class="padding  radius" :class="isDark?'darkIn':'bg-white'">
							<view>
								<!-- <span style="width:50rpx;font-weight:bold;color:#6739b6;">{{index+1}}</span> -->
								<view>
									<span>课程名称:{{val.courseName}}</span><span
										class="margin-left-xl">老师:{{val.teacher}}</span>
								</view>
								<view>地点:{{val.place}}</view>
								<view>星期:{{val.week}}</view>
								<view>周数:{{val.weekNum}}</view>
								<view class="margin-bottom-xl">节次:{{val.startCourse}}-{{val.endCourse}}<button
										class="cu-btn bg-red text-sm margin-bottom-xl fr" @tap="deleteCustomStorage"
										:data-index="index">删</button></view>

							</view>

						</view>

					</view>

				</view>
			</view>
			<view class="padding flex flex-wrap " :class="isDark?'dark':'bg-white'">


			</view>
			<view class="cu-tabbar-height"></view>


		</view>
	</view>

</template>
<script>
	export default {
		data() {
			return {
				list: [],
				seeList: [],
				customList: [],
				total: 0,
				num: 0,
				customNum: 0,
				isDark: this.isDark,
				TabCur: 0,
				myList: []



			}
		},
		onShow() {
			let _this = this

			const loverTimetable = _this.$store.state.loverTimetable
            //console.log(loverTimetable)
			if (loverTimetable.length != undefined) {
				_this.list = loverTimetable[1]
				_this.myList = loverTimetable[0]
			}else{
				console.log("没缓存")
			}

			const myCustomLoveTimetable = _this.$store.state.myCustomLoveTimetable

			if (myCustomLoveTimetable.length != undefined) {
				_this.customNum = myCustomLoveTimetable.length;
				_this.customList = myCustomLoveTimetable
			}


			_this.setData()


		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			setData() {
				let _this = this
				_this.num=0
				for (var k = 0; k < _this.list.length; k++) {
					_this.seeList[k] = {
						courseName: '1',
						place: '1',
						course: '1',
						week: '1',
						weekNum: '1',
					}
				}
				for (var i = 0; i < _this.list.length; i++) {
					//console.log(_this.list[i].courseName)
					// if (_this.list[i].id != null) {
					// 	continue
					// }
					for (var j = 0; j < _this.seeList.length; j++) {
						if ((_this.seeList[j].courseName == _this.list[i].courseName) && (_this.seeList[j].place ==
								_this.list[i].place)) {
							//console.log("相同")
							//console.log()
							_this.seeList[j].weekNum += "/" + _this.list[i].weekNum
							_this.seeList[j].week += "/" + "星期" + _this.list[i].week
							_this.seeList[j].course += "/节次:" + _this.list[i].startCourse + "-" + _this.list[i]
								.endCourse

							break;
						} else {
							//console.log("不同:" + _this.seeList[j].place)
							if (_this.seeList[j].place == '1') {
								//console.log("不存在" + j)
								//console.log(_this.seeList[j])
								// var newObj = 
								_this.seeList[j] = {
									courseName: _this.list[i].courseName,
									place: _this.list[i].place,
									course: "节次:" + _this.list[i].startCourse + "-" + _this.list[i].endCourse,
									week: "星期" + _this.list[i].week,
									weekNum: _this.list[i].weekNum,
									teacher: _this.list[i].teacher,
								}
								//console.log(_this.seeList[j])
								//console.log("跳出:" + j)
								_this.num += 1
								break
							} else {
								//console.log("存在")

							}

						}
					}
					//console.log(_this.seeList)
				}
			},
			deleteCustomStorage: function(e) {

				let _this = this
				var index = e.currentTarget.dataset.index;
				uni.showModal({
					title: '提示',
					content: '是否确认删除',
					confirmText: "确认",
					cancelText: "在想想",
					success: function(res) {
						if (res.confirm) {
							var arr = _this.customList
							arr.splice(index, 1)
							//console.log(arr)
							_this.customNum = arr.length;
							_this.$store.commit('myCustomLoveTimetable', arr)
							uni.showToast({
								title: "删除成功",
								icon: "none"
							})

						} else if (res.cancel) {
							console.log("点击了取消")
						} else {
							console.log("点击了别的")
						}
					}
				});
			},
			deleteStorage(e) {
				let _this = this
				var index = e.currentTarget.dataset.index;
				uni.showModal({
					title: '提示',
					content: '是否确认删除',
					confirmText: "确认",
					cancelText: "在想想",
					success: function(res) {
						if (res.confirm) {
							var arr = _this.list
							var newArr = []
							var courseName = _this.seeList[index].courseName
							for (var i = 0; i < arr.length; i++) {
								if (_this.list[i].courseName != courseName) {
									newArr.push(_this.list[i])
								}
							}
							_this.list = newArr
							var loveArr = [
								[],
								[]
							]
							loveArr[0] = _this.myList
							loveArr[1] = newArr
							_this.$store.commit('loverTimetable', loveArr)
							uni.showToast({
								title: "删除成功",
								icon: false
							})
							_this.setData()

						} else if (res.cancel) {
							console.log("点击了取消")
						} else {
							console.log("点击了别的")
						}
					}
				});
			}

		}

	}
</script>

<style>

</style>
