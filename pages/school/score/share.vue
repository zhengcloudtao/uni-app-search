<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-purple'" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">分享成绩</block>
		</cu-custom>
		<view :class="isDark?'dark':''">
			<view class="padding flex flex-direction" style="margin-top: 200rpx;">
				<button class="cu-btn bg-blue margin-top lg " open-type="share"
					style="margin-top: 150rpx;height:100rpx">分享给好友我的成绩</button>
				<button class="cu-btn bg-grey margin-top lg" style="margin-top: 150rpx;height:100rpx"
					@click="myReceive">我收到的</button>
				<button class="cu-btn bg-red margin-top lg" style="margin-top: 150rpx;height:100rpx"
					@click="myShare">我分享的</button>
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
		onShareAppMessage(res) { //发送给朋友

			let _this = this
			var key = _this.get_random_str(15);
			var form = {
				key: key
			}
			this.$schoolApi.scoreShare(form).then(response => {
				if (response.status == 0) {
					uni.showModal({
						title: '提示',
						content: response.msg,
						showCancel: false
					})
				} else {
					uni.showToast({
						title: '出错了，分享失败，可以再分享试试！'
					})
				}
				//这里只会在接口是成功状态返回
			})
			return {
				title: '我的成绩分享给你看！（一个校内学生做的公益毕设）', //分享标题
				path: '/pages/school/score/share?key=' + key, //点击分享消息是打开的页面
				imageUrl: 'https://h5.jokeworld.cn/img/share.png?id=123' + (new Date()).valueOf(), //图片路径
				success: function(res) {
					// 转发成功
					console.log("转发成功:" + JSON.stringify(res));
				},
				fail: function(err) {
					// 转发失败
					console.log("转发失败:" + JSON.stringify(err));
				}
			}
		},
		onLoad(option) {
			console.log(option.key)
			uni.showToast({
				title: option.key
			})
		},
		onShow() {
			let _this = this
		},
		methods: {
			get_random_str(number) {
				var x = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
				let str = ''
				for (let i = 0; i < number; i++) {
					//重点  这里利用了Math.random()函数生成的随机数大于0 小于1 我们可以
					//用它的随机数来乘以字符串的长度,得到的也是一个随机值，再通过parseInt()
					//函数取整，这样就可以实现字符串的随机取值了
					str += x[parseInt(Math.random() * x.length)]
				}
				return str
			},
			myShare() {
				this.$Router.navigateTo("/pages/school/score/myShare")
			},
			myReceive() {
				this.$Router.navigateTo("/pages/school/score/myReceive")
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
