<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-grey'" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">关于我们</block>
		</cu-custom>

		<view class="container" :class="isDark?'dark':''">

			<view style="margin-top: 10rpx;text-align: center;">
				<image src="https://h5.jokeworld.cn/img/about.png" style="width: 600rpx;height: 600rpx;"></image>
				<text>
					<text class="cuIcon-likefill text-red padding-xl">
					</text>
					本来做个情侣课表看看，慢慢的做成毕设。
				</text>
				<text></text>
			</view>
			<!-- <button  v-show="pay" @click="getH5Url()" class="smallButton" style="margin-top: 60rpx;">向开发者赞助</button>
 -->
			<zmm-watermark>

			</zmm-watermark>
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

			// getH5Url() {
			// 	let _this = this
			// 	let form = {
			// 		total: '100',
			// 	}
			// 	_this.$http.post('/api/cloud/pay/createOrder', form).
			// 	then(function(response) {

			// 		console.log(response)
			// 		location.href = response.data
			// 		console.log(response.data)
			// 		//这里只会在接口是成功状态返回
			// 	}).catch(function(error) {
			// 		//这里只会在接口是失败状态返回，不需要去处理错误提示
			// 		console.log(error);
			// 	});

			// },
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
