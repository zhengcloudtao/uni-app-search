<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-pink'" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">核酸地点</block>
		</cu-custom>

		<view :class="isDark?'dark':''">

			<view class="cu-bar bg-white solid-bottom" style="font-weight:bold" :class="isDark?'dark':'bg-white'">
				<view class="action">
					<text class="cuIcon-titles text-pink"></text>核酸地点查询
					<text class="cuIcon-search"></text>
				</view>
			</view>
			<view class=" padding flex flex-direction" :class="isDark?'dark':'bg-white'">
				<button class="cu-btn round bg-pink text-white lg">总数:{{list.length}}</button>
			</view>

			<view class="margin  text-grey  shadow-warp cu-list menu card-menu" :class="isDark?'darkIn':'bg-white'"
				style="border: 3rpx solid #000000;">
				<view v-if="list.length==0" style="text-align: center;font-size: 40rpx;"
					:class="isDark?'darkIn':'bg-white'">


					<image src="../../../static/score/empty.png" style="width: 600rpx;height: 600rpx;margin-top: 0rpx;">
					</image>
				</view>
				<view v-for="(val,index) in list" :key="index" class="solids-bottom margin-bottom-sm">
					<view class="padding  radius" :class="isDark?'darkIn':'bg-white'">
						<view style="display: flex;">
							<span style="width:50rpx;">{{index+1}}</span>
							<view class="cu-tag bg-grey light  round margin-left" v-if="val.state==0"> 休息</view>
							<view class="cu-tag bg-green light  round margin-left" v-if="val.state==1"> 畅通</view>
							<view class="cu-tag bg-orange light  round margin-left" v-if="val.state==2"> 忙碌</view>
							<view class="cu-tag bg-red light  round margin-left" v-if="val.state==3"> 拥堵</view>
							<view class="cu-tag bg-blue light  round margin-left" v-if="val.checkNum!=0">
								采样{{val.checkNum}}台</view>
							<span style="width:1000rpx;" class="margin-left">{{val.name}}</span>

						</view>
						<view class="margin-top margin-left-xl">
							<view>服务时间<span class="margin-left">{{val.time}}</span></view>
							<view>服务人群 <span class="margin-left">{{val.people}}</span></view>
						</view>
					</view>
				</view>

			</view>

			<view class="padding flex flex-wrap " :class="isDark?'dark':'bg-white'">
				<text class="padding">数据仅供参考，以实际情况和官方通知为准，核酸检测点如出现与以上数据不准可点击“我要反馈”</text>
				<text class="margin-top-sm padding">疫情防控、人人有责，每多一次准确的反馈，就可以让大家就能更好的选择核酸地点，今天你帮助别人，别人明天就帮助你。</text>
				<button class="cu-btn round line margin-top" @click="refresh()">
					<text class="cuIcon-refresh text-right" :class="isDark?'dark':''"></text>
				</button>

				<button open-type="contact" style="background-color:green;"
					class="cu-btn round line margin-left-xl  margin-top" v-if="client=='WECHAT'">
					<text class="text-white">我要反馈</text>
				</button>
				<button style="background-color:green;" @click="showTip"
					class="cu-btn round line margin-left-xl  margin-top" v-if="client!='WECHAT'">
					<text class="text-white">我要反馈</text>
				</button>
			</view>
			<view class="cu-tabbar-height"></view>


		</view>
		<zmm-watermark>

		</zmm-watermark>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: [],
				total: 0,
				num: 0,
				isDark: this.isDark,
				showEmptyIcon: false,
				client: this.client
			}
		},
		onLoad() {



		},
		onShow() {
			let _this = this
			_this.refresh()
		},
		methods: {
			showTip: function() {
				uni.showToast({
					icon: 'none',
					title: '当前不支持网页和app，可前往小程序！',
					duration: 2000
				});
			},
			/**
			 * @description  请求网络数据
			 */
			refresh: function() {
				let _this = this
				var userInfo = _this.$store.state.userInfo
				if (userInfo.password == "" || userInfo.password == null) {
					uni.showModal({
						title: 'Hi',
						content: '会话已过期，\n当前功能需要登录,是否要去登录?\n(该程序的用户信息只存在手机本地，当切出程序需要重新登录)',
						confirmText: "去登录",
						cancelText: "再逛会",
						success: function(res) {
							if (res.confirm) {
								_this.$Router.navigateTo("/pages/bind/login/index")
							} else if (res.cancel) {
								console.log("点击了取消")
							} else {
								console.log("点击了别的")
							}
						}
					});
					return
				}

				_this.$schoolApi.virusPlace().then(response => {
					//console.log(response.code)
					if (response.status == 0) {
						var total = 0;
						if (response.data[0].name) {
							var date = new Date();
							var month = date.getMonth() + 1;
							var curDate = date.getDate();
							var curHours = date.getHours();
							var curMinutes = date.getMinutes();
							var days = date.getDay();
							var nowNum = curHours * 100 + curMinutes
							//console.log(nowNum)

							for (var i = 0; i < response.data.length; i++) {
								var key = 0
								//console.log(response.data[i].time)
								var arr = response.data[i].time.split(" ")
								for (var j = 0; j < arr.length; j++) {
									var arrSon = arr[j].split("-")
									if (arrSon.length == 2) {
										var start = parseInt((arrSon[0]).replace(':', ''));
										var end = parseInt((arrSon[1]).replace(':', ''));
										//console.log(start)
										//console.log(end)
										if (start <= nowNum && nowNum <= end) {
											key = 1;
										}
									}
								}
								//console.log("key:"+key)
								if (key == 0) {
									response.data[i].state = 0
								}
								//console.log(arr)
							}


							_this.list = response.data
							uni.showToast({
								icon: 'none',
								title: '成功获取数据',
								duration: 2000
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: '获取数据异常,请重新刷新一下吧！',
								duration: 2000
							});
						}




					} else if (response.status != 608) {
						uni.showModal({
							title: '提示',
							content: response.msg,
							showCancel: false,
							success: function(res) {
								if (res.confirm) {

								} else if (res.cancel) {

								}
							}
						});
					}

				})

			}
		}

	}
</script>

<style>

</style>
