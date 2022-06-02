<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-grey'" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的成绩</block>
		</cu-custom>
		<view :class="isDark?'dark':''">
			<view style="padding-top: 20rpx;">
				<view class="cu-bar  solid-bottom" style="font-weight:bold" :class="isDark?'dark':'bg-white'">
					<view class="action">
						<text class="cuIcon-titles text-grey"></text>成绩查询
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
						<view class="text-ml " :class="isDark?'text-blue':'text-blue'" @click="gradePointShow">平均绩点
						</view>
						<view class="margin-top-sm">
							<text class="cuIcon-favorfill margin-right-sm"></text> {{avgJD}}
						</view>
					</view>
					<view class="flex flex-sub flex-direction solid-right">
						<view class="text-ml" :class="isDark?'text-white':'text-black'">课程数</view>
						<view class="margin-top-sm">
							<text class="cuIcon-attentionfill margin-right-sm"></text> {{scoreNum}}
						</view>
					</view>
				</view>

				<view class="padding margin-left margin-right margin-top text-center radius"
					:class="isDark?'darkIn':'bg-white'">
					<view style="display: flex;">
						<span style="width:110rpx;">序号</span>
						<span style="width: 550rpx;overflow: hidden;word-break: break-all; text-overflow: ellipsis;display: -webkit-box; -webkit-box-orient: vertical; 
			-webkit-line-clamp:1;  ">课程名</span>
						<span style="float: right;margin-right: 50rpx;margin-top: 0rpx; width: 100rpx;">
							成绩
						</span>
						<span style="float: right;margin-right: 50rpx;margin-top: 0rpx; width: 100rpx;">
							绩点
						</span>
					</view>
				</view>
				<view v-show="showEmptyIcon" style="text-align: center;font-size: 40rpx;"
					class="margin-left margin-right" :class="isDark?'darkIn':'bg-white'">


					<image src="../../../static/score/empty.png" style="width: 600rpx;height: 600rpx;margin-top: 0rpx;">
					</image>
				</view>
				<view class=" padding margin-left margin-right text-center radius solid-bottom"
					v-for="(val,index) in list" :key="index" :class="isDark?'darkIn':'bg-white'">
					<view style="display: flex;">
						<span style="width:110rpx;">{{index+1}}</span>
						<span style="width: 550rpx;overflow: hidden;word-break: break-all; text-overflow: ellipsis;display: -webkit-box; -webkit-box-orient: vertical; 
-webkit-line-clamp:1;  ">{{val.courseName}}</span>
						<span style="float: right;margin-right: 50rpx;margin-top: 0rpx; width: 100rpx;">
							{{val.score}}
						</span>
						<span style="float: right;margin-right: 50rpx;margin-top: 0rpx; width: 100rpx;">
							{{val.gradePoint}}
						</span>
					</view>
				</view>
				<view class="padding margin-top flex flex-wrap " :class="isDark?'dark':'bg-white'">
					<button class="cu-btn round line" @click="refreshInfo()">
						<text class="cuIcon-refresh text-right" :class="isDark?'dark':''"></text></button>
				</view>
			</view>
		</view>
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
				total: null,
				num: null,
				showEmptyIcon: false,
				avgJD: 0,
				isDark: this.isDark,
				scoreNum: 0
			}
		},
		onLoad() {


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
			gradePointShow() {
				uni.showModal({
					title: '提示',
					content: '计算公式:\n(课程学分*课程绩点)的总和/(课程学分)的总和\n(该程序会把零分课程也算在内)',
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
				if (_this.list.length <= 0) {
					_this.showEmptyIcon = true
				} else {
					_this.showEmptyIcon = false
				}
				//计算
				var s = 0
				var ss = 0
				var xx = 0

				var jd = 0
				for (var i = 0; i < _this.list.length; i++) {
					ss += parseFloat(_this.list[i].gradePoint) * parseFloat(_this.list[i].credit)
					xx += parseFloat(_this.list[i].credit)
					jd += parseFloat(_this.list[i].gradePoint)
				}
				s = ss / xx
				_this.avgJD = s.toFixed(2)
				if (ss == 0) {
					_this.avgJD = '0'
				}
				//console.log(jd / _this.list.length)

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
				if (_this.$store.state.isExit == 1 | userInfo.password == "" | userInfo.password == null) {
					uni.showModal({
						title: 'Hi',
						content: '会话已过期，\n当前功能需要登录，是否要去登录?\n(该程序的用户信息只存在手机本地，当切出程序需要重新登录)',
						confirmText: "去登录",
						cancelText: "再逛会",
						success: function(res) {
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
