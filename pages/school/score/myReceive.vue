<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-grey'" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我收到的成绩</block>
		</cu-custom>
		<view :class="isDark?'dark':''">
			<view>
				<view class="cu-bar  solid-bottom" style="font-weight:bold" :class="isDark?'dark':'bg-white'">
					<view class="action">
						<text class="cuIcon-titles text-grey"></text> 我收到的成绩
						<text class="cuIcon-search"></text>
					</view>
				</view>

				<!-- <image @click="refreshInfo" src="/static/public/refresh.png" style="width: 9%;height:70rpx;float: left;">
			</image> -->
				<view class="margin flex text-center text-grey  shadow-warp cu-list menu card-menu"
					:class="isDark?'dark':'bg-white'">
					<view class=" padding flex flex-direction" :class="isDark?'dark':'bg-white'">
						<button class="cu-btn round bg-grey text-white lg">总数:{{totalList.length}}</button>
					</view>

				</view>

				<view v-show="showEmptyIcon" style="text-align: center;font-size: 40rpx;"
					:class="isDark?'darkIn':'bg-white'">


					<image src="../../../static/score/empty.png" style="width: 600rpx;height: 600rpx;margin-top: 0rpx;">
					</image>
				</view>
				<view class=" margin padding" v-for="(val,index) in totalList" :key="index"
					:class="isDark?'darkIn':'bg-white'">
					<view style="display: flex;">
						<view style="width:10rpx;">{{index+1}}</view>
						<view>
							<span style="margin-left: 47rpx;">学号：{{val.username}}</span>
							<view style="margin-top: 20rpx;margin-left: 65rpx;">
								密钥：{{val.shareKey}}
							</view>
							<view style="margin-top: 20rpx;margin-left: 65rpx;">
								分享时间：{{val.addTime}}
							</view>
							<view style="margin-top: 20rpx;margin-left: 65rpx;color:#A52A2A" v-if="val.deleteTime!=null">
								已取消
							</view>
							<button class="cu-btn bg-red  " style="margin-left:65rpx;margin-top:20rpx"
								v-if="val.deleteTime==null" :data-key="val.shareKey" @tap="receiveCancel">取消</button>
							<button class="cu-btn bg-green  " style="margin-left:65rpx;margin-top:20rpx"
								v-if="val.deleteTime==null" :data-key="val.shareKey" @tap="seeScore">查看成绩</button>
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
				isDark: this.isDark

			}
		},
		onShow() {
			let _this = this
			_this.refreshInfo()

		},

		methods: {
			receiveCancel: function(e) {
				let _this = this
				var key = e.currentTarget.dataset.key;
				var form = {
					key: key
				}
				uni.showModal({
					title: '提示',
					content: '是否确定取消？',
					success: function(res) {
						if (res.confirm) {
							_this.$schoolApi.scoreReceiveCancel(form).then(response => {
								if (response.status == 0) {
									uni.showToast({
										icon: 'none',
										title: response.msg,
										duration: 2000
									});
									_this.refreshInfo()
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
						} else if (res.cancel) {

						}
					}
				});

			},
			seeScore(e) {
				this.$Router.navigateTo("/pages/school/score/score?key=" + e.currentTarget.dataset.key)
			},
			setData() {
				let _this = this
				if (_this.totalList.length <= 0) {
					_this.showEmptyIcon = true
				} else {
					_this.showEmptyIcon = false
				}

			},
			/**
			 * @description  请求数据
			 */
			refreshInfo: function() {
				let _this = this
				_this.$schoolApi.scoreReceiveInfo().then(response => {
					//console.log(response.data)
					if (response.status == 0) {
						_this.totalList = response.data
						for (var i = 0; i < response.data.length; i++) {
							response.data[i].addTime = _this.$util.getTime(response.data[i].addTime)
							_this.totalList[i] = response.data[i]
						}
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
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
		font-family: 'Courier New', Courier, monospace;
	}

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
	}
</style>
