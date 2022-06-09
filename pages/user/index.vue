<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-gradual-blue'">
			<!-- <block slot="backText">返回</block> -->
			<block slot="content">我的</block>
		</cu-custom>
		<view :class="isDark?'dark':''" style="height: 1700rpx">

			<view>
				<view class="UCenter-bg  " :class="isDark?'wrap':''">
					<view class="avatar" style="background-image:url('https://h5.jokeworld.cn/img/noUser.png')">
					</view>
					<button class="nickname" @click="login()"> {{username}}</button>
				</view>


				<view class="padding" style="border-radius: 30rpx;">
					<view class="cu-bar  solid-bottom"
						style="border-top-left-radius: 30rpx;border-top-right-radius: 30rpx;"
						:class="isDark?'darkIn':'bg-white'">
						<view class="action">
							用户服务
						</view>
					</view>
					<view class="cu-list grid col-4 no-border "
						style="border-bottom-left-radius: 30rpx;border-bottom-right-radius: 30rpx;"
						:class="isDark?'':'bg-white'">
						<view class="cu-item">
							<navigator class="funcBtn" url="/pages/bind/login/no">
								<view class="cuIcon-people text-blue">
								</view>
								<text>绑定用户</text>
							</navigator>
						</view>

						<view class="cu-item">
							<navigator class="funcBtn" url="/pages/bind/login/index">
								<view class="cuIcon-unlock text-green">
								</view>
								<text>用户登录</text>
							</navigator>
						</view>
						<view class="cu-item">
							<navigator class="funcBtn" url="/pages/bind/loverBind/no">
								<view class="cuIcon-friendfill text-pink">
								</view>
								<text>情侣绑定</text>
							</navigator>

						</view>
						<view class="cu-item">
							<navigator class="funcBtn" url="/pages/user/setting">
								<view class="cuIcon-settings text-purple">
								</view>
								<text>用户设置</text>
							</navigator>

						</view>
					</view>

				</view>


				<!-- <view class="padding" style="border-radius: 30rpx;" v-if="client=='WECHAT'">
					<view class="cu-bar solid-bottom"
						style="border-top-left-radius: 30rpx;border-top-right-radius: 30rpx;"
						:class="isDark?'darkIn':'bg-white'">
						<view class="action">
							客服服务
						</view>
					</view>
					<view class="cu-list grid col-4 no-border "
						style="border-bottom-left-radius: 30rpx;border-bottom-right-radius: 30rpx;"
						:class="isDark?'':'bg-white'">
						<view class="cu-item">
							<button open-type="contact" style="background-color:transparent;margin-top: -40rpx;">
								<view class="cuIcon-friendadd text-red"></view>
								<text :class="isDark?'text-white':'text-gray'" style="margin-top: -20rpx;">需求反馈</text>
							</button>
						</view>
						<view class="cu-item">
							<button open-type="contact" style="background-color:transparent;margin-top: -40rpx;">
								<view class="cuIcon-questionfill text-grey"></view>
								<text :class="isDark?'text-white':'text-grey'" style="margin-top: -20rpx;">异常反馈</text>
							</button>
						</view>
						<view class="cu-item">
							<button open-type="contact" style="background-color:transparent;margin-top: -40rpx;">
								<view class="cuIcon-friendadd text-cyan"></view>
								<text :class="isDark?'text-white':'text-gray'" style="margin-top: -20rpx;">友情合作</text>
							</button>
						</view>
						<view class="cu-item ">
							<button open-type="contact" style="background-color:transparent;margin-top: -40rpx;">
								<view class="cuIcon-dianhua text-orange"></view>
								<text :class="isDark?'text-white':'text-gray'" style="margin-top: -20rpx;">联系客服</text>
							</button>
						</view>


					</view>

				</view>
 -->
				<view class="padding" style="border-radius: 30rpx;">
					<view class="cu-bar  solid-bottom"
						style="border-top-left-radius: 30rpx;border-top-right-radius: 30rpx;"
						:class="isDark?'darkIn':'bg-white'">
						<view class="action">
							系统服务
						</view>
					</view>
					<view class="cu-list grid col-4 no-border "
						style="border-bottom-left-radius: 30rpx;border-bottom-right-radius: 30rpx;"
						:class="isDark?'':'bg-white'">
						<view class="cu-item" @click="chat()" v-if="client!='WECHAT'">
							<navigator class="funcBtn" url="">
								<view class="cuIcon-dianhua text-pink">
								</view>
								<text>联系客服</text>
							</navigator>
						</view>
						<view class="cu-item" @click="clean()">
							<navigator class="funcBtn" url="">
								<view class="cuIcon-loading text-mauve">
								</view>
								<text>清除缓存</text>
							</navigator>

						</view>
						<view class="cu-item">
							<navigator class="funcBtn" url="/pages/user/from">
								<view class="cuIcon-searchlist text-blue">
								</view>
								<text>数据来源</text>
							</navigator>

						</view>
						<view class="cu-item">
							<navigator class="funcBtn" url="/pages/user/advise">
								<view class="cuIcon-list text-brown">
								</view>
								<text>更新建议</text>
							</navigator>

						</view>
						<view class="cu-item" @click="code()">
							<navigator class="funcBtn" url="">
								<view class="cuIcon-github text-grey">
								</view>
								<text>代码开源</text>
							</navigator>
						</view>
						<view class="cu-item">
							<navigator class="funcBtn" url="/pages/custom/download/index">
								<view class="cuIcon-refresharrow text-yellow">
								</view>
								<text>下载地址</text>
							</navigator>
						</view>
						<view class="cu-item" @click="use()">
							<navigator class="funcBtn" url="">
								<view class="cuIcon-appreciate text-red">
								</view>
								<text>使用说明</text>
							</navigator>
						</view>
						<view class="cu-item ">
							<button open-type="contact" style="background-color:transparent;margin-top: -40rpx;">
								<view class="cuIcon-dianhua text-orange"></view>
								<text :class="isDark?'text-white':'text-gray'" style="margin-top: -20rpx;">联系客服</text>
							</button>
						</view>
						<view class="cu-item">
							<navigator class="funcBtn" url="/pages/user/about">
								<view class="cuIcon-my text-gray">
								</view>
								<text>关于我们</text>
							</navigator>

						</view>
					</view>

				</view>

				<view class="flex-sub margin-top-xl">
					<view class="text-center">
						<text class="text-gray">©你想查我都有</text>
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
				avatarUrl: "../../static/my/noUser.png",
				username: "未登录",
				isDark: this.isDark,
				client: this.client
			}
		},
		onLoad() {


		},
		onShow: function() {
			let _this = this
			const userInfo = _this.$store.state.userInfo
			if (userInfo.username) {
				_this.username = userInfo.username
			}

			console.log('onShow')


		},
		methods: {
			login: function() {
				this.$Router.navigateTo("/pages/bind/login/index")
			},
			chat: function() {
				uni.showToast({
					icon: 'none',
					title: '当前不支持网页和app，可前往小程序！',
					duration: 2000
				});
			},
			code() {
				uni.setClipboardData({
					data: 'https://gitee.com/zhengcloudtao/uni-app-search',
					showToast: false,
					success: function() {
						uni.showToast({
							icon: 'none',
							title: '网页地址已经复制，请自行到浏览器粘贴！',

						});
					}
				});
			},
			use() {
				uni.setClipboardData({
					data: 'https://www.bilibili.com/video/BV1UZ4y147HV',
					showToast: false,
					success: function() {
						uni.showToast({
							icon: 'none',
							title: '网页地址已经复制，请自行到浏览器粘贴！',

						});
					}
				});
			},
			clean: function() {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '是否要删除全部缓存，（自定义课表也会被删除)!',
					success: function(res) {
						if (res.confirm) {
							_this.$store.commit("cleanAllCacheData")

						} else if (res.cancel) {

						}
					}
				});


			}
		},

	}
</script>
<style>
	button::after {
		border: none;
	}


	.UCenter-bg {
		background-image: url(https://h5.jokeworld.cn/img/new10.png);
		background-size: cover;
		width: 100%;
		height: 395rpx;
		justify-content: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.headerbg {
		background-color: rgba(1, 205, 70, 1);
		height: 600rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		position: relative;
		/* transform: scale(1.2); */
		transition: 0.8s;
	}

	.avatar {
		height: 150rpx;
		width: 150rpx;
		background-color: #eeeeee;
		border-radius: 50%;
		box-shadow: 0px 0px 8px 0px #ababaab0;
		background-size: cover;
		background-position: center;
	}

	.nickname {
		font-size: 18px;
		margin-top: 20px;
	}



	.main_list {
		margin-top: 36rpx;
		margin-bottom: 12rpx;
	}

	button {
		font-weight: 400 !important;
	}
</style>
