<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-pink'" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">情侣绑定</block>
		</cu-custom>
		<view :class="isDark?'dark':''" >
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
					<view class="cu-form-group" :class="isDark?'darkIn':'light'">
						<view class="title">情侣的密码</view>
						<input name="password" password type="text" placeholder="请输入一网通密码" value="" />
					</view>
					<view class="cu-form-group justify-center" :class="isDark?'darkIn':'light'">
						<view class="title">验证码</view>
						<input name="code" maxlength="4" placeholder="(请输入验证码)" />
					</view>

					<image class="imgCodeSrc"
						style="margin-left: 40rpx;width: 400rpx; height: 120rpx; background-color: #eeeeee;"
						:src="imgCodeSrc" @click="updateCode()"></image>
					<view class="cu-bar btn-group">
						<button class="cu-btn bg-green shadow-blur round lg" form-type="submit"
							type="primary">马上绑定</button>
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
				isDark: this.isDark
			}
		},
		onShow() {
			let _this = this
			_this.updateCode();
		},

		methods: {
			/**
			 * @description 更新验证码
			 */
			updateCode: function() {
				let _this = this
				_this.$userApi.captcha().then(response => {
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
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				console.log(formdata.username)
				console.log(formdata.password)
				console.log(formdata.code)
				console.log(_this.redisKey)

				let form = {
					username: formdata.username,
					password: formdata.password,
					captcha: formdata.code,
					redisKey: _this.redisKey
				}
				_this.$userApi.bindLoverPassword(form).then(response => {
					if (response.status == 0) {

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
