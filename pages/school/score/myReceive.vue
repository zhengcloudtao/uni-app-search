<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-grey'" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我接受的成绩</block>
		</cu-custom>

		<view class="container" :class="isDark?'dark':''">
			<view class="padding flex flex-direction" style="margin-top: 200rpx;">
			
			</view>

		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				isDark: this.isDark,
			
			}
		},
		onShow() {
			let _this = this

			
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
