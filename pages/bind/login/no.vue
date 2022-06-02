<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-blue'" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">用户绑定</block>
		</cu-custom>
		<view :class="isDark?'dark':''" >
			<view class="bg-img bg-white flex align-center"
				style="background-image:url(https://h5.jokeworld.cn/img/new4.png)">
				<view class="padding-xl text-white" style="font-weight:bold">
					<view class="padding-xs text-xxl text-black">
						登录
					</view>
					<view class="padding-xs text-lg text-black">
						Login in
					</view>
				</view>
			</view>
			<view class="margin  padding radius shadow-lg" :class="isDark?'darkIn':'light'">
				<form class="form" @submit="formSubmit">
					<view class="cu-form-group" :class="isDark?'darkIn':'light'">
						<view class="title">用户名</view>
						<input placeholder="(请输入用户名)" :value="username" name="username" maxlength="8"></input>
					</view>
					<view v-show="needCaptchaShow=='1'">
						<view class="cu-form-group justify-center" :class="isDark?'darkIn':'light'">
							<view class="title">验证码</view>
							<input v-model="code" maxlength="4" placeholder="(请输入验证码)" />
						</view>
						<image class="imgCodeSrc"
							style="width: 400rpx; height: 120rpx; background-color: #eeeeee; margin-left: 40rpx;"
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
							type="primary">{{loginButton}}</button>
					</view>

				</form>
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
				username: '', //用户名
				loginButton: '绑定', //标题
				code: '', //输入验证码
				isDark: this.isDark,
				know: '不同意', //用户知晓
				needCaptchaShow: '0',
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

			const userInfo = _this.$store.state.userInfo
			const know = _this.$store.state.know
			if (know) {
				_this.alarmList[0].isChecked = true
				_this.know = '同意'
			}
			if (userInfo.username) {
				_this.username = userInfo.username
				_this.loginButton = "重新绑定"
			}



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
			/**
			 * @description  显示用户须知
			 */
			showUserKnow() {
				let _this = this
				uni.showModal({
					title: '用户须知',
					content: '您的密码只存储在您的手机程序的缓存，相对应功能的查询服务只是帮助您提交，当程序切到后台，或是保持过长时间登录，将退出登录状态。',
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
			 * @description  更新验证码
			 */
			updateCode: function() {
				let _this = this
				_this.$userApi.captcha().then(response => {
					_this.imgCodeSrc = response.data.code
					_this.redisKey = response.data.redisKey
				})

			},

			/**
			 * @description  提交登录表单
			 * @param {Object} e
			 */
			formSubmit: function(e) {
				let _this = this
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				console.log(formdata.username)
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
				console.log(formdata.password)
				console.log(_this.code)
				console.log(_this.redisKey)

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
				//#ifndef MP-WEIXIN
				let form = {
					username: formdata.username,
					captcha: _this.code,
					captchaKey: _this.redisKey
				}
				_this.request(form)
				//#endif

				//#ifdef MP-WEIXIN
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes.code);
						let form = {
							username: formdata.username,
							code: loginRes.code,
							captcha: _this.code,
							captchaKey: _this.redisKey
						}
						_this.request(form)

					}
				});
				//#endif



			},
			request(form) {
				let _this = this
				_this.$userApi.bindStudent(form).then(response => {
					if (response.status == 607 | response.status == 602) {
						console.log("需要验证码校验")
						_this.updateCode()
						_this.code = ""
						_this.needCaptchaShow = "1"

					}
					if (response.status != "0") {
						uni.showModal({
							title: '提示',
							content: response.msg,
							showCancel: false,
							success: function(res) {

							}
						});

						return
					}
					response.data.password = _this.$store.state.userInfo.password
					_this.$store.commit("userInfo", response.data)

					uni.showModal({
						title: '提示',
						content: response.msg,
						showCancel: false,
						success: function(res) {
							_this.$Router.navigateBack()
						}
					});

				})
			}


		},
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

	.LoginIcon {
		width: 100rpx;
		height: 100rpx;
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

	.bigButton {
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
