<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-pink'" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">情侣绑定</block>
		</cu-custom>
		<view :class="isDark?'dark':''">
			<view class="bg-img bg-white flex align-center"
				style="background-image:url(https://h5.jokeworld.cn/img/new4.png)">
				<view class="padding-xl text-white" style="font-weight:bold">
					<view class="padding-xs text-xxl text-pink">
						情侣绑定
					</view>
					<view class="padding-xs text-lg text-pink">
						Bound
					</view>
				</view>
			</view>
			<view class="margin padding radius shadow-lg" :class="isDark?'darkIn':'light'">
				<form class="form" @submit="formSubmit">
					<view class="cu-form-group" :class="isDark?'darkIn':'light'">
						<view class="title">情侣的用户名</view>
						<input name="username" maxlength="8" placeholder="请输入用户名" value="" />
					</view>
					<view v-show="needCaptchaShow=='1'">
						<view class="cu-form-group justify-center" :class="isDark?'darkIn':'light'">
							<view class="title">验证码</view>
							<input name="code" maxlength="4" placeholder="(请输入验证码)" />
						</view>

						<image class="imgCodeSrc"
							style="margin-left: 40rpx;width: 400rpx; height: 120rpx; background-color: #eeeeee;"
							:src="imgCodeSrc" @click="updateCode()"></image>
					</view>
					<view class="cu-form-group" :class="isDark?'darkIn':'light'">
						<view class="title text-blue" @click="showUserKnow()" style="font-size: 27rpx;">*《用户须知》</view>

						<checkbox-group name="gender">
							<view class="uni-panel-h" v-for="(i, index) in alarmList" :key="i.value"
								@click="checkAlarm(index)">
								<checkbox :checked="i.isChecked" />
								<text style="margin-left: 15rpx;">{{i.name}}</text>
							</view>
						</checkbox-group>
					</view>
					<view class="cu-bar btn-group">
						<button class="cu-btn bg-green shadow-blur round lg" form-type="submit"
							type="primary">马上绑定</button>
						<button class="cu-btn bg-blue shadow-blur round lg" @click="noBind()">解除绑定</button>
					</view>

				</form>
				<view class="padding flex flex-wrap " :class="isDark?'dark':'bg-gray'">
					<text class="padding">提示：访客试用输入用户名:12345678</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				imgCodeSrc: '', //验证码图片src
				redisKey: '', //缓存键
				token: '', //token
				isDark: this.isDark,
				needCaptchaShow: '0',
				know: '不同意', //用户知晓
				alarmList: [{
						name: '同意',
						value: '同意',
						isChecked: false
					}

				],
			}
		},
		onShow() {
			let _this = this
			//_this.updateCode();


		},

		methods: {
			/**
			 * @description 用户须知
			 * @param {Object} index
			 */
			checkAlarm(index) {
				var invoice = this.alarmList[index];
				if (invoice) {
					invoice.isChecked = !invoice.isChecked
				}
				if (this.know == '不同意') {
					this.know = '同意'
				} else {
					this.know = '不同意'
				}
				console.log(this.know)
			},
			noBind() {
				var _this = this
				_this.$userApi.noBindLover().then(response => {
					if (response.status == 0) {
						uni.showModal({
							title: '提示',
							content: response.msg,
							showCancel: false,
							success: function(res) {

							}
						});
					} else {
						uni.showModal({
							title: '提示',
							content: response.msg,
							showCancel: false,
							success: function(res) {

							}
						});
					}

				})
			},
			showUserKnow() {
				let _this = this
				uni.showModal({
					title: '用户须知',
					content: '该绑定不是双向的，绑定次数有一定限制，频繁更换将锁定账号，请慎重绑定！。',
					confirmText: '同意',
					cancelText: '不同意',
					success: function(res) {
						if (res.confirm) {
							_this.know = "同意"
							_this.alarmList[0].isChecked = true
						} else if (res.cancel) {
							_this.know = "不同意"
							_this.alarmList[0].isChecked = false
						}
					}
				});

			},
			/**
			 * @description 更新验证码
			 */
			updateCode: function() {
				let _this = this
				var form = {}
				_this.$userApi.captcha(form).then(response => {
					_this.imgCodeSrc = response.data.code
					_this.redisKey = response.data.redisKey
				})

			},
			/**
			 * @description 提交绑定表单
			 * @param {Object} e
			 */
			formSubmit: function(e) {

				let _this = this
				if (_this.know == "不同意") {
					uni.showModal({
						title: '提示',
						content: '您当前没勾选同意用户须知!',
						showCancel: false,
						confirmText: '我知道了',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					return
				}
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				console.log(formdata.username)
				console.log(formdata.password)
				console.log(formdata.code)
				console.log(_this.redisKey)

				if (formdata.username.length != 8) {
					uni.showModal({
						title: '提示',
						content: '您的学号位数不对!',
						showCancel: false,
						confirmText: '我知道了',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					return;
				}
				let form = {
					loverUsername: formdata.username,
					captcha: formdata.code,
					captchaKey: _this.redisKey
				}


				_this.$userApi.bindLover(form).then(response => {
					if (response.status == 607) {
						console.log("需要验证码校验")
						_this.updateCode()
						_this.code = ""
						_this.needCaptchaShow = "1"

					}
					if (response.status == 0) {
						uni.showModal({
							title: '提示',
							content: response.msg,
							showCancel: false,
							success: function(res) {
								_this.$Router.navigateBack()
							}
						});
					} else {
						uni.showModal({
							title: '提示',
							content: response.msg,
							showCancel: false,
							success: function(res) {

							}
						});
						_this.updateCode()
					}

				})

			},

		}

	}
</script>

<style>
	.form {
		margin: 10rpx;
	}

	.imgCodeSrc {
		margin-top: 30rpx;
	}

	.viewInput {
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-bottom: 20rpx;
	}

	.uni-form-item .title {
		padding: 20rpx 0;
	}

	.uni-input {
		border-color: #66afe9;
		outline: 0;
		-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
		outline-style: none;
		border: 1px solid #ccc;
		border-radius: 3px;
		padding: 14px 14px;
		font-size: 34rpx;
		font-family: "Microsoft soft";
		margin-top: 20rpx;
	}
</style>
