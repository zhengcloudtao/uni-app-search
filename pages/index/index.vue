<template>
	<view :class="isDark?'darkBg':'bg-white'">
		<!-- <cu-custom :bgColor="isChange?'bg-black':'bg-yellow'"> -->
		<cu-custom :bgColor="isDark?'bg-black':'bg-gradual-blue'">
			<!-- <block slot="backText">返回</block> -->
			<block slot="content">导航栏</block>
		</cu-custom>
		<view class="cu-bar search  fixed " @click="showNotice(noticeInfo)" :style="[{top:CustomBarButton  +'px'}]"
			:class="isDark?'dark':'bg-white'">
			<view class="action">

				<text class="announce text-white">公告</text>

			</view>
			<view class="action">
				<swiper :autoplay="true" :interval="3000" :duration="1000" vertical="true" circular="true"
					class="swiper-item">
					<!-- 这里的vertical="true"是上下滚动，不设置则为左右 circular="true"表示的是循环滚动，无缝连接-->
					<swiper-item v-for="item in msg" class="swiper-item" :key="index">
						{{item}}
					</swiper-item>
				</swiper>
			</view>z
		</view>
		<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			:autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
			indicator-active-color="#0081ff" style="height: 600rpx;">
			<swiper-item :class="cardCur==0?'cur':''">
				<view class="swiper-item" style="height: 600rpx;">
					<view class="cu-card article bg-gray" :class="[isCard?'no-card':'' ,isDark?'darkIn':'bg-gray']"
						style="margin-top:90rpx">
						<view class="cu-item shadow" :class="isDark?'darkIn':'bg-white'">
							<view class="title">
								<view class="text-cut" :class="isDark?'text-white':''">上课提醒 <span
										style="margin-left: 50rpx;">{{dateStr}}</span></view>

							</view>
							<view class="content">
								<view class="desc">

									<view class="text-content" v-show="courseName!=''"> {{courseName}}</view>
									<view>
										<view class="cu-tag bg-blue light sm round margin-top" v-show="teacher!=''">
											{{teacher}}
										</view>
										<view class="cu-tag bg-green light sm round margin-top" v-show="place!=''">
											{{place}}
										</view>
										<view class="cu-tag bg-red light sm round margin-top" v-show="course!=''">
											{{course}}
										</view>
									</view>
								</view>
							</view>
						</view>

					</view>
				</view>
			</swiper-item>
			<swiper-item :class="cardCur==1?'cur':''" @click="goForum()" v-if="forumInfo!=null&loginState!=0">
				<view class="swiper-item" style="height: 600rpx;">
					<view class="cu-card article bg-gray" :class="[isCard?'no-card':'' ,isDark?'darkIn':'bg-gray']"
						style="margin-top:90rpx">
						<view class="cu-item shadow" :class="isDark?'darkIn':'bg-white'">

							<view class="title flex">
								<view class="text-cut" :class="isDark?'text-white':''">论坛精选内容</view>

							</view>
							<view class="content margin-top">
								<view class="desc">

									<view class="text-content" v-show="forumInfo.content!=''"> {{forumInfo.content}}
									</view>
									<view>
										<view class="cu-tag bg-green light sm round margin-top-sm"
											v-show="forumInfo.addTime!=''">
											{{forumInfo.addTime}}
										</view>

									</view>
								</view>
							</view>
						</view>

					</view>
				</view>
			</swiper-item>
			<swiper-item :class="cardCur==2?'cur':''" @click="goWork()" v-if="workInfo!=null&loginState!=0">
				<view class="swiper-item" style="height: 600rpx;">
					<view class="cu-card article bg-gray" :class="[isCard?'no-card':'' ,isDark?'darkIn':'bg-gray']"
						style="margin-top:90rpx">
						<view class="cu-item shadow" :class="isDark?'darkIn':'bg-white'">

							<view class="title flex">
								<view class="text-cut" :class="isDark?'text-white':''">兼职精选内容 </view>

							</view>
							<view class="content margin-top">
								<view class="desc">

									<view class="text-content" v-show="workInfo.content!=''"> {{workInfo.content}}
									</view>
									<view>
										<view class="cu-tag bg-blue light sm round margin-top-sm"
											v-show="workInfo.place!=''">
											{{workInfo.place}}
										</view>
										<view class="cu-tag bg-green light sm round margin-top-sm"
											v-show="workInfo.money!=''">
											{{workInfo.money}}
										</view>

									</view>
								</view>
							</view>
						</view>

					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="cu-card case bg-white å no-card" :class="isDark?'dark':''">



			<!-- <button class="cu-btn bg-pink margin" @tap="showModal">520限定</button> -->
			<view class="cu-bar  solid-bottom " :class="isDark?'darkIn':'bg-gray'">
				<view class="action">
					<text class="cuIcon-titles text-red "></text> 热门功能
				</view>
			</view>
			<view>
				<view class="cu-list grid col-4 no-border " style="margin-top:15rpx">
					<view class="cu-item">
						<navigator class="funcBtn" url="/pages/school/timetables/index" v-if="isShowStudent">
							<view class="cuIcon-time text-blue">
							</view>
							<text>我的课表</text>
						</navigator>
					</view>

					<view class="cu-item">
						<navigator class="funcBtn" url="/pages/school/loverTimetables/index" v-if="isShowStudent">
							<view class="cuIcon-timefill text-pink">
							</view>
							<text>情侣课表</text>
						</navigator>
					</view>
					<view class="cu-item" @click="goForum()">
						<navigator class="funcBtn" url="" v-if="isShowStudent">
							<view class="cuIcon-formfill text-cyan">
							</view>
							<text>校园圈圈</text>
						</navigator>
					</view>
					<view class="cu-item" @click="goWork()">
						<navigator class="funcBtn" url="" v-if="isShowStudent">
							<view class="cuIcon-moneybagfill text-yellow">
							</view>
							<text>校园兼职</text>
						</navigator>
					</view>

				</view>

				<view class="cu-bar  solid-bottom margin-top" :class="isDark?'darkIn':'bg-gray'">
					<view class="action">
						<text class="cuIcon-titles text-purple "></text> 成绩功能
					</view>
				</view>
				<view class="cu-list grid col-4 no-border">
					<view class="cu-item">
						<navigator class="funcBtn" url="/pages/school/score/index" v-if="isShowStudent">
							<view class="cuIcon-form text-grey">
							</view>
							<text>我的成绩</text>
						</navigator>
					</view>

					<view class="cu-item">
						<navigator class="funcBtn" url="/pages/school/score/choose" v-if="isShowStudent">
							<view class="cuIcon-list text-green">
							</view>
							<text>选修成绩</text>
						</navigator>
					</view>
					<view class="cu-item">
						<navigator class="funcBtn" url="/pages/school/score/rank" v-if="isShowStudent">
							<view class="cuIcon-rank text-red">
							</view>
							<text>总评成绩</text>
						</navigator>
					</view>
					<view class="cu-item">
						<navigator class="funcBtn" url="/pages/school/score/education" v-if="isShowStudent">
							<view class="cuIcon-cascades text-brown">
							</view>
							<text>综测成绩</text>
						</navigator>
					</view>


				</view>
				<view class="cu-bar  solid-bottom margin-top" :class="isDark?'darkIn':'bg-gray'">
					<view class="action">
						<text class="cuIcon-titles text-blue "></text> 其他功能
					</view>
				</view>
				<view class="cu-list grid col-4 no-border">

					<view class="cu-item">
						<navigator class="funcBtn" url="/pages/school/volunteers/index" v-if="isShowStudent">
							<view class="cuIcon-searchlist text-purple">
							</view>
							<text>我的义工</text>
						</navigator>
					</view>
					<view class="cu-item">
						<navigator class="funcBtn" url="/pages/custom/bus/index" v-if="isShowStudent">
							<view class="cuIcon-location text-cyan">
							</view>
							<text>校园巴士</text>
						</navigator>
					</view>

					<view class="cu-item">
						<navigator class="funcBtn" url="/pages/custom/virus/index" v-if="isShowStudent">
							<view class="cuIcon-safe text-pink">
							</view>
							<text>核酸地点</text>
						</navigator>
					</view>

					<view class="cu-item" @click="schoolCalendar()">
						<navigator class="funcBtn" url="" v-if="isShowStudent">
							<view class="cuIcon-calendar text-orange">
							</view>
							<text>校园日历</text>
						</navigator>
					</view>
					<view class="cu-item" @click="map()">
						<navigator class="funcBtn" url="" v-if="isShowStudent">
							<view class="cuIcon-pic text-olive">
							</view>
							<text>校园地图</text>
						</navigator>
					</view>
				

				</view>
				<view class="cu-bar  solid-bottom margin-top" :class="isDark?'darkIn':'bg-gray'">
					<view class="action">
						<text class="cuIcon-titles text-green "></text> 友情链接
					</view>
				</view>
				<view class="cu-list grid col-4 no-border">

					<view class="cu-item" @click="goSIC()">
						<navigator class="funcBtn" url="" v-if="isShowStudent">
							<view class="cuIcon-footprint text-blue">
							</view>
							<text>SIC+</text>
						</navigator>
					</view>

					<view class="cu-item" @click="goTimetable()">
						<navigator class="funcBtn" url="" v-if="isShowStudent">
							<view class="cuIcon-text text-cyan">
							</view>
							<text>看个课表</text>
						</navigator>
					</view>



				</view>
			</view>


			<!-- <view class="cu-modal" :class="modalName=='DialogModal'?'show':''" style="margin-top: 100rpx;">
				<view class="cu-dialog" :class="isDark?'dark':'bg-pink'">
					<view class="cu-bar  justify-end " :class="isDark?'bg-pink':'bg-pink'">
						<view class="content">今日小提示</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-sm" :class="isDark?'darkIn':'bg-pink'">
						520快乐，快情侣绑定，用起来情侣课表！
					</view>
					<image src="https://web.cloudduolc.cn/image/520.png" style="height: 780rpx;" v-if="!isDark"></image>
					<image src="https://web.cloudduolc.cn/image/520-dark.jpg" style="height: 780rpx;" v-if="isDark">
					</image>
					<view class="cu-bar justify-end" :class="isDark?'dark':'bg-pink'">
						<view class="action">
							<button class="cu-btn bg-white margin-left" @tap="hideModal">不再提示</button>
						</view>
					</view>
				</view>
			</view> -->
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				msg: [],
				noticeInfo: '空', //公告栏信息
				todayInfo: '空', //今天课程信息
				isShowStudent: true, //学生可见
				isShowTeacher: true, //老师可见
				isDark: this.isDark,
				isChange: false,
				CustomBarButton: this.CustomBar,
				dateStr: '空',
				timetables: null, //课表数组
				startDay: "2022/02/28 00:00:01",
				courseName: '自学的奥秘',
				teacher: 'bilibili',
				course: '第0节',
				place: 'b站',
				modalName: null,
				cardCur: 0,
				dotStyle: false,
				forumInfo: null,
				workInfo: null,
				loginState: this.$util.getStateCheck(),

			}
		},
		onLoad: function() {
			let _this = this
			_this.getInfo();

		},
		onShow: function() {

			getApp().BlackLight()
			let _this = this
			const myTimetable = _this.$store.state.myTimetable
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

				console.log("没数据")
			}
			_this.getDate()
			// if (_this.$store.state.day == null) {
			// 	_this.showModal()
			// } else {

			// }



		},
		methods: {
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			showModal() {
				this.modalName = 'DialogModal'
			},
			hideModal(e) {
				this.modalName = null
				this.$store.commit("day", "1")
			},
			code() {
				uni.showToast({
					icon: 'none',
					title: '敬请期待！'
				})
			},
			getTimeInfo(name) {
				let _this = this
				const myTimetable = _this.$store.state.myTimetable
				try {
					if (myTimetable.length != undefined) {
						const myCustomTimetable = _this.$store.state.myCustomTimetable
						var timetable = null
						if (myCustomTimetable.length != undefined) {
							timetable = myTimetable.concat(myCustomTimetable)
						} else {
							timetable = myTimetable
						}
						for (var i = 0; i < timetable.length; i++) {

							if ((timetable[i].courseName + "\n" + timetable[i].teacher + "\n" + timetable[i].place) ==
								name) {
								_this.courseName = timetable[i].courseName
								_this.teacher = timetable[i].teacher
								_this.place = timetable[i].place

							}
						}
						if (name.indexOf('调课') != -1) {
							_this.courseName = name
							_this.teacher = ""
							_this.place = ""
						}
					} else {

						return 0
					}
				} catch (e) {
					console.log(e.message)
					uni.showToast({
						icon: 'none',
						title: '当前课表存在错误，重新绑定刷新课表或联系客服！'
					})
				}
			},
			getDate() {
				var date = new Date();
				var month = date.getMonth() + 1;
				var curDate = date.getDate();
				var curHours = date.getHours();
				var curMinutes = date.getMinutes();
				var curMinutesStr = ""
				if (curMinutes < 10) {
					curMinutesStr = "0" + curMinutes
				} else {
					curMinutesStr = curMinutes
				}
				var days = date.getDay();
				var week;

				switch (days) {
					case 1:
						week = '星期一';
						break;
					case 2:
						week = '星期二';
						break;
					case 3:
						week = '星期三';
						break;
					case 4:
						week = '星期四';
						break;
					case 5:
						week = '星期五';
						break;
					case 6:
						week = '星期六';
						break;
					case 0:
						week = '星期日';
						break;
				}

				this.dateStr = "  " + month + "月" + curDate + "日 " + week + "    " + curHours + ":" + curMinutesStr

				var startDay = new Date(this.startDay);
				var nowDay = new Date();

				var dayDiff = (nowDay - startDay) / (1000 * 60 * 60 * 24);
				week = Math.ceil(dayDiff / 7) - 1
				//console.log(week)
				let weekIndex = new Date().getDay() - 1
				if (weekIndex == -1) {
					weekIndex = 6
				}
				//console.log(weekIndex)
				//console.log(this.timetables[week][weekIndex])
				//8:30 0
				//9:20 1
				//10:25 2
				//11:15 3
				//14:00 4
				//14:50 5
				//15:50 6
				//16:40 7
				//18:30 8
				var nowNum = curHours * 100 + curMinutes
				//console.log(nowNum)
				if (this.timetables == null) {
					return
				}
				var courseName = ""
				var state = 0
				if (nowNum < 845) {
					courseName = (this.timetables[week][weekIndex][0])
					this.course = '第1节'
					if (courseName.length == 0) {
						state = 1
					} else {
						this.getTimeInfo(courseName)
						return
					}
				}
				if (nowNum < 935 | state == 1) {
					courseName = (this.timetables[week][weekIndex][1])
					this.course = '第2节'
					if (courseName.length == 0) {
						state = 1
					} else {
						this.getTimeInfo(courseName)
						return
					}
				}
				if (nowNum < 1050 | state == 1) {
					courseName = (this.timetables[week][weekIndex][2])
					this.course = '第3节'
					if (courseName.length == 0) {
						state = 1
					} else {
						this.getTimeInfo(courseName)
						return
					}
				}
				if (nowNum < 1140 | state == 1) {
					courseName = (this.timetables[week][weekIndex][3])
					this.course = '第4节'
					if (courseName.length == 0) {
						state = 1
					} else {
						this.getTimeInfo(courseName)
						return
					}
				}
				if (nowNum < 1415 | state == 1) {
					courseName = (this.timetables[week][weekIndex][4])
					this.course = '第5节'
					if (courseName.length == 0) {
						state = 1
					} else {
						this.getTimeInfo(courseName)
						return
					}
				}
				if (nowNum < 1505 | state == 1) {
					courseName = (this.timetables[week][weekIndex][5])
					this.course = '第6节'
					if (courseName.length == 0) {
						state = 1
					} else {
						this.getTimeInfo(courseName)
						return
					}
				}
				if (nowNum < 1610 | state == 1) {
					courseName = (this.timetables[week][weekIndex][6])
					this.course = '第7节'
					if (courseName.length == 0) {
						state = 1
					} else {
						this.getTimeInfo(courseName)
						return
					}
				}
				if (nowNum < 1700 | state == 1) {
					courseName = (this.timetables[week][weekIndex][7])
					this.course = '第8节'
					if (courseName.length == 0) {
						console.log("第一种情况")
						state = 1
					} else {
						console.log("第二种情况")
						this.getTimeInfo(courseName)
						return
					}
				}
				if (nowNum < 1835 | state == 1) {
					courseName = (this.timetables[week][weekIndex][8])
					this.course = '第9、10节'
					if (courseName.length == 0) {
						state = 1
						this.course = '空'
					} else {
						this.getTimeInfo(courseName)
						return
					}
				}


			},
			setTimetable: function(start, end, index, info, startJ, endJ) {
				let _this = this
				for (var i = start - 1; i < end; i++) {
					for (var j = startJ - 1; j < endJ; j++) {
						_this.timetables[i][index - 1][j] = info
					}
				}
			},
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
			goSIC() {
				// #ifdef MP-WEIXIN
				uni.navigateToMiniProgram({
					appId: 'wxbfaccb714db66965', // 其他小程序APPID
					path: 'pages/index/index', //其他小程序地址
					envVersion: 'trial',
					success: res => {
						// 打开成功
						console.log("打开成功", res);
					},
					fail: err => {
						console.log(err);
					}
				});
				// #endif
				// #ifndef MP-WEIXIN
				uni.showToast({
					icon: 'none',
					title: '当前不支持网页和app，可前往小程序！'
				})
				// #endif
			},
			goTimetable() {
				// #ifdef MP-WEIXIN
				uni.navigateToMiniProgram({
					appId: 'wx8496d694411e14b7', // 其他小程序APPID
					path: 'pages/index/index', //其他小程序地址
					envVersion: 'trial',
					success: res => {
						// 打开成功
						console.log("打开成功", res);
					},
					fail: err => {
						console.log(err);
					}
				});
				// #endif
				// #ifndef MP-WEIXIN
				uni.showToast({
					icon: 'none',
					title: '当前不支持网页和app，可前往小程序！'
				})
				// #endif
			},
			map() {
				uni.previewImage({
					urls: ['https://web.cloudduolc.cn/image/map.png?id=' + Date.parse(new Date())],
				});
			},
			schoolCalendar() {
				uni.previewImage({
					urls: ['https://web.cloudduolc.cn/image/schoolCalendar1.png?id=' + Date.parse(new Date()),
						'https://web.cloudduolc.cn/image/schoolCalendar2.png?id=' + Date.parse(new Date())
					],
				});
			},
			/**
			 * @description 小程序跳转
			 */
			goForum() {
				let _this = this
				var token = _this.$store.state.userInfo.token
				console.log(token)
				if (token == undefined) {
					uni.showToast({
						icon: 'none',
						title: '当前还没登录'
					})
					return
				}
				// #ifdef MP-WEIXIN
				uni.navigateToMiniProgram({
					appId: 'wx8259a2639cbab9bc', // 其他小程序APPID
					path: 'pages/index/index', //其他小程序地址
					extraData: {
						'token': token
					},
					envVersion: 'trial',
					success: res => {
						// 打开成功
						console.log("打开成功", res);
					},
					fail: err => {
						console.log(err);
					}
				});
				// #endif
				// #ifndef MP-WEIXIN
				uni.showToast({
					icon: 'none',
					title: '当前不支持网页和app，可前往小程序！'
				})
				// #endif
			},
			goWork() {
				let _this = this
				var token = _this.$store.state.userInfo.token
				console.log(token)
				if (token == undefined) {
					uni.showToast({
						icon: 'none',
						title: '当前还没登录'
					})
					return
				}
				// #ifdef MP-WEIXIN
				uni.navigateToMiniProgram({
					appId: 'wx8259a2639cbab9bc', // 其他小程序APPID
					path: 'pages/work/index', //其他小程序地址
					extraData: {
						'token': token
					},
					envVersion: 'trial',
					success: res => {
						// 打开成功
						console.log("打开成功", res);
					},
					fail: err => {
						console.log(err);
					}
				});
				// #endif
				// #ifndef MP-WEIXIN
				uni.showToast({
					icon: 'none',
					title: '当前不支持网页和app，可前往小程序！'
				})
				// #endif
			},
			/**
			 * @description 获得信息
			 */
			getInfo() {
				let _this = this
				let option = {
					load: false
				}
				_this.$indexApi.getInfo().then(response => {
					if (response.data == null) {
						return
					}
					_this.noticeInfo = response.data.notice.content
					_this.forumInfo = response.data.forum
					_this.workInfo = response.data.work
					console.log(_this.noticeInfo)

					var str = response.data.notice.content
					var strArr = [];
					var n = 20;
					for (var i = 0; i < str.length; i++) {
						var a = str.slice(i, i + n)
						i += n - 1
						strArr.push(a);
					}
					_this.msg = strArr

					// console.log(strArr);
					// if (_this.$store.state.noticeIndex) {
					// 	var noticeIndex = _this.$store.state.noticeIndex;
					// 	if (noticeIndex == "0") {
					// 		const notice = _this.$store.state.notice
					// 		if (notice) {
					// 			console.log(notice)
					// 			if (notice != _this.noticeInfo) {
					// 				_this.showNotice(_this.noticeInfo)
					// 			}
					// 		} else {
					// 			_this.showNotice(_this.noticeInfo)

					// 		}

					// 	}
					// } else {
					// 	_this.$store.commit("noticeIndex", "0")
					// 	_this.showNotice(_this.noticeInfo)
					// }

				})
			},
			showNotice(noticeInfo) {
				let _this = this
				_this.$store.commit("notice", noticeInfo)
				uni.showModal({
					title: '公告栏',
					content: noticeInfo,
					confirmText: '我知道了',
					cancelText: '不再提示',
					showCancel: false,
					success: function(res) {
						if (res.confirm) {

						} else if (res.cancel) {
							uni.showModal({
								title: '提示',
								content: '可到个人页面中的用户设置里设置',
								confirmText: '我知道了',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {

									} else if (res.cancel) {


									}
								}
							});

						}
					}
				});
			},


		},

	}
</script>

<style>
	.announce {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 70rpx;
		height: 50rpx;
		border-radius: 15rpx;
		background-color: #f26529;
		/* transform: skewX(-20deg); */
	}

	.swiper-item {
		margin-left: 20rpx;
		width: 600rpx;
		height: 50rpx;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
	}
</style>
