<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-purple'" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的义工</block>
		</cu-custom>

		<view :class="isDark?'dark':''">

			<view class="cu-bar bg-white solid-bottom" style="font-weight:bold" :class="isDark?'dark':'bg-white'">
				<view class="action">
					<text class="cuIcon-titles text-purple"></text>义工时查询
					<text class="cuIcon-search"></text>
				</view>
			</view>
			<view class=" padding flex flex-direction" :class="isDark?'dark':'bg-white'">
				<button
					class="cu-btn round bg-purple text-white lg">服务总次数:{{num}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;服务总小时:{{total}}</button>
			</view>

			<view class="margin text-center text-grey  shadow-warp cu-list menu card-menu"
				:class="isDark?'darkIn':'bg-white'" style="border: 3rpx solid #000000;">
				<view class=" padding text-center" :class="isDark?'dark':'bg-white'">
					<view style="display: flex;">
						<span style="width: 50rpx;"></span>
						<span style="width: 700rpx;overflow: hidden;word-break: break-all; text-overflow: ellipsis;display: -webkit-box; -webkit-box-orient: vertical; 
			-webkit-line-clamp:1;font-weight:bolder;text-ml;color:#6739b6;">活动名称</span>
						<span style="width: 220rpx;overflow: hidden;word-break: break-all; text-overflow: ellipsis;display: -webkit-box; -webkit-box-orient: vertical; 
			-webkit-line-clamp:1;font-weight:bolder;text-ml;color:#6739b6;">服务小时</span>
					</view>
				</view>
				<view v-show="showEmptyIcon" style="text-align: center;font-size: 40rpx;"
					:class="isDark?'darkIn':'bg-white'">


					<image src="../../../static/score/empty.png" style="width: 600rpx;height: 600rpx;margin-top: 0rpx;">
					</image>
				</view>
				<view class="text-center" v-for="(val,index) in list" :key="index">
					<view class="padding text-center radius" :class="isDark?'darkIn':'bg-white'">
						<view style="display: flex;">
							<span style="width:50rpx;font-weight:bold;color:#6739b6;">{{index+1}}</span>
							<span style="width:1000rpx;overflow: hidden;word-break: break-all; text-overflow: ellipsis;display: -webkit-box; -webkit-box-orient: vertical;
						-webkit-line-clamp:1;color:#6739b6;font-weight:bold">{{val.activity}}</span>
							<span style="width:220rpx;color:#6739b6;font-weight:bold">{{val.volunteerTime}}</span>

						</view>
					</view>

				</view>

			</view>
			<view class="padding flex flex-wrap " :class="isDark?'dark':'bg-white'">
				<button class="cu-btn round line" @click="refresh()">
					<text class="cuIcon-refresh text-right" :class="isDark?'dark':''"></text></button>
			</view>
			<view class="cu-tabbar-height"></view>

		</view>
		<zmm-watermark>

		</zmm-watermark>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: [],
				total: 0,
				num: 0,
				isDark: this.isDark,
				showEmptyIcon: false,
			}
		},
		onLoad() {



		},
		onShow() {
			let _this = this
			_this.list = _this.$store.state.volunteersTimeList
			_this.setData()
			_this.refresh()
		},
		methods: {
			setData() {
				let _this = this
				_this.num = _this.list.length
				var total = 0
				for (var i = 0; i < _this.list.length; i++) {
					total += parseFloat(_this.list[i].volunteerTime)
				}
				_this.total = total

				if (_this.list.length <= 0 | _this.list.length == undefined) {
					_this.showEmptyIcon = true
				} else {
					_this.showEmptyIcon = false
				}
			},
			/**
			 * @description  请求网络数据
			 */
			refresh: function() {
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
				_this.$schoolApi.volunteers(form).then(response => {
					//console.log(response.code)
					if (response.status == 0) {
						var total = 0;
						_this.list = response.data
						_this.setData()
						_this.$store.commit("volunteersTimeList", response.data)
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

</style>
