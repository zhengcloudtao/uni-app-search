<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-brown'" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">更新建议</block>
		</cu-custom>

		<view class="container" :class="isDark?'dark':'bg-white'">


			<view class="cu-timeline">
				<view class="cu-time">03-28</view>
				<view class="cu-item">
					<view class="content" :class="isDark?'darkIn':'bg-gray'">
						<view class="cu-capsule radius">
							<view class="cu-tag bg-cyan">来自</view>
							<view class="cu-tag line-cyan">布芝岛</view>
						</view>
						<view class="margin-top" :class="isDark?'text-white':'text-black'">
							课表颜色浅色系。
						</view>
					</view>
				</view>
				<view class="cu-time">03-24</view>
				<view class="cu-item">
					<view class="content" :class="isDark?'darkIn':'bg-gray'">
						<view class="cu-capsule radius">
							<view class="cu-tag bg-cyan">来自</view>
							<view class="cu-tag line-cyan">一淼</view>
						</view>
						<view class="margin-top" :class="isDark?'text-white':'text-black'">
							课表增加左侧下课时间，及课表作息时间表的弹出显示。
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
