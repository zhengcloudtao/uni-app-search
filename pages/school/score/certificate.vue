<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-orange'" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的证书</block>
		</cu-custom>
		<view :class="isDark?'dark':''">
			<view>
				<view class="cu-bar  solid-bottom" style="font-weight:bold" :class="isDark?'dark':'bg-white'">
					<view class="action">
						<text class="cuIcon-titles text-orange"></text> 我的证书
						<text class="cuIcon-search"></text>
					</view>
				</view>

				<!-- <image @click="refreshInfo" src="/static/public/refresh.png" style="width: 9%;height:70rpx;float: left;">
			</image> -->
				<view class="margin flex text-center text-grey  shadow-warp cu-list menu card-menu"
					:class="isDark?'dark':'bg-white'">
					<view class=" padding flex flex-direction" :class="isDark?'dark':'bg-white'">
						<button class="cu-btn round bg-orange text-white lg">总数:{{totalList.length}}</button>
					</view>

				</view>




				<view v-show="showEmptyIcon" style="text-align: center;font-size: 40rpx;"
					:class="isDark?'darkIn':'bg-white'">


					<image src="../../../static/score/empty.png" style="width: 600rpx;height: 600rpx;margin-top: 0rpx;">
					</image>
				</view>
				<view class=" padding margin" v-for="(val,index) in totalList" :key="index"
					:class="isDark?'darkIn':'bg-white'">
					<view style="display: flex;">
						<view style="width:10rpx;">{{index+1}}</view>
						<view>
							<view style="margin-left: 65rpx;">证书名称：{{val.name}}</view>
							<view style="margin-top: 20rpx;margin-left: 65rpx;">
								证书类型：{{val.type}}
							</view>
							<view style="margin-top: 20rpx;margin-left: 65rpx;">
								证书成绩：{{val.score}}
							</view>
							<view style="margin-top: 20rpx;margin-left: 65rpx;">
								证书获取日期：{{val.time}}
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
				totalList: [],
				total: null,
				num: null,
				showEmptyIcon: false,
				totalXF: 0,
				isDark: this.isDark


			}
		},
		onLoad() {

		},
		onShow() {
			let _this = this
			_this.totalList = _this.$store.state.userCertificate
			_this.setData()
			_this.refreshInfo()


		},
		methods: {
			scoreShow() {
				uni.showModal({
					title: '提示',
					content: '该学分总和包含院自选、等其他，不代表自己选的选修，自选选修分需要自己计算！',
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

				if (_this.totalList.length <= 0) {
					_this.showEmptyIcon = true
				} else {
					_this.showEmptyIcon = false
				}
				_this.totalXF = 0

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
				_this.$schoolApi.certificate(form).then(response => {
					//console.log(response.data)
					if (response.status == 0) {
						_this.totalList = response.data
						_this.$store.commit('userCertificate', response.data)
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
