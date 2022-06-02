<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-green'" :isBack="hasBack" :isHome="!hasBack">
			<block slot="backText" v-show="hasBack">返回</block>
			<block slot="homeText" v-show="!hasBack">主页</block>
			<block slot="content">用户登录</block>
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
			<view class="padding text-center">
				<view class="padding-xl radius shadow-blur  margin-top bg-img" :class="isDark?'darkIn':'bg-white'">

					<!-- <view class="margin padding radius shadow-lg" :class="isDark?'darkIn':'light'"> -->
					<form class="form" @submit="formSubmit">
						<view class="cu-form-group" :class="isDark?'darkIn':'light'">
							<view class="title">用户名</view>
							<input placeholder="(请输入用户名)" :value="username" name="username" maxlength="8"></input>
						</view>
						<view style="width: 1rpx;height: 1rpx;overflow: hidden;">
							<input></input>
						</view>
						<view class="cu-form-group" :class="isDark?'darkIn':'light'">
							<view class="title">密码</view>
							<input name="password" password type="text" placeholder="(请输入一网通密码)" :value="password" />
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
							<view class="title text-blue" @click="showUserKnow()" style="font-size: 27rpx;">*《用户须知》
							</view>

							<checkbox-group name="gender">
								<view class="uni-panel-h" v-for="(i, index) in alarmList" :key="i.value"
									@click="checkAlarm(index)">
									<checkbox :checked="i.isChecked" />
									<text style="margin-left: 15rpx;">{{i.name}}</text>
								</view>
							</checkbox-group>
						</view>
						<view class="cu-form-group" :class="isDark?'darkIn':'light'">
							<view class="title" style="font-size: 27rpx;">是否记住密码</view>

							<checkbox-group name="gender">
								<view class="uni-panel-h" v-for="(i, index) in remList" :key="i.value"
									@click="checkRem(index)">
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

					<view class="cu-bar btn-group">
						<button class="cu-btn bg-blue shadow-blur round lg" @click="forgetPassword()">忘记密码</button>
						<button class="cu-btn bg-blue shadow-blur round lg" @click="goLogin()">服务大厅</button>

					</view>
					<view class="cu-bar btn-group">
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
				imgCodeSrc: '', //验证码图片src
				redisKey: '', //缓存键
				token: '', //token
				username: '', //用户名
				password: '', //密码
				loginButton: '登录', //标题
				code: '', //输入验证码
				isDark: this.isDark,
				needCaptchaShow: '0',
				alarmState: false,
				know: '不同意',
				rem: '不记住',
				alarmList: [{
						name: '同意',
						value: '同意',
						isChecked: false
					}

				],
				remList: [{
					name: '记住',
					value: '记住',
					isChecked: false
				}],
				hasBack: true

			}
		},
		onUnload() {
			console.log("login=>onUnload")
			this.$store.commit("loginStateGo", {})
		},
		onHide() {
			console.log("login=>onHide")
			this.$store.commit("loginStateGo", {})

		},
		onShow() {
			let _this = this


			const userInfo = _this.$store.state.userInfo
			const know = _this.$store.state.know
			const rem = _this.$store.state.rem
			if (userInfo.username) {
				_this.username = userInfo.username
				_this.loginButton = "登录"
			}
			if (userInfo.password) {
				_this.password = userInfo.password
			}
			if (rem == '1') {
				_this.remList[0].isChecked = true
				_this.rem = '记住'
			}
			if (know) {
				_this.alarmList[0].isChecked = true
				_this.know = '同意'
			}
			if (this.$store.state.loginStateGo.loginStateGo == '1') {
				this.hasBack = false
			}


		},
		methods: {

			/**
			 * @description 记住密码
			 * @param {Object} index
			 */
			checkRem(index) {
				var invoice = this.remList[index];
				if (invoice) {
					invoice.isChecked = !invoice.isChecked
				}
				if (this.rem == '记住') {
					this.rem = '不记住'
				} else {
					this.rem = '记住'
				}
				console.log(this.rem)
			},
			/**
			 * @description  记住用户须知
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
			 * @description 显示用户须知
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
			 * @description 忘记密码
			 */
			forgetPassword() {
				uni.setClipboardData({
					data: 'https://authserver.szpt.edu.cn/authserver/getBackPasswordMainPage.do',
					showToast: false,
					success: function() {
						uni.showModal({
							title: '提示',
							content: '网页地址已经复制，请自行到浏览器粘贴！',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				});
			},
			goLogin() {
				uni.setClipboardData({
					data: 'https://ehall.szpt.edu.cn/new/index.html',
					showToast: false,
					success: function() {
						uni.showModal({
							title: '提示',
							content: '网页地址已经复制，请自行到浏览器粘贴！',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
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
				console.log("username:" + formdata.username)
				console.log("password:" + formdata.password)
				console.log("code:" + _this.code)
				console.log("redisKey:" + _this.redisKey)
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
					password: formdata.password,
					captcha: _this.code,
					captchaKey: _this.redisKey
				}
				_this.request(form)
				//#endif

				//#ifdef MP-WEIXIN
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let form = {
							username: formdata.username,
							password: formdata.password,
							captcha: _this.code,
							code: loginRes.code,
							captchaKey: _this.redisKey
						}
						_this.request(form)

					}
				});

				//#endif



			},
			request(form) {
				let _this = this
				_this.$userApi.bindStudentPassword(form).then(response => {
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
					response.data.password = form.password
					_this.$store.commit("userInfo", response.data)
					_this.$store.commit("know", "1")
					if (_this.rem == '记住') {
						_this.$store.commit("rem", "1")
					} else {
						_this.$store.commit("rem", "0")
					}
					_this.$store.commit("isExit", "0")



					uni.showModal({
						title: '提示',
						content: response.msg,
						showCancel: false,
						success: function(res) {
							if (_this.$store.state.loginStateGo.loginStateGo == '1') {
								//#ifdef MP-WEIXIN
								uni.showModal({
									title: '提示',
									content: '是否要跳转回小程序',
									confirmText: '跳转',
									cancelText: "不跳",
									success: function(res) {
										if (res.confirm) {
											console.log('用户点击确定');
											uni.navigateBackMiniProgram({
												extraData: {
													'token': _this.$store.state
														.userInfo.token
												},
												success: res => {
													// 打开成功
													console.log("打开成功",
														res);
													_this.$store
														.commit(
															"loginStateGo", {}
														)
												},
												fail: err => {
													console.log(err);
												}
											});
										} else if (res.cancel) {
											_this.$store.commit("loginStateGo", {})
											console.log('用户点击取消');
										}
									}
								});
								//#endif
							} else {
								_this.$Router.navigateBack()
							}

						}
					});
					//这里只会在接口是成功状态返回
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
