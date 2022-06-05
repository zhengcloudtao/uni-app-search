<script>
	import Vue from 'vue'
	import store from 'store'
	export default {
		data() {
			return {

			}
		},
		methods: {
			/**
			 * @description 暗黑切换
			 */
			BlackLight() {
				let _this = this
				if (Vue.prototype.isDark == 1) {
					_this.refreshstyle = "black";
					_this.rebackground = "#262626";
					uni.setNavigationBarColor({
						frontColor: '#ffffff',
						backgroundColor: '#111111',
						animation: {
							duration: 0,
							timingFunc: 'easeIn'
						}
					})
					// 关于导航栏的深色模式修改
					uni.setTabBarStyle({
						color: '#7e858f',
						selectedColor: '#E1D7F0',
						backgroundColor: '#18202d',
						borderStyle: 'black'
					})
				}

			},
			getVersion() {
				const updateManager = uni.getUpdateManager();

				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					console.log("版本信息:" + res.hasUpdate);
				});

				updateManager.onUpdateReady(function(res) {
					uni.showModal({
						title: '更新提示',
						content: '新版本已经准备好，是否重启应用？',
						success(res) {
							if (res.confirm) {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								updateManager.applyUpdate();
							}
						}
					});

				});

				updateManager.onUpdateFailed(function(res) {
					// 新的版本下载失败
				});
			}

		},
		onHide: function() {
			console.log('App Hide')
			store.commit("loginTip", null)
			//#ifndef MP-WEIXIN

			//#endif
			//#ifdef MP-WEIXIN
			//store.commit("isExit", 1)
			//#endif
			const rem = store.state.rem
			if (rem) {
				if (rem == '0') {
					var userInfo = store.state.userInfo
					userInfo.password = null
					store.commit("userInfo", userInfo)
				}

			} else {
				var userInfo = store.state.userInfo
				userInfo.password = null
				store.commit("userInfo", userInfo)
			}


		},

		onLaunch: function() {
			let _this = this

			console.log("onLaunch")

			//取出缓存数据
			_this.$store.commit('setCacheData');
			if (_this.$store.state.showStyle == 1) {
				Vue.prototype.isDark = true
			} else {
				Vue.prototype.isDark = false
			}
			if (_this.$store.state.quickIndex) {
				console.log("有快速启动缓存")
				var quickIndex = _this.$store.state.quickIndex;
				if (quickIndex == 1) {
					_this.$Router.navigateTo('pages/school/timetables/index')
				} else if (quickIndex == 0) {

				} else if (quickIndex == 2) {
					this.$Router.navigateTo('pages/school/loverTimetables/index')
				}
			}

			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif       
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})

		},
		onShow: function(option) {
			console.log('App Show')
			this.BlackLight()
			this.getVersion()
			let _this = this
			//#ifdef MP-WEIXIN
			if (option.referrerInfo.extraData) {
				console.log("传递的值:", option.referrerInfo.extraData)
				console.log(option.referrerInfo.extraData.loginStateGo)
				if (option.referrerInfo.extraData.loginStateGo) {
					var loginStateGo = {}
					loginStateGo.loginStateGo = option.referrerInfo.extraData.loginStateGo
					_this.$store.commit("loginStateGo", loginStateGo)
				}
			}
			//#endif

			// #ifdef MP-WEIXIN
			Vue.prototype.client = 'WECHAT';
			// #endif
			// #ifdef H5
			Vue.prototype.client = 'H5';
			// #endif
			console.log('App Show')
		},


	}
</script>
<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";

	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 40upx 0px;
		justify-content: space-between;
	}

	.nav-li {
		padding: 30upx;
		border-radius: 12upx;
		width: 45%;
		margin: 0 2.5% 40upx;
		background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-li::after {
		content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10upx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}

	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}

	.nav-title {
		font-size: 32upx;
		font-weight: 300;
	}

	.nav-title::first-letter {
		font-size: 40upx;
		margin-right: 4upx;
	}

	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}

	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40upx;
		height: 6upx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100upx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40upx;
		opacity: 0.3;
	}

	.nav-name::first-letter {
		font-weight: bold;
		font-size: 36upx;
		margin-right: 1px;
	}

	.nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}

	.text-light {
		font-weight: 300;
	}

	@keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	/* dark */
	.dark {
		background-color: #1d2021;
		color: #ffffff;
	}

	.darkBg {
		min-height: 100vh;
		background-color: #1d2021 !important;
		overflow: hidden;
		color: white;
	}

	.darkIn {
		background-color: #2a2e30;
		color: #ffffff;
	}

	.gray {
		background-color: #8e8e8e;
		color: #ffffff;
	}

	.dark input {
		color: #c7cddb;
	}

	.light {
		background-color: #ffffff;
		color: #000000;
	}
</style>
