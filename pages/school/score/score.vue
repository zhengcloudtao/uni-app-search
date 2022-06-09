<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-grey'" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">他/她的成绩</block>
		</cu-custom>
		<view :class="isDark?'dark':''">
			<view style="padding-top: 20rpx;">

				<view class="cu-bar  solid-bottom" style="font-weight:bold" :class="isDark?'dark':'bg-white'">
					<view class="action">
						<text class="cuIcon-titles text-grey"></text>他/她的成绩查询
						<text class="cuIcon-search"></text>
					</view>
				</view>
				<view class="cu-list menu card-menu card-menu margin-top-xl margin-bottom-xl text-center"
					:class="isDark?'text-black darkIn':'text-gray bg-white'">
					<view class="cu-item solid-bottom" style="border: 3rpx solid #000000;">
						<view class="content padding">
							<picker class="text-center" @change="bindPickerChange" :value="index" :range="array"
								:class="isDark?'darkIn':'bg-white'">
								<view class="text-center">{{array[index]}}</view>
							</picker>
							<view class=" text-center"><span :class="isDark?'darkIn':'bg-white'"
									style="font-size: 25rpx;">（点击选择学期）</span><text class="cuIcon-formfill "></text>
							</view>
						</view>
					</view>
				</view>
				<view class="padding flex margin text-center text-grey" :class="isDark?'darkIn':'bg-white'">
					<view class="flex flex-sub flex-direction solid-right">
						<view class="text-ml" :class="isDark?'text-white':'text-black'">我的</view>

					</view>
					<view class="flex flex-sub flex-direction ">
						<view class="text-ml" :class="isDark?'text-white':'text-black'">他/她的</view>

					</view>
				</view>
				<view class="padding flex margin text-center text-grey" :class="isDark?'darkIn':'bg-white'">
					<view class="flex flex-sub flex-direction solid-right">
						<view class="text-ml " :class="isDark?'text-blue':'text-blue'" @click="gradePointShow">平均绩点
						</view>
						<view class="margin-top-sm">
							<text class="cuIcon-favorfill margin-right-sm"></text> {{avgJD}}
						</view>
					</view>
					<view class="flex flex-sub flex-direction ">
						<view class="text-ml " :class="isDark?'text-blue':'text-blue'" @click="gradePointShow">平均绩点
						</view>
						<view class="margin-top-sm">
							<text class="cuIcon-favorfill margin-right-sm"></text> {{avgJDHe}}
						</view>
					</view>
				</view>
				<view class="padding flex margin text-center text-grey" :class="isDark?'darkIn':'bg-white'">
					<view class="flex flex-sub flex-direction solid-right">
						<view class="text-ml" :class="isDark?'text-white':'text-black'">课程数</view>
						<view class="margin-top-sm">
							<text class="cuIcon-attentionfill margin-right-sm"></text> {{scoreNum}}
						</view>
					</view>
					<view class="flex flex-sub flex-direction ">
						<view class="text-ml" :class="isDark?'text-white':'text-black'">课程数</view>
						<view class="margin-top-sm">
							<text class="cuIcon-attentionfill margin-right-sm"></text> {{scoreNumHe}}
						</view>
					</view>
				</view>


				<view v-show="showEmptyIcon" style="text-align: center;font-size: 40rpx;"
					class="margin-left margin-right" :class="isDark?'darkIn':'bg-white'">


					<image src="../../../static/score/empty.png" style="width: 600rpx;height: 600rpx;margin-top: 0rpx;">
					</image>
				</view>
				<view style="display: flex;">
					<view class="flex flex-sub flex-direction ">
						<view class=" padding margin-left  radius solid-bottom" v-for="(val,index) in list" :key="index"
							:class="isDark?'darkIn':'bg-white'" style="width: 100%;height: 400rpx;">
							<view class="solid-right">
								<view>{{index+1}}</view>
								<view class="margin-top">课程名：{{val.courseName}}</view>
								<view class="margin-top">
									成绩：{{val.score}}
								</view>
								<view class="margin-top">
									绩点：{{val.gradePoint}}
								</view>
							</view>
						</view>
					</view>
					<view class="margin-right flex flex-sub flex-direction ">
						<view class="padding margin-right  radius solid-bottom" v-for="(val,index) in listHe"
							:key="index" :class="isDark?'darkIn':'bg-white'" style="width: 100%;height: 400rpx;">
							<view>
								<view>{{index+1}}</view>
								<view class="margin-top">课程名：{{val.courseName}}</view>
								<view class="margin-top">
									成绩：{{val.score}}
								</view>
								<view class="margin-top">
									绩点：{{val.gradePoint}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="padding margin-top flex flex-wrap " :class="isDark?'dark':'bg-white'">
					<button class="cu-btn round line" @click="refreshInfo()">
						<text class="cuIcon-refresh text-right" :class="isDark?'dark':''"></text></button>

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
				array: [],
				index: 0,
				list: [], //显示
				totalList: [], //全部
				totalListHe: [], //全部
				total: null,
				num: null,
				showEmptyIcon: false,
				avgJD: 0,
				isDark: this.isDark,
				scoreNum: 0,
				scoreNumHe: 0,
				avgJDHe: 0,
				listHe: [], //显示
				key: null,
			}
		},
		onLoad(option) {
			this.key = option.key

		},

		onShow() {
			let _this = this
			_this.list = _this.$store.state.userScore
			_this.totalList = _this.$store.state.userScore
			_this.array = _this.$store.state.userScoreTerm
			_this.refresh()
			_this.refreshInfo()
			_this.changeList()



		},
		methods: {
			scoreShare() {
				this.$Router.navigateTo("/pages/school/score/share")
			},
			gradePointShow() {
				uni.showModal({
					title: '提示',
					content: '计算公式:\n(课程学分*课程绩点)的总和/(课程学分)的总和\n,采用带两位小数位形式（4舍5入）',
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			bindPickerChange: function(e) {
				let _this = this
				_this.index = e.target.value
				_this.changeList()
			},
			/**
			 * @description 更改学期
			 */
			changeList() {
				let _this = this
				let nowArray = [];

				for (var i = 0; i < _this.totalList.length; i++) {
					if (_this.totalList[i].term == _this.array[_this.index]) {
						nowArray.push(_this.totalList[i])
					} else {}
				}
				_this.list = nowArray
				_this.scoreNum = _this.list.length

				nowArray = [];
				for (var i = 0; i < _this.totalListHe.length; i++) {
					if (_this.totalListHe[i].term == _this.array[_this.index]) {
						nowArray.push(_this.totalListHe[i])
					} else {}
				}
				_this.listHe = nowArray
				_this.scoreNumHe = _this.listHe.length
				// if (_this.list.length <= 0) {
				// 	_this.showEmptyIcon = true
				// } else {
				// 	_this.showEmptyIcon = false
				// }
				//计算
				var s = 0
				var ss = 0
				var xx = 0

				var jd = 0
				for (var i = 0; i < _this.list.length; i++) {
					if (_this.list[i].gradePoint != 0) {
						ss += parseFloat(_this.list[i].gradePoint) * parseFloat(_this.list[i].credit)
						xx += parseFloat(_this.list[i].credit)
					} else {
						console.log("有", _this.list[i].gradePoint)
					}

				}
				s = ss / xx
				console.log(s)
				_this.avgJD = s.toFixed(2)
				if (ss == 0) {
					_this.avgJD = '0'
				}

				s = 0
				ss = 0
				xx = 0

				jd = 0
				for (var i = 0; i < _this.listHe.length; i++) {
					if (_this.listHe[i].gradePoint != 0) {
						ss += parseFloat(_this.listHe[i].gradePoint) * parseFloat(_this.listHe[i].credit)
						xx += parseFloat(_this.listHe[i].credit)
					} else {
						console.log("有", _this.listHe[i].gradePoint)
					}

				}
				s = ss / xx
				console.log(s)
				_this.avgJDHe = s.toFixed(2)
				if (ss == 0) {
					_this.avgJDHe = '0'
				}

			},
			/**
			 * @description  请求学期
			 */
			refresh: function() {
				let _this = this
				_this.$schoolApi.scoreTerm().then(response => {
					if (response.status == 0) {
						var total = 0;
						var list = []
						for (var i = 0; i < response.data.term.length; i++) {
							list[i] = response.data.term[i].val
						}
						_this.array = list
						_this.$store.commit("userScoreTerm", list)
					}
					//这里只会在接口是成功状态返回
				})
			},
			/**
			 * @description  请求成绩+学期
			 */
			refreshInfo: function() {
				let _this = this
				var userInfo = _this.$store.state.userInfo
				console.log(_this.$store.state.isExit)
				if ((_this.$store.state.isExit == 1 | userInfo.password == "" | userInfo.password == null) && _this
					.$store.state.loginTip == null) {
					_this.$store.commit("loginTip", "1")
					uni.showModal({
						title: 'Hi',
						content: '会话已过期，\n当前功能需要登录，是否要去登录?\n(该程序的用户信息只存在手机本地，当切出程序需要重新登录)',
						confirmText: "去登录",
						cancelText: "再逛会",
						success: function(res) {
							_this.$store.commit("loginTip", null)
							if (res.confirm) {
								_this.$Router.navigateTo("/pages/bind/login/index")
							} else if (res.cancel) {
								console.log("点击了取消")
							} else {
								console.log("点击了别的")
							}
						}
					});
					return
				}



				let form = {
					password: _this.$store.state.userInfo.password,
				}
				_this.$schoolApi.score(form).then(response => {
					if (response.status == 0) {

						_this.list = response.data
						_this.totalList = response.data
						_this.$store.commit("userScore", response.data)
						// uni.showToast({
						// 	icon: 'none',
						// 	title: '成功获取数据',
						// 	duration: 2000
						// });
						_this.changeList()

					} else if (response.status != 608 && response.status != 603) {
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
				form = {
					key: _this.key
				}
				_this.$schoolApi.scoreGetShareScoreInfo(form).then(response => {
					if (response.status == 0) {
						_this.totalListHe = response.data
						_this.listHe = response.data
						uni.showToast({
							icon: 'none',
							title: '成功获取数据',
							duration: 2000
						});
						_this.changeList()

					} else if (response.status != 608 && response.status != 603) {
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

<style>
	.smallButton {
		width: 400rpx;
		background-color: #428bca;
		border-color: #357ebd;
		color: #fff;
		-moz-border-radius: 10rpx;
		-webkit-border-radius: 10rpx;
		border-radius: 10rpx;
		/* future proofing */
		-khtml-border-radius: 10rpx;
		/* for old Konqueror browsers */
		text-align: center;
		border: 1rpx solid transparent;
		margin: 0 rpx auto;
		font-size: 37rpx;
		height: 100rpx;
		line-height: 100rpx;
		margin-top: 20rpx;
		margin: 30rpx;
	}
</style>
