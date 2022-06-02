<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-yellow'" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">下载地址</block>
		</cu-custom>

		<view class="container" :class="isDark?'dark':'bg-white'">


			<view class="cu-timeline">
				<view class="cu-time">1</view>
				<view class="cu-item">
					<view class="content" :class="isDark?'darkIn':'bg-gray'">

						<view :class="isDark?'text-white':'text-black'">
							网页端
						</view>
						<view class="cu-capsule radius margin-top">
							<view class="cu-tag bg-blue">下载地址</view>
							<!-- <view class="cu-tag line-blue">
								https://h5.jokeworld.cn</view> -->
							<button style="background-color:green;" @click="web" class="cu-btn round line margin-left">
								<text class="text-white">复制地址</text>
							</button>
						</view>
					</view>
				</view>
				<view class="cu-time">2</view>
				<view class="cu-item">
					<view class="content" :class="isDark?'darkIn':'bg-gray'">
						<view :class="isDark?'text-white':'text-black'">
							安卓端
						</view>
						<view class="cu-capsule radius margin-top">
							<view class="cu-tag bg-blue">下载地址</view>
						<!-- 	<view class="cu-tag line-blue">https://www.pgyer.com/cloudplusslow</view> -->
							<button style="background-color:green;" @click="android"
								class="cu-btn round line margin-left">
								<text class="text-white">复制地址</text>
							</button>
						</view>

					</view>
				</view>
				<view class="cu-time">3</view>
				<view class="cu-item">
					<view class="content" :class="isDark?'darkIn':'bg-gray'">
						<view :class="isDark?'text-white':'text-black'">
							苹果端
						</view>
						<view class="cu-capsule radius margin-top">
							<view class="cu-tag bg-blue">下载地址</view>
							<view class="cu-tag line-blue">没钱搞</view>
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
				isDark: this.isDark,
				pay: false
			}
		},
		onShow() {
			let _this = this

			//#ifdef H5
			this.pay = true
			//#endif
		},
		methods: {
			web() {
				uni.setClipboardData({
					data: 'https://h5.jokeworld.cn',
				});
			},
			android() {
				uni.setClipboardData({
					data: 'https://www.pgyer.com/cloudplusslow',
				});
			},
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
