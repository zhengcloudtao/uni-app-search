<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-brown'" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">综测成绩</block>
		</cu-custom>
		<view :class="isDark?'dark':''">
			<view>
				<view class="cu-bar  solid-bottom" style="font-weight:bold" :class="isDark?'dark':'bg-white'">
					<view class="action">
						<text class="cuIcon-titles text-brown"></text> 综测成绩
						<text class="cuIcon-search"></text>
					</view>
				</view>

				<!-- <image @click="refreshInfo" src="/static/public/refresh.png" style="width: 9%;height:70rpx;float: left;">
			</image> -->

				<view class="margin flex text-center text-grey  shadow-warp cu-list menu card-menu"
					:class="isDark?'dark':'bg-white'">
					<view class="cu-bar btn-group">
						<button
							class="cu-btn bg-brown shadow-blur">学期数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{totalList.length}}</button>
						<button class="cu-btn text-brown line-brown shadow"><text class="text-brown">平均德育分<text
									style="font-size: 15rpx;"></text>{{avgScore}}</text></button>
					</view>

				</view>

				<view class=" padding text-center margin-top margin-bottom" :class="isDark?'darkIn':'bg-white'">
					<view style="display: flex;">

						<span style="float: right;margin-right: 50rpx;margin-top: 0rpx; width: 300rpx;">
							学年-学期
						</span>

						<span style="float: right;margin-top: 0rpx; width: 300rpx;">
							德育分
						</span>
					</view>
				</view>

				<view v-show="showEmptyIcon" style="text-align: center;font-size: 40rpx;"
					:class="isDark?'darkIn':'bg-white'">


					<image src="../../../static/score/empty.png" style="width: 600rpx;height: 600rpx;margin-top: 0rpx;">
					</image>
				</view>
				<view class=" padding text-center" v-for="(val,index) in totalList" :key="index"
					:class="isDark?'darkIn':'bg-white'">
					<view style="display: flex;">
						<span style="width:300rpx;margin-right: 50rpx;">{{val.year}}-{{val.term}}</span>
						<span style="width: 300rpx;overflow: hidden;word-break: break-all; text-overflow: ellipsis;display: -webkit-box; -webkit-box-orient: vertical; 
			-webkit-line-clamp:1;  ">{{val.educationScore}}</span>

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
				totalList: [],
				total: null,
				num: null,
				showEmptyIcon: false,
				totalXF: 0,
				isDark: this.isDark,
				avgScore: 0


			}
		},
		onLoad() {

		},
		onShow() {
			let _this = this
			if (_this.$store.state.userScoreEducation.length != undefined) {
				_this.totalList = _this.$store.state.userScoreEducation
			}
			_this.setData()
			_this.refreshInfo()


		},
		methods: {
			scoreShow() {
				uni.showModal({
					title: '提示',
					content: '该学分总和包含院自选、等其他，不代表自己选的选修，自选选修分需要自己计算！(该程序绩点0，挂科也会算进去！)',
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
			setData() {
				let _this = this
				var total = 0
				for (var i = 0; i < _this.totalList.length; i++) {

					total += parseFloat(_this.totalList[i].educationScore)
				}
				if (_this.totalList.length <= 0 | _this.totalList.length == undefined) {
					_this.showEmptyIcon = true
				} else {
					_this.avgScore = (total / _this.totalList.length).toFixed(0)
					_this.showEmptyIcon = false
				}



			},
			/**
			 * @description  请求成绩数据
			 */
			refreshInfo: function() {
				let _this = this
				var userInfo = _this.$store.state.userInfo
				if (_this.$store.state.isExit == 1 | userInfo.password == "" || userInfo.password == null) {

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
				_this.$schoolApi.scoreXG(form).then(response => {
					//console.log(response.data)
					if (response.status == 0) {
						_this.totalList = response.data.educationScore
						_this.$store.commit('userScoreEducation', response.data.educationScore)
						_this.setData()
						uni.showToast({
							icon: 'none',
							title: '成功获取数据',
							duration: 2000
						});

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
	.tableTitle {
		float: right;
		margin-right: 50rpx;
		margin-top: 0rpx;
		width: 100rpx;
		font-size: 25rpx;
	}
</style>
