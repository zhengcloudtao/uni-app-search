<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-blue'" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的课表</block>
		</cu-custom>
		<view class="cu-bar search fixed" :style="[{top:CustomBarButton  +'vh'}]" style="left:85vw"
			@click="showTimeTable()">
			<button class="cu-btn cuIcon lg  bg-blue">
				<text class="cuIcon-time" @click="showTimeTable()"></text>
			</button>
		</view>
		<view class="timetable" :class="isDark?'dark':''">
			<view class='radius shadow-lg' :class="isDark?'padding-xs':'margin-xs light'">
				<view class="cu-bar  solid-bottom" style="font-weight:bold">
					<view class="action">
						<text class="cuIcon-titles text-blue"></text>课表查询
						<text class="cuIcon-search"></text>
						<view class="padding-left-sm margin-sm">
							<text class="cuIcon-refresh text-gray" @click="refresh"></text>
						</view>
						<view class="padding-left-xl margin-sm">
							<text class="cuIcon-add text-gray" @click="add"></text>
						</view>
						<view class="padding-left-xl margin-sm">
							<text class="cuIcon-attentionfill text-gray" @click="see"></text>
						</view>
						<view class="padding-left-sm margin-sm">
							<text class="cuIcon-file text-gray" @click="remarks"></text>
						</view>

					</view>
				</view>
				<view style="text-align: center;margin: 10rpx;">

					<image @click="up" src="../../../static/public/left.png"
						style="width:13%;height:50rpx;float: left;margin-left:40rpx;">
						<picker @change="bindPickerChange" :value="index" :range="array" range-key="name"
							style="width: 60%;float: left;">

							<view class="uni-input" style="font-size: 30rpx;font-weight:bold">第{{array[index].name}}周

								<text>(点击切换周数)</text>


							</view>

						</picker>
						<image @click="down" src="../../../static/my/right.png" style="width: 13%;height:50rpx;">

				</view>

				<view class="header">
					<text class="lg cuIcon-settingsfill text-gray " @click="setting"
						style="width: 70rpx;font-size: 40rpx;"></text>
					<view class="header-item" v-for="(item,index) in this.courseDataWeek()" :key="index"
						:style="{ color: todayWeekIndex === index ? '#4070FF' : 'unset' }">
						{{ item .name}}<br>{{ item .day}}
					</view>
				</view>

				<view class="main">
					<view class="row" v-for="(item,index) in timetableType" :key="index">
						<view class="time-item">
							<view class="index">{{ item.index }}</view>
							<!-- 		<view>{{ item.start }}</view>
							<view>-</view>
							<view>{{ item.end }}</view> -->
						</view>
					</view>
					<view class="course-container" :style="{backgroundImage:bgUrl!=='null'? 'url('+bgUrl+')': 'null' , 
		         backgroundSize:'100% 100%'}">
						<view class="week" v-for="(week, weekIndex) in this.courseData()" :key="weekIndex">
							<view class="courseList" v-for="(course, courseIndex) in week" :key="courseIndex">
								<view @click="handleCourseClick(course, weekIndex, courseIndex)" class="course"
									:style="{ height: (course.length * 70) + 'px', background: course.backgroundColor }"
									v-if="course.length > 0">
									<p class="name">{{ course.name }}</p>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				deepColour: ['#FF6666', '#006699', '#0066CC', '#339933', '#FFCC33', '#FF9900', '#CC6600',
					'#CCCC44', '#336699', '#99CC33', '#0099CC', '#333399', '#FF0033', '#33CC99', '#66CC99'
				], //颜色
				lightColour: ["#eb9195", "#79c6b2", "#60c0e8", "#efc16d", "#f7a584", "#81a3eb", "#a093e0", "#df8bb0",
					"#a4ce6e", "#86dca0"
				],
				nowColour: [],
				array: [], //20周数组
				timetableType: [], //课表侧边数组
				index: 0,
				startDay: "2022/02/28 00:00:01", //校历开学时间，
				picket: 0, //0没被选择,
				timetables: null, //课表数组
				isDark: this.isDark,
				CustomBarButton: 70, //悬浮按钮
				bgUrl: 'null',

			}
		},

		onShow() {
			let _this = this

			if (_this.$store.state.timeTableBgUrl != null) {

				_this.bgUrl = _this.$util.getImageUrl(_this.$store.state.timeTableBgUrl)
				console.log("有课表背景", _this.bgUrl)
			} else {
				console.log("没课表背景")
				_this.bgUrl = 'null'
			}
			if (_this.$store.state.timeTableColorIndex == '1') {
				_this.nowColour = _this.lightColour
			} else {
				_this.nowColour = _this.deepColour
			}

			const myTimetable = _this.$store.state.myTimetable
			//console.log(myTimetable)
			if (myTimetable.length != undefined) {

				const myCustomTimetable = _this.$store.state.myCustomTimetable
				var timetable = null
				if (myCustomTimetable.length != undefined) {
					timetable = myTimetable.concat(myCustomTimetable)
				} else {
					timetable = myTimetable
				}

				_this.setTimetableAll(timetable)
			} else {

				_this.requestTimetable()
			}

			//设置20周的数组
			var array = [];
			for (var i = 0; i < 25; i++) {

				array.push({
					name: i + 1
				});
			}

			_this.array = array

			//设置课表侧边
			var timetableType = [];
			for (var i = 0; i < 10; i++) {
				timetableType.push({
					index: i + 1,
					start: i + 1,
					end: i + 1
				});
				if (i == 0) {
					timetableType[0].start = '8:30'
					timetableType[0].end = '9:15'
				}
				if (i == 1) {
					timetableType[1].start = '9:20'
					timetableType[1].end = '10:05'
				}
				if (i == 2) {
					timetableType[2].start = '10:25'
					timetableType[2].end = '11:10'
				}
				if (i == 3) {
					timetableType[3].start = '11:15'
					timetableType[3].end = '12:00'
				}
				if (i == 4) {
					timetableType[4].start = '14:00'
					timetableType[4].end = '14:45'
				}
				if (i == 5) {
					timetableType[5].start = '14:50'
					timetableType[5].end = '15:35'
				}
				if (i == 6) {
					timetableType[6].start = '15:50'
					timetableType[6].end = '16:35'
				}
				if (i == 7) {
					timetableType[7].start = '16:40'
					timetableType[7].end = '17:25'
				}
				if (i == 8) {
					timetableType[8].start = '18:30'
					timetableType[8].end = '中间'
				}
				if (i == 9) {
					timetableType[9].start = '不休息'
					timetableType[9].end = '20:00'
				}


			}

			_this.timetableType = timetableType


		},

		computed: {

			/**
			 * @description  星期信息
			 */
			week() {
				return [{
						index: '1',
						name: '星期一',
						day: '02/28'
					},
					{
						index: '2',
						name: '星期二',
						day: '03/01'
					},
					{
						index: '3',
						name: '星期三',
						day: '03/02'
					},
					{
						index: '4',
						name: '星期四',
						day: '03/03'
					},
					{
						index: '5',
						name: '星期五',
						day: '03/04'
					},
					{
						index: '6',
						name: '星期六',
						day: '03/05'
					},
					{
						index: '7',
						name: '星期日',
						day: '03/06'
					}
				]
			},

			/**
			 * @description 判断是否是当天
			 */
			todayWeekIndex() {
				var startDay = new Date(this.startDay);
				var nowDay = new Date();

				var dayDiff = (nowDay - startDay) / (1000 * 60 * 60 * 24);
				var week = Math.ceil(dayDiff / 7) - 1
				if (week != this.index) {
					return -1;
				}
				let weekIndex = new Date().getDay() - 1
				if (weekIndex === -1) {
					weekIndex = 6
				}
				return weekIndex
			}
		},
		methods: {
			showTimeTable() {
				uni.previewImage({
					urls: ['https://web.cloudduolc.cn/image/timetable2.png?id=' + Date.parse(new Date()),
						'https://web.cloudduolc.cn/image/timetable1.png?id=' + Date.parse(new Date())
					],
				});
			},
			/**
			 * @description 加载头部星期时间
			 */
			courseDataWeek() {
				for (var i = 0; i <= 6; i++) {
					var Day = this.getNextDate(this.startDay, i + 7 * this.index);
					this.week[i]['day'] = Day;
				}
				return this.week
			},

			/**
			 * @description 加载数据
			 */
			courseData() {
				let _this = this
				if (this.picket == 0) {
					var startDay = new Date(this.startDay);
					var nowDay = new Date();
					//console.log(startDay)
					//console.log(nowDay)
					//console.log(nowDay - startDay)
					var dayDiff = (nowDay - startDay) / (1000 * 60 * 60 * 24);
					//console.log(dayDiff)
					_this.index = Math.ceil(dayDiff / 7) - 1
					//_this.index = 0
					//console.log(_this.index)
				}

				// 为数据标记背景颜色的函数
				let paletteIndex = 0
				const getBackgroundColor = () => {
					const backgroundColor = this.nowColour[paletteIndex]
					paletteIndex++
					if (paletteIndex >= this.nowColour.length) {
						paletteIndex = 0
					}
					return backgroundColor
				}

				// 合并课表数据，进行渲染
				const listMerge = []
				if (this.timetables == null) {
					return null
				}

				this.timetables[_this.index].forEach(function(list, i) {
					if (!listMerge[i]) {
						listMerge[i] = []
					}
					//console.log(listMerge)
					list.forEach(function(item, index) {
						if (!index) {
							return listMerge[i].push({
								name: item,
								length: 1,
								backgroundColor: item === '' ? 'none' : getBackgroundColor()
							})
						}
						if (item === (listMerge[i][index - 1] || {}).name && item) {
							const sameIndex = (listMerge[i][index - 1] || {}).sameIndex
							if (sameIndex || sameIndex === 0) {
								listMerge[i][sameIndex].length++
								return listMerge[i].push({
									name: item,
									length: 0,
									sameIndex: sameIndex
								})
							}
							listMerge[i][index - 1].length++
							return listMerge[i].push({
								name: item,
								length: 0,
								sameIndex: index - 1
							})
						} else {
							return listMerge[i].push({
								name: item,
								length: 1,
								backgroundColor: item === '' ? 'none' : getBackgroundColor()
							})
						}
					})
				})
				return listMerge
			},
			add: function() {
				this.$Router.navigateTo("/pages/school/timetables/custom")
			},
			remarks: function() {
				this.$Router.navigateTo("/pages/school/timetables/remarks")
			},
			see: function() {
				this.$Router.navigateTo("/pages/school/timetables/see")
			},
			setting: function() {
				this.$Router.navigateTo("/pages/school/timetables/setting")
			},
			/**
			 * @description 点击刷新按钮
			 */
			refresh: function() {
				this.requestTimetable()
			},
			/**
			 * @description 点击选择上一周
			 */
			up: function() {
				if (this.index != 0) {
					this.index = parseInt(this.index) - 1
					this.picket = 1
				}

			},
			/**
			 * @description 点击选择下一周
			 */
			down: function() {
				if (this.index != 24) {
					this.index = parseInt(this.index) + 1
					this.picket = 1
				}

			},
			/** 
			 * @description  下一个
			 * @param {Object} date
			 * @param {Object} day
			 */
			getNextDate: function(date, day) {
				var dd = new Date(date);
				dd.setDate(dd.getDate() + day);
				var y = dd.getFullYear();
				var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
				var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
				return m + "-" + d;
			},


			/**
			 * @description 选择周
			 * @param {Object} e
			 */
			bindPickerChange: function(e) {
				if (this.index == e.detail.vale) {

				} else {
					this.index = e.detail.value
					this.picket = 1
				}

			},
			/**
			 * @description 点击课程
			 * @param {Object} course
			 * @param {Object} weekIndex
			 * @param {Object} courseIndex
			 */
			handleCourseClick(course, weekIndex, courseIndex) {
				const data = {
					index: courseIndex + 1,
					length: course.length,
					week: this.week[weekIndex],
					weekIndex: weekIndex,
					name: course.name
				}

				if (data.name != "") {
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: `星期${data.week.index} 第${data.index}节课 \n课程名:${data.name}\n课节:${data.length}`,
						success: function(res) {
							if (res.confirm) {

							} else if (res.cancel) {

							}
						}
					});
				}
				this.$emit('courseClick', data)
			},
			//

			/**
			 * @description  设置课表数据
			 * @param {Object} start 开始周
			 * @param {Object} end  结束周
			 * @param {Object} index 星期
			 * @param {Object} info 信息
			 * @param {Object} startJ 开始节
			 * @param {Object} endJ 结束节
			 */
			setTimetable: function(start, end, index, info, startJ, endJ) {
				let _this = this
				for (var i = start - 1; i < end; i++) {
					for (var j = startJ - 1; j < endJ; j++) {
						_this.timetables[i][index - 1][j] = info
					}
				}
			},

			/**
			 * @description 对于请求的相应数据进行处理
			 * @param {Object} response
			 */
			setTimetableAll: function(response) {
				let _this = this

				try {

					_this.timetables = new Array();
					for (var i = 0; i < 25; i++) {
						_this.timetables[i] = new Array();
						for (var j = 0; j < 7; j++) {
							_this.timetables[i][j] = new Array();
							for (var k = 0; k < 10; k++) {
								_this.timetables[i][j][k] = "";
							}
						}
					}

					//周 星期 日
					//定义

					var rows = response;
					rows.forEach(function(list, i) {

						var XQ = list.week;
						var startJ = list.startCourse;
						var endJ = list.endCourse;
						var info = list.courseName + "\n" + list.teacher + "\n" + list.place

						var weeknum = list.weekNum;
						var booleanWeeks = weeknum.match(/,(\S*)周/);
						if (booleanWeeks) {
							//多
							//console.log("多")
							//处理第一个
							//console.log("week:" + weeknum)

							var one = weeknum.substring(0, weeknum.indexOf("周"));
							//console.log("week:" + one)


							var booleansWeek_ = one.match(/(\S*)-/);
							if (booleansWeek_) {
								//有-
								var hou = one.match(/-(\S*)/);
								//console.log(booleansWeek_)
								//console.log("有效数字" + booleansWeek_[1])
								//console.log("有效数字" + hou[1])
								var start = booleansWeek_[1];
								var end = hou[1];
								// var startJ = list.KSJC;
								// var endJ = list.JSJC;

								if (weeknum.indexOf(one + "周(") != -1) {
									var index = parseInt(weeknum.indexOf(one + "周(")) + parseInt((one + "周")
										.length) + 1
									//console.log(weeknum[index])
									var key = weeknum[index]
									if (key == '双') {
										for (var k = start; k <= end; k++) {
											if (k % 2 == 0) {
												//console.log("2:" + k)
												_this.setTimetable(k, k, XQ, info, startJ, endJ);
											} else {
												//console.log("1:" + k)

											}
										}

									} else if (key == '单') {
										for (var k = start; k <= end; k++) {
											if (k % 2 == 0) {
												//console.log("2:" + k)
											} else {
												//console.log("1:" + k)
												_this.setTimetable(k, k, XQ, info, startJ, endJ);
											}
										}
									}
								} else {
									_this.setTimetable(start, end, XQ, info, startJ, endJ);
								}


							} else {
								//console.log("1:",one)
								var temp = one
								//console.log("有效数字:" + booleansWeek_[1])
								// var startJ = list.KSJC;
								// var endJ = list.JSJC;
								_this.setTimetable(temp, temp, XQ, info, startJ, endJ);
							}
							//console.log(one)
							//处理后面

							var reg = /,(.*?)周/g;
							var res = weeknum.match(reg);
							//console.log(weeknum.match(reg));
							while (res = reg.exec(weeknum)) {
								//console.log(res[1]);
								var temp = res[1];
								var booleansWeek_ = temp.match(/(\S*)-/);
								if (booleansWeek_) {
									//有-
									//console.log(weeknum.indexOf(temp + "周(") != -1)
									var hou = temp.match(/-(\S*)/);
									//console.log(booleansWeek_)
									//console.log("有效数字" + booleansWeek_[1])
									//console.log("有效数字" + hou[1])
									var start = parseInt(booleansWeek_[1]);
									var end = parseInt(hou[1]);
									// var startJ = list.KSJC;
									// var endJ = list.JSJC;
									if (weeknum.indexOf(temp + "周(") != -1) {
										var one = res[1]
										var index = parseInt(weeknum.indexOf(one + "周(")) + parseInt((one +
												"周")
											.length) + 1

										//console.log(weeknum[index])
										var key = weeknum[index]
										//console.log(key)
										if (key == '双') {
											for (var k = start; k <= end; k++) {
												if (k % 2 == 0) {
													//console.log("2:" + k)
													_this.setTimetable(k, k, XQ, info, startJ, endJ);
												} else {
													//console.log("1:" + k)

												}
											}

										} else if (key == '单') {
											// console.log(start)
											// console.log(end)
											for (var k = start; k <= end; k++) {
												//console.log(k)
												if (k % 2 == 0) {
													//console.log("2:" + k)
												} else {
													//console.log("1:" + k)
													_this.setTimetable(k, k, XQ, info, startJ, endJ);
												}
											}
										}
									} else {
										_this.setTimetable(start, end, XQ, info, startJ, endJ);
									}


								} else {
									//console.log("有效数字:" + temp)
									// var startJ = list.KSJC;
									// var endJ = list.JSJC;
									_this.setTimetable(temp, temp, XQ, info, startJ, endJ);
								}
							}
						} else {
							//console.log("单1" + weeknum)
							var oldweeknum = weeknum
							weeknum = weeknum.match(/(\S*)周/);
							//console.log(weeknum)

							//console.log("key:"+key)
							var temp = weeknum[1]
							var booleansWeek_ = temp.match(/(\S*)-/);
							if (booleansWeek_) {
								//有-
								var hou = temp.match(/-(\S*)/);
								//console.log(booleansWeek_)
								//console.log("有效数字" + booleansWeek_[1])
								//console.log("有效数字" + hou[1])
								// console.log(info)
								var start = parseInt(booleansWeek_[1]);
								var end = parseInt(hou[1]);
								if (oldweeknum.indexOf(temp + "周(") != -1) {

									var index = parseInt(oldweeknum.indexOf(temp + "周(")) + parseInt((temp +
											"周")
										.length) + 1

									//console.log(oldweeknum[index])
									var key = oldweeknum[index]
									if (key == null) {
										_this.setTimetable(start, end, XQ, info, startJ, endJ);
									} else {
										if (key == '双') {
											for (var k = start; k <= end; k++) {
												if (k % 2 == 0) {
													//console.log("2:" + k)
													_this.setTimetable(k, k, XQ, info, startJ, endJ);
												} else {
													console.log("1:" + k)

												}
											}

										} else if (key == '单') {
											for (var k = start; k <= end; k++) {
												if (k % 2 == 0) {
													//console.log("2:" + k)
												} else {
													//console.log("1:" + k)
													_this.setTimetable(k, k, XQ, info, startJ, endJ);
												}
											}
										}
									}
								} else {
									_this.setTimetable(start, end, XQ, info, startJ, endJ);
								}

							} else {

								_this.setTimetable(temp, temp, XQ, info, startJ, endJ);
							}
						}
					})
					if (_this.$store.state.timeTableChangeIndex != '1') {
						//放假调课

						//清明
						for (i = 0; i < 10; i++) {
							if (_this.timetables[5][0][i] != "") {
								_this.timetables[4][5][i] = "#放假调课#" + _this.timetables[5][0][i]
							}
						}
						var arr = []
						for (i = 0; i < 10; i++) {
							arr.push('#放假调课到4.2#')
						}
						_this.timetables[5][0] = arr

						//返校

						//
						// arr = _this.timetables[9]
						// _this.timetables[9] = _this.timetables[7]
						// _this.timetables[7] = arr

						// for (i = 0; i < 5; i++) {
						// 	for (j = 0; j < 10; j++) {
						// 		if (_this.timetables[7][i][j] != "") {
						// 			_this.timetables[7][i][j] = "#因返校调课，8周和10周调换#" + _this.timetables[7][i][j]
						// 		}
						// 		if (_this.timetables[9][i][j] != "") {
						// 			_this.timetables[9][i][j] = "#因返校调课，8周和10周调换#" + _this.timetables[9][i][j]
						// 		}
						// 	}
						// }

						//劳动
						//4月24日（星期日）按5月3日（星期二）
						arr = []
						for (i = 0; i < 10; i++) {
							if (_this.timetables[9][1][i] != "") {
								_this.timetables[7][6][i] = "#放假调课#" + _this.timetables[9][1][i]
							}
						}

						for (j = 0; j < 10; j++) {
							if (_this.timetables[9][1][j] != "") {
								_this.timetables[9][1][j] = "#放假调课到4.24#"
							}
						}
						//5月7日（星期六）按5月4日（星期三）
						arr = []
						for (i = 0; i < 10; i++) {
							if (_this.timetables[9][2][i] != "") {
								_this.timetables[9][5][i] = "#放假调课#" + _this.timetables[9][2][i]
							}
						}

						for (j = 0; j < 10; j++) {
							if (_this.timetables[9][2][j] != "") {
								_this.timetables[9][2][j] = "#放假调课到5.7#"
							}
						}


					} else {
						//console.log(_this.$store.state.timeTableChangeIndex)
					}
				} catch (e) {
					console.log(e.message)
					uni.showToast({
						icon: 'none',
						title: '当前课表存在错误，重新绑定刷新课表或联系客服！'
					})
				}
			},

			/**
			 * @description  请求网络课表数据
			 */
			requestTimetable() {
				let _this = this
				let form = {}
				const password = _this.$store.state.password
				if (password) {
					form = {
						password: password,
					}
				} else {
					form = {
						password: "",
					}
				}


				_this.$schoolApi.myTimetable(form).then(response => {
					if (response.status == 0) {
						if (response.data.length <= 0) {
							uni.showModal({
								title: '提示',
								content: '当前课表数据为空，重新点击刷新试试，或是联系客服解决!',
								showCancel: false,
								confirmText: '我知道了',
								success: function(res) {
									if (res.confirm) {

									} else if (res.cancel) {

									}
								}
							});
							return
						}
						for (var i = 0; i < response.data.length; i++) {

							if (response.data[i].place == null) {
								response.data[i].place = ""
							}
							if (response.data[i].courseName == "体育与健康3") {
								response.data[i].courseName = '乐跑'
								response.data[i].place = '线下跑步打卡完成。不用理会课表排课时间'
								response.data[i].teacher = ''
							} else {

							}
						}

						_this.$store.commit('myTimetable', response.data)
						const myCustomTimetable = _this.$store.state.myCustomTimetable
						var timetable = null
						if (myCustomTimetable.length != undefined) {
							timetable = response.data.concat(myCustomTimetable)
						} else {
							timetable = response.data
						}

						_this.setTimetableAll(timetable)
						uni.showToast({
							icon: 'none',
							title: '成功获取课表',
							duration: 2000
						});
					} else if (response.status != 608) {
						uni.showModal({
							title: '提示',
							content: response.msg,
							showCancel: false,
							success: function(res) {
								if (res.confirm) {

								} else if (res.cancel) {

								}
							}
						});
					}
				})


			}
		}
	}
</script>

<style scoped lang="scss">
	.timetable {

		//border: 1px solid #E4E7ED;
		border-radius: 8rpx;
		font-size: 20rpx;

		.header {
			padding-left: 10rpx;
			height: 56rpx;
			display: flex;
			align-items: center;
			border-bottom: 1rpx dashed #E4E7ED;

			.header-item {

				flex: 1;
				//text-align: center;
				//padding-left: 41rpx;

			}
		}

		.main {
			position: relative;

			.row {
				height: 70px;
				position: relative;

				&:after {
					content: '';
					height: 0;
					width: 100%;
					position: absolute;
					bottom: 0;
					left: 0;
					border-bottom: 1rpx dashed #E4E7ED;
				}

				.time-item {
					height: 100%;
					width: 63rpx;
					text-align: center;
					border-right: 1rpx dashed #E4E7ED;

					.index {
						// color: #909399;
						padding-bottom: 8rpx;
						padding-top: 16rpx;
					}
				}
			}

			.course-container {
				position: absolute;
				top: 0;
				left: 65rpx;
				width: calc(100% - 68rpx);
				height: 100%;
				display: flex;
				background-size: 100% 100%;


				.week {
					flex: 1;
					width: 0;
					flex-grow: 1;
					display: flex;
					flex-direction: column;

					.courseList {
						word-break: break-all;
						color: white;
						overflow: hidden;

						.course {
							// padding: 8rpx;
							border-radius: 16rpx;
							text-align: center;

							.name {
								padding: 8rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
