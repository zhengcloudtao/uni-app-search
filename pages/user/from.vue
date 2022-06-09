<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-blue'" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">数据来源</block>
		</cu-custom>

		<view class="container" :class="isDark?'dark':'bg-white'">


			<view class="cu-timeline">
				<view class="cu-time">1</view>
				<view class="cu-item">
					<view class="content" :class="isDark?'darkIn':'bg-gray'">

						<view :class="isDark?'text-white':'text-black'">
							我的课表、情侣课表、我的成绩、选修成绩、未出成绩、考试安排、我的证书
						</view>
						<view class="cu-capsule radius margin-top">
							<view class="cu-tag bg-blue">来自</view>
							<view class="cu-tag line-blue">
								教务系统</view>
							<button style="background-color:green;" @click="jw" class="cu-btn round line margin-left">
								<text class="text-white">复制地址</text>
							</button>
						</view>
					</view>
				</view>
				<view class="cu-time">2</view>
				<view class="cu-item">
					<view class="content" :class="isDark?'darkIn':'bg-gray'">
						<view :class="isDark?'text-white':'text-black'">
							义工时、总评成绩、综测成绩
						</view>
						<view class="cu-capsule radius margin-top">
							<view class="cu-tag bg-blue">来自</view>
							<view class="cu-tag line-blue">学工系统</view>
							<button style="background-color:green;" @click="xg" class="cu-btn round line margin-left">
								<text class="text-white">复制地址</text>
							</button>
						</view>

					</view>
				</view>
				<view class="cu-time">3</view>
				<view class="cu-item">
					<view class="content" :class="isDark?'darkIn':'bg-gray'">
						<view :class="isDark?'text-white':'text-black'">
							校园巴士
						</view>
						<view class="cu-capsule radius margin-top">
							<view class="cu-tag bg-blue">来自</view>
							<view class="cu-tag line-blue">车来了</view>
						</view>
					</view>
				</view>
				<view class="cu-time">4</view>
				<view class="cu-item">
					<view class="content" :class="isDark?'darkIn':'bg-gray'">
						<view :class="isDark?'text-white':'text-black'">
							核核地点
						</view>
						<view class="cu-capsule radius margin-top">
							<view class="cu-tag bg-blue">来自</view>
							<view class="cu-tag line-blue">学校通知、学生反馈</view>
						</view>
					</view>
				</view>
				<view class="cu-time">5</view>
				<view class="cu-item">
					<view class="content" :class="isDark?'darkIn':'bg-gray'">
						<view :class="isDark?'text-white':'text-black'">
							校园日历、校园地图
						</view>
						<view class="cu-capsule radius margin-top">
							<view class="cu-tag bg-blue">来自</view>
							<view class="cu-tag line-blue">学校官网</view>
							<button style="background-color:green;" @click="gw" class="cu-btn round line margin-left">
								<text class="text-white">复制地址</text>
							</button>
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
			xg() {
				uni.setClipboardData({
					data: 'https://xg.szpt.edu.cn/xg/desktop/index.do',
				});
			},
			jw() {
				uni.setClipboardData({
					data: 'https://jwxt.szpt.edu.cn/jwapp/sys/emaphome/portal/index.do',
				});
			},
			gw() {
				uni.setClipboardData({
					data: 'https://www.szpt.edu.cn',
				});
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
