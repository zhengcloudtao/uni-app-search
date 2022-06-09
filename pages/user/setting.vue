<template>
	<view :class="isDark?'darkBg':''"> 
		<cu-custom :bgColor="isDark?'bg-black':'bg-purple'" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">用户设置</block>
		</cu-custom>

		<view :class="isDark?'dark':''">
			<view>
				<view style="height: 20rpx;"></view>
				<view style="display: flex;padding-bottom: 20rpx;" class="settingView">
					<p class="settingViewFont">外观设置</p>
					<picker @change="bindPickerChange" :value="index" :range="styleList">
						<view style="margin-right: 110rpx;margin-top: 17rpx;font-size: 28rpx;">{{styleList[index]}}
						</view>
					</picker>
					<image src="../../static/my/right.png" class="rightIcon"></image>
				</view>

			</view>

			<view>
				<view style="height: 20rpx;"></view>
				<view style="display: flex;padding-bottom: 20rpx;" class="settingView">
					<p class="settingViewFont">快速启动设置</p>
					<picker @change="bindPickerChangeQuick" :value="quickIndex" :range="quickList">
						<view style="margin-right: 110rpx;margin-top: 17rpx;font-size: 28rpx;">{{quickList[quickIndex]}}
						</view>
					</picker>
					<image src="../../static/my/right.png" class="rightIcon"></image>
				</view>

			</view>
		<!-- 	<view>
				<view style="height: 20rpx;"></view>
				<view style="display: flex;padding-bottom: 20rpx;" class="settingView">
					<p class="settingViewFont">公告栏推送设置</p>
					<picker @change="bindPickerChangeNotice" :value="noticeIndex" :range="noticeList">
						<view style="margin-right: 110rpx;margin-top: 17rpx;font-size: 28rpx;">
							{{noticeList[noticeIndex]}}
						</view>
					</picker>
					<image src="../../static/my/right.png" class="rightIcon"></image>
				</view>

			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				styleList: ['日间模式', '夜间模式'],
				quickList: ['主页', '课表页面', '情侣课表页面'],
				noticeList: ['更新就提示一次', '永远不提示'],
				index: 0,
				quickIndex: 0,
				noticeIndex: 0,
				isDark: this.isDark
			}
		},
		onLoad() {
			let _this = this
			var showStyle = _this.$store.state.showStyle;
			if (showStyle == 1) {
				this.index = showStyle
				this.isDark = true

			}
			if (_this.$store.state.quickIndex != null) {
				var quickIndex = _this.$store.state.quickIndex;
				this.quickIndex = quickIndex
			}
			if (_this.$store.state.noticeIndex != null) {
				var noticeIndex = _this.$store.state.noticeIndex;
				this.noticeIndex = noticeIndex
			}
		},
		methods: {
			bindPickerChange: function(e) {
				let _this = this
				console.log('picker发送选择改变，携带值为', e.target.value)
				_this.index = e.target.value
				_this.$store.commit("showStyle", _this.index)
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: '已经切换成功，重启程序即可。',
					success: function(res) {

						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			bindPickerChangeQuick: function(e) {
				let _this = this
				console.log('picker发送选择改变，携带值为', e.target.value)
				_this.quickIndex = e.target.value
				_this.$store.commit("quickIndex", _this.quickIndex)
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: '已经切换成功，重启程序即可。',
					success: function(res) {

						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			bindPickerChangeNotice: function(e) {
				let _this = this
				console.log('picker发送选择改变，携带值为', e.target.value)
				_this.noticeIndex = e.target.value
				_this.$store.commit("noticeIndex", _this.noticeIndex)
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: '已经切换成功，重启程序即可。',
					success: function(res) {

						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
		},
	}
</script>

<style>
	page {
		background-color: white;
	}

	.settingView {
		margin-top: 50rpx;
		margin-left: 50rpx;
		margin-right: 50rpx;
		box-shadow: 0 4rpx 18rpx rgba(181, 186, 193, 0.2);
		width: 90%;
		border-radius: 30rpx;
	}

	.leftIcon {
		width: 80rpx;
		height: 80rpx;
	}

	.rightIcon {
		width: 30rpx;
		height: 30rpx;
		margin-top: 20rpx;
	}

	.settingViewFont {
		display: flex;
		flex: 1;
		margin-top: 15rpx;
		margin-left: 25rpx;
	}
</style>
