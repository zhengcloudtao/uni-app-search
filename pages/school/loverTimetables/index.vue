<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-pink'" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">情侣课表</block>
		</cu-custom>
		<view class="cu-bar search fixed" :style="[{top:CustomBarButton  +'vh'}]" style="left:85vw"
			@click="showTimeTable()">
			<button class="cu-btn cuIcon lg  bg-pink">
				<text class="cuIcon-time" @click="showTimeTable()"></text>
			</button>
		</view>
		<view class="timetable" :class="isDark?'dark':'light'">
			<view class='radius shadow-lg' :class="isDark?'padding-xs':'margin-xs'">
				<view class="cu-bar  solid-bottom" style="font-weight:bold">
					<view class="action">
						<text class="cuIcon-titles text-pink"></text>情侣课表查询
						<text class="cuIcon-search"></text>
						<view class="padding-left-xl margin-xl">
							<text class="cuIcon-refresh text-gray" @click="refresh"></text>
						</view>
						<view class="padding-left-sm margin-sm">
							<text class="cuIcon-add text-gray" @click="add"></text>
						</view>
						<view class="padding-left-sm margin-sm">
							<text class="cuIcon-attentionfill  text-gray" @click="see"></text>
						</view>
					</view>
				</view>

				<view style="text-align: center;margin: 10rpx;">

					<image @click="up" src="../../../static/public/left.png"
						style="width:13%;height:50rpx;float: left;margin-left: 40rpx;">
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
						style="width: 45rpx;font-size: 40rpx;"></text>
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
		<zmm-watermark>
		
		</zmm-watermark>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				allPalette: ['#FF6666', '#006699', '#0066CC', '#339933', '#FFCC33', '#FF9900', '#CC6600',
					'#CCCC44', '#336699', '#99CC33', '#0099CC', '#333399', '#FF0033', '#33CC99', '#66CC99'
				],
				myColor: '#0066CC',
				loverColor: '#FF6666',
				array: [],
				timetableType: [], //课表侧边数组
				index: 0,
				startDay: "2022/02/28 00:00:01", //开学，
				picket: 0, //0没被选择
				timetables: null, //课表数组
				isDark: this.isDark,
				CustomBarButton: 70, //悬浮按钮
				bgUrl: 'null',
			}
		},
		onShow() {
			let _this = this
			if (_this.$store.state.loverTimeTableBgUrl != null) {
				var url = _this.$store.state.loverTimeTableBgUrl
				_this.bgUrl = _this.$util.getImageUrl(url)
			} else {
				_this.bgUrl = 'null'
			}
			if (_this.$store.state.loverTimeTableMyColor != null) {
				_this.myColor = _this.$store.state.loverTimeTableMyColor
			}
			if (_this.$store.state.loverTimeTableLoverColor != null) {
				_this.loverColor = _this.$store.state.loverTimeTableLoverColor
			}
			var loverTimetable = _this.$store.state.loverTimetable;
			//console.log(loverTimetable)
			if (loverTimetable.length != undefined) {
				var allTimetable = [
					[],
					[]
				]
				const myCustomTimetable = _this.$store.state.myCustomTimetable
				var timetable = null
				if (myCustomTimetable.length != undefined) {
					timetable = loverTimetable[0].concat(myCustomTimetable)
					// console.log(myCustomTimetable)
					// console.log(timetable)
					// console.log("设置自定义自己")
				} else {
					timetable = loverTimetable[0]
				}

				allTimetable[0] = timetable

				const myCustomLoveTimetable = _this.$store.state.myCustomLoveTimetable
				var timetable = null
				if (myCustomLoveTimetable.length != undefined) {
					timetable = loverTimetable[1].concat(myCustomLoveTimetable)
					// console.log(myCustomLoveTimetable )
					// console.log(timetable)
					// console.log("设置自定义情侣")
				} else {
					timetable = loverTimetable[1]
				}

				allTimetable[1] = timetable


				_this.setLoverTimetable(allTimetable)
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
			 * @description  周信息
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
			 * @description 
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
			},

		},
		methods: {
			showTimeTable() {
				uni.previewImage({
					urls: ['https://web.cloudduolc.cn/image/timetable2.png?id=' + Date.parse(new Date()),
						'https://web.cloudduolc.cn/image/timetable1.png?id=' + Date.parse(new Date())
					],
				});
			},
			add: function() {
				this.$Router.navigateTo("/pages/school/loverTimetables/custom")
			},
			see: function() {
				this.$Router.navigateTo("/pages/school/loverTimetables/see")
			},
			setting: function() {
				this.$Router.navigateTo("/pages/school/loverTimetables/setting")
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
			 * @description 加载课表数据
			 */
			courseData() {
				let _this = this
				if (this.picket == 0) {
					var startDay = new Date(this.startDay);
					var nowDay = new Date();
					var dayDiff = (nowDay - startDay) / (1000 * 60 * 60 * 24);
					this.index = Math.ceil(dayDiff / 7) - 1
					//this.index = 0
					//console.log(this.index)

				}



				// 为数据标记背景颜色的函数
				let paletteIndex = 0
				const getBackgroundColor = () => {
					const backgroundColor = this.allPalette[paletteIndex]
					paletteIndex++
					if (paletteIndex >= this.allPalette.length) {
						paletteIndex = 0
					}
					return backgroundColor
				}

				// 合并
				const listMerge = []
				if (this.timetables == null) {
					return null
				}
				this.timetables[this.index].forEach(function(list, i) {
					if (!listMerge[i]) {
						listMerge[i] = []
					}

					var CPcolor = null;
					if (i % 2 == 0) {
						CPcolor = _this.myColor;
					} else {
						CPcolor = _this.loverColor;
					}
					list.forEach(function(item, index) {


						if (!index) {
							return listMerge[i].push({
								name: item,
								length: 1,
								backgroundColor: item === '' ? 'none' : CPcolor
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
								backgroundColor: item === '' ? 'none' : CPcolor
							})
						}
					})
				})
				return listMerge
			},
			/**
			 * @description 点击刷新
			 */
			refresh: function() {
				this.requestTimetable()

			},
			/**
			 * @description  点击上一周
			 */
			up: function() {

				if (this.index != 0) {
					this.index = parseInt(this.index) - 1
					this.picket = 1
				}

			},
			/**
			 * @description  点击下一周
			 */
			down: function() {

				if (this.index != 24) {
					this.index = parseInt(this.index) + 1
					this.picket = 1
				}

			},


			/**
			 * @description 下一天
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
			 * @description  选择周数
			 * @param {Object} e
			 */
			bindPickerChange: function(e) {
				this.index = e.detail.value
				this.picket = 1
			},
			/**
			 * @description 点个课程，显示详情
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
				this.$emit('courseClick', data)
				if (data.name != "") {
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: `星期${Math.ceil((data.weekIndex+1)/2)} 第${data.index}节课 \n课程名:${data.name}\n 课节:${data.length}`,
						success: function(res) {
							if (res.confirm) {

							} else if (res.cancel) {

							}
						}
					});
				}

			},
			/**
			 * @param {Object} start 开始周
			 * @param {Object} end  结束周
			 * @param {Object} index 星期
			 * @param {Object} info 信息
			 * @param {Object} startJ 开始节
			 * @param {Object} endJ 结束节
			 * @param {Object} iv 偏移
			 */
			setTimetable: function(start, end, index, info, startJ, endJ, iv) {
				let _this = this
				for (var i = start - 1; i < end; i++) {
					for (var j = startJ - 1; j < endJ; j++) {
						_this.timetables[i][(index - 1) * 2 + iv][j] = info
					}
				}
			},

			/**
			 * @description 处理请求响应数据
			 * @param {Object} rows
			 * @param {Object} iv
			 */
			setTimetableAll: function(rows, iv) {
				let _this = this
				//console.log(rows)
				try {
					rows.forEach(function(list, i) {
						var XQ = list.week;
						var startJ = list.startCourse;
						var endJ = list.endCourse;
						var info = list.courseName + "\n" + list.teacher + "\n" + list.place
						//console.log(list)
						var weeknum = list.weekNum;
						var booleanWeeks = weeknum.match(/,(\S*)周/);
						if (booleanWeeks) {
							//多
							//处理第一个
							var one = weeknum.substring(0, weeknum.indexOf("周"));
							var booleansWeek_ = one.match(/(\S*)-/);
							if (booleansWeek_) {
								//有-
								var hou = one.match(/-(\S*)/);
								//console.log(booleansWeek_)
								//console.log("有效数字" + booleansWeek_[1])
								//console.log("有效数字" + hou[1])
								var start = parseInt(booleansWeek_[1]);
								var end = parseInt(hou[1]);
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
												_this.setTimetable(k, k, XQ, info, startJ, endJ, iv);
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
												_this.setTimetable(k, k, XQ, info, startJ, endJ, iv);
											}
										}
									}
								} else {
									_this.setTimetable(start, end, XQ, info, startJ, endJ, iv);
								}
							} else {
								//console.log("有效数字:" + temp)
								var temp = one
								// var startJ = list.KSJC;
								// var endJ = list.JSJC;
								_this.setTimetable(temp, temp, XQ, info, startJ, endJ, iv);
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
									var hou = temp.match(/-(\S*)/);
									//console.log(booleansWeek_)
									//console.log("有效数字" + booleansWeek_[1])
									//console.log("有效数字" + hou[1])
									var start = parseInt(booleansWeek_[1]);
									var end = parseInt(hou[1]);
									// var startJ = list.KSJC;
									// var endJ = list.JSJC;

									if (weeknum.indexOf(one + "周(") != -1) {
										var index = parseInt(weeknum.indexOf(one + "周(")) + parseInt((one +
												"周")
											.length) + 1
										//console.log(weeknum[index])
										var key = weeknum[index]
										if (key == '双') {
											for (var k = start; k <= end; k++) {
												if (k % 2 == 0) {
													//console.log("2:" + k)
													_this.setTimetable(k, k, XQ, info, startJ, endJ, iv);
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
													_this.setTimetable(k, k, XQ, info, startJ, endJ, iv);
												}
											}
										}
									} else {
										_this.setTimetable(start, end, XQ, info, startJ, endJ, iv);
									}
								} else {
									//console.log("有效数字:" + temp)
									// var startJ = list.KSJC;
									// var endJ = list.JSJC;
									_this.setTimetable(temp, temp, XQ, info, startJ, endJ, iv);
								}
							}
						} else {
							//单
							//console.log("单1")
							var oldweeknum = weeknum
							weeknum = weeknum.match(/(\S*)周/);
							//console.log(weeknum[1])

							var temp = weeknum[1]
							var booleansWeek_ = temp.match(/(\S*)-/);
							if (booleansWeek_) {
								//有-
								var hou = temp.match(/-(\S*)/);
								//console.log(booleansWeek_)
								// console.log("有效数字" + booleansWeek_[1])
								// console.log("有效数字" + hou[1])
								// console.log(info)
								var start = parseInt(booleansWeek_[1]);
								var end = parseInt(hou[1]);
								// var startJ = list.KSJC;
								// var endJ = list.JSJC;
								//_this.setTimetable()

								if (oldweeknum.indexOf(temp + "周(") != -1) {

									var index = parseInt(oldweeknum.indexOf(temp + "周(")) + parseInt((temp +
											"周")
										.length) + 1

									//console.log(oldweeknum[index])
									var key = oldweeknum[index]
									if (key == '双') {
										for (var k = start; k <= end; k++) {
											if (k % 2 == 0) {
												//console.log("2:" + k)
												_this.setTimetable(k, k, XQ, info, startJ, endJ, iv);
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
												_this.setTimetable(k, k, XQ, info, startJ, endJ, iv);
											}
										}
									}

								} else {
									_this.setTimetable(start, end, XQ, info, startJ, endJ, iv);
								}

								//console.log(_this.timetables)
							} else {
								// console.log("有效数字:" + temp)
								// var startJ = list.KSJC;
								// var endJ = list.JSJC;
								_this.setTimetable(temp, temp, XQ, info, startJ, endJ, iv);
							}
						}

					})
				} catch (e) {
					console.log(e.message)
					uni.showToast({
						icon: 'none',
						title: '当前课表存在错误，重新绑定刷新课表或联系客服！'
					})
				}

			},
			/**
			 * @description 设置情侣课表
			 * @param {Object} response
			 */
			setLoverTimetable: function(response) {
				let _this = this
				let loverTimetable = response[1];
				let myTimetable = response[0];
				try {
					_this.timetables = new Array();
					for (var i = 0; i < 25; i++) {
						_this.timetables[i] = new Array();
						for (var j = 0; j < 14; j++) {
							_this.timetables[i][j] = new Array();
							for (var k = 0; k < 10; k++) {
								_this.timetables[i][j][k] = "";
							}
							//this
						}
					}
					_this.setTimetableAll(myTimetable, 0)
					_this.setTimetableAll(loverTimetable, 1)
					if (_this.$store.state.loverTimeTableChangeIndex != '1') {
						//调课
						_this.timetables[4][10] = []
						_this.timetables[4][11] = []
						//清明
						for (var i = 0; i < 10; i++) {
							if (_this.timetables[5][0][i] != "") {
								_this.timetables[4][10][i] = "#放假调课#" + _this.timetables[5][0][i]
							}
							if (_this.timetables[5][1][i] != "") {
								_this.timetables[4][11][i] = "#放假调课#" + _this.timetables[5][1][i]
							}

						}
						var arr = []
						for (var i = 0; i < 10; i++) {
							arr.push('#放假调课到4.2#')
						}
						_this.timetables[5][0] = arr
						_this.timetables[5][1] = arr

						//劳动节

						//4月24日（星期日）按5月3日（星期二）
						_this.timetables[7][12] = []
						_this.timetables[7][13] = []
						for (var i = 0; i < 10; i++) {
							if (_this.timetables[9][2][i] != "") {
								_this.timetables[7][12][i] = "#放假调课#" + _this.timetables[9][2][i]
							} else {
								_this.timetables[7][12][i] = ""
							}
							if (_this.timetables[9][3][i] != "") {
								_this.timetables[7][13][i] = "#放假调课#" + _this.timetables[9][3][i]
							} else {
								_this.timetables[7][13][i] = ""
							}
						}

						for (var i = 0; i < 10; i++) {
							if (_this.timetables[9][2][i] != "") {
								_this.timetables[9][2][i] = '#放假调课到4.24#'
							}
						}

						for (var i = 0; i < 10; i++) {
							if (_this.timetables[9][3][i] != "") {
								_this.timetables[9][3][i] = '#放假调课到4.24#'
							}
						}
						//5月7日（星期六）按5月4日（星期三）
						_this.timetables[9][10] = []
						_this.timetables[9][11] = []
						for (var i = 0; i < 10; i++) {
							if (_this.timetables[9][4][i] != "") {
								_this.timetables[9][10][i] = "#放假调课#" + _this.timetables[9][4][i]
							} else {
								_this.timetables[9][10][i] = ""
							}
							if (_this.timetables[9][5][i] != "") {
								_this.timetables[9][11][i] = "#放假调课#" + _this.timetables[9][5][i]
							} else {
								_this.timetables[9][11][i] = ""
							}
						}

						for (var i = 0; i < 10; i++) {
							if (_this.timetables[9][4][i] != "") {
								_this.timetables[9][4][i] = '#放假调课到5.7#'
							}
						}

						for (var i = 0; i < 10; i++) {
							if (_this.timetables[9][5][i] != "") {
								_this.timetables[9][5][i] = '#放假调课到5.7#'
							}
						}




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
			 * @description 请求网络课表
			 */
			requestTimetable() {
				let _this = this
				let form = {}
				const password = _this.$store.state.userInfo.password
				if (password) {
					form = {
						password: password,
					}
				} else {
					form = {
						password: "",
					}
				}
				_this.$schoolApi.loverTimetable(form).then(response => {
					if (response.status == 0) {
						for (var i = 0; i < response.data[0].length; i++) {

							if (response.data[0][i].place == null) {
								response.data[0][i].place = ""
							}
							if (response.data[0][i].courseName == "体育与健康3") {
								response.data[0][i].courseName = '乐跑'
								response.data[0][i].place = '线下跑步打卡完成。不用理会课表排课时间'
								response.data[0][i].teacher = ''
							} else {

							}
						}
						for (var i = 0; i < response.data[1].length; i++) {

							if (response.data[1][i].place == null) {
								response.data[1][i].place = ""
							}
							if (response.data[1][i].courseName == "体育与健康3") {
								response.data[1][i].courseName = '乐跑'
								response.data[1][i].place = '线下跑步打卡完成。不用理会课表排课时间'
								response.data[1][i].teacher = ''
							} else {

							}
						}


						_this.$store.commit('loverTimetable', response.data)
						const myCustomTimetable = _this.$store.state.myCustomTimetable
						var timetable = null
						if (myCustomTimetable.length != undefined) {
							timetable = response.data[0].concat(myCustomTimetable)
						} else {
							timetable = response.data[0]
						}

						response.data[0] = timetable

						const myCustomLoveTimetable = _this.$store.state.myCustomLoveTimetable
						var timetable = null
						if (myCustomLoveTimetable.length != undefined) {
							timetable = response.data[1].concat(myCustomLoveTimetable)
						} else {
							timetable = response.data[1]
						}

						response.data[1] = timetable

						_this.setLoverTimetable(response.data)

						uni.showToast({
							icon: 'none',
							title: '成功获取课表',
							duration: 2000
						});
						return;
					}
					if (response.status == 60001) {
						uni.showModal({
							title: '提示',
							content: '当前未绑定情侣，是否跳转',
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
									_this.$Router.navigateTo('/pages/bind/loverBind/no')

								} else if (res.cancel) {

								}
							}
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
				text-align: center;
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
				font-size: 13rpx;

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

	/* 暗黑模式下应用的样式 */
	@media (prefers-color-scheme: dark) {
		page {
			background: #000000;
			color: #ffffff;
		}
	}
</style>
